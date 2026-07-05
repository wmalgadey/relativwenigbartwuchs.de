---
title: 'SDD, ADRs und Constitution'
date created: 2026-07-05T00:00:00
categories:
  - formate/artikel
tags:
  - spec-kit
  - software-architecture
  - spec-driven-development
  - ai-engineering
  - vibe-coding
  - entwicklung
  - mein-leben-als-entwickler
preview: images/marc-olivier-jodoin--HIiNFXcbtQ-unsplash.jpg
credits:
  - 'Aufmacherbild von [Marc-Olivier Jodoin](https://unsplash.com/de/@marcojodoin) auf [Unsplash](https://unsplash.com/de/fotos/tiefwinkelfotografie-von-hochhausern--HIiNFXcbtQ)'
---

Seit einigen Tagen versuche ich mit SDD (spec driven development) eine Idee für einen KI-Harness umzusetzen.

Dabei wollte ich mich nicht einfach nur in guter neuer VibeCoding-Manier zum Ergebnis prompten, sondern mit Googles Spec-Kit über Specs, Contracts und Architekturentscheidungen (ADRs) arbeiten.

Mein Anspruch war, dass ich weder meine gesamte Idee vorab definiere, noch das ich die Architektur, die ich mir im Kopf vorstelle vollständig vorgebe. Die Features sollten iterativ entstehen und die Architektur sollte im Prozess selbst entsteht. Gleichzeitig sollten Prinzipien wie DDD, TDD, Observability und Clean Code von Anfang an gelten, bzw. die Entwicklung für mich handhabbar machen (ich wollte den Code gerne selbst verstehen).

Zuerst habe ich daher mit der KI die Umsetzung meiner Idee mit Spec-Kit gespiegelt und im Chat geschärft. Danach habe ich die Constitution (also Regeln, Leitplanken und Contracts) darauf basierend generiert und versucht dabei a. noch nicht die Domäne mit einfließen zu lassen, und b. nicht zu technisch bzw. zu spezifisch zu werden. Um die Architektur zusätzlich abzusichern, habe ich die Constitution noch so erweitert, dass für systemrelevante Komponenten zentrale ADRs verpflichtend sind.

Der Anfang fühlte sich das sehr gut an. So viele explizite Regeln und Verträge habe ich am Anfang eines Projekts bisher noch nie vorgegeben. Und Spec 001 (ein wirklich minimaler MVP) wurde super umgesetzt. Ein paar Dinge die ich anders gemacht hätte, aber zum einen war es ja nur ein MVP, zum anderen habe ich mir gedacht "das hätte ich bei meinen Mitarbeitern jetzt auch akzeptiert".

Spec 002 sollte darauf aufbauen und die wichtigen Architekturentscheidungen tragen. Plan und Tasks waren auch noch nachvollziehbar, aber der umgesetzte Code entsprach so gar nicht meinen Ideen und Wünschen. Ich habe dann erstmal versucht zu ermitteln, warum das LLM hier so falsch abgebogen ist. Am Ende war es meine eigene Nachlässigkeit die zu dem Drift geführt hat. Ich habe die Constitution (also Verfassung) nicht wörtlich genug genommen. Dort werden Verträge definiert, und wenn da nicht ein "must" steht ist es auch kein verbindlicher Vertag, sondern ein Option.

Konkret hat sich das LLM für eine ETL-Pipeline entschieden, weil ich in den Verträgen mehr Focus auf Determinismus gelegt habe, obwohl ich eigentlich ein agentisches, also nicht deterministisches (zufälliges) System bauen wollte.

Spec 002 habe ich insgesamt dreimal verworfen (inklusive eines fast vollständigen Neustarts samt neuer Constitution). Meine Formulierungen und meine Contracts haben die KI immer wieder in die falsche Richtung gelenkt. Nach 4 Fable-5-Sessions (also 4x das Session-Limit in wenigen Minuten verbraten) und ungefähr 80% meines Copilot Pro+ Budgets war Spec 002 dann irgendwann umgesetzt 🥵.

Und selbst dabei musste ich die Constitution mehrfach nachschärfen. OTel-Metriken hatte ich von Anfang an drin, Logging aber nicht, also nicht als "Vertraglich binden". Spannend war der Workflow denn ich dabei "entdeckt" habe (ich weiß ehrlich gesagt nicht, ob ich das in der Doku hätte nachlesen können). Die Constitution kann man durchaus im Prozess anpassen (`/speckit-constitution`) muss dann aber mit `/speckit-converge` sicherstellen, dass der Plan, die Tasks und der Code noch dazu passt.

Man sollte vermeiden hier ohne Skills mit dem Code bzw. den Specs zu interagieren. Ich glaube, wir (Menschen) sind in einem solchen Prozess nicht dafür gemacht, Änderungen vollstädnig zu berücksichtigen. Ich habe auf jedenfall mehrmals bereut, dass ich manuell auch nur kleinere Änderungen gemacht habe, weil ich entweder nicht gesehen habe, dass die von mir gemachte Änderung in der späteren Implementierung eigentlich noch kommt, oder eben ganz anders gelöst werden sollte (laut Plan).

Ich habe dann 5 oder 6 Mal mit /speckit-converge geprüft, ob die Implementierung wirklich noch zu Spec und Plan passt. Dabei wurden immer wieder Tasks ergänzt, weil neue Probleme sichtbar wurden.

SDD bzw. die spec-kit Skills, optimieren sehr konsequent auf das, was du als Contract definierst. Alles, was unscharf oder optional definiert wird driftet im Zweigel.

Einfach fand ich das bisher ehrlich gesagt überhaupt nicht. Und ich habe damit vielleicht gerade mal 10% meines Systems umgesetzt. Was mich deshalb gerade ernsthaft beschäftigt:

**Wie macht man das sinnvoll im Team?**

Also so, dass mehrere Leute gemeinsam mit KI, Specs, ADRs und Constitution arbeiten können, ohne dass das System langsam in die falsche Richtung konvergiert. Ich kann nämlich nicht behaupten, dass ich alles gelesen habe, was das LLM erzeugt hat. Ich habe es ernsthaft versucht, musste mich aber immer wieder dabei ertappen, dass ein "im Workflow weitermachen" und "schauen was passiert" einfacher und naheliegendert war, als wirklich alles zu lesen und bis ins Detail zu schärfen (was auch nicht zwinged zu besseren Ergebnissen geführt hat).

Was mich dagegen stark fasziniert sind die "Ideen" oder Methoden die die LLMs nutzen. Vielleicht liegt es an der "Umgebung" in der ich bisher programmiert habe. Aber über "Verträge" habe ich mit meinen Teams bisher noch nie nachgedacht. Evtl. liegt es aber auch daran, dass LLMs sich eben durch das Training grandios gut an sowas halten... Der Mensch ist da ja eher nachlässig (also meiner Erfahrung nach).
