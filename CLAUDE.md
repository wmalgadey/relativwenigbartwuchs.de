# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
# Development server (live reload, drafts visible, source maps)
npm start                          # ELEVENTY_ENV=development npx eleventy --serve

# Production build (clean + build + pagefind index)
npm run production

# Debug build (verbose Eleventy output)
npm run debug

# Remove build output
npm run clean
```

## Architecture

The Eleventy config lives in `.eleventy.js` (ESM). Input is `blog/`, output is `_site/`.

### Content

- **Posts**: `blog/posts/<slug>/index.md` — each post in its own folder so images live alongside it
- **Pages**: `blog/*.md` and `blog/*.njk` (impressum, datenschutz, einleitung, suche, feed, 404)

Post frontmatter fields:
```yaml
title: ...
date created: 2023-05-17   # controls sort order and draft gating
date modified: ...
categories: [Artikel]       # → /kategorie/<slug>/
tags: [entwicklung, type/post]  # → /schlagwort/<tag>/  (type/* and journal/* are filtered out)
draft: true                 # hides post in production builds, not needed in branches!
```

### Collections

- `post` — all published posts sorted by `date created`
- `schlagworte` (`lib/collections/schlagworte.js`) — tag cloud with weighted usage counts; excludes `posts`, `all`, `type/*`, `journal/*` tags
- `kategorien` (`lib/collections/kategorien.js`) — reads post files directly via `globSync` (bypasses Eleventy's collection build-order dependency issue in v3)

### Templates

Nunjucks templates in `blog/_includes/`:
- `layouts/` — page skeletons (`main.njk`, `info.njk`, `empty.njk`)
- `partials/` — header, footer, htmlhead/htmlfoot, pagelist, svgfonts
- `macros/navlist.njk` — navigation item rendering

### CSS

- `blog/assets/css/main.scss` — entry point, compiled by `lib/extensions/scss.js` (sass) then post-processed by `lib/transforms/postcss.js`
- Uses **Bulma** CSS framework loaded from `node_modules`
- `blog/assets/css/fonts.scss` — font-face declarations; fonts in `blog/assets/fonts/`

### Image pipeline

- `{% preview %}` async shortcode (`lib/shortcodes/preview-image/index.js`) — resizes images to multiple widths/formats (JPEG + WebP), caches per `page.url:imageSrc` to avoid duplicate work
- After each build, `lib/preview-image-hook.js` runs as `eleventy.after` hook, finds all `_site/**/preview.svg` files and converts them to JPEG+WebP
- Images are stored next to the post in `blog/posts/<slug>/images/`

### Search

Pagefind is run after production builds (`npx pagefind --site _site`). The search UI is at `/suche/` (`blog/suche.njk`).

### JS bundling

`blog/scripts.11ty.js` handles client-side JS via esbuild.

---

## Blog-Post-Erstellung (KI-generierte Artikel)

### Workflow

Generierte Artikel werden **immer als Branch** gepusht, nicht direkt in `main`. Wolfgang bearbeitet und merged sie selbst per Pull Request.

```bash
# Branch anlegen und pushen
GIT_SSH_COMMAND="ssh -i /home/node/.ssh/github_marvin -o StrictHostKeyChecking=no" \
  git subtree push --prefix=rwb relativwenigbartwuchs.de feature/<slug>
```

### Disclaimer (Pflicht bei KI-generierten Artikeln)

Am Ende jedes KI-generierten Artikels **vor** den Tags einen Absatz einfügen:

```markdown
---

_Dieser Beitrag wurde als Entwurf mit KI generiert und von mir überarbeitet._
```

Falls der Artikel **nicht** überarbeitet wurde und direkt aus der KI-Generierung stammt:

```markdown
---

_Dieser Beitrag wurde mit KI generiert._
```

> Hinweis: Ein `de-ai-ify`-Skill soll zukünftig KI-Floskeln und -Phrasen aus Entwürfen entfernen, bevor sie bearbeitet werden.

### Schreibstil

Ziel ist es, Wolfgangs persönlichen Schreibstil zu imitieren — nicht "guten Blogpost-Stil" zu erzeugen.

**Ton und Haltung:**
- Erste Person, direkt und persönlich — "Ich habe...", "Mir war...", "Ich finde..."
- Kein akademischer oder journalistischer Ton; eher wie ein Gespräch, das aufgeschrieben wurde
- Selbstreflexiv und nachdenklich — Dinge werden hinterfragt, nicht nur beschrieben
- Gelegentlich selbstironisch oder humorvoll, nie aufgesetzt ("Jucheeeee", "ok, jetzt nicht der Wahnsinnswurf")
- Kann unfertig wirken — das ist keine Schwäche, sondern Stil

**Struktur:**
- Fließtext bevorzugt; Aufzählungen nur wenn der Inhalt es wirklich verlangt
- Zwischenüberschriften sparsam, nicht als Gliederungsgerüst
- Mittellange Absätze — kein Stakkato, kein Endlostext
- Kein "Fazit"-Abschnitt der das Vorherige nochmal zusammenfasst

**Sprache:**
- Deutsch, leicht umgangssprachlich — nicht Hochdeutsch, nicht Slang
- Englische Begriffe werden organisch eingebaut wenn sie natürlicher klingen als die deutsche Übersetzung ("outdated", "Tooling", "clean")
- Direkte Rede und konkrete Erfahrungen statt abstrakter Aussagen
- Keine KI-typischen Phrasen: kein "In der heutigen Zeit", kein "Es ist wichtig zu beachten", kein "Zusammenfassend lässt sich sagen"

**Was zu vermeiden ist:**
- Einleitungssätze die erklären was der Artikel tun wird
- Überschriften die den Inhalt vorwegnehmen ("Warum X wichtig ist")
- Adverbien zur Dramatisierung ("was folgte war beeindruckend...")
- Listen wo Prosa natürlicher wäre
- Superlative und Marketing-Sprache
