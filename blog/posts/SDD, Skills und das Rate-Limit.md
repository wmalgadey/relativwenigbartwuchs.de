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

Im letzten Artikel ging es um Constitution, ADRs und den Drift, der entsteht wenn man seine eigenen Contracts nicht wörtlich genug nimmt. Das war die Vertragsseite. Was ich in den Wochen danach gelernt habe, war eher die Frage: Was passiert eigentlich, wenn man versucht diese Verträge auch durchzuziehen, in echt, über mehrere Features, mit begrenztem Session-Budget?

Ein Detail vorweg, das mich überrascht hat: die quickstart.md, die speckit-implement am Ende jeder Spec generiert, taucht in den Tasks nur als einer von vielen Punkten auf. Ich hatte sie entsprechend behandelt und quasi mitlaufen lassen. Bis ich sie mir tatsächlich angeschaut und selbst ausgeführt habe. Danach war mir klar, dass sich das lohnt, und zwar nicht als Haken den man irgendwann abarbeitet, sondern als erste Amtshandlung nach der Implementierung.

## Was die Instruktion tatsächlich tut

In einer der tasks.md stand an einer Stelle sinngemäß "STOP and VALIDATE". Und das LLM hat tatsächlich gestoppt und validiert. Das klingt banal, aber es war für mich der Moment, an dem der Unterschied zwischen "eine Instruktion schreiben" und "eine Instruktion, der wirklich gefolgt wird" konkret wurde. Vorher war das für mich eher Theorie aus der Constitution-Arbeit. Jetzt hatte ich es live vor mir.

Weniger schön war der AgentLoop selbst, den ich in dieser Phase gebaut habe. Vollständig getestet habe ich ihn nicht bekommen, unter anderem weil bei mir konsequent nur Haiku sauber durchgelaufen ist. Dazu kam, dass mir zwischenzeitlich ein Turn- und Token-Limit eingebaut wurde, ohne dass mir richtig aufgefallen ist, wer das eigentlich verantwortet: Ist das eine Rückmeldung der API, oder haben wir das selbst implementiert? Diese Grenze zwischen "kommt von außen" und "haben wir uns selbst gebaut" zu verlieren, fand ich unangenehmer als der Bug selbst.

Den Code aus dieser Session habe ich danach nochmal separat mit dem `/simplify`-Skill geprüft, außerhalb des eigentlichen SDD-Flows. Ergebnis war unter anderem, dass Magic-Strings durch ein Enum ersetzt wurden, weil mir das im Code redundant vorkam. Kleine Sache, aber ein gutes Beispiel dafür, dass SDD und speckit-implement nicht automatisch sauberen Code liefern, sondern nur den Code, der den Contract erfüllt. Für alles was der Contract nicht verlangt, muss man selbst nachfassen.

## Haken, die nicht gesetzt werden

Aus irgendeinem Grund setzt speckit-implement die Haken in der tasks.md bei mir nicht zuverlässig. Ich habe es dann einfach nochmal ohne weiteren Prompt laufen lassen, und danach anhand der Tests faktisch geprüft, ob der Contract wirklich erfüllt wurde. Funktioniert, aber es bleibt ein Punkt, den ich mir gemerkt habe: Der Haken in der Task-Liste ist keine Aussage über den tatsächlichen Zustand, nur über das, was das LLM zuletzt behauptet hat.

Zwei Dinge, die ich beim Anlegen des Projekts schlicht nicht bedacht hatte: Logging fehlte komplett, und zur Test-Coverage stand faktisch nichts in der Constitution. Beides ist mir erst beim zweiten Feature aufgefallen, als schon einiges an Code stand.

## Das zweite Feature hatte es dann auch in sich

Vier Dinge, die zusammenkamen:

1. Der Agent-Loop war im Spec selbst schon falsch definiert.
2. Diverse Formulierungen in der Constitution führten wieder dazu, dass der Code Richtung ETL-Pipeline konvergierte, derselbe Reflex wie im letzten Artikel, nur an einer anderen Stelle.
3. Test-Coverage war kein Teil der Constitution und damit kein verbindlicher Teil des Contracts.
4. Logging und Trace/Log-Spans in OTel genauso wenig.

Was nicht im Contract steht, wird nicht geprüft, und was nicht geprüft wird, kommt auch nicht zuverlässig zustande. Das war schon aus der Drift-Erfahrung bekannt, aber offenbar reicht es nicht, das einmal zu wissen. Man muss es für jede neue Kategorie von Anforderung neu lernen.

Mein GitHub-Copilot-Abo war nach dieser einen Mega-Session bei 85 Prozent. Mit Fable lief die Implementierung an mehreren Stellen spürbar besser, am Beispiel der Trace-Spans habe ich das direkt gemerkt, aber mein Session-Limit war dafür auch in etwa 20 Minuten komplett weggeatmet.

## Der Wechsel auf Max und paralleles Arbeiten

Mit dem Umstieg auf das Claude Code Max-Abo hat sich das nochmal spürbar verändert. Nicht ständig im Kopf mitzurechnen, wie viel vom Session-Limit noch übrig ist, macht das "Programmieren lassen" nochmal deutlich angenehmer. Es ist einfach befriedigend: Ich sage dem LLM etwas, der Code entsteht, und er funktioniert dann auch.

SDD gibt mir dabei weiterhin einen sehr strukturierten Workflow an die Hand, mehr als nur "Code generieren lassen". Und mit dem Max-Abo konnte ich zum ersten Mal wirklich parallel arbeiten: Specs 010 bis 013 liefen gleichzeitig in mehreren Worktrees, Specs, Pläne, Tasks und Code entstanden nebeneinander. Zuzuschauen, wie das gleichzeitig in mehreren Strängen passiert, fand ich fast schon faszinierend.

Was mich an der Stelle nochmal beeindruckt hat: die Qualität der generierten Specs. So präzise und so gut strukturiert würde ich selbst keiner Anleitung folgen können, um eine Spezifikation oder einen Plan zu schreiben.

Trotzdem, oder gerade deswegen, muss man höllisch aufpassen. Vor allem beim Arbeiten mit mehreren Worktrees gleichzeitig, dass auch wirklich das richtige Modell ausgewählt ist, sonst ist das Rate-Limit der 5-Stunden-Session erstaunlich schnell aufgebraucht. Und ärgerlicherweise scheint die Vorauswahl des Modells in Skills nicht zuverlässig zu funktionieren, was genau dieses Problem eher verschärft als löst.

---

_Dieser Beitrag wurde als Entwurf mit KI generiert und von mir überarbeitet._
