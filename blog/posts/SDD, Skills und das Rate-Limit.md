---
title: 'SDD, Skills und das Rate-Limit'
date created: 2026-07-30T00:00:00
categories:
  - formate/artikel
tags:
  - spec-kit
  - software-architecture
  - spec-driven-development
  - ai-engineering
  - claude-code
  - entwicklung
  - mein-leben-als-entwickler
---

Im letzten Artikel ging es um Constitution, ADRs und den Drift, der entsteht wenn man seine eigenen Contracts nicht wörtlich genug nimmt. Seitdem bin ich einfach weitergekommen, über mehrere Features, mit ziemlich begrenztem Session-Budget.

Ein Detail vorweg: die quickstart.md, die speckit-implement am Ende jeder Spec generiert, taucht in den Tasks nur als einer von vielen Punkten auf. Ich hab sie entsprechend behandelt und quasi mitlaufen lassen. Bis ich sie mir irgendwann tatsächlich angeschaut und selbst ausgeführt habe. Seitdem mach ich das als erste Amtshandlung nach der Implementierung, nicht als Haken den man irgendwann abarbeitet.

## Was die Instruktion tatsächlich tut

In einer der tasks.md stand an einer Stelle sinngemäß "STOP and VALIDATE". Und das LLM hat tatsächlich gestoppt und validiert. Vorher war der Unterschied zwischen "eine Instruktion schreiben" und "einer Instruktion wird auch gefolgt" für mich eher Theorie aus der Constitution-Arbeit gewesen. Jetzt hatte ich es live vor mir.

Weniger schön war der AgentLoop selbst, den ich in dieser Phase gebaut habe. Vollständig getestet habe ich ihn nicht bekommen, unter anderem weil bei mir konsequent nur Haiku sauber durchgelaufen ist. Dazu kam ein Turn- und Token-Limit, das irgendwann mit drin war, ohne dass ich wirklich mitbekommen habe, wer das eigentlich verantwortet: Rückmeldung der API, oder haben wir das selbst gebaut?

Den Code aus dieser Session habe ich danach nochmal separat mit dem `/simplify`-Skill geprüft, außerhalb des eigentlichen SDD-Flows. Dabei wurden unter anderem Magic-Strings durch ein Enum ersetzt, weil mir das im Code redundant vorkam. SDD bzw. speckit-implement liefert eben nicht automatisch sauberen Code, sondern den Code der den Contract erfüllt. Alles was der Contract nicht verlangt, muss man selbst nachfassen.

## Haken, die nicht gesetzt werden

Aus irgendeinem Grund setzt speckit-implement die Haken in der tasks.md bei mir nicht zuverlässig. Ich habe es dann einfach nochmal ohne weiteren Prompt laufen lassen, und danach anhand der Tests faktisch geprüft, ob der Contract wirklich erfüllt wurde. Funktioniert, aber es bleibt ein Punkt, den ich mir gemerkt habe: Der Haken in der Task-Liste ist keine Aussage über den tatsächlichen Zustand, nur über das, was das LLM zuletzt behauptet hat.

Zwei Dinge, die ich beim Anlegen des Projekts schlicht nicht bedacht hatte: Logging fehlte komplett, und zur Test-Coverage stand faktisch nichts in der Constitution. Beides ist mir erst beim zweiten Feature aufgefallen, als schon einiges an Code stand.

## Das zweite Feature hatte es dann auch in sich

Vier Dinge kamen zusammen: Der Agent-Loop war im Spec selbst schon falsch definiert. Diverse Formulierungen in der Constitution führten wieder dazu, dass der Code Richtung ETL-Pipeline konvergierte, derselbe Reflex wie im letzten Artikel, nur an einer anderen Stelle. Test-Coverage war kein Teil der Constitution, Logging und Trace/Log-Spans in OTel genauso wenig.

Also nochmal dasselbe Muster wie beim ersten Mal, nur an einer anderen Stelle: kein verbindlicher Teil des Contracts.

Mein GitHub-Copilot-Abo war nach dieser einen Mega-Session bei 85 Prozent. Mit Fable lief die Implementierung an mehreren Stellen spürbar besser, am Beispiel der Trace-Spans habe ich das direkt gemerkt, aber mein Session-Limit war dafür auch in etwa 20 Minuten komplett weggeatmet.

## Der Wechsel auf Max und paralleles Arbeiten

Mit dem Umstieg auf das Claude Code Max-Abo hat sich das nochmal spürbar verändert. Nicht ständig im Kopf mitzurechnen, wie viel vom Session-Limit noch übrig ist, macht das "Programmieren lassen" nochmal deutlich angenehmer. Es ist einfach befriedigend: Ich sage dem LLM etwas, der Code entsteht, und er funktioniert dann auch.

SDD gibt mir dabei weiterhin einen sehr strukturierten Workflow an die Hand, mehr als nur "Code generieren lassen". Und mit dem Max-Abo konnte ich zum ersten Mal wirklich parallel arbeiten: Specs 010 bis 013 liefen gleichzeitig in mehreren Worktrees, Specs, Pläne, Tasks und Code entstanden nebeneinander. Zuzuschauen, wie das in mehreren Strängen gleichzeitig passiert, fand ich faszinierend.

Die Qualität der generierten Specs beeindruckt mich dabei immer noch. So präzise und gut strukturiert würde ich selbst keiner Anleitung folgen können, um eine Spezifikation oder einen Plan zu schreiben.

Trotzdem, oder gerade deswegen, muss man höllisch aufpassen. Vor allem beim Arbeiten mit mehreren Worktrees gleichzeitig, dass auch wirklich das richtige Modell ausgewählt ist, sonst ist das Rate-Limit der 5-Stunden-Session erstaunlich schnell aufgebraucht. Und ärgerlicherweise scheint die Vorauswahl des Modells in Skills nicht zuverlässig zu funktionieren, was genau dieses Problem eher verschärft als löst.

---

_Dieser Beitrag wurde mit KI generiert._
