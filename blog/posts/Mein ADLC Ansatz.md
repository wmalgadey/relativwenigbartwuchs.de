---
title: Mein ADLC Ansatz
date created: 2026-11-09T07:00:00.000Z
categories:
  - serie/sdd-mit-getrennten-agenten
  - formate/artikel
tags:
  - spec-driven-development
  - ai-engineering
  - agentic-engineering
  - software-architecture
  - testing
  - entwicklung
  - mein-leben-als-entwickler
preview: images/00-auftakt.jpg
---

In [SDD, ADRs und Constitution](/sdd-adrs-und-constitution/) habe ich am Ende eine Frage offen gelassen: Wie macht man das sinnvoll im Team? Und ehrlicherweise steckte darin noch eine zweite, unangenehmere Frage. Ich hatte zugegeben, dass ich nicht alles gelesen habe, was das LLM erzeugt hat. Wer hat es dann geprüft?

Die naheliegende Antwort war: das LLM selbst. Es hat die Spec geschrieben, den Plan, die Tasks, den Code, die Tests, und am Ende hat es mit `/speckit-converge` nachgeschaut, ob alles zusammenpasst. Das fühlt sich nach Qualitätssicherung an. Ist es aber nur bedingt. Wenn dasselbe Modell mit demselben Kontext eine Anforderung falsch versteht, dann versteht es sie im Code falsch, im Test falsch und in der Prüfung falsch. Alles ist grün, alles passt zusammen, und trotzdem ist es das Falsche.

Das ist keine neue Erkenntnis. Knight und Leveson haben schon 1986 gezeigt, dass unabhängig entwickelte Programmversionen trotzdem gemeinsam an denselben Stellen scheitern. Und es gibt inzwischen Studien, die zeigen, dass Modelle ihre eigenen Ausgaben erkennen und besser bewerten als fremde. Die Regel, auf die ich mich am Ende reduziert habe, lautet deshalb:

**Ein Prüfsignal zählt nur, wenn es nicht mit dem Fehler korreliert, den es finden soll.**

Alles Weitere in dieser Serie folgt aus diesem einen Satz.

## Unterschiedliche Ziele statt mehr Agenten

Mein erster Reflex war, einfach mehr Agenten draufzuwerfen. Einer schreibt, einer reviewt, noch einer reviewt den Reviewer. Das hilft nur, wenn die Agenten sich wirklich unterscheiden. Dasselbe Modell mit einem anderen Rollennamen im Prompt stimmt sich meistens einfach selbst zu.

Was einen Agenten unterscheidbar macht, sind drei Dinge: Er sieht etwas anderes (eine Informationsgrenze), er wird für etwas anderes belohnt (ein anderes Ziel), und er wird an etwas gemessen, das der geprüfte Agent nicht verändern kann. Die Ziele habe ich jeweils in der Form „belohnt für … nicht für …“ formuliert, weil das Modell im Zweifel genau darauf optimiert:

- **Spec-Agent:** belohnt für sichtbare Lücken, nicht für eine geschlossene Spec. Jedes Kriterium ist prüfbar und nennt eine verbindliche Quelle. Lücken werden markiert, nicht gefüllt.
- **Test-Autor:** belohnt für Tests, die eine falsche Umsetzung eines Kriteriums ablehnen, nicht für eine vollständige Suite. Was kein Kriterium verlangt, wird nicht getestet, sondern als Annahme gemeldet.
- **Implementierer:** belohnt dafür, dass die Kriterien erfüllt und die vorgegebenen Akzeptanztests grün sind, nicht für Grün um jeden Preis. Bleibt ein Test rot, meldet er die Divergenz.
- **Verifier:** belohnt für gefundene Lücken, nicht für Zustimmung. Er sucht Kriterien ohne wirksamen Test, tautologische Tests, Scope-Drift und still vereinfachte Kriterien.
- **Klassifikator:** belohnt für erkannte Risiken, nicht für ein bequemes Nein. Er entscheidet, ob ein Mensch draufschauen muss.
- **Worst-Case-Agent:** belohnt für Gründe, warum eine neue Spec erneut scheitern würde. Er kommt nur zum Einsatz, wenn ein Lauf gescheitert ist.

Daneben gibt es zwei andere Arten von Beteiligten. Die **Freigaben** sind Menschen, eine fachliche und eine technische. Und der **Orchestrator** ist Code, kein Modell. Er hat kein Ziel, er setzt Regeln durch. Das war für mich einer der wichtigsten Punkte: Den Ablauf darf kein Modell steuern, weil jedes Modell ein Interesse am Ausgang hat.

![Ablauf mit Spec-Agent, Test-Autor, Implementierer, Verifier, zwei Risikofragen und den beiden Freigaben](images/ablauf.png "Wer prüft, wer entscheidet, wohin Abweichungen laufen")

Der Ablauf ist im Kern simpel. Der Spec-Agent schreibt die Spec, der Test-Autor schreibt daraus Akzeptanztests, ohne den Code zu kennen. Dann fragt ein Klassifikator, ob das fachliche Risiko hoch ist. Wenn ja, schaut ein Mensch auf Spec und Annahmen, bevor überhaupt Code entsteht. Der Implementierer arbeitet gegen eingefrorene Tests, der Verifier sucht Lücken, und vor dem Merge kommt die zweite Frage: Ist das technische Risiko hoch? Wenn nein, wird automatisch gemergt.

## Warum ich das aufschreibe

Ich habe das nicht in einem Rutsch entwickelt, sondern über viele Sessions mit Claude als Sparringspartner. Am Ende stand ein ziemlich langes Dokument, und ich wollte es nicht in einem einzigen Post verbraten. Deshalb kommt es als Serie, ungefähr wöchentlich:

1. [Orakel, Signale und der Bericht des Agenten](/orakel-signale-und-der-bericht-des-agenten/) – was eigentlich entscheidet, ob ein Ergebnis richtig ist
2. [Agenten und ihre Grenzen](/agenten-und-ihre-grenzen/) – wer was sieht und wer was schreibt
3. [Risiko, Freigaben und wie ein Ablauf endet](/risiko-freigaben-und-wie-ein-ablauf-endet/) – wann ein Mensch draufschauen muss und warum jede Schleife ein Ende braucht
4. [Signale messen](/signale-messen/) – woran man merkt, dass ein Agent das falsche Ziel optimiert
5. [Orchestrator, Harness und CI](/orchestrator-harness-und-ci/) – die Technik, die die Grenzen erzwingt
6. [Rollen-Prompts](/rollen-prompts/) – die Prompts selbst, mit Kommentar, welcher Satz wirkt und welcher ignoriert wird

Die ersten drei Teile sind framework-unabhängig. Die letzten drei werden konkret, mit Bash, Docker, GitHub Actions und Claude Code im Headless-Modus, weil ich das so für mein eigenes Projekt brauche.

Eins vorweg, weil es mir wichtig ist: Das ist kein erprobtes Rezept. Es ist ein Zielbild, das ich gerade selbst baue. Einige Annahmen werden sich als falsch herausstellen. Ich schreibe es trotzdem auf, weil ich finde, dass die meisten Diskussionen über Agenten an der falschen Stelle ansetzen. Es geht weniger darum, wie gut ein Agent programmiert, sondern darum, woher man weiß, dass er es getan hat.

## Weiterlesen

- [Knight & Leveson (1986): An Experimental Evaluation of the Assumption of Independence in Multi-Version Programming](https://www.kth.se/social/files/564df871f2765419e306178d/KnightLeveson.pdf)
- [Panickssery et al. (2024): LLM Evaluators Recognize and Favor Their Own Generations](https://proceedings.neurips.cc/paper_files/paper/2024/file/7f1f0218e45f5414c79c0679633e47bc-Paper-Conference.pdf)
- [Huang et al. (2024): Large Language Models Cannot Self-Correct Reasoning Yet](https://arxiv.org/abs/2310.01798v2)
- [Böckeler (2025): Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl](https://www.martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)

---

_Dieser Beitrag wurde mit KI generiert._
