---
title: Krieg des Pazifisten
date created: 2026-09-21T12:00:00.000Z
categories:
  - formate/bericht
tags:
  - llms
  - Martin-Fowler
  - Jessica-Kerr
  - Andrea-Laforgia 
  - spec-driven-development
  - agentic-coding
  - anforderungen
---

# Mein Problem mit KI

Martin Fowler hat geschrieben, [I don't like LLMs](https://martinfowler.com/articles/2026-dont-like-llms.html).

> "They confidently bullshit me - often giving me useful, helpful answers. But also just making stuff up with the same assurance."

Und da kann ich ihn irgendwie verstehen. Ich nehme LLMs nicht persönlich, um sie zu mögen oder eben nicht. Für mich sind sie ein Werkzeug. Von der Art wie sie reden bin ich eher beeindruckt. Mein Problem ist eher, dass ich nicht das bekomme, was ich eigentlich wollte. Ich bin nicht gut genug darin, präzise zu sagen was ich will, für ein Modell das sich haargenau an den Wortlaut hält und genau das tut, was da steht. Ein bischen so wie früher, als mein Mitarbeiter zwar tolle Sachen gemacht hat, ich ihn aber dennoch nicht lenken konnte und er einfach immer wieder Generatoren gebaut hat, anstatt einfach das Problem zu lösen.

Fowler zitiert Jessica Kerr bezogen auf LLMs:

> "not only are they useful, it is irresponsible not to use them…. They're more thorough, as well as faster."

Mich beschäftigt aber die Frage: warum ich es nicht schaffe, präzise genug zu formulieren, was ich will. Selbst wenn ich mit dem LLM genau darüber spreche, mit dem Ziel präziser zu werden, lande ich in einer Schleife: intent -> review -> intent ändern -> review -> ... Genau in dem Moment, in dem ich denke, jetzt habe ich wirklich eine gute Grundlage, kommt das LLM mit einer Implementierung um die Ecke, die ich nicht erwartet hatte oder einem Drift der mich stört. Zu viele Tests die schon bei Spec 2 Minuten dauern oder den Container build testen zum Beispiel.

Das passt zu einer Notiz, die ich mir vor wenigen Tagen gemacht habe, aus einem LinkedIn-Post von Andrea Laforgia. Ihr Argument: Agile adressiert Ungewissheit in Software-Projekten. Gutes Anforderungsmanagement reduziert nur das Risiko, etwas anderes zu bauen als gefragt wurde. Ob das Gefragte selbst richtig war, zeigt sich erst im Kontakt mit der Realität. Zur KI-beschleunigten Entwicklung schreibt sie:

> "Faster execution raises the stakes. When building is slow, a wrong assumption costs you a week."

Specs, Contracts, Constitutions, das ganze SDD-Instrumentarium mit dem ich seit Monaten experimentiere, lösen das Präzisionsproblem. Sie zwingen mich aufzuschreiben, was ich eigentlich will, und reduzieren Intent Drift auf der Implementierungsseite. Das Validierungsproblem lösen sie nicht: ob das, was ich präzise aufgeschrieben habe, überhaupt das Richtige war. Dabei lerne ich gerade viele neue Methoden und Ideen, wie man sowas strukturiert und frage mich, ob ich die letzten Jahre unter einem Stein gelebt habe oder ob LLMs auch einfach gut darin sind, solche Strukturen zu halluzinieren? Mensch was wären das für Zeiten gewesen, wenn ich solche Dokumente vor 10 Jahren schon hätte schreiben können :D
