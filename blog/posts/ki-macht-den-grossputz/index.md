---
title: KI macht den Großputz
date created: 2026-04-16
categories:
  - Artikel
tags:
  - entwicklung
  - agentic engineering
  - context engineering
  - 11ty
  - type/post
type: post
date modified: 2026-04-16
---

Vor drei Jahren habe ich diese Seite auf [11ty](https://www.11ty.dev/) umgestellt. Mittlerweile hat sich einiges geändert und meine Seite bzw. das Tooling war etwas outdated. Und da ich gerne wieder mehr veröffentlichen wollte, musste ich zuerst die Seite aktualisieren.

Ich nutze [Claude Code](https://claude.ai/code) bereits intensiv um mich in die Welt des Context- und Agentic Engineering einzuarbeiten, bzw. um kleinere Software-Projekte zu bauen und zum Wissensmanagement mit Obsidian.

Was habe ich also alles mit Claude umgesetzt:

- Update auf die aktuelle latest von 11ty 3.1.5 inkl. aller weiteren Dependencies
  Damit hätte ich alleine vermutlich Tage verbracht, schon alleine herauszufinden was es für Änderungen gibt! Z.B. Bulma; das CSS-Framework dass ich nutze, musste an einigen Stellen angepasst werden. Claude hat mit wenigen Hinweise erfolgreich alle Änderungen erkannt und durchgeführt.
- Die Collections-Logik für Posts, Schlagworte und Kategorien wurde überarbeitet, weil 11ty v3 mit der Reihenfolge, in der Collections aufgebaut werden, anders umgeht als sein Vorgänger.
- Bulma 1.0 (das genannte CSS-Framework) hat den `@import`-Mechanismus gegen das Sass-Modulsystem ausgetauscht und dabei kurzerhand den `mx.burger()`-Mixin entsorgt, der für mein Hamburger-Menü zuständig war.
- Dann habe ich noch Pagefind integrieren. Claude hat den Build-Prozess entsprechend angepasst und mir eine Seite in die Navigation gepackt (ok, jetzt nicht der Wahnsinns wurf, aber es war nur eine Anweisung an das LLM). Die ich dann einfach anpassen konnte, denn Claude hat eine veraltete Component von Pagefind verwendet.
- Die Preview-Bilder wurden für dieselbe URL teilweise mehrfach erzeugt, weil der Cache pro Build-Lauf nicht persistent war. Ein In-Memory-Cache mit `page.url:imageSrc` als Schlüssel hat das bereinigt. Außerdem gefiehl mir das SVG nicht so gut, und SVG Bearbeiten gehört definitiv nicht zu meinen Lieblingsaufgaben.
- Am Ende hat Claude noch etwas Refactoring betrieben und z.B. die duplizierte `extractExcerpt`-Funktion in eine eigene `utils.js` ausgelagert.

Und damit läuft der Blog wieder und ich bin in der Lage neue Artikel hinzu zufügen. Yeah!

PS: Den Artikel habe ich mit KI generieren lassen. Erkennt man ggf. am Titel :D Inhaltlich hat das aber leider noch gar nicht gepasst, war aber eine gute Vorlage um den Artikel zu meinem zu machen!
