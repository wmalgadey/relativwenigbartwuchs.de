# Kommentar-System für 11ty-Blog – Umsetzungsplan

## Überblick

Hybrides Kommentarsystem für eine statische 11ty-Site auf Netlify.
Kommentare werden **sofort in Netlify Blobs gespeichert** und sind ohne Build
sichtbar. Einmal täglich exportiert eine Scheduled Function alle ausstehenden
Blobs-Kommentare als Markdown-Dateien ins Repo und triggert damit den Build.
Nach dem Build liegen die Kommentare statisch im HTML; die Blobs-Einträge werden
gelöscht.

**Vorteil gegenüber reinem Git-Flow:** Kein Build pro Kommentar.
Kein Warten. Kommentare erscheinen sofort.

**Stack:** Netlify Functions (TypeScript), Netlify Blobs (Kommentar-Store,
Rate-Limit, Blacklist), GitHub Contents API (täglicher Batch-Commit), Resend
(Mail), Cloudflare Turnstile (Bot-Schutz), Bulma (Formular-Styling), vanilla JS
(Submit + Pending-Fetch).

## Architektur-Entscheidungen

- **Identität:** Name + Mail im Formular, keine Verifizierung. Name im
  Markdown-Body, Mail nur als gesalteter SHA-256-Hash im Frontmatter
  (optional für Gravatar). Kein PII im Git-Commit-Author (generischer
  `comments-bot`).
- **Flache Kommentare:** Kein Threading. Alle Kommentare sind gleichwertig
  unter dem Post. Kein `parent`-Feld, keine Antwort-Funktion.
- **Moderation:** Keine proaktive. Reaktiv via signiertem Lösch-Link in
  Benachrichtigungsmail.
- **Spam-Schutz:** Honeypot + Turnstile + Rate-Limit + Blacklist
  (IP-Hash, Mail-Hash).
- **Sofortige Anzeige:** Nach Submit speichert die Function den Kommentar in
  Netlify Blobs. Die Seite lädt pending Kommentare per `fetch()` nach und
  rendert sie client-side unter den statisch gebauten. Der Nutzer sieht seinen
  Kommentar sofort.
- **Täglicher Export:** Scheduled Function um 03:00 UTC liest alle Blobs,
  schreibt Markdown-Dateien ins Repo (Batch-Commit), löscht exportierte
  Blobs-Einträge. Netlify baut dadurch einmal täglich statt bei jedem Kommentar.
- **Duplikat-Vermeidung:** Nach dem Export-Commit und dem darauffolgenden Build
  sind die Blobs-Einträge gelöscht. Zwischen Commit und Build-Ende (~2 Min)
  gibt es eine kurze Lücke (03:00–03:02 Uhr) — akzeptabler Trade-off.
- **Lösch-Pfad:** Delete-Token kodiert `storage: "blob" | "git"`.
  - `blob`: Direktlöschung aus Blobs.
  - `git`: Löschung via GitHub Contents API (wie bisher).
- **Post-Identifikation:** `page.url` als Key.

## Datenmodell

### Netlify Blobs – Pending-Kommentare

**Store:** `comments` (Netlify Blobs Store-Name)

**Key:** `pending:<post-slug>:<id>`

Beispiel: `pending:/blog/mein-post/:a3f9c2e1`

**Value (JSON):**

```json
{
  "id": "a3f9c2e1",
  "post": "/blog/mein-post/",
  "author": "Wolfgang",
  "author_url": null,
  "email_hash": "sha256:...",
  "ip_hash": "sha256:...",
  "created": "2026-04-19T14:23:11Z",
  "body": "Kommentartext als Markdown."
}
```

### Markdown-Dateien – Exportierte Kommentare

**Verzeichnis:** `blog/posts/<post-slug>/comments/<ISO-timestamp>-<id>.md`

**Frontmatter:**

```yaml
---
id: a3f9c2e1
post: /blog/mein-post/
author: Wolfgang
author_url: null
email_hash: sha256:...
ip_hash: sha256:...
created: 2026-04-19T14:23:11Z
---

Kommentartext als Markdown.
```

### Blacklist (Netlify Blobs, Key `blocklist`)

```json
{
  "ip_hashes": ["sha256:abc...", "..."],
  "email_hashes": ["sha256:def...", "..."]
}
```

### Rate-Limit (Netlify Blobs, Key `ratelimit:<ip_hash>`)

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
2. Honeypot: `website !== ""` → 200 OK ohne Aktion
3. Turnstile-Token verifizieren
4. Rate-Limit: Max 5 Kommentare pro IP-Hash pro Stunde
5. Blacklist-Check (IP-Hash, Mail-Hash)
6. Input-Validierung (Zod):
   - name: 1–100 Zeichen, trim
   - email: RFC-Regex
   - url: HTTPS valid base URL
   - body: 1–5000 Zeichen, trim
   - post: muss im Post-Manifest existieren
7. Post-Comments-Check: Manifest lesen, wenn `commentsEnabled: false` → 403
8. Comment-Objekt generieren:
   - `id` via `crypto.randomBytes(4).toString('hex')`
   - Hashes mit stabilem Salt aus `HASH_SALT` ENV
9. **Speichern in Netlify Blobs** (Store `comments`, Key `pending:<post>:<id>`)
   - Kein GitHub-Commit mehr pro Kommentar
10. Benachrichtigungsmail an Blog-Owner via Resend
    - Lösch-Link enthält `storage: "blob"` im JWT
11. 201 Response: `{ "message": "Dein Kommentar ist jetzt sichtbar." }`

### 2. Netlify Function: `comment-pending`

**Pfad:** `netlify/functions/comment-pending.ts`

**Endpoint:** `GET /.netlify/functions/comment-pending?post=<url-encoded-post-url>`

Gibt alle Blobs-Kommentare für einen Post als JSON zurück.
Wird client-seitig aufgerufen und in die Seite eingebaut.

**Ablauf:**

1. `post`-Parameter aus Query lesen, URL-decode
2. Blobs-Store mit Prefix `pending:<post>` listen
3. Alle Einträge laden, nach `created` sortieren
4. 200 Response: JSON-Array der Kommentare (flach, chronologisch)

**CORS:** Nur für die eigene Domain, kein öffentliches API.

**Caching:** `Cache-Control: no-store` – immer frisch.

### 3. Netlify Scheduled Function: `comment-export`

**Pfad:** `netlify/functions/comment-export.ts`

**Schedule:** täglich 03:00 UTC (`@daily` oder Cron-Ausdruck)

**Ablauf:**

1. Alle Blobs mit Prefix `pending:` listen
2. Falls keine Kommentare vorhanden → Exit (kein Commit, kein Build)
3. Für jeden Blob:
   - Markdown-Datei generieren (Frontmatter + Body)
   - Dateiname: `${ISO-timestamp}-${id}.md`
   - Post-Slug aus `post`-Feld ableiten → Pfad bestimmen
4. Alle Dateien in **einem Batch-Commit** via GitHub Contents API committen
   - `PUT /repos/{owner}/{repo}/contents/...` für jede Datei einzeln,
     oder via Trees API für atomaren Multi-File-Commit
5. Blobs-Einträge der exportierten Kommentare löschen
6. Netlify baut automatisch, weil Commit auf `main` triggert

**Fehlerbehandlung:** Bei GitHub-API-Fehler → Blobs bleiben erhalten,
nächster Lauf versucht es erneut. Idempotent durch Prüfung ob Datei bereits
im Repo existiert (via Contents API `GET`).

### 4. Netlify Function: `comment-delete`

**Pfad:** `netlify/functions/comment-delete.ts`

**Endpoint:** `GET /.netlify/functions/comment-delete?token=<jwt>`

**JWT-Payload:** `{ path, id, post, storage: "blob" | "git" }`

**Ablauf:**

1. JWT verifizieren (Secret aus `DELETE_TOKEN_SECRET`)
2. Je nach `storage`:
   - `"blob"`: Blob-Key `pending:<post>:<id>` löschen
   - `"git"`: Via GitHub Contents API `DELETE` auf `path`
3. Response: HTML-Seite "Kommentar gelöscht"

**Token-Generierung:** in `comment-submit`, Gültigkeit 30 Tage.

### 5. Post-Manifest

Problem: Function muss wissen, welche Posts Kommentare erlauben.

**Lösung:** 11ty schreibt beim Build nach `_site/comments-manifest.json`:

```json
{
  "/blog/mein-post/": { "commentsEnabled": true },
  "/blog/anderer-post/": { "commentsEnabled": false }
}
```

Function lädt es via `fetch` mit 5-Min-Cache (Netlify Blobs oder in-memory).

### 6. 11ty Collection: `commentsByPost`

**In `.eleventy.js`:**

```js
eleventyConfig.addCollection("commentsByPost", (collectionApi) => {
  const comments = collectionApi.getFilteredByGlob("blog/posts/*/comments/*.md");
  const byPost = {};

  for (const c of comments) {
    const postUrl = c.data.post;
    (byPost[postUrl] ||= []).push(c);
  }

  for (const postUrl in byPost) {
    byPost[postUrl].sort((a, b) => a.data.created.localeCompare(b.data.created));
  }

  return byPost;
});
```

### 7. Globaler Kill-Switch

**In `.eleventy.js`:**

```js
const COMMENTS_GLOBALLY_ENABLED = process.env.COMMENTS_ENABLED !== 'false';
eleventyConfig.addGlobalData("commentsGloballyEnabled", COMMENTS_GLOBALLY_ENABLED);
```

### 8. Partial: Kommentar-Anzeige

**Pfad:** `blog/_includes/partials/comments.njk`

```njk
{% if commentsGloballyEnabled and commentsEnabled %}
  <section class="comments" data-post-url="{{ page.url }}">
    <h2 class="title is-4">Kommentare</h2>

    <div id="static-comments">
      {% set thread = collections.commentsByPost[page.url] %}
      {% if thread and thread.length > 0 %}
        {% for comment in thread %}
          {% include "partials/comment.njk" %}
        {% endfor %}
      {% else %}
        <p id="no-comments-msg">Noch keine Kommentare.</p>
      {% endif %}
    </div>

    <div id="pending-comments">
      <!-- Wird per JS befüllt -->
    </div>

    {% include "partials/comment-form.njk" %}
  </section>
{% endif %}
```

Einzelner Kommentar (`comment.njk`) rendert Name, Datum und Body.
Styling mit Bulma: `media`, `media-content`.

### 9. Client-side JS: Pending-Kommentare laden

Teil von `blog/assets/js/comment-form.js`:

```js
async function loadPendingComments() {
  const section = document.querySelector('.comments[data-post-url]');
  if (!section) return;

  const postUrl = section.dataset.postUrl;
  const staticIds = new Set(
    [...section.querySelectorAll('[data-comment-id]')].map(el => el.dataset.commentId)
  );

  const res = await fetch(
    `/.netlify/functions/comment-pending?post=${encodeURIComponent(postUrl)}`
  );
  if (!res.ok) return;

  const pending = await res.json();
  const newComments = pending.filter(c => !staticIds.has(c.id));

  if (newComments.length === 0) return;

  document.getElementById('no-comments-msg')?.remove();

  const container = document.getElementById('pending-comments');
  for (const comment of newComments) {
    container.appendChild(renderComment(comment)); // DOM-Render-Funktion
  }
}

document.addEventListener('DOMContentLoaded', loadPendingComments);
```

Die `data-comment-id`-Attribute werden in `comment.njk` gesetzt,
damit statische und pending Kommentare dedupliziert werden können.

### 10. Kommentar-Formular

**Pfad:** `blog/_includes/partials/comment-form.njk`

Vanilla JS:

- Turnstile-Widget
- Submit-Handler: `fetch()` auf Function-Endpoint, JSON-Payload
- Bei Erfolg: Formular zurücksetzen, neuen Kommentar sofort in DOM einfügen
  (Optimistic: er kommt ja direkt aus dem Blob zurück oder wird aus dem Response gebaut)
- Erfolgsmeldung: "Dein Kommentar ist jetzt sichtbar."

Honeypot: `<input type="text" name="website" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px">`

### 11. Benachrichtigungsmail

**Via Resend SDK in `comment-submit`:**

Inhalt:

- Post (Link)
- Name, Body-Preview (200 Zeichen)
- Zeitstempel
- **Löschen-Link:** `https://deine-domain.de/.netlify/functions/comment-delete?token=<jwt>`

JWT kodiert: `{ path, id, post, storage: "blob" }` (nach Export: `"git"`).

## Netlify-Konfiguration

**`netlify.toml`:**

```toml
[build]
  command = "npx @11ty/eleventy"
  publish = "_site"

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"
  schedule = "comment-export"  # wird in der Function per @netlify/functions deklariert

[[redirects]]
  from = "/api/comment"
  to = "/.netlify/functions/comment-submit"
  status = 200

[[redirects]]
  from = "/api/comment/pending"
  to = "/.netlify/functions/comment-pending"
  status = 200
```

Scheduled Functions werden via `schedule` Export in der Function-Datei
deklariert (nicht in `netlify.toml`):

```ts
// netlify/functions/comment-export.ts
export const config = { schedule: "0 3 * * *" };
```

**Environment-Variablen (Netlify UI):**

- `GITHUB_TOKEN` – fine-grained PAT, scope: contents:write
- `GITHUB_REPO` – `owner/repo`
- `HASH_SALT` – zufälliger String, nie rotieren
- `TURNSTILE_SECRET` – aus Cloudflare-Dashboard
- `RESEND_API_KEY`
- `NOTIFY_EMAIL` – Mailadresse des Blog-Owners
- `DELETE_TOKEN_SECRET` – für JWT-Signing
- `COMMENTS_ENABLED` – `true`/`false`, globaler Kill-Switch
- `SITE_URL` – für Manifest-Fetch (`https://relativwenigbartwuchs.de`)

## Projekt-Struktur

```text
.
├── .eleventy.js                          # Config, Collections, Manifest
├── netlify.toml
├── scripts/
│   └── import-wp-comments.py             # Einmal-Import aus WordPress-XML
├── netlify/
│   └── functions/
│       ├── comment-submit.ts             # Validate → Blob speichern → Mail
│       ├── comment-pending.ts            # GET: Blobs für einen Post als JSON
│       ├── comment-export.ts             # Scheduled: Blobs → Markdown → Git-Commit
│       ├── comment-delete.ts             # JWT → Blob oder Git-Datei löschen
│       └── lib/
│           ├── github.ts                 # Contents API + Trees API Wrapper
│           ├── hash.ts                   # SHA-256 mit Salt
│           ├── turnstile.ts              # Token-Verify
│           ├── ratelimit.ts              # Netlify Blobs
│           ├── blocklist.ts              # Netlify Blobs
│           ├── mail.ts                   # Resend Wrapper
│           ├── jwt.ts                    # Delete-Token Sign/Verify
│           ├── validate.ts               # Zod-Schema
│           └── blobs.ts                  # Kommentar-Store Wrapper
├── blog/
│   ├── _includes/
│   │   └── partials/
│   │       ├── comments.njk
│   │       ├── comment.njk
│   │       └── comment-form.njk
│   ├── assets/
│   │   └── js/
│   │       └── comment-form.js          # Submit-Handler + Pending-Fetch + DOM-Render
│   └── posts/
│       └── <post-slug>/
│           ├── index.md
│           └── comments/                 # befüllt durch täglichen Export
│               └── <ISO-timestamp>-<id>.md
├── package.json
└── tsconfig.json
```

## Umsetzungs-Reihenfolge

### Phase 1: Skeleton + statische Anzeige

1. Projekt-Setup: `package.json`, `tsconfig.json`, `netlify.toml`,
   Dependencies (`@netlify/functions`, `@netlify/blobs`, `@octokit/rest`,
   `resend`, `jose`, `zod`).
2. `.eleventy.js`: `commentsEnabled` computed data, `commentsByPost`
   collection, `commentsGloballyEnabled`, Manifest-Generator.
3. Partials: `comments.njk`, `comment.njk` (ohne Formular).
4. Test: Manuell Markdown-Datei anlegen, im HTML prüfen.

### Phase 2: Formular + Submit → Blob

1. `comment-form.njk` mit Bulma-Styling, Honeypot, Turnstile-Stub.
2. `lib/blobs.ts`, `lib/hash.ts`, `lib/validate.ts` (Zod).
3. `comment-submit.ts` – Validierung → Blob speichern (kein Git-Commit).
4. Test: Submit erzeugt Blob-Eintrag (Netlify CLI `blobs:get` prüfen).

### Phase 3: Pending-Anzeige client-side

1. `comment-pending.ts` – Blobs lesen, JSON zurückgeben.
2. `comment-form.js`: `loadPendingComments()` + `renderComment()` +
    Dedup-Logik via `data-comment-id`.
3. Test: Kommentar absenden → sofort auf der Seite sichtbar,
    ohne Rebuild.

### Phase 4: Täglicher Export

1. `lib/github.ts` (Trees API für Batch-Commit).
2. `comment-export.ts` – Scheduled Function: Blobs → Markdown → Git-Commit → Blobs löschen.
3. Test: Function manuell triggern (Netlify CLI `functions:invoke`),
    Commit im Repo prüfen, Build startet, statisches HTML zeigt Kommentare.

### Phase 5: Löschen

1. `lib/jwt.ts` (jose).
2. Mail-Versand in `comment-submit.ts` mit Delete-JWT (`storage: "blob"`).
3. `comment-delete.ts` – JWT → Blob oder Git-Datei löschen.
4. Test: Mail empfangen → Löschen-Link → Blob weg, Seite aktualisiert.

### Phase 6: Spam-Schutz

1. Turnstile-Keys (Cloudflare), `lib/turnstile.ts`.
2. `lib/ratelimit.ts`, `lib/blocklist.ts`.
3. Honeypot-Handling.
4. Test: Rapid-Fire-Submits rate-limited, Bad-Token abgelehnt.

### Phase 7: Polish

1. Markdown-Rendering im Kommentar-Body (client-side: `marked` oder
    `markdown-it` mit safe Preset; statisch: 11ty rendert Markdown normal).
2. Leere States, Error States im Frontend.
3. Dokumentation (`docs/comments.md`): Blacklist, Kill-Switch, manuelles Löschen.

## Offene Punkte für später

- **Markdown-Sanitizing** – `markdown-it` mit disabled `html`, disabled `image`.
- **Antworten auf Antworten** – aktuell 1 Ebene. Tiefer: Function-Check + Rendering anpassen.
- **Akismet als zweiter Layer** – API-Call vor Blob-Speicherung.
- **DSGVO** – Datenschutzerklärung: Name im Klartext im Git-Repo, Hashes, Löschanfragen.
- **Post-URL-Änderungen** – Migration-Script für Kommentar-Unterverzeichnisse.
- **Gravatar** – MD5-Hash zusätzlich speichern (Gravatar nutzt MD5).
- **Export-Zeitpunkt konfigurierbar** – aktuell hart 03:00 UTC. Ggf. ENV-Variable.
- **Blobs-Größenlimit** – Netlify Blobs hat 10 MB pro Blob. Kein Problem für Kommentare,
  aber beachten falls Blacklist sehr groß wird.
