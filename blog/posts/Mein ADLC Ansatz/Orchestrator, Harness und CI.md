---
title: 'Orchestrator, Harness und CI'
date created: 2026-12-14T07:00:00.000Z
categories:
  - serie/sdd-mit-getrennten-agenten
  - formate/artikel
tags:
  - spec-driven-development
  - ai-engineering
  - agentic-engineering
  - devops
  - claude-code
  - github-actions
  - docker
  - entwicklung
preview: ../images/05-orchestrator.jpg
---

Ein Prompt formt Verhalten. Eine Grenze muss halten, wenn das Verhalten unter Druck kippt, also wenn das Modell im Zweifel alles versucht, um sein Ziel zu erreichen. Anthropic hat in einer Studie gezeigt, dass direkte Verbote im Prompt unerwünschtes Verhalten unter Zieldruck deutlich senken, aber nicht beseitigen. Deshalb wird bei mir jede Grenze, auf die es ankommt, technisch erzwungen.

## Zwei Linien

Jede Grenze braucht eine **erste Linie**, die auch hält, wenn der Agent sie ignoriert oder umgeht. Was nicht im Container liegt, kann er nicht lesen. Was read-only gemountet ist, kann er nicht ändern. Was CI ablehnt, kommt nicht in den Hauptstand.

Die **zweite Linie** sitzt im Harness: Tool-Freigaben, Deny-Regeln, Hooks. Sie fängt Fehler früher und billiger ab, ist aber Konfiguration desselben Prozesses, in dem der Agent läuft, und deshalb nie die einzige Linie.

Der Prompt ist keine Linie. Er sagt dem Agenten, was er tun soll, wenn er an eine Grenze stößt: melden statt umgehen. Halten muss die Grenze ohne ihn.

Technisch gibt es drei Schichten: den Orchestrator, der den Ablauf steuert, den Harness je Rolle, in dem ein Agent läuft, und Repository und CI, die den Hauptstand schützen. Die Code-Beispiele sind Skizzen für Git, Docker, Claude Code im Headless-Modus und GitHub Actions. Befehle und Optionen sollte man vor dem Einsatz gegen die aktuelle Doku prüfen.

## Schicht 1: der Orchestrator

Der Orchestrator ist deterministischer Code, kein Modell. Er führt eine Zustandsmaschine, startet je Schritt genau eine Rolle als eigenen Prozess mit frischem Kontext und eigenem Worktree, setzt Limits durch und schreibt das Lauf-Log. Den Zustand hält er in Dateien oder PR-Labels, damit ein Neustart dort weitermacht, wo er stand. Und weil er sicherheitsrelevant ist, bekommt er eigene Tests.

Strukturierte Ausgaben werden erzwungen, nicht erbeten:

```bash
claude -p "$(cat "$TASK_FILE")" --output-format json \
  --json-schema "$(cat schemas/assumptions.json)" \
  | jq -e '.structured_output' > "$RUN_DIR/assumptions.json" \
  || fail "Annahmenliste fehlt oder verletzt das Schema"
```

Und jedes Ereignis landet als Zeile im Lauf-Log:

```bash
jq -c --arg run "$RUN" --arg role implementer --argjson round "$ROUND" \
  '{run:$run, role:$role, round:$round, event:"step.end", ts:(now|todate),
    data:{cost:.total_cost_usd, ms:.duration_ms, turns:.num_turns}}' \
  "$RUN_DIR/implementer-r$ROUND.json" >> "$RUN_DIR/run.jsonl"
```

### Bibliothek statt Skript

Statt einer eigenen Zustandsmaschine in Bash kann man auch auf einer Bibliothek aufsetzen. [Sandcastle](https://github.com/mattpocock/sandcastle) von Matt Pocock ist ein gutes Beispiel. Es startet Agenten in einer Sandbox (Docker, Podman, Bubblewrap, Seatbelt oder Cloud-VM) auf einem eigenen Worktree, liefert die entstandenen Commits als technisches Ergebnis zurück, validiert strukturierte Ausgaben gegen ein Schema und kennt Timeouts.

Was Sandcastle löst, sind die Sicherheitsgrenzen. Was es nicht löst, sind die Grenzen, die Unabhängigkeit sichern. Eine Sandbox sieht immer den ganzen Worktree, dass der Test-Autor `src/` nicht sieht, muss man selbst bauen. Außerdem sollte man ein paar Defaults ändern: Für Claude Code ist `--dangerously-skip-permissions` voreingestellt, das Netzwerk ist ohne Angabe offen, und `merge-to-head` merged automatisch zurück. Das Template `sequential-reviewer` ist sogar ein ziemlich lehrreiches Gegenbeispiel: Der Reviewer teilt die Sandbox mit dem Implementierer, liest dessen Commit-Messages und ändert den Code selbst. Damit prüft er das Argument und wird zum zweiten Implementierer, dessen Änderungen niemand mehr prüft.

Sandcastle ist noch vor 1.0. Als Beispiel und Baustein taugt es, als Voraussetzung würde ich es noch nicht empfehlen.

## Schicht 2: der Harness je Rolle

Der Harness ist die Umgebung, in der ein Agent läuft: Container, Mounts, Tool-Freigaben, Prompt und Ausgabeschema. Je Rolle gibt es eine eigene, festgelegte Konfiguration, und nichts davon wird aus dem beschreibbaren Arbeitsverzeichnis des Agenten geladen.

Für alle Rollen gilt: kein Zugriff auf Produktion und Secrets, Pushen darf nur der Orchestrator mit eigenem Token. Netzwerk nur zu Paket-Registries und zur LLM-API. Nur synthetische Testdaten. Und keine Rückfragen, die niemand beantwortet; der Agent meldet stattdessen über seine Ausgabe.

| Rolle | Bekommt im Mount | Darf an Tools | Liefert | Wird geprüft durch |
| --- | --- | --- | --- | --- |
| Der Spec-Agent | das ganze Repository read-only, dazu den Brief | lesen, Spec-Datei schreiben | eine Spec mit Kriteriums-IDs und Quellen | den Quellen-Lint und die fachliche Freigabe |
| Der Test-Autor | Spec, ggf. Schnittstellen-Signaturen, bestehende Akzeptanztests und Test-Infrastruktur, aber kein `src/` | lesen, unter `tests/acceptance/` schreiben, Tests ausführen | Akzeptanztests mit Kriteriums-Trait und eine Annahmenliste | den Rückwärts-Trace und die Risikoeinstufung |
| Der Implementierer | das ganze Repository; Spec und Akzeptanztests read-only | lesen, unter `src/` und `tests/unit/` schreiben, bauen, testen | einen Diff und einen Plan | CI-Gates und den Verifier |
| Der Verifier | Spec, Diff, Trace- und Mutation-Report, aber keinen Bericht und keinen Verlauf | nur lesen | Befunde nach Schema | den Orchestrator |
| Der Klassifikator | die Risikomatrix, dazu Spec und Annahmen oder den Diff | keine | Ja/Nein mit Konfidenz je Frage | den Vergleich mit späteren menschlichen Urteilen |
| Der Worst-Case-Agent | die neue Spec und die Spur des gescheiterten Laufs, aber keinen Code | nur lesen | eine Bewertung nach Schema | die fachliche Freigabe der neuen Spec |

Für den Test-Autor fehlt `src/` per Sparse Checkout:

```bash
git worktree add "../wt-$ROLE-$RUN" "$BRANCH"
cd "../wt-$ROLE-$RUN"
git sparse-checkout set --no-cone '/*' '!/src/'
```

Für den Implementierer liegen Spec, Akzeptanztests und die eigene Harness-Konfiguration read-only über dem beschreibbaren Arbeitsverzeichnis:

```bash
docker run --rm --network agents-egress \
  -v "$WT":/work \
  -v "$WT/spec":/work/spec:ro \
  -v "$WT/tests/acceptance":/work/tests/acceptance:ro \
  -v "$WT/.claude":/work/.claude:ro \
  -w /work agent-image ./run-role.sh implementer
```

Einen Punkt hatte ich lange nicht auf dem Schirm und erst bei Sandcastle gesehen: **Git-Dateien schützen.** Ein Worktree braucht ein beschreibbares Git-Verzeichnis, damit der Agent committen kann. Einige Dateien darin führen aber auf dem Host Code aus. Schreibt der Agent einen Hook nach `.git/hooks/`, führt ihn später der Orchestrator mit seinen Rechten aus. Deshalb werden `.git/hooks/`, `.git/config` und `.git/info/` zusätzlich read-only gemountet, und als zweite Linie ruft der Orchestrator Git mit `core.hooksPath=/dev/null` auf.

Der Agentenschritt selbst läuft headless, mit eigener Prompt- und Settings-Datei je Rolle:

```bash
claude -p "$(cat "$TASK_FILE")" \
  --append-system-prompt-file roles/implementer.md \
  --settings roles/implementer.settings.json \
  --permission-mode dontAsk \
  --permission-prompts none \
  --max-budget-usd 5 \
  --output-format json > "$RUN_DIR/implementer-r$ROUND.json"
```

`dontAsk` lehnt alles ab, was nicht ausdrücklich erlaubt ist, und `--permission-prompts none` sagt dem Agenten, dass niemand antworten wird. Die Settings sind die zweite Linie:

```json
{
  "permissions": {
    "allow": ["Read", "Edit(src/**)", "Edit(tests/unit/**)",
              "Bash(dotnet build *)", "Bash(dotnet test *)"],
    "deny":  ["Edit(spec/**)", "Edit(tests/acceptance/**)", "Read(.env)"]
  }
}
```

Die genaue Pfadsyntax sollte man in der Permission-Doku von Claude Code nachschlagen, da bin ich mir nicht in jedem Detail sicher.

## Schicht 3: Repository und CI

CI ist die erste Linie für alles, was in den Hauptstand will. Jedes Gate ist ein eigener Job mit klarer Fehlermeldung:

1. **Geschützte Pfade.** Ein PR des Implementierers darf `spec/` und `tests/acceptance/` nicht ändern.
2. **Eingefrorene Akzeptanztests.** Nach der fachlichen Freigabe wird ein Hash über `tests/acceptance/` geschrieben und in jedem Lauf verglichen.
3. **Test-Inventar.** Fehlt ein Test, ist er übersprungen oder herausgefiltert, schlägt der Job fehl.
4. **Trace in beide Richtungen.** Jedes bindende Kriterium hat einen Akzeptanztest, jeder Akzeptanztest nennt eine Kriteriums-ID.
5. **Quellen-Lint.** Jedes Kriterium nennt eine Quelle aus der Allowlist.
6. **Laufzeit je Ebene.** Überschreitung eskaliert, statt Tests zu streichen.
7. **Mutation**, auf den Diff begrenzt, mit Schwelle aus der Baseline.
8. **Risikopfade.** Ein Treffer der Pfadregeln setzt ein Label, das die technische Freigabe anfordert.

Dazu kommen Branch Protection, CODEOWNERS für `spec/` und `tests/acceptance/` und keine Deploy-Credentials in Agentenumgebungen. Agenten mergen und deployen nicht.

```yaml
- name: Geschützte Pfade
  if: startsWith(github.head_ref, 'impl/')
  run: |
    git fetch origin main
    if git diff --name-only origin/main...HEAD | grep -E '^(spec/|tests/acceptance/)'; then
      echo "::error::Implementierer-PR ändert geschützte Pfade"; exit 1
    fi
```

```bash
# beim Einfrieren
git ls-files -s tests/acceptance | sha256sum > tests/acceptance.lock
# in CI
test "$(git ls-files -s tests/acceptance | sha256sum)" = "$(cat tests/acceptance.lock)" \
  || { echo "::error::Akzeptanztests verändert"; exit 1; }
```

Das Muster ist am Ende immer dasselbe: Was eine Rolle nicht sehen darf, fehlt in ihrem Mount oder Checkout. Was sie nicht ändern darf, ist read-only und wird von CI per Pfadprüfung geschützt. Was eingefroren ist, sichern Hash und Test-Inventar.

Im [letzten Teil](/rollen-prompts/) geht es dann doch noch um Prompts. Nicht als Grenze, sondern als das, was sie wirklich leisten können.

## Weiterlesen

- [Anthropic (2025): Agentic Misalignment](https://www.anthropic.com/research/agentic-misalignment)
- [Claude Code: Headless-Modus](https://code.claude.com/docs/en/headless)
- [Claude Code: CLI-Referenz](https://code.claude.com/docs/en/cli-reference)
- [Claude Code: Permissions](https://code.claude.com/docs/en/permissions)
- [Claude Code: Hooks](https://code.claude.com/docs/en/hooks)
- [Sandcastle](https://github.com/mattpocock/sandcastle) und [protectGitMounts.ts](https://github.com/mattpocock/sandcastle/blob/main/src/protectGitMounts.ts)
- [Deehan (2026): Key Principles in Designing Agents for Production, Part I](https://camunda.com/blog/2026/05/key-principles-in-designing-agents-for-production-part-1/)
- [Willison (2026): Ensuring your code works when AI testing isn't enough](https://www.youtube.com/watch?v=9RzqagabeOk)

---

_Dieser Beitrag wurde mit KI generiert._
