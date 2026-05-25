# relativwenigbartwuchs.de

[![Netlify Status](https://api.netlify.com/api/v1/badges/27921fde-8534-475f-aa34-ca6423f9939d/deploy-status)](https://app.netlify.com/sites/relativwenigbartwuchs/deploys)

Persönlicher Blog, gebaut mit [Eleventy (11ty)](https://www.11ty.dev/). Input: `blog/`, Output: `_site/`.

## Commands

```sh
npm start           # Dev server mit Live Reload (Drafts sichtbar, Source Maps)
npm run production  # Produktionsbuild: clean + build + Pagefind-Index
npm run debug       # Verbose Eleventy output
npm run clean       # _site/ löschen
```

---

## Features

### Plugins

| Plugin                                  | Version | Funktion                                 |
| --------------------------------------- | ------- | ---------------------------------------- |
| `@11ty/eleventy-navigation`             | 1.0.5   | Navigation data structure                |
| `@11ty/eleventy-plugin-rss`             | 3.0.0   | RSS Feed + `absoluteUrl` filter          |
| `@11ty/eleventy-plugin-syntaxhighlight` | 5.0.2   | Syntax Highlighting für Code-Blöcke      |
| `eleventy-plugin-gen-favicons`          | 1.1.2   | Favicon-Generierung via `{% favicons %}` |

### Markdown

Konfiguriert in `lib/markdown-it.js`, Plugins in `lib/markdown/`:

- **markdown-it-attrs** — Attribute-Syntax: `{.class #id}` an Elementen
- **markdown-it-footnote** — Fußnoten: `[^1]` / `[^1]: Text`
- **Obsidian Wikilinks** (`lib/markdown/obsidian.js`) — `[[page]]`, `[[page|Text]]`, `![[image]]`, `[[page#anchor]]`
- **Responsive Figures** (`lib/markdown/figure.js`) — `![alt](img.jpg "caption")` wird zu `<figure>` mit srcset (WebP + JPEG, Breiten: 250–768px + 2×). Sondersyntax:
  - `@skip` — Bild nicht prozessieren (z.B. externe URLs)
  - `@skip[WxH]` — Skip mit expliziten Abmessungen
  - `?[sizes]` — Custom responsive sizes
- **Externe Links** (inline rule) — Fügt `target="_blank" rel="noopener noreferrer"` automatisch hinzu

### Collections

| Collection    | Datei                            | Beschreibung                                                                                                 |
| ------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `post`        | `lib/collections/post.js`        | Alle publizierten Posts; filtert Drafts und Zukunftsdaten (außer im Dev-Modus); sortiert nach `date created` |
| `schlagworte` | `lib/collections/schlagworte.js` | Tag-Cloud mit gewichteter Häufigkeit (1–9); filtert `type/*`, `journal/*`                                    |
| `kategorien`  | `lib/collections/kategorien.js`  | Kategorienliste; liest Dateien direkt via `globSync` (umgeht Eleventy-v3-Build-Order-Bug)                    |

### Filters

| Filter               | Datei                               | Beschreibung                                             |
| -------------------- | ----------------------------------- | -------------------------------------------------------- |
| `datefriendly`       | `lib/filters/dateformat.js`         | Datum als „DD. MMMM YYYY"                                |
| `dateymd`            | `lib/filters/dateformat.js`         | Datum als ISO 8601 `YYYY-MM-DD`                          |
| `readtime`           | `lib/filters/readtime.js`           | Lesezeit aus Wortzahl (200 Wörter/min), deutsches Format |
| `splitlines`         | `lib/filters/split-lines.js`        | Text in Zeilen à ~19 Zeichen aufteilen                   |
| `firstMarkdownImage` | `lib/filters/firstmarkdownimage.js` | Erstes Bild-URL aus Markdown-Quelldatei extrahieren      |
| `md`                 | `.eleventy.js` (inline)             | Markdown-String zu Inline-HTML rendern                   |
| `debugger`           | `.eleventy.js` (inline)             | Debugger-Breakpoint + console.log                        |

### Shortcodes

- **`{% preview %}`** (`lib/shortcodes/preview-image/index.js`) — Responsives Vorschaubild mit srcset (WebP + JPEG, Breiten: 300/550/800/1280). Cacht Ergebnisse per `page.url:imageSrc`.
- **`{% excerpt %}`** (`lib/shortcodes/excerpt.js`) — Ersten Nicht-Überschrift-Absatz aus Markdown extrahieren; fällt auf Frontmatter-Excerpt zurück.

### Transforms

- **PostCSS** (`lib/transforms/postcss.js`) — Verarbeitet alle `.css`-Dateien: `postcss-advanced-variables` → `postcss-nested` → `cssnano` (Minification). Source Maps im Dev-Modus.
- **HTML Minify** (`lib/transforms/htmlminify.js`) — Komprimiert HTML-Output in Production (`html-minifier`).

### Extensions

- **SCSS** (`lib/extensions/scss.js`) — Kompiliert `.scss` via Dart Sass. Load paths: aktuelles Verzeichnis, includes, `node_modules`. Source Maps im Dev-Modus.

### Hooks

- **Preview Image Hook** (`lib/preview-image-hook.js`) — `eleventy.after`-Hook: konvertiert alle `_site/**/preview.svg` zu JPEG + WebP nach jedem Build.

### CSS

- **Framework**: Bulma v1.0.4 (via `@use 'bulma/sass'`)
- **Einstiegspunkt**: `blog/assets/css/main.scss`
- **Fonts**: Montserrat (WOFF2, weights 100–900) in `blog/assets/fonts/`; Preloading im HTML-Head
- **Features**: Flexbox Sticky-Footer, Hamburger-Menü mit CSS-Animationen (fadeInUp/fadeOutDown), Tag-Cloud-Gewichtung (CSS-Klassen 1–9)

### JavaScript

- **Bundler**: esbuild v0.28.0 — konfiguriert in `blog/scripts.11ty.js`
- **Einstiegspunkt**: `blog/assets/js/main.js`
- **Funktionen**: Menü-Toggle-System, aria-expanded, Scroll-Lock, Single-Menu-Enforcement

### Search

- **Pagefind** v1.5.2 — läuft nach Production-Build (`npx pagefind --site _site`); UI unter `/suche/`

---

## Content-Struktur

```text
blog/
  posts/<slug>/
    index.md          # Post-Inhalt
    images/           # Bilder neben dem Post
  assets/
    css/              # SCSS-Quellen
    fonts/            # Montserrat WOFF2
    js/               # Client-JS
  _includes/
    layouts/          # main.njk, info.njk, empty.njk
    partials/         # header, footer, pagelist, htmlhead, svgfonts
    macros/           # navlist.njk
```

Post-Frontmatter:

```yaml
title: ...
date created: 2023-05-17
date modified: ...
categories: [Artikel]
tags: [entwicklung, type/post]
draft: true           # versteckt in Production
```

---

## Deployment

> **Aktueller Stand:** Die Seite wird noch über GitHub + Netlify deployt (Badge oben). Die GitLab-Pipeline ist vorbereitet, aber noch nicht aktiv.

Die Seite soll über eine GitLab CI/CD Pipeline gebaut und per SSH auf den Webspace deployt werden. Production nutzt ein **Blue/Green-Verfahren**, Merge Requests bekommen automatisch eine eigene **Review App** als Subdomain.

### Pipeline

Definiert in [`.gitlab-ci.yml`](.gitlab-ci.yml):

| Job             | Auslöser                  | Beschreibung                                             |
| --------------- | ------------------------- | -------------------------------------------------------- |
| `build`         | Push auf `main` oder MR   | `npm install` + `npm run production` → Artefakt `_site/` |
| `deploy`        | nach `build` auf `main`   | Synct Build in inaktiven Slot, tauscht Symlink atomar    |
| `rollback`      | manuell                   | Tauscht Symlink zurück auf den vorherigen Slot           |
| `deploy:review` | MR geöffnet/aktualisiert  | Legt Subdomain an, deployt Build dort                    |
| `stop:review`   | manuell (MR geschlossen)  | Löscht Subdomain + Verzeichnis                           |

### Server-Struktur

```text
~/sites/relativwenigbartwuchs.de/blue/     ← Production Slot A
~/sites/relativwenigbartwuchs.de/green/    ← Production Slot B
~/sites/relativwenigbartwuchs.de/.slot     ← enthält "blue" oder "green"
~/sites/relativwenigbartwuchs.de/current   ← Symlink → aktiver Slot (Document Root in cPanel)

~/sites/relativwenigbartwuchs.de/mr-{IID}/                  ← Review App pro MR
```

Review Apps sind erreichbar unter `mr-{IID}.relativwenigbartwuchs.de` — die Subdomain wird per cPanel API automatisch angelegt und abgeräumt.

> **⚠️ Bekanntes Problem: Review Apps funktionieren nicht auf HostEurope cPanel Webhosting**
>
> Der Plan setzt voraus, dass `*.relativwenigbartwuchs.de` per Wildcard-DNS-Eintrag (A-Record) auf die cPanel-Server-IP zeigt, damit jede dynamisch angelegte Subdomain (`mr-1.`, `mr-2.`, …) automatisch auflöst. HostEurope erlaubt Wildcard-Einträge im KIS zwar technisch, schränkt aber explizit ein:
>
> > *„Wildcard-Einträge auf Produkten, bei welchen die Administration durch uns erfolgt, sind nicht erreichbar. Sie müssen Wildcard-Einträge immer auf einen anderen (externen) Server verweisen."*
>
> Das bedeutet: `*.relativwenigbartwuchs.de → cPanel-IP` wird vom Webserver blockiert. Die cPanel UAPI (`SubDomain/addsubdomain`) legt zwar den Apache-VirtualHost korrekt an, aber ohne DNS-Auflösung ist die Subdomain nicht erreichbar.
>
> **Konsequenz:** Die Jobs `deploy:review` und `stop:review` sind in der Pipeline definiert, aber nicht funktionsfähig. Review Apps müssten auf einer externen Plattform (z.B. Netlify, GitLab Pages) betrieben werden, die eigenes DNS-Management mitbringt.

### Ersteinrichtung

SSH-Key ohne Passphrase generieren und den öffentlichen Teil auf dem Webspace eintragen:

```bash
ssh-keygen -t ed25519 -f deploy_key -N ""
# deploy_key.pub in ~/.ssh/authorized_keys auf dem Server eintragen
```

Verzeichnisstruktur und Symlink auf dem Webspace anlegen:

```bash
ssh -p PORT user@host 'bash -s' < scripts/server-setup.sh
```

In cPanel den Document Root der Domain `relativwenigbartwuchs.de` auf `~/sites/relativwenigbartwuchs.de/current` setzen.

### GitLab-Variablen

Unter *Settings → CI/CD → Variables* eintragen:

| Variable          | Beschreibung                           | Typ             |
| ----------------- | -------------------------------------- | --------------- |
| `SSH_PRIVATE_KEY` | Inhalt von `deploy_key`                | File, protected |
| `SSH_KNOWN_HOSTS` | Ausgabe von `ssh-keyscan -p PORT HOST` | Variable        |
| `DEPLOY_HOST`     | Hostname des Webspaces                 | Variable        |
| `DEPLOY_USER`     | SSH-Benutzername                       | Variable        |
| `SSH_PORT`        | SSH-Port (Standard: `22`)              | Variable        |
| `CPANEL_USER`     | cPanel-Benutzername                    | Variable        |
| `CPANEL_TOKEN`    | cPanel API Token                       | Variable, masked|

### Rollback

Im GitLab-Interface unter *CI/CD → Pipelines* den `rollback`-Job manuell auslösen. Der alte Slot wird nur aktiviert, wenn er Inhalt hat.

---

## Resources

- [11ty Docs](https://www.11ty.dev/docs/)
- [Bulma Docs](https://bulma.io/documentation/)
- [11ty Rocks](https://11ty.rocks/)
- [Bundles of 11ty know-how](https://11tybundle.dev/)
- [Pagefind](https://pagefind.app/)

### Tools used during setup

- WordPress Export: [wordpress-export-to-markdown](https://github.com/lonekorean/wordpress-export-to-markdown)
- Favicons: [favicon.io](https://favicon.io/favicon-generator/)
- Fonts: [transfonter.org](https://transfonter.org/) · [google-webfonts-helper](https://gwfh.mranftl.com/fonts/montserrat?subsets=latin)
