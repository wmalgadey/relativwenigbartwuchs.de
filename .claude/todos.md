# TODOs — rwb Blog

## CSS / Preview Image

- [ ] **Preview SVG anpassen**: Das generierte `preview.svg` wird durch `object-fit: cover` gecroppt — dadurch wird der "rwb"-Schriftzug am Rand abgeschnitten. SVG-Inhalt (Text/Logo) so zentrieren, dass er beim quadratischen Crop erhalten bleibt.

- [ ] **Bild auf Post-Seite im Original anzeigen**: Auf der einzelnen Post-Seite (`post.njk`) soll das Preview-Bild nicht quadratisch gecroppt werden, sondern im originalen Seitenverhältnis. Entweder eigene CSS-Klasse für den Post-Kontext oder `object-fit: cover` nur für die Listenansicht (`pagelist.njk`) anwenden.

## Feature: Smartes Preview-Verhalten

- [ ] **Bild aus Post-Inhalt als Preview nutzen, aber nicht doppelt anzeigen**

  Gewünschtes Verhalten:

  | Situation | In der Liste | Auf der Post-Seite |
  |---|---|---|
  | Post hat `preview:` im Frontmatter | Preview-Bild anzeigen | Preview-Bild anzeigen (Original-Ratio, kein Crop) |
  | Post hat ein Bild im Fließtext | Erstes Bild aus dem Text als Preview | Kein Preview oben — Bild ist bereits im Text |
  | Post hat weder noch | Generiertes `preview.svg` | Kein Bild |

  **Implementierungsidee:**
  - 11ty-Filter der den Post-Content nach dem ersten img-Tag durchsucht und dessen src zurückgibt
  - In `post.njk`: Preview nur rendern wenn `preview` im Frontmatter gesetzt (kein Fallback auf Content-Bild)
  - In `pagelist.njk`: Preview-Shortcode mit Content-Bild als Fallback aufrufen
  - Alternativ: neues Frontmatter-Feld `preview_from_content: true` als explizites Flag
