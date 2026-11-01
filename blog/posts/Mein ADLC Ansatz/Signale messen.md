---
title: Signale messen
date created: 2026-12-07T07:00:00.000Z
categories:
  - serie/sdd-mit-getrennten-agenten
  - formate/artikel
tags:
  - spec-driven-development
  - ai-engineering
  - agentic-engineering
  - observability
  - claude-code
  - entwicklung
preview: ../images/04-signale.jpg
---

Alles, was ich in den bisherigen Teilen beschrieben habe, ist ein Zielbild. Ob die Agenten sich im Alltag so verhalten, wie die Ziele es vorgeben, zeigt sich erst im Betrieb. Und dafür braucht man Messgrößen.

Naheliegend wäre: Dann soll der Agent halt Kennzahlen mitliefern. Wie viele Tests, wie viele Annahmen, wie sicher er ist. Das wäre aber genau die Falle, die das ganze Setup vermeiden soll. Ein Agent, der über seine eigene Arbeit berichtet, liefert ein Narrativ, kein Signal. Goodhart's Law in der Fassung von Marilyn Strathern bringt es auf den Punkt: Wird eine Maßzahl zum Ziel, hört sie auf, eine gute Maßzahl zu sein.

## Der Grundsatz

Signale entstehen technisch, nie aus dem Text eines Agenten. Daraus folgen vier Regeln:

- **Quellen sind Systeme, keine Agenten.** Git, Test-Reports, CI-Ergebnisse, der Orchestrator und die Telemetrie der Laufzeitumgebung (Tokens, Kosten, Dauer).
- **Agentenausgaben zählen nur als strukturierte Artefakte.** Annahmenliste, Befunde und Risikoantworten werden als Dateien mit festem Schema geschrieben. Gemessen wird, was darin steht (Anzahl, IDs, Konfidenz), nicht wie es formuliert ist.
- **Der Orchestrator schreibt das Protokoll.** Kein Agent hat Schreibzugriff darauf.
- **Messen ist billig, Bewerten passiert später.** Während des Laufs wird nur aufgezeichnet. Ausgewertet wird über viele Läufe, weil ein einzelner Lauf zu wenig aussagt.

## Ein Ereignis pro Zeile

Jeder Lauf erzeugt ein Protokoll im Format JSON Lines. Ein flaches, festes Schema reicht völlig:

| Feld | Inhalt | Beispiel |
| --- | --- | --- |
| `run` | ID des Laufs, ein Feature ergibt einen oder mehrere Läufe | `feat-042-r1` |
| `feature` | ID der Spec | `feat-042` |
| `ts` | Zeitstempel | `2026-11-01T09:12:03Z` |
| `role` | Rolle oder Werkzeug, das das Ereignis auslöst | `test-author`, `ci`, `human-tech` |
| `round` | Runde innerhalb der Schleife | `2` |
| `event` | Art des Ereignisses | `step.end`, `tests.result`, `risk.answer` |
| `data` | ereignisspezifische Werte | `{"passed": 41, "failed": 2}` |

Typische Ereignisse sind `step.start` und `step.end` mit Dauer, Tokens und Kosten, `tests.result` je Testebene und Kriteriums-ID, `diff.stats`, `assumptions`, `findings`, `risk.answer`, `divergence`, `human.decision`, `limit.hit` und `run.end` mit dem Ausgang (Merge, Teil-Merge, Code verworfen).

![Quellen, Lauf-Log, Aggregation und Dashboard als vierstufiger Datenfluss](../images/signale-datenfluss.png "Gemessen wird nebenbei, ausgewertet in der Retro")

## Woran man einen Fehlermodus erkennt

Das Spannende ist nicht das Protokoll, sondern was man daraus ablesen kann. Für jeden Fehlermodus, den ich mir vorstellen konnte, gibt es mindestens eine Messgröße. Die Schwellen sind nur Beispiele, sinnvolle Werte ergeben sich erst aus einer Baseline über ein paar Features.

| Fehlermodus | Messgröße | Aus Ereignis | Auffällig, wenn |
| --- | --- | --- | --- |
| Akzeptanztests zu schwach | Anteil der Läufe, die in Runde 1 alle Akzeptanztests bestehen | `tests.result` | er dauerhaft hoch ist (z. B. über 80 %) |
| Suite wird langsam | Laufzeit je Testebene pro Feature | `tests.result` | sie über mehrere Features steigt |
| Suite wird ausgedünnt | Tests je Kriteriums-ID | `tests.result` | sie sinkt, während die Kriterien gleich bleiben |
| Test-Autor testet Interna | Akzeptanztests, die bei reinen Refactorings brechen | `tests.result` und als Refactoring markierte Läufe | es überhaupt vorkommt |
| Kriterium zitiert generierte Quelle | Treffer des Quellen-Lints je Spec | CI-Ereignis | es überhaupt vorkommt |
| Gate umgangen | übersprungene oder gefilterte Tests, Rückgang der Testzahl | `tests.result` | es überhaupt vorkommt |
| Risiko übersehen | Einstufung sagte Nein, ein Mensch fand später ein Risiko | `risk.answer`, `human.decision`, Incident-Label | es sich wiederholt |
| Annahmen still übernommen | Tests ohne Kriteriums-ID bei leerer Annahmenliste | `tests.result`, `assumptions` | es überhaupt vorkommt |
| Verifier stimmt zu | Befunde je Lauf; Läufe ohne Befund, nach denen ein Mensch einen Fehler fand | `findings`, `human.decision` | die Befunde über viele Läufe gegen null gehen |
| Scope schrumpft am Rundenlimit | Befunde der Art „vereinfachtes Kriterium“ in der letzten Runde | `findings`, `limit.hit` | sie sich am Limit häufen |
| Freigabe liest den Bericht statt den Diff | Entscheidungsdauer im Verhältnis zur Diff-Größe | `human.decision`, `diff.stats` | große Diffs auffällig schnell freigegeben werden |
| Neu-Spec-Schleife | Neu-Specs je Feature | `run.end` | das Limit regelmäßig erreicht wird |

Die erste Zeile mag ich besonders, weil sie kontraintuitiv ist. Wenn der Implementierer in Runde 1 fast immer alle Akzeptanztests besteht, ist das kein gutes Zeichen. Es heißt wahrscheinlich, dass die Tests zu schwach sind, um eine falsche Umsetzung abzulehnen. Und die vorletzte Zeile ist eine, die sich gegen uns Menschen richtet. Wer einen 800-Zeilen-Diff in zwei Minuten freigibt, hat den Bericht gelesen, nicht den Code.

## Die Retro

Das Dashboard zeigt je Fehlermodus eine Kennzahl als Verlauf über die Features. Einzelwerte sind wenig wert, auffällig ist ein Trend oder ein Ausreißer gegenüber der Baseline. In der Retro helfen vier Fragen:

1. Welche Kennzahl ist gegenüber der Baseline auffällig?
2. Welcher Fehlermodus passt dazu, und welches Ziel hat ein Agent dabei optimiert?
3. Welches Gegenmittel greift, und wird es technisch erzwungen oder nur per Prompt erbeten?
4. Welcher Satz in einem Rollen-Prompt hat über viele Läufe messbar nichts bewirkt und kann gestrichen werden?

Die dritte Frage ist die wichtigste. Ein Gegenmittel, das nur im Prompt steht, hält unter Druck nicht. Die vierte habe ich mir bei Matt Pococks `retro`-Skill abgeschaut. Ein Satz ohne Wirkung kostet Aufmerksamkeit und verdeckt die Sätze, die wirken.

## Konkret mit .NET, xUnit, GitHub Actions und Claude Code

So könnte das in meinem Stack aussehen. Ein paar Stellen habe ich noch nicht gegen die aktuelle Doku geprüft, die sind markiert.

**Kosten und Dauer je Schritt.** Jeder Agentenschritt läuft als `claude -p … --output-format json`. Das Ergebnis enthält unter anderem `total_cost_usd`, `duration_ms`, `num_turns` und `session_id`. Der Orchestrator liest sie mit `jq` und schreibt `step.end`. Bei Nutzung über ein Abo ist der Kostenwert eine berechnete Größe, taugt aber als relativer Vergleich zwischen Läufen.

**Strukturierte Ausgaben.** Annahmenliste und Befunde fordert der Orchestrator mit `--json-schema` an, das Ergebnis steht dann im Feld `structured_output`. Passt die Ausgabe nicht zum Schema, gilt der Schritt als fehlgeschlagen und nicht als leere Liste.

**Kriteriums-IDs in Tests.** Jeder Akzeptanztest trägt ein Trait:

```csharp
[Fact]
[Trait("Criterion", "AC-012")]
public void Rechnung_enthaelt_Gesamtbetrag_inklusive_Steuer() { … }
```

Aus dem Test-Report zählt ein Skript Tests je ID, Ergebnis, Skip und Dauer. Ungeprüft ist bei mir noch, welches Report-Format unter der Microsoft Testing Platform die Traits zuverlässig enthält.

**Test-Inventar.** Beim Einfrieren der Akzeptanztests schreibt CI die Liste der Test-IDs je Kriterium mit. Jeder spätere Lauf vergleicht dagegen.

**Mutation.** Stryker.NET mit JSON-Report, auf den Diff begrenzt. Der Score geht als eigenes Ereignis ins Log.

**Diff und Pfadregeln.** `git diff --numstat` gegen den Hauptstand liefert `diff.stats`. Die Pfadregeln liegen als Glob-Liste im Repository.

**Menschliche Entscheidungen.** Ein Workflow auf das GitHub-Ereignis `pull_request_review` schreibt `human.decision` mit Zeitpunkt und Ergebnis.

**Speicherung und Auswertung.** Eine JSONL-Datei je Lauf, als CI-Artefakt und zusätzlich auf einem eigenen Branch, weil Artefakte nur begrenzt aufbewahrt werden. Für die Auswertung reicht ein kleines Skript oder eine Abfrage mit DuckDB, das JSON Lines direkt lesen kann. Ein BI-Werkzeug braucht es für den Anfang nicht.

Im [nächsten Teil](/orchestrator-harness-und-ci/) geht es um die Technik, die die Grenzen aus den ersten Teilen tatsächlich erzwingt.

## Weiterlesen

- [Strathern (1997): ‚Improving ratings‘: audit in the British University system](https://cambridge.org/core/journals/european-review/article/improving-ratings-audit-in-the-british-university-system/FC2EE640C0C44E3DB87C29FB666E9AAB)
- [Baker et al. (2025): Monitoring Reasoning Models for Misbehavior and the Risks of Promoting Obfuscation](https://arxiv.org/abs/2503.11926)
- [Böckeler (2026): Maintainability sensors for coding agents](https://martinfowler.com/articles/sensors-for-coding-agents.html)
- [Petrović & Ivanković (2018): State of Mutation Testing at Google](https://research.google/pubs/state-of-mutation-testing-at-google/)
- [Claude Code: Headless-Modus](https://code.claude.com/docs/en/headless)
- [Pocock: retro-Skill](https://github.com/mattpocock/skills/tree/main/skills/engineering/retro)

---

_Dieser Beitrag wurde mit KI generiert._
