---
title: KI als Betriebssystem
date created: 2026-04-17
date modified: 2026-04-18
categories:
  - Artikel
tags:
  - entwicklung
  - agentic engineering
  - ki
  - type/post
type: post
draft: true
preview: images/preview.jpg
---

Ich finde die Idee interessant, das mit generativer KI und vor allem mit der KI die noch vor uns liegt, etwas neues kommt.

Aktuell lese und sehe ich viel nach dem Motto "so haben wir es bisher gemacht, das gleiche machen wir jetzt mit KI", dabei sehe ich, wie sich meine eigene Nutzungsweise ändert.

## Was meistens passiert

KI wird aktuell unterschiedlich eingesetzt. In bestehende Workflows als Entscheidungshilfe oder Antwortgeber, beim Coden als Coder, Reviewer, Tester, Architekt oder Requirements Writer (als Engineer hab ich es noch nicht gesehen). Für den Support nutzen wir KI als Anrufbeantworter, zur Triage, zur Recherche und zur Beantwortung von Fragen oder im Marketing zur Marktanalyse, als Contentcreator und als Social-Media Berater. Quasi digitale Mitarbeiter. Und weil Mitarbeiter geführt werden müssen, gibt es noch einen Chef oder Koordinator resp. Orchestrator im Neusprech!

Mal davon abgesehen, dass wir uns damit obsolete machen und wir eben noch nicht bei einer AGI angekommen sind, sprich diese Mitarbeiter auch Fehler machen können, habe ich selbst nicht das Gefühl, dass diese Art LLMs zu nutzen die Richtige ist.

Durch einen Post von [Felix Schlenther](https://www.linkedin.com/in/felixschlenther/), [Build Your Own OpenClaw](https://build-your-own-openclaw.kiyo-n-zane.com/) bin ich auf die Idee "KI als Betriebssystem" gekommen. Felix ist nach fast zwei Jahren mit 25 spezialisierten Agenten auf einen einzigen universellen Agenten umgestiegen. Nicht weil Agenten schlecht sind, sondern weil das falsche Denkmodell dahinterstand.

> **Hinweis:** Build Your Own OpenClaw stammt nicht von Felix Schlenther — das ist ein separates Tutorial. Entweder trennen: _"Durch einen Post von Felix Schlenther und durch das Tutorial Build Your Own OpenClaw…"_ — oder den Link erst im Praxis-Abschnitt erwähnen.

Eigene Erfahrung mit 25 Agenten habe ich keine. Aber intuitiv habe ich den domänenspezifischen Ansatz immer vermieden. Statt einem Agenten zu sagen "Du bist jetzt ein Senior Java Architekt" habe ich lieber spezifische Prompts geschrieben — was einem Skill, wie ich heute weiß, ziemlich nahe kommt. Der Unterschied: Ich habe denselben Agenten gelenkt, statt per Rollenzuweisung darauf zu hoffen, dass er die passenden Fähigkeiten runterlädt. So wie in der Matrix, "it's magic". Das funktioniert aber nicht. LLMs arbeiten mit Wahrscheinlichkeiten — sie folgen dem, was wahrscheinlich als nächstes kommt, gegeben den Kontext. Nicht dem, was eine Berufsbezeichnung verspricht.

## Die Betriebssystem-Analogie

Ein echtes Betriebssystem macht keine Arbeit. Es schafft die Voraussetzungen, dass Arbeit gemacht werden kann. Der Kernel ist nicht für Textverarbeitung zuständig — aber ohne ihn läuft kein Textprogramm.

Überträgt man das auf KI, sieht ein KI-Betriebssystem ungefähr so aus:

| OS-Konzept | KI-Äquivalent |
|---|---|
| Kernel | LLM (Basis-Intelligenz) |
| Konfigurationsdateien | CLAUDE.md, AGENTS.md, Governance |
| Filesystem | Kontext / Wissensbasis |
| System Calls | Tools / APIs, CLI, MCP |
| Prozesse | Skills / Agents |
| Scheduler | Agentic Layer / Orchestrierung, Harness |
| Logs | Feedback-Loop, Lernschleife |

Der Agent hat das Weltverständnis, aber keine spezielle Funktion. Die Intelligenz steckt nicht im Agenten selbst sondern wird über Skills und in den Guidelines passend zur jeweiligen Domäne hinzugefügt. Der Agent nimmt aus diesen Bausteinen die Form an, wie die Aufgabe es erfordert.

## Die sechs Komponenten

Schlenther beschreibt sechs Bausteine seines KI-Betriebssystems:

**Skills** — dokumentierte Arbeitsanweisungen. Nicht "mach Marketing", sondern: Welche Schritte? Welcher Kontext? Welche Tools? Was ist die Definition of Done?

**Kontext** — die Landkarte für den Agenten. Wo liegen welche Daten? Wie hängen sie zusammen? Was ist wichtig zu wissen?

**Tools** — Zugriff auf alle relevanten Systeme. CRM, E-Mail, Kalender, Datenbanken — mit Lese- und Schreibrechten. Spezialisierte Tools um den Kontext zu optimieren, z.B. um große Wissenquellen zu durchsuchen oder komplexe Strukturen erkennbar zu machen (wie z.B. Abhängikeiten im Sourcecode).

**Governance** — das Regelwerk. Mit Ampellogik geschrieben: Was darf der Agent automatisch? Was braucht Bestätigung? Was ist verboten? Also ein Dokument für die KI, nicht zwingend für Menschen.

**Agentic Layer** — Agenten, die dynamisch auf dem Betriebssystem arbeiten. Sie orchestrieren, delegieren, koordinieren.

> **Frage:** Was unterscheidet den Agentic Layer von den spezialisierten Agenten, die zuvor als problematisch beschrieben wurden?
>
> Der Unterschied liegt darin, **wem der Kontext gehört**. Beim digitalen-Mitarbeiter-Modell besitzt jeder Agent seine eigene Domänenkompetenz — was der Marketing-Agent weiß, weiß der Support-Agent nicht. Silos entstehen automatisch. Im OS-Modell sind die Agenten im Agentic Layer bewusst "dumm": sie haben keine eingebackene Intelligenz, sondern greifen auf den gemeinsamen Kontext, die gemeinsamen Skills und die gemeinsame Governance zu. Die Intelligenz gehört dem System, nicht dem Agenten.

**Lernschleife** — Feedback fließt zurück. Skills werden gepatcht. Kontext wird geschärft. Das System wird besser, nicht nur größer. Mein aktuelles Lieblingsbeispiel: Karpathys LLM Wiki Idee, aber auch LLM Dreaming.

## Wie das in der Praxis aussieht

> **Todo:** Mehr Fakten für Software-Entwicklung ergänzen. Mögliche Beispiele:
>
> - **Skills** → kein "Code-Review-Agent", sondern ein `review`-Skill der auf Anfrage läuft — mit dokumentierten Kriterien (was wird geprüft, was ist die Definition of Done)
> - **Kontext** → Codebase-Verständnis via LSP/Indexierung, nicht je-Agent-Wissen; alle Agenten teilen dasselbe Verständnis der Architektur
> - **Governance** → Architekturprinzipien als Regel ("immer Hexagonal Architecture") — der Agent muss nicht wissen warum, er befolgt es
> - **Lernschleife** → PR-Feedback fließt zurück in den `review`-Skill, Architekturentscheidungen landen im Kontext

Ich baue seit einigen Monaten so ein System — ohne es anfangs bewusst so zu nennen.

Marvin läuft als sandboxed Container auf meiner Maschine, kommuniziert via Telegram, hat Zugriff auf meinen Zettelkasten und ein Dutzend selbst entwickelte Skills: Blogwatcher, Status-Check, Browser-Automatisierung. Zaphod hat vollen Systemzugriff und erledigt alles, was direkten Host-Zugriff braucht. Claude Code arbeitet an Marvins Code.

Übersetzt in das Betriebssystem-Modell:

- **Skills** → NanoClaw/Claude Code Skills
- **Kontext** → `/workspace/group/` als shared context, `wolfgang-projects.md` als lebendige Projektübersicht
- **Tools** → git, Blogwatcher CLI, agent-browser, Tailscale
- **Governance** → CLAUDE.md (Persönlichkeit, Grenzen, Kommunikationsregeln)
- **Agentic Layer** → Marvin + Zaphod + Claude Code
- **Lernschleife** → kuratiertes Wissens-Wiki, tägliche Gesprächszusammenfassungen, wöchentliches Memory-Reviews

## ???

Schlenther formuliert es so: Der Fokus verschiebt sich von "Ich mache die Arbeit" zu "Ich baue das System, das die Arbeit macht".

> **Todo:** Abschnittstitel fehlt noch — Vorschlag: "Was das bedeutet" oder einfach keinen Titel (als fließender Schlussabsatz).
>
> Zwei offene Gedanken:
>
> 1. _"für mich bedeutet das, nicht nur Anforderungen an Systeme zu erkennen (darin bin ich geübt) sondern wie man eigentlich arbeitet"_ — Der Kern ist: Als Entwickler/Architekt war man gut darin zu sagen **was** ein System tun soll. Jetzt muss man zusätzlich beschreiben **wie** der Agent arbeiten soll — Skills und Governance schreiben statt Code. Das ist ein anderer Muskel, und der Reflex ihn zu umgehen ("ich mach's schnell selbst") ist hartnäckig.
>
> 2. _"das Betriebssystem reifer wird"_ — Gemeint ist vermutlich: das System verbessert sich nicht durch mehr Agenten hinzufügen, sondern durch besser dokumentierte Skills und schärferen Kontext. Wachstum durch Qualität, nicht Quantität.

todo... für mich bedeutet, nicht nur Anforderungen an Systeme zu erkennen (darin bin ich geübt) sondern wie man eigentlich arbeitet. Der Reflex, eine Aufgabe selbst zu erledigen statt einen Skill dafür zu bauen, ist hartnäckig, bzw. war 

todo... das Betriebssystem reifer wird.

---

_Dieser Beitrag wurde als Entwurf mit KI generiert und von mir überarbeitet._
