---
title: Fußballrunde-Verwaltungseite
date created: 2010-10-15
categories:
  - Bericht
tags:
  - donnerstag-fußballrunde
  - entwicklung
  - lektion
  - maschinen
  - php
  - webdesign
  - type/post
type: post
preview: images/cologne-soccer_-_uebersicht.png
date modified: 2024-02-04T18:02
---

Die Verwaltungsseite zu unserer [Donnerstags-Fussballrunde](http://www.wotze.de/kick) ist fertig geworden. Mich treiben ja immer die unmöglichsten Gründe zu solchen Taten an. In diesem Fall wollte ich unbedingt eine INI-Datei als Datenquelle nutzen. Mir sind natürlich die Probleme einer dateibasierten Datenhaltung klar, aber irgendwie fand ich die Idee smart, meine einfach strukturierten Daten auch einfach zu halten. Und es funktioniert. Die Daten werden analysiert, in Arrays gespeichert und über globale PHP-Sessions persistiert. Bei relevanten Änderungen (in 3 von 9 Funktionen) wird beim nächsten Reload der Seite eine Analyse der INI-Datei durchgeführt. In 2 Tagen entstanden 1426 Programmzeilen in 18 Programmdateien. Das ganze Ding hat 7 von 9 Funktionen und 10 Seiten.

Wie immer im Zusammenhang mit PHP, HTML und CSS ist ein großer Matsch an HTML-PHP-CSS-Dreck entstanden. Mir ist es immer ein Rätsel, wie man große Projekte in PHP realisieren kann, ohne dabei Verrückt zu werden. Bei mir existieren dann meist 1-2 Switch-Anweisungen um die Inhalte der diversen Seiten zu generieren und um diverse Aktionen zu programmieren. Die Seiten liegen in unterschiedlichen "Include"-Dateien (.inc.php) und die Funktionen werden in einer zentralen Datei gespeichert (in diesem Fall direkt die index.php). Die Funktionen befinden sich in diesem Fall auch direkt in der Switch-Anweisung. Nicht sauber, aber schnell und ich habe eine INI-Datei als Datenspeicher.

Objektorientierung habe ich bewusst vermieden. Ich habe meine letzten großen Projekte in PHP4 erzeugt, da gab es noch keine objektorientierten Strukturen. Mir ist es immer sehr wichtig, dass ich die Inhalte in einem Wysiwyg-Editor sehen kann. Daher wird der Code oft durch <?php und ?> unterbrochen. Ich kann aber alle HTML-Inhalte so gestalten, wie ich das von ganz, ganz, ganz früher gewohnt bin.
