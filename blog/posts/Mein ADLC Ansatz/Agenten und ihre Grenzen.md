---
title: Agenten und ihre Grenzen
date created: 2026-11-23T07:00:00.000Z
categories:
  - serie/sdd-mit-getrennten-agenten
  - formate/artikel
tags:
  - spec-driven-development
  - ai-engineering
  - agentic-engineering
  - software-architecture
  - entwicklung
preview: ../images/02-grenzen.jpg
---

Ein Agent lohnt sich nur, wenn er eine eigene Informationsgrenze hat. Also wenn er etwas nicht sieht, das ein anderer sieht. Ohne diese Grenze stimmt dasselbe Modell sich selbst zu, egal wie der Agent im Prompt heißt.

Das klingt nach Overhead, und das ist es auch. Aber sobald man für jeden Agenten aufschreibt, was er sehen darf, was er schreiben darf und was ihm verborgen bleibt, sieht man ziemlich schnell, wo die Unabhängigkeit nur behauptet ist.

![Matrix: welcher Agent das Was, das Wie und den Bericht liest, schreibt oder nicht sieht](../images/wer-sieht-was.png "Der Test-Autor sieht das Was, nicht das Wie")

Die wichtigste Zeile ist die des Test-Autors. Er sieht die bindenden Kriterien, gegebenenfalls Schnittstellen-Signaturen, bestehende Akzeptanztests und die Test-Infrastruktur. Er sieht nicht die Implementierung, nicht die Unit-Tests und nicht den Plan. Damit kann er seine Tests nicht aus dem Code ableiten, selbst wenn er wollte.

## Ein paar Dinge, die ich unterwegs gelernt habe

**Der Spec-Agent sieht alles, schreibt aber nur das Was.** Code und daraus generierte Doku darf er als Kontext lesen, aber nie als Quelle für ein Kriterium nennen. Sonst schreibt er den Ist-Zustand als Anforderung fest, und niemand merkt es. Die Spec enthält keine technischen Details.

**Schnittstellen-Signaturen ohne Logik.** Bekommt der Test-Autor ein Skelett mit Implementierung, testet er die Implementierung. Die Schnittstelle ist nur das Vokabular, um das System aufzurufen, also Interfaces und Typen, eine API oder ein CLI. Entweder ist sie vorab festgelegt (contract-first), oder der Test-Autor legt sie aus den Kriterien fest (outside-in) und sie wird zusammen mit den Tests eingefroren. Was nie passieren darf: dass sie aus einer bestehenden Implementierung abgelesen wird.

**Der Implementierer hat eine Schreibgrenze statt einer Sichtgrenze.** Er ist der Geprüfte und darf deshalb alles sehen. Seine Grenze ist, dass er Spec und Akzeptanztests nicht ändern kann. Das muss technisch durchgesetzt sein, nicht im Prompt stehen. Dazu mehr im Teil über [Orchestrator, Harness und CI](/orchestrator-harness-und-ci/).

**Der Verifier liest den Bericht nicht.** Der Bericht ist ein Argument für den Diff. Wer ihn liest, prüft das Argument statt den Diff. Das klingt übertrieben, aber eine gut geschriebene Zusammenfassung beeinflusst auch menschliche Reviewer, warum also nicht ein Modell.

**Der Worst-Case-Agent sieht keinen Code.** Er kommt nur zum Einsatz, wenn ein Lauf gescheitert ist und eine neue Spec entsteht. Er sieht die Spur des gescheiterten Laufs (Divergenzen, Befunde, Annahmen) und die neue Spec, aber nicht den verworfenen Code. Sonst bewertet er die alte Lösung statt der neuen Spec. Das ist im Grunde ein Premortem nach Gary Klein, nur automatisiert.

## Die ganze Tabelle

Jede Zeile liest sich als Satz: Die Rolle sieht …, schreibt …, zielt auf … und ihr bleibt verborgen …

| Rolle | Sieht | Schreibt | Zielt auf | Verborgen bleibt |
| --- | --- | --- | --- | --- |
| Der Spec-Agent | den Brief und verbindliche Quellen (Handbuch, ADRs, Normen, Conventions) sowie das gesamte Projekt als Kontext | die Spec mit markierten Kriterien und Quellenangaben | sichtbare Lücken | nichts |
| Der Test-Autor | die bindenden Kriterien, die Schnittstellen-Signaturen (falls vorab festgelegt), bestehende Akzeptanztests und die Test-Infrastruktur | `tests/acceptance/**`, die Annahmenliste und bei outside-in die Schnittstelle | Tests, die eine falsche Umsetzung eines Kriteriums ablehnen | die Implementierung, die Unit-Tests und der Plan |
| Der Implementierer | Spec, Plan, Akzeptanztests (nur lesend) und Code | den Plan, `src/**` und `tests/unit/**` | erfüllte Kriterien und grüne vorgegebene Akzeptanztests | nichts |
| Der Verifier | Spec, Diff, Trace und Mutation-Report | nur Befunde | gefundene Lücken | der Bericht und der Verlauf des Implementierers |
| Der Klassifikator | Spec und Annahmen, später den Diff | je Risikofrage ein Ja oder Nein mit Konfidenz, keinen Text | erkannte Risiken; er darf nur hochstufen | der Bericht des Implementierers |
| Der Orchestrator | Zustand und Signale | PRs, Labels und Logs | nichts; er ist Code, kein Modell | nichts |
| Die fachliche Freigabe | Spec, Annahmen und Divergenzen | Kriterien und Entscheidungen zu Annahmen | Domänentreue | nichts; sie entscheidet, bevor es Code gibt |
| Die technische Freigabe | Diff, Signale und Befunde | Contracts und die Merge-Entscheidung bei hohem technischen Risiko | Systemintegrität | nichts; der Bericht wird aber zuletzt gelesen |
| Der Worst-Case-Agent | die Spur des gescheiterten Laufs und die neue Spec | eine Bewertung, warum die neue Spec wieder scheitern könnte | Gründe für erneutes Scheitern | der verworfene Code |

## Zwei Arten von Grenzen

Was mir beim Aufschreiben noch klar wurde: Es gibt zwei völlig verschiedene Arten von Grenzen, und die meisten Tools kümmern sich nur um eine davon.

Die Tabelle oben zeigt Grenzen, die **Unabhängigkeit** sichern. Sie sorgen dafür, dass ein Agent den anderen nicht beeinflusst. Daneben gibt es **Sicherheitsgrenzen** nach Least Privilege: kein Zugriff auf Produktion, keine Secrets, keine echten Kundendaten, Netzwerk nur zu Registries und zur LLM-API. Die gelten für alle Agenten gleich.

Sandboxes, Container und die meisten Agent-Frameworks lösen die zweite Art ziemlich gut. Die erste Art muss man fast immer selbst bauen. Und genau die ist es, die über die Qualität des Ergebnisses entscheidet, nicht die Sicherheit des Hosts.

Im [nächsten Teil](/risiko-freigaben-und-wie-ein-ablauf-endet/) geht es darum, wann bei all dem ein Mensch draufschauen muss und wann nicht.

## Weiterlesen

- [Sharma et al. (2023): Towards Understanding Sycophancy in Language Models](https://www.anthropic.com/research/towards-understanding-sycophancy-in-language-models)
- [Robinson: Consumer-Driven Contracts](https://www.martinfowler.com/articles/consumerDrivenContracts.html)
- [Pre-mortem nach Gary Klein](https://en.wikipedia.org/wiki/Pre-mortem)
- [OWASP LLM06:2025 Excessive Agency](https://owasp.org/www-project-top-10-for-large-language-model-applications/2_0_vulns/LLM06_ExcessiveAgency.html)
- [Olson: Pullboard](https://pullboard.dev/) – ein Werkzeug, bei dem kein Agent seine eigene Arbeit annehmen darf

---

_Dieser Beitrag wurde mit KI generiert._
