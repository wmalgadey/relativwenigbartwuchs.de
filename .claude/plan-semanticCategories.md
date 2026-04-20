# Plan: Hierarchische Kategorien (semantic categories)

Das Muster von anmutunddemut.de ist vollständig klar: 2-stufige Pfade im Frontmatter (`rezensionen/film`), Parent-Seiten aggregieren alle Child-Posts und listen Unterkategorien, Child-Seiten zeigen spezifische Posts. Tags bleiben flach.

---

**TL;DR:** Kategorien von flach (`Artikel`) auf `parent/child`-Pfade (`formate/artikel`) umstellen. Drei Ebenen: Collection-Logik, Templates, Post-Migration.

---

## Phase 1 — Taxonomie-Mapping

Bestehende flache Kategorien auf neue Hierarchie mappen (Vorschlag):

| Alt | Neu |
|---|---|
| `Artikel` | `formate/artikel` |
| `Bericht` | `formate/bericht` |
| `Kommentar` | `formate/kommentar` |
| `Zitat` | `formate/zitat` |
| `Lesezeichen` | `formate/lesezeichen` |
| `Neuigkeit` | `formate/neuigkeit` |
| `Porträt` | `formate/portrait` |
| `Film` + `Kritik` | `rezensionen/film` (oder trennen?) |

Das ist ein Vorschlag — ob du weitere Parent-Gruppen willst (z.B. ein thematischer Bereich neben `formate/`), bestimmst du.

---

## Phase 2 — `kategorien.js` Collection

`lib/collections/kategorien.js` umschreiben:
- Kategorie-String auf `/` splitten → `parent`, `child`
- Collection-Keys: `formate/artikel` (leaf) **und** `formate` (parent, aggregiert alle Kinder)
- `all`-Einträge bekommen `{ title, parent, child, slug, path, used, isParent }` statt nur `{ title, path, used }`
- Parent-Einträge (`isParent: true`) für Template-Differenzierung markieren

---

## Phase 3 — Templates

**3a. Leaf-Category-Seiten** (`blog/kategorie/all.md`):
- Pagination über Objekte statt Strings: `{ slug: 'formate/artikel', title: 'Artikel', ... }`
- Permalink: `/kategorie/{{ kategorie.slug }}/` → ergibt `/kategorie/formate/artikel/`

**3b. Parent-Category-Seiten** — neue Datei `blog/kategorie/parent.md`:
- Paginiert über Parent-Einträge aus `kategorien.all` (`isParent: true`)
- Permalink: `/kategorie/{{ parent.slug }}/` → `/kategorie/formate/`
- Zeigt: Subcategory-Liste + aggregierte Posts aller Kinder

**3c. Post-Template** (`blog/_includes/post.njk`):
- Category-Links von `/kategorie/{{ category | slugify }}` auf `/kategorie/{{ category }}` → da `category` jetzt schon der Pfad `formate/artikel` ist, direkt nutzbar

---

## Phase 4 — Post-Frontmatter-Migration

Alle ~22 Posts in `blog/posts/*/index.md` updaten:
- `categories: [Artikel]` → `categories: [formate/artikel]`
- Kann skriptgestützt (Node.js oder `sed`) oder manuell erfolgen

---

## Phase 5 — Verifikation

1. `npm start` → Build fehlerfrei
2. `/kategorie/formate/` → Parent-Seite mit Subcategory-Liste
3. `/kategorie/formate/artikel/` → Posts dieser Kategorie
4. Post-Seiten → Category-Links zeigen auf korrekte hierarchische URLs

---

## Betroffene Dateien

- `lib/collections/kategorien.js` — Collection-Logik
- `blog/kategorie/all.md` — Leaf-Category-Seiten (Permalink + Pagination-Objekt)
- `blog/kategorie/parent.md` — NEU: Parent-Category-Seiten
- `blog/_includes/post.njk` — Category-Link-Rendering im Footer
- `blog/posts/*/index.md` — Frontmatter-Migration (~22 Posts)

---

## Offene Fragen

1. **Tiefe:** Sollen nur 2 Ebenen (`parent/child`) unterstützt werden, oder auch 3 Ebenen wie bei anmutunddemut.de (`anmut/phantastik/science-fiction`)? → Empfehlung: erstmal nur 2, einfacher zu implementieren
2. **Film + Kritik:** `Film` und `Kritik` werden oft zusammen verwendet (Film-Rezension). Sollen diese zu `rezensionen/film` zusammengeführt werden, oder separat bleiben?
3. **Weitere Parent-Gruppen:** Neben `formate/` willst du vielleicht einen thematischen Bereich (z.B. `digital/`, `gesellschaft/`) als zweite Dimension für Quer-Kategorisierung?
