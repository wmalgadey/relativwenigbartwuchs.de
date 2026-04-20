# Plan: extractExcerpt — Neuimplementierung

## Problem

Die aktuelle `extractExcerpt`-Funktion in `lib/collections/utils.js` liefert fehlerhafte
Excerpts für Posts, deren Inhalt ausschließlich oder hauptsächlich aus Blockquotes besteht.

### Konkrete Fehler

| Post-URL                                                      | Ursache                                                                                                                                                                                                           | Aktueller Output                                       |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `/das-ende-dieses-internets/`                                 | Post beginnt mit Blockquote, der Code überspringt ihn, aber stale Build zeigt `> ...`                                                                                                                             | `> Herzlichen Glückwunsch!...`                         |
| `/wir-brauchen-immer-hilfe-entweder-als-kind-oder-als-greis/` | Gesamter Post ist ein Blockquote — nur ein Paragraph, der übersprungen wird. Kein `\n\n` zwischen `>`-Zeilen → `extractExcerpt` gibt `''` zurück, und der stale Build zeigt rohen Blockquote inkl. `>`, `#`, `\n` | `> Wir brauchen immer Hilfe... > > # Raul Krauthausen` |

### Ursachenanalyse

Der `>` Skip-Check in der aktuellen Implementierung:
```js
if (trimmed.startsWith('>')) continue;
```
...überspringt Blockquote-Paragraphen komplett. Wenn der **gesamte Inhalt** ein Blockquote ist,
gibt die Funktion `''` zurück — kein Fallback.

Zusätzlich: Multi-line Blockquotes ohne `\n\n` zwischen den `>`-Zeilen werden als **ein Paragraph**
behandelt. Die Zeilen `> Text1\n>\n> Attribution` landen als Block zusammen, der dann als eine
Einheit mit `>` beginnt → wird übersprungen.


## Anforderungen (bestätigt)

1. **Erster Paragraph gewinnt immer** — egal ob Blockquote oder normaler Text. Kein
   Überspringen von Blockquotes mehr.

2. **Blockquotes**: Text der `>`-Zeilen extrahieren (Präfixe entfernen), in
   Anführungszeichen einschließen, max. **20 Wörter**. Wenn länger → `...` anhängen
   (aber innerhalb der Anführungszeichen: `"Text Text Text..."`).
   Attribution-Zeilen ignorieren (Zeilen die nur aus Links bestehen).

   Beispiel:
   ```
   > ich bin ein Zitat.
   > weil ich viele Zeite und Wörter habe
   > und auf vielen Zeilen stehe
   > machen wir hier einmal schluss, und
   > besinnen uns auf das hier und
   > jetzt
   >
   > geschrieben von mir
   ```
   → `"ich bin ein Zitat. weil ich viele Zeite und Wörter habe und auf vielen Zeilen stehe machen wir hier einmal..."`

3. **Doppelpunkt-Regel** (gilt für normalen Text UND Blockquotes):
   Wenn die erste *Zeile* des Paragraphen auf `:` endet → nur diese Zeile ausgeben,
   ohne den Doppelpunkt. Keine weitere Kürzung nötig.

4. **Normaler Text**: Vollständigen ersten Paragraph ausgeben. Kein generelles Zeichenlimit.
   Der Autor passt den Post-Inhalt selbst an falls nötig.

5. **Übersprungen werden**: Überschriften (`#`), Code-Blöcke (` ``` `), Bilder (`!`),
   leere Paragraphen.

6. **Backslash-Zeilen** (`\`) weiterhin überspringen.

7. **Frontmatter `excerpt`**: Wenn gesetzt → immer vorrangig (bereits implementiert).


## Geplante Implementierung

### `lib/collections/utils.js`

```js
export function extractExcerpt(content) {
  // 1. Inhalt in Paragraphen aufteilen (an \n\n+)
  // 2. Ersten geeigneten Paragraphen finden:
  //    Skip: leer, startet mit #, ```, !, \
  //    Nimm: ersten nicht-übersprungenen Paragraph (auch Blockquote)
  // 3. Blockquote-Verarbeitung (startet mit >):
  //    a. Zeilen aufteilen
  //    b. Attribution-Zeilen entfernen (nur-Link-Zeilen wie "> [#](url) [Name](url)")
  //    c. > Präfixe entfernen
  //    d. Doppelpunkt-Regel: erste Zeile endet mit : → nur diese Zeile (ohne :)
  //    e. Sonst: Wörter auf max. 20 begrenzen, bei Überschreitung "..." anhängen
  //    f. In Anführungszeichen einschließen: "Text..."
  // 4. Normaler Text:
  //    a. Doppelpunkt-Regel: erste Zeile endet mit : → nur diese Zeile (ohne :)
  //    b. Sonst: vollständigen Paragraph verwenden
  //    c. Markdown bereinigen:
  //       - Bilder entfernen
  //       - Links → Link-Text
  //       - Bold/Kursiv/Code/Strike → Plain Text
  //       - \n → Leerzeichen
}
```

### Attribution-Zeilen-Erkennung

Eine Zeile gilt als Attribution wenn sie — nach Entfernung des `> `-Präfixes — nur aus
Markdown-Links besteht (keine normalen Wörter). Regex-Test:
```
/^\s*(\[.*?\]\(.*?\)\s*)+\s*$/
```

### Betroffene Dateien

| Datei                            | Änderung                            |
| -------------------------------- | ----------------------------------- |
| `lib/collections/utils.js`       | `extractExcerpt` neu implementieren |
| `lib/shortcodes/excerpt.js`      | Wahrscheinlich keine Änderung nötig |
| `lib/collections/post.js`        | Keine Änderung nötig                |
| `lib/collections/kategorien.js`  | Keine Änderung nötig                |
| `lib/collections/schlagworte.js` | Keine Änderung nötig                |

### Test-Posts

Nach Implementierung verifizieren:

| Post                                                          | Erwarteter Excerpt                                                                                                       |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `/wir-brauchen-immer-hilfe-entweder-als-kind-oder-als-greis/` | `"Wir brauchen immer Hilfe. Entweder als Kind, oder als Greis. Und dazwischen gibt es eine Zeit, in der die meisten..."` |
| `/das-ende-dieses-internets/`                                 | `"Herzlichen Glückwunsch! Sie haben das Ende dieses Internets erreicht. Sie suchen nach einem..."`                       |
| `/kinderliebe/`                                               | Normaler Text — soll unverändert bleiben                                                                                 |
| `/get-productive/`                                            | Normaler Text — soll unverändert bleiben                                                                                 |
| Post mit erstem Paragraph `Letztes Jahr war anstrengend:`     | `Letztes Jahr war anstrengend` (ohne `:`)                                                                                |
