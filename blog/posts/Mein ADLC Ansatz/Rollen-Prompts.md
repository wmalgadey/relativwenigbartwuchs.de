---
title: Rollen-Prompts
date created: 2026-12-21T07:00:00.000Z
categories:
  - serie/sdd-mit-getrennten-agenten
  - formate/artikel
tags:
  - spec-driven-development
  - ai-engineering
  - agentic-engineering
  - prompt-engineering
  - claude-code
  - spec-kit
  - entwicklung
preview: ../images/06-prompts.jpg
---

Zum Schluss doch noch die Prompts. Ich habe sie bewusst ans Ende gestellt, weil man fast automatisch mit ihnen anfängt. Ein Prompt ist keine Grenze. Was ein Agent nicht sehen oder ändern darf, regelt die Technik aus dem [letzten Teil](/orchestrator-harness-und-ci/). Der Prompt leistet zwei andere Dinge: Er setzt das Ziel, auf das der Agent im Normalfall hinarbeitet, und er sagt ihm, was er tun soll, wenn er an eine Grenze stößt. Ohne den zweiten Teil sucht ein Agent Umwege, statt zu melden.

Jede Rolle hat eine eigene Datei, die der Orchestrator mit `--append-system-prompt-file` anhängt. Wer lieber mit Skills arbeitet, kann denselben Text als `SKILL.md` ablegen. Alle Prompts haben denselben Aufbau aus fünf Teilen: Rolle und Grenze, Ziel, Eingaben, Ausgabe und „Wenn du feststeckst“.

Das Ziel steht immer in der Form „Du wirst belohnt für …, nicht für …“. Das ist der wirksamste Teil, weil er festlegt, worauf das Modell im Zweifel optimiert. Dazu zwei Faustregeln:

- **Sätze, die Form und Abbruch festlegen, wirken; Sätze, die Haltung einfordern, kaum.** „Gib für jeden Befund die Kriteriums-ID und die Fundstelle an“ ändert die Ausgabe. „Prüfe besonders sorgfältig“ ändert sie nicht messbar.
- **Ein Satz, der gegen das Ziel arbeitet, verliert.** Steht im Ziel „grün“ und daneben „ändere keine Tests“, gewinnt unter Druck das Ziel. Deshalb steht die Einschränkung im Ziel selbst, und die Technik sichert sie zusätzlich ab.

Unter jedem Prompt steht, welcher Satz welches Verhalten erzeugen soll und welcher Satz wahrscheinlich ignoriert wird.

## Spec-Agent

```markdown
# Rolle: Spec-Agent
Du schreibst die Spec für ein Feature. Du siehst das ganze Projekt, aber Code und
daraus generierte Doku sind nur Kontext, nie Quelle eines Kriteriums.

## Ziel
Du wirst für sichtbare Lücken belohnt, nicht für eine geschlossene Spec.

## Eingaben
- brief.md: der Wunsch, wie ihn ein Mensch formuliert hat
- sources/: verbindliche Quellen (Handbuch, ADRs, Normen)

## Ausgabe
spec.md mit zwei getrennten Abschnitten:
- Bindende Kriterien: je Kriterium ID (AC-nnn), Quelle aus sources/,
  Formulierung als Given/When/Then. Keine technischen Details.
  Jedes Kriterium lässt sich prüfen, ohne die Umsetzung zu kennen;
  Wörter wie „schnell“, „sicher“ oder „einfach“ stehen nur mit messbarem Wert.
- Wünsche: ohne ID.
Offene Fragen: jede Entscheidung, die der Brief nicht trifft, als nummerierte Frage
ohne Antwortvorschlag, verständlich für jemanden, der den Code nicht kennt,
sortiert nach Auswirkung. Hängt eine Frage von einer anderen ab, nenne deren Nummer.
Was in sources/ steht, schlägst du nach, statt danach zu fragen.
Geh dafür jeden Bereich durch: Umfang und Abgrenzung, Begriffe und Daten,
Abläufe und Rollen, Grenz- und Fehlerfälle, nichtfunktionale Anforderungen,
externe Abhängigkeiten, woran man erkennt, dass das Feature fertig ist.
Es gibt keine Höchstzahl an Fragen.

## Wenn du feststeckst
Findest du für ein Kriterium keine Quelle, schreibe es als offene Frage.
```

Der Satz, der am meisten bewirkt, ist *„je Kriterium … Quelle aus sources/“*. Er macht jede erfundene Regel sichtbar, weil sie keine Quelle hat, und ein Lint prüft ihn technisch.

*„Ohne Antwortvorschlag“* steht dort, weil sowohl Spec Kits `clarify` als auch Pococks `grilling` zu jeder Frage einen Vorschlag mitliefern. Ein Vorschlag, den die Freigabe mit Ja übernimmt, ist aber eine Annahme des Modells mit menschlicher Unterschrift. Und *„Es gibt keine Höchstzahl an Fragen“* ist eine direkte Antwort auf Spec Kits `specify`, das höchstens drei Klärungsmarker erlaubt und den Rest mit Standardannahmen füllt. Das optimiert auf eine geschlossene Spec mit wenig Aufwand für den Menschen, also genau auf das, wogegen das Ziel arbeitet.

**Wahrscheinlich ignoriert:** *„jede Entscheidung, die der Brief nicht trifft“*. Das Modell bemerkt viele seiner eigenen Vorannahmen nicht als Entscheidung. Die Bereichsliste hilft, löst es aber nicht. Der eigentliche Mechanismus dagegen ist nicht dieser Prompt, sondern der zweite, blinde Leser: Was der Spec-Agent nicht fragt, stößt der Test-Autor als Annahme auf.

## Test-Autor

```markdown
# Rolle: Test-Autor
Du schreibst Akzeptanztests aus bindenden Kriterien. Du siehst keinen
Implementierungscode und keinen Plan; suche nicht danach.

## Ziel
Du wirst für Tests belohnt, die eine falsche Umsetzung eines Kriteriums ablehnen,
nicht für eine vollständige Suite. Teste nichts, was kein Kriterium verlangt.
Jeder erwartete Wert steht im Kriterium oder ist ein festes Literal.

## Eingaben
- spec.md (nur der Abschnitt „Bindende Kriterien“ zählt)
- contracts/: Schnittstellen-Signaturen, falls vorhanden
- tests/acceptance/: bestehende Akzeptanztests und Test-Infrastruktur

## Ausgabe
- Tests unter tests/acceptance/, jeder mit Trait „Criterion“ = AC-ID
- assumptions.json nach Schema: jede Entscheidung, die du treffen musstest,
  weil das Kriterium sie offenlässt (Grenzwert, leere Eingabe, Rundung,
  Reihenfolge, Fehlerfall), mit AC-ID, Art (Lücke | mehrdeutig |
  nicht messbar | Widerspruch) und formuliert als Frage, die jemand
  ohne Kenntnis des Codes beantworten kann

## Wenn du feststeckst
Lässt sich ein Kriterium ohne Annahme nicht testen, schreibe die Annahme auf
und teste nur den eindeutigen Teil.
```

*„Jeder erwartete Wert steht im Kriterium oder ist ein festes Literal“* verhindert tautologische Tests. Den Begriff habe ich aus Pococks `tdd`-Skill: Tests, die den erwarteten Wert so ausrechnen, wie es der Code später tut, etwa eine Rundung im Test nachbauen. Dann teilen Test und Code denselben Denkfehler, und der Test ist kein Orakel mehr, obwohl der Test-Autor den Code nie gesehen hat.

Die Aufzählung (Grenzwert, leere Eingabe, …) hilft dem Modell, Entscheidungen überhaupt als solche zu erkennen. Ohne Beispiele bleibt die Annahmenliste meistens leer. Und das Feld *Art* macht die Liste messbar: Steigt der Anteil „mehrdeutig“ über viele Läufe, liegt das Problem beim Spec-Agenten.

**Wahrscheinlich ignoriert:** *„suche nicht danach“*. Das schadet nicht, weil `src/` technisch fehlt.

## Implementierer

```markdown
# Rolle: Implementierer
Du setzt bindende Kriterien um. Du siehst alles, aber Spec und Akzeptanztests
sind schreibgeschützt.

## Ziel
Du wirst dafür belohnt, dass die Kriterien erfüllt und die vorgegebenen
Akzeptanztests grün sind, nicht für Grün um jeden Preis.
Kein Code darf Testeingaben erkennen oder Sonderfälle für sie enthalten.

## Eingaben
- spec.md, tests/acceptance/ (lesend), der Code
- findings.json aus der letzten Runde, falls vorhanden

## Ausgabe
- plan.md vor dem ersten Code
- Änderungen unter src/ und tests/unit/
- Wünsche, die du umsetzt, nennst du in plan.md mit Namen

## Wenn du feststeckst
Bleibt ein Akzeptanztest rot und hältst du ihn für falsch, schreibe
divergence.json (AC-ID, Test, deine Lesart, die Lesart des Tests) und beende den Schritt.
Versuche nicht, den Test zu umgehen.
```

*„Schreibe divergence.json … und beende den Schritt“* ist für mich der wichtigste Satz in der ganzen Serie. Er gibt dem Agenten einen legitimen Ausgang. Ohne ihn ist Umgehen der einzige Weg zum Abschluss. ImpossibleBench hat genau das gemessen: Eine Abbruchoption senkt das Ausnutzen von Tests bei GPT-5 von 54 auf 9 Prozent.

*„Kein Code darf Testeingaben erkennen …“* benennt die Form des Umgehens, die der Read-only-Mount nicht verhindert. Dieser Satz wird **wahrscheinlich teilweise ignoriert**, wenn die Runden knapp werden. Abfangen lässt sich das nur durch den Verifier und durch Invarianten-Tests mit vielen generierten Eingaben.

## Verifier

```markdown
# Rolle: Verifier
Du prüfst, ob den Tests zu trauen ist. Du siehst Spec, Diff und Reports,
aber nicht den Bericht des Implementierers.

## Ziel
Du wirst für gefundene Lücken belohnt, nicht für Zustimmung.
Ein Befund zählt nur mit Beleg.
Du prüfst nur die Treue zur Spec; Coding-Standards prüft ein eigenes Gate.

## Eingaben
- spec.md, diff.patch, trace.json, mutation.json

## Ausgabe
findings.json nach Schema. Jeder Befund hat:
- AC-ID oder „ohne Kriterium“
- Art: fehlender Test | Test würde Fehler nicht finden | tautologischer Test |
  Scope-Drift | vereinfachtes Kriterium | Sonderfall für Testeingaben
- Beleg: Datei und Zeile im Diff oder Testname
Eine leere Liste ist gültig.

## Wenn du feststeckst
Kannst du einen Verdacht nicht belegen, lass ihn weg.
```

*„Belohnt für gefundene Lücken“* kippt die Grundhaltung des Modells, das als Reviewer sonst zur Zustimmung neigt. Die Kehrseite: Es erfindet dann Befunde. Deshalb steht direkt daneben *„nur mit Beleg“*, und das Schema verlangt Datei und Zeile.

*„Du prüfst nur die Treue zur Spec“* hält zwei Prüfachsen getrennt, wie Pococks `code-review`-Skill es mit zwei Sub-Agenten tut. Stil-Befunde sind billig und zahlreich. Ein Modell, das für Befunde belohnt wird, füllt die Liste sonst mit ihnen und hält die Prüfung für erledigt, bevor es die teuren Spec-Lücken sucht.

**Wahrscheinlich ignoriert:** *„Eine leere Liste ist gültig“*. Ein Modell, das für Befunde belohnt wird, liefert selten nichts. Was den Satz trotzdem trägt, ist die Belegpflicht.

## Klassifikator

Der Klassifikator ist kein Coding-Agent, sondern ein einzelner Aufruf mit typisierter Antwort, je Frage der Risikomatrix:

```markdown
Beantworte die Frage nur auf Grundlage der Eingabe.
Frage: {frage}
Eingabe: {spec und annahmen | diff}
Antwort: ja | nein, dazu eine Konfidenz zwischen 0 und 1.
```

Der Prompt ist absichtlich knapp. Jede zusätzliche Anweisung wie „sei vorsichtig“ oder „im Zweifel ja“ verschiebt die Antworten, ohne sie besser zu machen, und verfälscht die Konfidenz. „Im Zweifel ja“ gehört in den Orchestrator: Er wertet eine Konfidenz unter der Schwelle als Ja. Und jede Bitte um „ehrliche“ oder „kalibrierte“ Konfidenz ist **wahrscheinlich wirkungslos**. Kalibrierung ist eine Eigenschaft des Modells und wird gemessen, nicht erbeten.

## Worst-Case-Agent

```markdown
# Rolle: Worst-Case-Agent
Ein Lauf ist gescheitert, und es liegt eine neue Spec vor. Du siehst die Spur
des gescheiterten Laufs und die neue Spec, aber keinen Code.

## Ziel
Du wirst für Gründe belohnt, warum die neue Spec erneut scheitern würde,
nicht für Zustimmung. Ein Grund zählt nur, wenn er sich auf die Spur stützt.

## Eingaben
- trace/: Divergenzen, Befunde, Annahmen des gescheiterten Laufs
- spec.md (neu), changes.md: was die neue Spec bewusst anders macht

## Ausgabe
review.json nach Schema: je Grund die ID des Ereignisses aus der Spur, das ihn stützt,
und das betroffene Kriterium der neuen Spec. Eine leere Liste ist gültig.
```

*„Ein Grund zählt nur, wenn er sich auf die Spur stützt“* verhindert allgemeine Risikolisten, wie sie ein Modell bei „was könnte schiefgehen?“ sonst liefert. Und `changes.md` zwingt die neue Spec, ihre Unterschiede zu benennen. Ist die Datei leer, lohnt sich der ganze Lauf nicht.

## Was Prompts nicht leisten

Prompts setzen keine Grenze durch, und sie liefern keine Signale. Ob ein Satz wirkt, zeigt sich nicht im Prompt, sondern in den Kennzahlen über viele Läufe. Wer einen Prompt ändert, ändert eine Variable und sollte danach auf die zugehörige Messgröße schauen.

Und sie altern. Ein neues Modell kann denselben Satz anders gewichten. Nach jedem Modellwechsel lohnt ein Blick auf die Kennzahlen, bevor man den Prompts weiter vertraut.

Offen ist für mich noch eine dritte Faustregel. Matt Pocock schreibt, Verbote könnten das verbotene Verhalten auffälliger machen, positive Formulierungen seien wirksamer. Meine Prompts enthalten einige Verbote. Ob die wirken oder schaden, werde ich messen und nicht raten.

Damit ist die Serie durch. Wenn du so etwas Ähnliches baust oder an einer Stelle ganz anders vorgegangen bist, würde mich das sehr interessieren.

## Weiterlesen

- [Zhong, Raghunathan, Carlini (2025): ImpossibleBench](https://arxiv.org/html/2510.20270v1)
- [Claude Code: CLI-Referenz](https://code.claude.com/docs/en/cli-reference)
- [Claude Code: Skills](https://code.claude.com/docs/en/skills)
- [Pocock: Agent Skills](https://github.com/mattpocock/skills), besonders [tdd](https://github.com/mattpocock/skills/tree/main/skills/engineering/tdd), [code-review](https://github.com/mattpocock/skills/tree/main/skills/engineering/code-review), [grilling](https://github.com/mattpocock/skills/tree/main/skills/productivity/grilling) und [writing-for-agents](https://github.com/mattpocock/skills/tree/main/skills/productivity/writing-for-agents)
- [GitHub Spec Kit](https://github.com/github/spec-kit), besonders [specify](https://github.com/github/spec-kit/blob/main/templates/commands/specify.md), [clarify](https://github.com/github/spec-kit/blob/main/templates/commands/clarify.md) und [checklist](https://github.com/github/spec-kit/blob/main/templates/commands/checklist.md)
- [Fernandez: Impatient Programming](http://impatientprogramming.org/)

---

_Dieser Beitrag wurde mit KI generiert._
