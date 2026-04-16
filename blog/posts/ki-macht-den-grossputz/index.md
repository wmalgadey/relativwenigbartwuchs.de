---
title: KI macht den Großputz
date created: 2026-04-16
categories:
  - Artikel
tags:
  - entwicklung
  - ki
  - 11ty
  - type/post
type: post
date modified: 2026-04-16
---

Vor drei Jahren habe ich diese Seite auf [11ty](https://www.11ty.dev/) umgestellt. Damals hat es sich richtig gut angefühlt, raus aus dem CMS-Sumpf, rein in eine saubere, statische Welt. Seitdem ist einiges passiert – auf der Welt, in meinem Leben und natürlich auch in der Welt der JavaScript-Abhängigkeiten.

## Der Berg der Schulden

Eines Morgens habe ich meinen Blog aufgemacht und festgestellt, dass so einiges nicht mehr stimmte. Das Menü auf der 404-Seite fehlte. Die Suche – ich hatte stolz Pagefind integriert – funktionierte nicht. Die Vorschaubilder wurden doppelt erzeugt. Die Schlagworte und Kategorien zeigten falsche Auszüge an. Und irgendwo dazwischen hatte Bulma, mein CSS-Framework, still und heimlich von Version 0.9 auf 1.0 gewechselt – mit Breaking Changes, die dafür gesorgt hatten, dass das Hamburger-Menü im Mobilformat aussah wie ein Burger nach einem langen Tag in der Sonne.

Der technische Schuldenstand war... beträchtlich.

## Wer räumt eigentlich auf?

An diesem Punkt kam [Claude Code](https://claude.ai/code) ins Spiel. Ich hatte den KI-Assistenten schon für kleinere Dinge genutzt, aber diesmal ließ ich ihn wirklich ran. Das Ergebnis war... unerwartet angenehm.

Nicht weil die KI alles auf Anhieb richtig gemacht hätte. Das hat sie nicht. Ein paar Mal musste ich eingreifen, einen anderen Weg einschlagen oder erklären, warum der vermeintlich clevere Fix einen Schritt zu weit gegangen war. Aber was mich wirklich beeindruckt hat: Die KI hat verstanden, was ich meine, auch wenn ich es nicht perfekt formuliert habe. Und sie hat sich gemerkt, was nicht funktioniert hat.

## Was wirklich passiert ist

11ty hatte sich von Version 2 auf Version 3 entwickelt – und damit auf ECMAScript Modules (ESM) umgestellt. Das bedeutete: alle `require()` raus, `import` rein. Klingt simpel, war es aber nicht. Die Collections-Logik für Posts, Schlagworte und Kategorien musste von Grund auf überarbeitet werden, weil 11ty v3 mit der Reihenfolge, in der Collections aufgebaut werden, anders umgeht als sein Vorgänger.

Gleichzeitig hatte Bulma 1.0 den `@import`-Mechanismus gegen das Sass-Modulsystem ausgetauscht und dabei kurzerhand den `mx.burger()`-Mixin entsorgt, der für mein Hamburger-Menü zuständig war. Kleines Bauteil, große Wirkung.

Dann noch Pagefind, das nach dem Build-Prozess läuft und eine eigene Indexierungsphase braucht – was erst sauber funktionierte, nachdem ein `netlify.toml` den Build-Prozess in die richtige Reihenfolge gebracht hatte.

Und die Preview-Bilder: Die wurden für dieselbe URL teilweise mehrfach erzeugt, weil der Cache pro Build-Lauf nicht persistent war. Ein In-Memory-Cache mit `page.url:imageSrc` als Schlüssel hat das bereinigt.

Am Ende war auch die duplizierte `extractExcerpt`-Funktion in drei verschiedenen Collection-Dateien ein kleines Symbol für das, was beim Hinzufügen von Features ohne großen Plan passiert: Jedes Mal wurde die Funktion neu gebaut, jedes Mal leicht anders, jedes Mal ausreichend, aber nie ganz richtig.

## Was ich dabei gelernt habe

Nicht über JavaScript. Nicht über 11ty. Sondern über das Arbeiten mit KI an echtem, lebendigem Code.

Es ist kein Zauberstab. Es ist eher wie ein sehr aufmerksamer Kollege, der nicht müde wird, denselben Fehler zu untersuchen, und der morgens keinen Kaffee braucht. Man muss trotzdem wissen, was man will. Man muss die Richtung vorgeben. Aber man muss nicht jeden Schritt alleine machen.

Und der Blog läuft wieder. Sauber. Ohne doppelte Funktionen, ohne kaputtes Menü, mit funktionierender Suche. Das ist mehr, als ich erwartet hatte, als ich an diesem Morgen das erste `npm run start` abgebrochen habe.
