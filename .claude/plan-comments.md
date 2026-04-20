# Kommentar-System für 11ty-Blog – Umsetzungsplan

## Überblick

Git-basiertes Kommentarsystem für eine statische 11ty-Site auf Netlify.
Kommentare werden als Markdown-Dateien ins Repo committet, 11ty rendert sie
beim Build ins HTML. Keine externe DB, keine JS-Laufzeit für Anzeige.

**Stack:** Netlify Functions (TypeScript), Netlify Blobs (Rate-Limit,
Blacklist), GitHub Contents API (Commits), Resend (Mail), Cloudflare
Turnstile (Bot-Schutz), Bulma (Formular-Styling), vanilla JS (Submit).

## Architektur-Entscheidungen

- **Identität:** Name + Mail im Formular, keine Verifizierung. Name im
  Markdown-Body, Mail nur als gesalteter SHA-256-Hash im Frontmatter
  (optional für Gravatar). Kein PII im Git-Commit-Author (generischer
  `comments-bot`).
- **Threading:** 1 Ebene. `parent` im Frontmatter referenziert Root-ID.
  Function erzwingt, dass Parent existiert und selbst kein Parent hat.
- **Moderation:** Keine proaktive. Reaktiv via signiertem Lösch-Link in
  Benachrichtigungsmail.
- **Spam-Schutz:** Honeypot + Turnstile + Rate-Limit + Blacklist
  (IP-Hash, Mail-Hash).
- **Rebuild:** Automatisch, weil Netlify auf `main` lauscht und die
  Function direkt auf `main` pusht. Kein separater Build-Hook.
- **UX:** Ehrlich – "Dein Kommentar erscheint in wenigen Minuten" nach
  Submit. Kein Optimistic UI.
- **Post-Identifikation:** `page.url` als Key. Caveat: URL-Änderung bricht
  Zuordnung. Falls später stabilere ID nötig, Migration via Script möglich.

## Datenmodell

**Verzeichnis:** `blog/posts/<post-slug>/comments/<ISO-timestamp>-<short-id>.md`

Kommentare liegen direkt im Ordner des zugehörigen Posts als `comments/`-Unterordner.
Das erleichtert das Filtern aus der `post`-Collection (Glob-Pattern schließt
`comments/**` aus) und hält inhaltlich zusammen, was zusammengehört.

**Frontmatter:**

```yaml
---
id: a3f9c2e1              # 8-Hex-Zeichen, random, stabil
parent: null              # oder id eines Root-Kommentars
post: /mein-post/         # page.url des kommentierten Posts
author: Wolfgang          # Klarname, nur im Frontmatter, nicht im Git-Author
author_url: null          # optional, Website-URL des Kommentators
email_hash: sha256:...    # optional, für Gravatar
ip_hash: sha256:...       # für Blacklist
created: 2026-04-19T14:23:11Z
---

Kommentartext als Markdown.
```

**Blacklist** (Netlify Blobs, Key `blocklist`):

```json
{
  "ip_hashes": ["sha256:abc...", "..."],
  "email_hashes": ["sha256:def...", "..."]
}
```

**Rate-Limit** (Netlify Blobs, Key `ratelimit:<ip_hash>`):

```json
{ "timestamps": [1729341791, 1729341823, ...] }
```

TTL-basiert: Einträge älter als 1h werden beim Read gefiltert.

## Komponenten

### 1. Netlify Function: `comment-submit`

**Pfad:** `netlify/functions/comment-submit.ts`

**Endpoint:** `POST /.netlify/functions/comment-submit`

**Payload:**

```json
{
  "post": "/blog/mein-post/",
  "parent": null,
  "name": "Wolfgang",
  "email": "w@example.com",
  "url": "https://relativwenigbartwuchs.de",
  "body": "Kommentartext",
  "turnstileToken": "...",
  "website": ""
}
```

`website` ist der Honeypot (hidden input, muss leer sein).

**Ablauf:**

1. Method/Origin-Check
2. Honeypot: `website !== ""` → 200 OK ohne Aktion (Bot soll denken, es
   hat geklappt)
3. Turnstile-Token verifizieren via `https://challenges.cloudflare.com/turnstile/v0/siteverify`
4. Rate-Limit: Max 5 Kommentare pro IP-Hash pro Stunde
5. Blacklist-Check (IP-Hash, Mail-Hash)
6. Input-Validierung:
   - name: 1–100 Zeichen, trim
   - email: RFC-Regex
   - url: HTTPS valid base URL (ohne Pfad oder Query-String)
   - body: 1–5000 Zeichen, trim
   - post: muss in Post-Manifest existieren (siehe unten)
   - parent: falls gesetzt, muss existieren und `parent: null` haben
7. Post-Comments-Check: Post-Frontmatter lesen, wenn `comments: false` → 403
8. Markdown-Body generieren:
   - `id` via `crypto.randomBytes(4).toString('hex')`
   - Hashes mit stabilem Salt aus `HASH_SALT` ENV
   - Dateiname: `${ISO-Timestamp}-${id}.md`
9. Commit via GitHub Contents API
   (`PUT /repos/{owner}/{repo}/contents/...`)
   - Author: `comments-bot <comments@deine-domain.de>`
   - Message: `comment: <post> by <name>`
10. Benachrichtigungsmail an Blog-Owner via Resend (siehe unten)
11. 201 Response mit Info-Message

### 2. Netlify Function: `comment-delete`

**Pfad:** `netlify/functions/comment-delete.ts`

**Endpoint:** `GET /.netlify/functions/comment-delete?token=<jwt>`

**Ablauf:**

1. JWT verifizieren (Secret aus `DELETE_TOKEN_SECRET`)
2. Payload enthält `path` der zu löschenden Datei
3. Via GitHub Contents API `DELETE`
4. Optional: Auch alle Kommentare mit `parent: <id>` löschen (Kaskade)
5. Response: HTML-Seite "Kommentar gelöscht"

**Token-Generierung** geschieht in `comment-submit` vor Mail-Versand.
Gültigkeit: 30 Tage.

### 3. Post-Manifest

Problem: `comment-submit` muss wissen, welche Posts existieren und welche
Kommentare deaktiviert haben. Post-Frontmatter bei jedem Request aus Git
lesen ist langsam.

**Lösung:** 11ty schreibt beim Build ein Manifest nach
`public/comments-manifest.json`:

```json
{
  "/blog/mein-post/": { "commentsEnabled": true },
  "/blog/anderer-post/": { "commentsEnabled": false }
}
```

Function lädt es via `fetch('https://deine-domain.de/comments-manifest.json')`
mit 5-Min-Cache (in-memory oder via Netlify Blobs).

**Generierung in `.eleventy.js`:**

```js
eleventyConfig.addGlobalData("eleventyComputed", {
  commentsEnabled: (data) => {
    // Default: true, Post kann per Frontmatter opt-out
    if (data.comments === false) return false;
    return true;
  }
});

// Nach Build Manifest schreiben
eleventyConfig.on('eleventy.after', async ({ results }) => {
  const manifest = {};
  for (const r of results) {
    if (r.data?.commentsEnabled !== undefined) {
      manifest[r.url] = { commentsEnabled: r.data.commentsEnabled };
    }
  }
  fs.writeFileSync('_site/comments-manifest.json', JSON.stringify(manifest));
});
```

### 4. 11ty Collection für Kommentar-Anzeige

**In `.eleventy.js`:**

```js
eleventyConfig.addCollection("commentsByPost", (collectionApi) => {
  const comments = collectionApi.getFilteredByGlob("blog/posts/*/comments/*.md");
  const byPost = {};

  for (const c of comments) {
    const postUrl = c.data.post;
    (byPost[postUrl] ||= []).push(c);
  }

  // Threading aufbauen
  for (const postUrl in byPost) {
    const all = byPost[postUrl];
    const byId = Object.fromEntries(all.map(c => [c.data.id, c]));

    for (const c of all.filter(c => c.data.parent)) {
      const parent = byId[c.data.parent];
      if (parent) (parent.children ||= []).push(c);
    }

    byPost[postUrl] = all
      .filter(c => !c.data.parent)
      .sort((a,b) => a.data.created.localeCompare(b.data.created));
  }

  return byPost;
});
```

### 5. Globaler Kill-Switch via Plugin/Filter

Globale Deaktivierung per ENV-Variable, die 11ty beim Build liest:

**In `.eleventy.js`:**

```js
const COMMENTS_GLOBALLY_ENABLED = process.env.COMMENTS_ENABLED !== 'false';

eleventyConfig.addGlobalData("commentsGloballyEnabled",
  COMMENTS_GLOBALLY_ENABLED);
```

In Netlify-ENV `COMMENTS_ENABLED=false` setzen → Rebuild → Formulare
verschwinden. Kill-Switch ohne Code-Change.

### 6. Partial: Kommentar-Anzeige

**Pfad:** `blog/_includes/partials/comments.njk`

```njk
{% if commentsGloballyEnabled and commentsEnabled %}
  <section class="comments">
    <h2 class="title is-4">Kommentare</h2>
    {% set thread = collections.commentsByPost[page.url] %}
    {% if thread and thread.length > 0 %}
      {% for comment in thread %}
        {% include "partials/comment.njk" %}
      {% endfor %}
    {% else %}
      <p>Noch keine Kommentare.</p>
    {% endif %}

    {% include "partials/comment-form.njk" %}
  </section>
{% endif %}
```

Einzelner Kommentar (`partials/comment.njk`) rendert Name, Datum, Body
(Markdown → HTML), ggf. Antwort-Button mit `data-parent-id`, dann
rekursiv Kinder (nur 1 Ebene).

Styling mit Bulma: `media`, `media-content`, `box` o.ä.

### 7. Kommentar-Formular

**Pfad:** `blog/_includes/partials/comment-form.njk`

Vanilla JS:

- Turnstile-Widget einbinden
- Submit-Handler: `fetch()` auf Function-Endpoint, JSON-Payload
- Bei Erfolg: Formular ausblenden, Hinweis "Dein Kommentar erscheint
  nach dem nächsten Build (wenige Minuten)."
- Bei Antwort-Button-Click: `parent` im Formular setzen, Formular
  unter den entsprechenden Kommentar scrollen.

Bulma-Klassen: `field`, `control`, `input`, `textarea`, `button
is-primary`.

Honeypot: `<input type="text" name="website" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px">`

### 8. Benachrichtigungsmail

**Via Resend SDK in der Function:**

Inhalt:

- Post (Link)
- Name, Body-Preview (200 Zeichen)
- Zeitstempel
- Link zur Datei im GitHub-Repo
- **Löschen-Link:** `https://deine-domain.de/.netlify/functions/comment-delete?token=<jwt>`

Absender: `comments@deine-domain.de` (Resend-verifizierte Domain nötig).

## Netlify-Konfiguration

**`netlify.toml`:**

```toml
[build]
  command = "npx @11ty/eleventy"
  publish = "_site"

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"

[[redirects]]
  from = "/api/comment"
  to = "/.netlify/functions/comment-submit"
  status = 200
```

**Environment-Variablen (Netlify UI):**

- `GITHUB_TOKEN` – fine-grained PAT, scope: contents:write auf ein Repo
- `GITHUB_REPO` – `owner/repo`
- `HASH_SALT` – zufälliger String, nie rotieren
- `TURNSTILE_SECRET` – aus Cloudflare-Dashboard
- `RESEND_API_KEY`
- `NOTIFY_EMAIL` – deine Mailadresse
- `DELETE_TOKEN_SECRET` – zufälliger String für JWT-Signing
- `COMMENTS_ENABLED` – `true`/`false`, globaler Kill-Switch

## Projekt-Struktur

```
.
├── .eleventy.js                          # Config, Collections, Manifest
├── netlify.toml
├── scripts/
│   └── import-wp-comments.py             # Einmal-Import aus WordPress-XML
├── netlify/
│   └── functions/
│       ├── comment-submit.ts
│       ├── comment-delete.ts
│       └── lib/
│           ├── github.ts                 # Contents API Wrapper
│           ├── hash.ts                   # SHA-256 mit Salt
│           ├── turnstile.ts              # Token-Verify
│           ├── ratelimit.ts              # Netlify Blobs
│           ├── blocklist.ts              # Netlify Blobs
│           ├── mail.ts                   # Resend Wrapper
│           ├── jwt.ts                    # Delete-Token Sign/Verify
│           └── validate.ts               # Input-Validierung
├── blog/
│   ├── _includes/
│   │   └── partials/
│   │       ├── comments.njk
│   │       ├── comment.njk
│   │       └── comment-form.njk
│   ├── assets/
│   │   └── js/
│   │       └── comment-form.js          # Vanilla JS Submit-Handler
│   └── posts/
│       └── <post-slug>/
│           ├── index.md
│           └── comments/                 # von Function via Commit befüllt
│               └── <ISO-timestamp>-<id>.md
├── package.json
└── tsconfig.json
```

## Umsetzungs-Reihenfolge

Vorgeschlagene Reihenfolge für Claude Code. Jeder Schritt ist testbar
abgeschlossen.

### Phase 1: Skeleton + Anzeige

1. Projekt-Setup: `package.json`, `tsconfig.json`, `netlify.toml`,
   Dependencies (`@netlify/functions`, `@netlify/blobs`, `@octokit/rest`,
   `resend`, `jose` für JWT, `zod` für Validierung).
2. `.eleventy.js`: `commentsEnabled` computed data, `commentsByPost`
   collection, `commentsGloballyEnabled` aus ENV, Manifest-Generator.
3. Partials: `comments.njk`, `comment.njk` (ohne Formular erstmal).
4. Test: Manuell eine Markdown-Datei in `blog/posts/<slug>/comments/` anlegen,
   prüfen ob sie im HTML landet.

### Phase 2: Formular + Vanilla JS

5. `comment-form.njk` mit Bulma-Styling, Honeypot, Turnstile-Widget-Stub
   (ohne Keys erstmal).
6. `comment-form.js`: Submit-Handler, Antwort-Button-Logik, Success-State.
7. Test: Formular rendert, Submit geht an Stub-Endpoint, zeigt Success.

### Phase 3: Function Core

8. `lib/hash.ts`, `lib/validate.ts` (Zod-Schema), `lib/github.ts`.
9. `comment-submit.ts` – End-to-End ohne Spam-Schutz:
   Validierung → Commit → Erfolg.
10. Test: Formular-Submit erzeugt tatsächlich einen Commit im Repo,
    Netlify baut neu, Kommentar erscheint.

### Phase 4: Spam-Schutz

11. Turnstile-Keys einrichten (Cloudflare-Dashboard), `lib/turnstile.ts`
    einbauen, Frontend-Widget aktivieren.
12. `lib/ratelimit.ts` via Netlify Blobs.
13. `lib/blocklist.ts` – Blobs-basiert, manuell per Netlify CLI oder
    Admin-Script befüllbar.
14. Honeypot-Handling in `comment-submit.ts`.
15. Test: Rapid-Fire-Submits werden rate-limited, Bot-Token fliegt raus.

### Phase 5: Mail + Löschen

16. `lib/mail.ts` (Resend), `lib/jwt.ts` (jose).
17. Mail-Versand nach Commit in `comment-submit.ts`.
18. `comment-delete.ts` – JWT verifizieren, Datei via API löschen,
    Kaskade für Kinder.
19. Test: Kommentar abschicken → Mail kommt an → Löschen-Link klicken →
    Kommentar verschwindet nach Rebuild.

### Phase 6: Polish

20. Threading-UX: Antwort-Button, Formular-Positionierung.
21. Markdown-Rendering im Kommentar-Body (Safe Subset, z.B. nur
    `**bold**`, `_italic_`, Code, Links – keine Bilder, kein HTML).
22. Leere States, Error States im Frontend.
23. Dokumentation im Repo (`docs/comments.md`): Wie Blacklist pflegen,
    wie Kommentare global abschalten, wie Kommentare manuell löschen.

## Offene Punkte für später

- **Markdown-Sanitizing im Kommentar-Body** – welches Subset erlaubt?
  Default: `markdown-it` mit disabled `html`, disabled `image`. Genug?
- **Antworten auf Antworten** – aktuell nur 1 Ebene. Falls später tiefer
  gewünscht: Function-Check anpassen, Rendering rekursiv machen.
- **Akismet als zweiter Layer** – falls menschlicher Spam durchkommt.
  API-Call vor Commit, bei `spam`-Verdict ablehnen.
- **DSGVO** – Datenschutzerklärung muss erwähnen: Name im Klartext im
  Git-Repo (öffentlich), Mail- und IP-Hash zur Missbrauchsprävention,
  Löschanfragen an welche Adresse.
- **Post-URL-Änderungen** – Migrations-Script schreiben, das bei
  URL-Rename die Kommentare-Unterverzeichnisse mit umbenennt.
- **Existierende Gravatars** – falls gewünscht, Mail-Hash als MD5
  zusätzlich speichern (Gravatar nutzt MD5, nicht SHA-256). Alternativ:
  Gravatar-URLs aus SHA-256 funktionieren seit 2022 auch.
