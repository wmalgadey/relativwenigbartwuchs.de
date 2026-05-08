# Plan: Hierarchische Kategorien (semantic categories)

Das Muster von anmutunddemut.de ist vollständig klar: 2-stufige Pfade im Frontmatter (`rezensionen/film`), Parent-Seiten aggregieren alle Child-Posts und listen Unterkategorien, Child-Seiten zeigen spezifische Posts. Tags bleiben flach.

---

**TL;DR:** Kategorien von flach (`Artikel`) auf `parent/child`-Pfade (`formate/artikel`) umstellen. Drei Ebenen: Collection-Logik, Templates, Post-Migration.

---

## Phase 1 — Taxonomie-Mapping ✅

Finale Taxonomie (umgesetzt):

| Alt | Neu |
|---|---|
| `Artikel` | `formate/artikel` |
| `Bericht` | `formate/bericht` |
| `Kommentar` | `formate/kommentar` |
| `Zitat` | `formate/zitat` |
| `Lesezeichen` | `formate/lesezeichen` |
| `Neuigkeit` | `formate/neuigkeit` |
| `Porträt` | `formate/portrait` |
| `Film` + `Kritik` | `rezensionen/film` |
| _(neu)_ | `formate/fiktion` |
| _(neu)_ | `rezensionen/bücher` |
| _(neu)_ | `serie/<slug>` |

Migrationsskript: `scripts/migrate-categories.mjs`

---

## Phase 2 — `categories.js` Collection ❌

`lib/collections/categories.js` erweitern:
- Kategorie-String auf `/` splitten → `parent`, `child`
- Collection-Keys: `formate/artikel` (leaf) **und** `formate` (parent, aggregiert alle Kinder)
- `all`-Einträge bekommen `{ title, parent, child, slug, path, used, isParent }` statt nur `{ title, path, used }`
- Parent-Einträge (`isParent: true`) für Template-Differenzierung markieren

---

## Phase 3 — Templates

**3a. Leaf-Category-Seiten** (`blog/kategorie/all.md`) ❌
- Pagination über Objekte statt Strings: `{ slug: 'formate/artikel', title: 'Artikel', ... }`
- Permalink: `/kategorie/{{ kategorie.slug }}/` → ergibt `/kategorie/formate/artikel/`
- Aktuell: Permalink nutzt `| slugify` was Slashes entfernt → URLs brechen

**3b. Parent-Category-Seiten** — neue Datei `blog/kategorie/parent.md` ❌
- Paginiert über Parent-Einträge aus `categories.all` (`isParent: true`)
- Permalink: `/kategorie/{{ parent.slug }}/` → `/kategorie/formate/`
- Zeigt: Subcategory-Liste + aggregierte Posts aller Kinder

**3c. Post-Template** (`blog/_includes/post.njk`) ✅ (teilweise)
- `categorylabel`-Filter zeigt letztes Segment kapitalisiert: `formate/artikel` → `Artikel`
- Link-Href nutzt noch `| slugify` → wird Slashes entfernen, sobald Phase 3a umgesetzt ist anpassen

---

## Phase 4 — Post-Frontmatter-Migration ✅

Alle 52 Posts migriert via `scripts/migrate-categories.mjs`.

Aktuelle Kategorien im Einsatz:
`formate/artikel`, `formate/bericht`, `formate/fiktion`, `formate/kommentar`, `formate/lesezeichen`, `formate/neuigkeit`, `formate/portrait`, `formate/zitat`, `rezensionen/bücher`, `rezensionen/film`, `serie/buecherstapel`

---

## Phase 5 — Verifikation ❌

1. `npm start` → Build fehlerfrei
2. `/kategorie/formate/` → Parent-Seite mit Subcategory-Liste
3. `/kategorie/formate/artikel/` → Posts dieser Kategorie
4. Post-Seiten → Category-Links zeigen auf korrekte hierarchische URLs

> Kann erst nach Phase 2 + 3a + 3b vollständig geprüft werden.

---

## Phase 6 — Kategorie-Titel aus zentraler Map ⏳ (geplant)

Ziel: `categorylabel`-Filter liefert echte Anzeigenamen statt des letzten Pfad-Segments, damit z.B. `formate/portrait` als `Porträt` angezeigt werden kann.

### Aktueller Stand

`categorylabel`-Filter in `.eleventy.js` ist implementiert (Arrow-Function, String-Split). Liefert `Portrait` statt `Porträt`.

### Umsetzungsplan

**Schritt 1 — `lib/data/categoryTitles.js` anlegen** (NEU)

```js
export default {
  'formate/artikel':    'Artikel',
  'formate/bericht':    'Bericht',
  'formate/fiktion':    'Fiktion',
  'formate/kommentar':  'Kommentar',
  'formate/lesezeichen':'Lesezeichen',
  'formate/neuigkeit':  'Neuigkeit',
  'formate/portrait':   'Porträt',
  'formate/zitat':      'Zitat',
  'rezensionen/bücher': 'Bücher',
  'rezensionen/film':   'Film',
};
```

**Schritt 2 — `categories.js` Collection erweitern**

```js
import categoryTitles from '../data/categoryTitles.js';

// statt:
categories.all.push({ title: cat, path: '/kategorie/' });
// neu:
const label = categoryTitles[cat] ?? cat.split('/').pop();
const display = label.charAt(0).toUpperCase() + label.slice(1);
categories.all.push({ title: display, slug: cat, path: '/kategorie/' });
```

**Schritt 3 — `categorylabel`-Filter auf Collection-Lookup umstellen**

```js
// Arrow → normale Function, damit this.ctx verfügbar ist
eleventyConfig.addFilter('categorylabel', function (category) {
  const entry = (this.ctx?.collections?.categories?.all ?? [])
    .find(c => c.slug === category);
  return entry?.title ?? category.split('/').pop();
});
```

**Schritt 4 — `blog/kategorie/all.md` Permalink und Titel anpassen**

```yaml
permalink: /kategorie/{{ category }}/   # kein | slugify — slug ist bereits der Pfad
eleventyComputed:
  title: "{{ collections.categories[category] | first ... }}"  # oder via categoryTitles global data
```

### Betroffene Dateien

- `lib/data/categoryTitles.js` — NEU
- `lib/collections/categories.js` — `title` (Anzeigename) + `slug` (Pfad) trennen
- `.eleventy.js` — `categorylabel`-Filter auf Collection-Lookup umstellen
- `blog/kategorie/all.md` — Permalink ohne `| slugify`

---

## Offene Fragen (beantwortet)

1. **Tiefe:** 2 Ebenen (`parent/child`) — umgesetzt.
2. **Film + Kritik:** Zusammengeführt zu `rezensionen/film` — umgesetzt.
3. **Weitere Parent-Gruppen:** `serie/` als dritte Parent-Gruppe hinzugekommen.
