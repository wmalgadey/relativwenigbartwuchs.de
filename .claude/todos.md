# TODOs — rwb Blog

## CSS / Preview Image

- [ ] **Preview SVG anpassen**: Das generierte `preview.svg` wird durch `object-fit: cover` gecroppt — dadurch wird der "rwb"-Schriftzug am Rand abgeschnitten. SVG-Inhalt (Text/Logo) so zentrieren, dass er beim quadratischen Crop erhalten bleibt.

- [ ] **Bild auf Post-Seite im Original anzeigen**: Auf der einzelnen Post-Seite (`post.njk`) soll das Preview-Bild nicht quadratisch gecroppt werden, sondern im originalen Seitenverhältnis. Entweder eigene CSS-Klasse für den Post-Kontext oder `object-fit: cover` nur für die Listenansicht (`pagelist.njk`) anwenden.
