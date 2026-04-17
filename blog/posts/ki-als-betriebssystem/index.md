---
title: KI als Betriebssystem
date created: 2026-04-17
date modified: 2026-04-17
categories:
  - Artikel
tags:
  - entwicklung
  - agentic engineering
  - ki
  - type/post
type: post
draft: true
---

Ihr habt alle einen digitalen Mitarbeiter. Ihr braucht ein Betriebssystem.

Das klingt nach einem Slogan, der bei einem LinkedIn-Beitrag gut funktioniert. Aber je länger ich darüber nachdenke, desto mehr stimmt er. Und je länger ich mit KI arbeite, desto mehr merke ich: Der Unterschied zwischen beiden Denkmodellen macht den Unterschied zwischen "interessantem Experiment" und "echtem Hebel".

## Was meistens passiert

Jemand in einem Unternehmen entscheidet sich, KI einzusetzen. Erster Schritt: Ein Bot für den Support. Zweiter Schritt: Ein Agent für die Recherche. Dritter Schritt: Ein Assistent für das Marketing. Und schon hat man drei digitale Mitarbeiter — mit all dem, was das bedeutet.

Silos. Jeder kennt nur seine Domäne. Was der Recherche-Agent gelernt hat, weiß der Schreib-Agent nicht. Koordinationsaufwand. Wer organisiert, was zuerst passiert? Wartung mal drei. Wenn sich die Firmenstrategie ändert, müssen alle drei Agenten angepasst werden.

Felix Schlenther hat das nach fast zwei Jahren mit 25 spezialisierten Agenten herausgefunden — und ist dann auf einen einzigen universellen Agenten umgestiegen. Nicht weil mehr Agenten schlechter wären, sondern weil das falsche Denkmodell dahinterstand.

## Die Betriebssystem-Analogie

Ein echtes Betriebssystem macht keine Arbeit. Es schafft die Voraussetzungen, dass Arbeit gemacht werden kann. Der Kernel ist nicht für Textverarbeitung zuständig — aber ohne ihn läuft kein Textprogramm.

Überträgt man das auf KI, sieht ein KI-Betriebssystem ungefähr so aus:

| OS-Konzept | KI-Äquivalent |
|---|---|
| Kernel | LLM (Basis-Intelligenz) |
| Konfigurationsdateien | CLAUDE.md, AGENTS.md, Governance |
| Filesystem | Kontext / Wissensbasis |
| System Calls | Tools / APIs |
| Prozesse | Skills / Agents |
| Scheduler | Agentic Layer / Orchestrierung |
| Logs | Feedback-Loop, Lernschleife |

Der Agent ist dabei bewusst "dumm" gehalten. Das ist eine Design-Entscheidung, keine Schwäche. Die Intelligenz steckt nicht im Agenten selbst — sie steckt in den Skills, im Kontext und in der Governance. Der Agent nimmt aus diesen Bausteinen die Form an, wie die Aufgabe es erfordert.

## Die sechs Komponenten

Schlenther beschreibt sechs Bausteine seines KI-Betriebssystems:

**Skills** — dokumentierte Arbeitsanweisungen. Nicht "mach Marketing", sondern: Welche Schritte? Welcher Kontext? Welche Tools? Was ist die Definition of Done?

**Kontext** — die Landkarte für den Agenten. Wo liegen welche Daten? Wie hängen sie zusammen? Was ist wichtig zu wissen?

**Tools** — Zugriff auf alle relevanten Systeme. CRM, E-Mail, Kalender, Datenbanken — mit Lese- und Schreibrechten.

**Governance** — das Regelwerk. Mit Ampellogik geschrieben: Was darf der Agent automatisch? Was braucht Bestätigung? Was ist verboten? Wichtig: Das ist kein Dokument für Menschen, sondern für KI.

**Agentic Layer** — Agenten, die dynamisch auf dem Betriebssystem arbeiten. Sie orchestrieren, delegieren, koordinieren.

**Lernschleife** — Feedback fließt zurück. Skills werden gepatcht. Kontext wird geschärft. Das System wird besser, nicht nur größer.

## Wie das in der Praxis aussieht

Ich baue seit einigen Monaten so ein System — ohne es anfangs bewusst so zu nennen.

[Marvin](https://github.com/wmalgadey/parainoid) läuft als sandboxed Container auf meiner Maschine, kommuniziert via Telegram, hat Zugriff auf meinen Zettelkasten und ein Dutzend selbst entwickelte Skills: Blogwatcher, Status-Check, Browser-Automatisierung. Zaphod hat vollen Systemzugriff und erledigt alles, was direkten Host-Zugriff braucht. Claude Code arbeitet am Code.

Übersetzt in das Betriebssystem-Modell:

- **Skills** → NanoClaw Skills, CLAUDE.md-Regeln
- **Kontext** → `/workspace/group/` als shared context, `wolfgang-projects.md` als lebendige Projektübersicht
- **Tools** → git, Blogwatcher CLI, agent-browser, Tailscale
- **Governance** → CLAUDE.md (Persönlichkeit, Grenzen, Kommunikationsregeln)
- **Agentic Layer** → Marvin + Zaphod + Claude Code als Team
- **Lernschleife** → kuratiertes Wissens-Wiki, tägliche Gesprächszusammenfassungen, wöchentliches Memory-Review

Das läuft. Nicht weil die KI besonders gut ist — sondern weil das Betriebssystem gut designed ist.

## Was das bedeutet

Schlenther formuliert es so: Der Fokus verschiebt sich von "Ich mache die Arbeit" zu "Ich baue das System, das die Arbeit macht".

Das klingt einfacher als es ist. Es bedeutet, komplett umzulernen, wie man eigentlich arbeitet. Und ehrlich gesagt: Das fällt auch mir noch schwer. Der Reflex, eine Aufgabe selbst zu erledigen statt einen Skill dafür zu bauen, ist hartnäckig.

Aber wenn es einmal läuft — dann skaliert es. Nicht weil man mehr Agenten hinzufügt, sondern weil das Betriebssystem reifer wird.

---

_Weiterführendes Material: [Felix Schlenther — AI FIRST](https://www.linkedin.com/in/felixschlenther/), [Build Your Own OpenClaw](https://build-your-own-openclaw.kiyo-n-zane.com/)_
