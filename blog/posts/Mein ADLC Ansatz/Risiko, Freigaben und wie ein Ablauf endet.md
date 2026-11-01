---
title: 'Risiko, Freigaben und wie ein Ablauf endet'
date created: 2026-11-30T07:00:00.000Z
categories:
  - serie/sdd-mit-getrennten-agenten
  - formate/artikel
tags:
  - spec-driven-development
  - ai-engineering
  - agentic-engineering
  - devops
  - entwicklung
preview: ../images/03-risiko.jpg
---

Wenn jede Änderung von einem Menschen freigegeben werden muss, ist der Mensch der Engpass. Wenn keine Änderung freigegeben werden muss, merkt irgendwann niemand mehr, was eigentlich gebaut wird.

Der Gedanke, der mir hier geholfen hat: Bei einer Freigabe geht es um eine andere Frage als beim Orakel. Die Freigabe fragt, ob das Risiko einen menschlichen Blick braucht. Das Orakel fragt, ob das Ergebnis richtig ist. Auf eine Freigabe kann man bei geringem Risiko verzichten, auf das Orakel nie. Ohne unabhängiges Orakel hieße ein Auto-Merge nur, dass der Implementierer seinen eigenen Tests zugestimmt hat.

## Zwei Fragen, zwei Zeitpunkte

Eingestuft wird mindestens zweimal:

1. **Nach dem Test-Autor und vor der Implementierung** wird anhand von Spec und Annahmenliste gefragt: „Fachliches Risiko hoch?“ Wenn ja, schaut die fachliche Freigabe drauf, bevor es überhaupt Code gibt. Das ist der billigste Moment für eine Korrektur.
2. **Vor dem Merge** wird anhand des Diffs gefragt: „Technisches Risiko hoch?“ Lautet die Antwort Nein, wird automatisch gemergt, sobald alle Gates grün und keine Befunde offen sind.

Wichtig ist mir, dass die Agenten und die Gates in jedem Fall dieselben sind. Eine Änderung mit geringem Risiko bekommt keinen leichteren Testpfad, ihr fehlt nur die menschliche Freigabe. So bleibt es bei einem einheitlichen Prozess, und niemand muss diskutieren, ob „das hier nicht mal schnell“ geht.

## Wer einstuft

Die Einstufung macht nicht der Implementierer. Der würde von einem Nein profitieren, also wird er im Zweifel Nein sagen. Stattdessen gibt es einen Klassifikator, und der sollte eher ein kleines, kalibriertes Modell sein, das eine Frage mit Ja oder Nein und einer Konfidenz beantwortet, als ein LLM, das einen Absatz schreibt. Dazu kommen Pfadregeln, die direkt und ohne Modell eine Freigabe auslösen. Wer `migrations/**` anfasst, bekommt eine technische Freigabe, Punkt.

Ob eine Freigabe nötig ist, entscheidet am Ende der Orchestrator, nicht das Modell. Ein einziges Ja genügt, und eine unsichere Antwort zählt wie ein Ja. Die Begründung für die Freigabe sind die Fragen, die mit Ja beantwortet wurden. Und jede Annahme des Test-Autors kann eine fachliche Freigabe auslösen. Der Test-Autor kennt die Risikomatrix übrigens nicht, sonst würde eine leere Annahmenliste belohnt.

## Die Risikomatrix

Welche Fragen eine Freigabe auslösen, hängt von der Domäne ab. In meinen Beispielen geht es um Rechnungen, GoBD und Normen, in anderen Domänen sind es ganz andere Pfade. Die Fragen gibt ein Mensch vor, nämlich die jeweilige Freigaberolle. Ein LLM kann beim Formulieren helfen, aber entscheidend ist eine nachvollziehbare Matrix, die der Klassifikator nutzen kann.

| Risiko | Löst aus | Erkannt durch |
| --- | --- | --- |
| Ändert sich, wie Beträge berechnet werden, die in Rechnungen eingehen? | fachliche Freigabe | Pfadregel (z. B. `src/Billing/**`) und Klassifikator |
| Werden gebuchte oder revisionsrelevante Daten verändert? | fachliche Freigabe | Klassifikator |
| Weicht eine Regel von einer zitierten Norm ab? | fachliche Freigabe | Klassifikator |
| Gibt es Annahmen des Test-Autors? | fachliche Freigabe | Orchestrator (Annahmenliste nicht leer) |
| Ändert sich ein Datenbankschema? | technische Freigabe | Pfadregel (z. B. `migrations/**`) |
| Ändert sich ein öffentlicher API-Vertrag? | technische Freigabe | Pfadregel und Klassifikator |
| Berührt die Änderung Authentifizierung oder Berechtigungen? | technische Freigabe | Klassifikator |
| Ist die Änderung schwer rückgängig zu machen, etwa weil Daten gelöscht oder migriert werden oder sie nach außen wirkt? | technische Freigabe | Klassifikator |

Die Matrix ist nie fertig. Übersieht die Einstufung ein Risiko, das ein Mensch später erkennt, kommt eine Frage oder Pfadregel hinzu, oder die Schwelle für „unsicher“ sinkt. Lösen zu viele Ja Freigaben aus, die nichts finden, steigt die Schwelle. Weil eine kalibrierte Wahrscheinlichkeit nur über viele Fälle stimmt und nicht im Einzelfall, stützen sich diese Anpassungen auf die gemessene Übereinstimmung mit späteren menschlichen Urteilen. Die Matrix wird versioniert wie Code, und ändern darf sie nur die zuständige Freigaberolle.

## Wie ein Ablauf endet

Der Teil, über den ich am längsten nachgedacht habe, ist eigentlich der unspektakulärste: Jede Schleife braucht ein Ende. Agenten hören nicht von selbst auf. Implementierer gegen rote Tests, Verifier gegen Implementierer, das kann ewig so weitergehen, und jede Runde kostet Geld.

Deshalb gibt es Limits, die der Orchestrator durchsetzt, statt den Agenten um ein Ende zu bitten:

- **Runden je Schleife**, zum Beispiel drei Runden Implementierer gegen rote Akzeptanztests und drei Runden Befunde zwischen Verifier und Implementierer.
- **Zeit und Kosten** je Lauf und je Feature.
- **Diff-Größe.** Größer heißt meistens Scope-Drift oder eine zu große Spec.
- **Wiederholungen bei Infrastrukturfehlern**, also flaky Tests oder Netzwerk. Die zählen nicht als Runde des Implementierers.
- **Wartezeit auf eine Freigabe.** Danach Erinnerung oder Eskalation, aber nie eine automatische Freigabe.

Nach der Implementierung wird nicht mehr nach dem fachlichen Risiko gefragt. Mit einer Ausnahme: Am Limit braucht es immer eine menschliche Entscheidung, sonst hängt der Ablauf. Dann gilt:

1. **Scope-Drift ist ein Befund.** Geht der Diff fachlich über die Spec hinaus, meldet der Verifier das wie jeden anderen Befund, und der Implementierer nimmt es zurück. Das kostet nur Agentenrunden, niemand wartet.
2. **Einmalige Entscheidung am Limit.** Ist nach dem Rundenlimit noch Drift da, entscheidet die technische Freigabe einmal je Teil: übernehmen oder zurücknehmen. Danach wird gemergt.
3. **Code verwerfen, Wissen behalten.** Sind die Kriterien nach den Limits nicht erfüllt, wird der Code verworfen. Daraus entstehen eine oder mehrere neue Specs, die benennen, was sie gegenüber der alten bewusst anders machen. Der Worst-Case-Agent prüft jede neue Spec gegen die Spur des gescheiterten Laufs, und dann startet der neue Zyklus. Auch die Zahl der neuen Specs ist begrenzt.

Der dritte Punkt fühlt sich am Anfang falsch an. Man hat Geld ausgegeben, der Code ist „fast fertig“, und jetzt wegwerfen? Spec 002 habe ich in [SDD, ADRs und Constitution](/sdd-adrs-und-constitution/) dreimal verworfen, weil die Richtung nicht stimmte. Hier ist das Verwerfen kein Unfall, sondern Teil des Ablaufs. Code ist billig geworden. Das Wissen, warum er nicht funktioniert hat, ist es nicht.

Wie man misst, ob das alles funktioniert, steht im [nächsten Teil](/signale-messen/).

## Weiterlesen

- [Guo et al. (2017): On Calibration of Modern Neural Networks](https://proceedings.mlr.press/v70/guo17a.html)
- [Kadavath et al. (2022): Language Models (Mostly) Know What They Know](https://arxiv.org/abs/2207.05221v1)
- [Zhong, Raghunathan, Carlini (2025): ImpossibleBench](https://arxiv.org/html/2510.20270v1) – mehr Runden führen zu mehr Abkürzungen
- [Johnson (2026): Guardrails and Best Practices for Agentic Orchestration](https://camunda.com/blog/2026/01/guardrails-and-best-practices-for-agentic-orchestration/)
- [Deehan (2026): Key Principles in Designing Agents for Production, Part IV](https://camunda.com/blog/2026/06/key-principles-in-designing-agents-for-production-part-4/)

---

_Dieser Beitrag wurde mit KI generiert._
