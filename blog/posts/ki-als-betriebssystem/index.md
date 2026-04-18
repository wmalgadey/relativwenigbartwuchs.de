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
preview: images/alter-computer.jpg
preview_credit: 'Foto von <a href="https://unsplash.com/@mattgyver">Matt Benson</a> auf <a href="https://unsplash.com/de/fotos/ein-alter-computer-der-neben-einer-wand-auf-dem-boden-steht-rvfm_b1C6lc">Unsplash</a>'
---

Ich finde die Idee interessant, das mit generativer KI und vor allem mit der KI die noch vor uns liegt, etwas neues kommt.

Aktuell lese und sehe ich viel nach dem Motto "so haben wir es bisher gemacht, das gleiche machen wir jetzt mit KI", dabei merke ich, wie sich meine eigene Nutzungsweise stetig ändert.

## Die Agenten

KI wird aktuell unterschiedlich eingesetzt. In bestehende Workflows als Entscheidungshilfe oder Antwortgeber, beim Coden als Coder, Reviewer, Tester, Architekt oder Requirements Writer (als Engineer, also "Benutzer versteher" hab ich es noch nicht gesehen). Für den Support nutzen wir KI als Anrufbeantworter, zur Triage, zur Recherche und zur Beantwortung von Fragen oder im Marketing zur Marktanalyse, als Contentcreator und als Social-Media Berater. Quasi digitale Mitarbeiter oder ein weiteres Tool. Und weil Mitarbeiter geführt werden müssen, gibt es noch einen Chef oder Koordinator resp. Orchestrator!

Mal davon abgesehen, dass wir uns damit obsolete machen und wir eben noch nicht bei einer AGI angekommen sind, sprich diese KI-Mitarbeiter auch Fehler machen können, habe ich selbst nicht das Gefühl, dass diese Art LLMs zu nutzen die Richtige ist.

Durch einen Post von [Felix Schlenther](https://www.linkedin.com/in/felixschlenther/), bin ich auf die Idee "KI als Betriebssystem" gekommen. Er ist nach fast zwei Jahren mit 25 spezialisierten Agenten auf einen universellen Agenten umgestiegen. Weil seiner Meinung nach das falsche Denkmodell dahinterstand.

Eigene Erfahrung mit 25 Agenten habe ich keine. Aber intuitiv habe ich den domänenspezifischen Ansatz immer vermieden. Statt einem Agenten zu sagen "Du bist jetzt ein Senior C# Architekt" habe ich lieber spezifische Prompts geschrieben; was einem Skill, wie ich heute weiß, ziemlich nahe kommt. Ich habe denselben Agenten gelenkt, statt per Rollenzuweisung darauf zu hoffen, dass er die passenden Fähigkeiten runterlädt und dabei versucht den Kontext geschickt zu wählen, damit die Wahrscheinlichkeit steigt, dass das Ergebnis meinen Erwartungen entspricht. So wie in der Matrix, funktioniert das nämlich nicht. LLMs arbeiten mit Wahrscheinlichkeiten — sie folgen dem, was wahrscheinlich als nächstes kommt, gegeben den Kontext. Nicht dem, was eine Berufsbezeichnung verspricht. Sie laden sich keine Fähigkeiten aus der Matrix herunter :D.

## Die Betriebssystem-Analogie

Ein echtes Betriebssystem macht keine Arbeit. Es schafft die Voraussetzungen, dass Arbeit gemacht werden kann. Der Kernel ist nicht für Textverarbeitung zuständig — aber ohne ihn läuft kein Textprogramm.

Überträgt man das auf KI, sieht ein KI-Betriebssystem ungefähr so aus:

| OS-Konzept | KI-Äquivalent |
|---|---|
| Kernel | LLM (Basis-Intelligenz) |
| Konfigurationsdateien | `CLAUDE.md`, `AGENTS.md`, Governance |
| Filesystem | Kontext / Wissensbasis |
| System Calls | Tools / APIs, CLI, MCP |
| Prozesse | Skills / Agents |
| Scheduler | Agentic Layer / Orchestrierung, Harness |
| Logs | Feedback-Loop, Lernschleife |

Der Agent hat das Weltverständnis, aber keine spezielle Funktion. Die Intelligenz steckt nicht im Agenten selbst sondern wird über Skills und in den Guidelines passend zur jeweiligen Domäne hinzugefügt. Der Agent nimmt aus diesen Bausteinen die Form an, wie die Aufgabe es erfordert.

## Die Komponenten

Felix Schlenther beschreibt folgende Bausteine seines KI-Betriebssystems:

**Skills** — dokumentierte Arbeitsanweisungen. Nicht "mach Marketing", sondern: Welche Schritte? Welcher Kontext? Welche Tools? Was ist die Definition of Done?

**Kontext** — die Landkarte für den Agenten. Wo liegen welche Daten? Wie hängen sie zusammen? Was ist wichtig zu wissen?

**Tools** — Zugriff auf alle relevanten Systeme. CRM, E-Mail, Kalender, Datenbanken — mit Lese- und Schreibrechten. Spezialisierte Tools um den Kontext zu optimieren, z.B. um große Wissenquellen zu durchsuchen oder komplexe Strukturen erkennbar zu machen (wie z.B. Abhängikeiten im Sourcecode).

**Governance** — das Regelwerk. Mit Ampellogik geschrieben: Was darf der Agent automatisch? Was braucht Bestätigung? Was ist verboten? Also Dokumente für die KI, nicht zwingend für Menschen.

**Agentic Layer** — Agenten, die dynamisch auf dem Betriebssystem arbeiten, arbeit ausführen. Sie haben keine spezielle Funktion, sondern führen generisch bzw. dynamisch Aufgaben aus.

**Lernschleife** — Feedback fließt zurück. Skills werden gepatcht. Kontext wird geschärft. Das System wird besser, nicht nur größer. Mein aktuelles Lieblingsbeispiel: Karpathys LLM Wiki Idee, aber auch LLM Dreaming.

## Was unterscheidet den Agentic Layer von den spezialisierten Agenten?

Der Unterschied liegt darin, wem der Kontext gehört. Beim digitalen-Mitarbeiter-Modell besitzt jeder Agent seine eigene Domänenkompetenz — was der Marketing-Agent weiß, weiß der Support-Agent nicht. Dadurch entstehen Silos automatisch. Im OS-Modell sind die Agenten im Agentic Layer bewusst "dumm": sie haben keine eingebackene Intelligenz, sondern greifen auf den gemeinsamen Kontext, die gemeinsamen Skills und die gemeinsame Governance zu.

## Wie das in der Praxis aussieht

Ich baue seit einigen Monaten so ein System; im Kontex Wissensmanagement ohne es anfangs bewusst so zu nennen.

Marvin läuft als sandboxed Container auf meiner Maschine, kommuniziert via Telegram, hat Zugriff auf meinen Zettelkasten und ein Dutzend selbst entwickelte Skills: Blogwatcher, Status-Check, Browser-Automatisierung. Zaphod hat vollen Systemzugriff und erledigt alles, was direkten Host-Zugriff braucht. Claude Code arbeitet an Marvins Code.

Übersetzt in das Betriebssystem-Modell:

- **Skills** → NanoClaw/Claude Code Skills, kein "Code-Review-Agent", sondern ein `review`-Skill der auf Anfrage läuft — mit dokumentierten Kriterien (was wird geprüft, was ist die Definition of Done)
- **Kontext** → `/workspace/group/` als shared context, `wolfgang-projects.md` als lebendige Projektübersicht, Codebase-Verständnis via LSP/Indexierung, nicht je-Agent-Wissen; alle Agenten teilen dasselbe Verständnis der Architektur
- **Tools** → git, Blogwatcher CLI, agent-browser, Tailscale
- **Governance** → CLAUDE.md (Persönlichkeit, Grenzen, Kommunikationsregeln), Architekturprinzipien als Regel, sehr Hilfreich hier auf bekannte Pattern zu verweisen z.B. "Hexagonal Architecture" oder "TDD Chicago Style"
- **Agentic Layer** → Marvin + Zaphod + Claude Code
- **Lernschleife** → kuratiertes Wissens-Wiki, tägliche Gesprächszusammenfassungen, wöchentliches Memory-Reviews, PR-Feedback fließt zurück in den `review`-Skill, Architekturentscheidungen landen im Kontext.

Schlenther formuliert es so: Der Fokus verschiebt sich von "Ich mache die Arbeit" zu "Ich baue das System, das die Arbeit macht".

Für mich bedeutet das, nicht nur Anforderungen an Systeme aus Benutzersicht zu erkennen (darin bin ich geübt) sondern genauer zu Beschreiben, wie man eigentlich arbeitet. Der Kern ist: Als Entwickler/Architekt war man gut darin zu sagen **was** ein System tun soll. Jetzt muss man zusätzlich beschreiben **wie** der Agent arbeiten soll — Skills und Governance schreiben statt Code. Das ist ein anderer Muskel, und den Reflex "ich mach's schnell selbst" ist hartnäckiger denn je.

Und um bei der OS-Metapher zu bleiben, das System verbessert sich nicht durch mehr Agenten, sondern durch besser dokumentierte Skills und schärferen Kontext, also durch Qualität, nicht Quantität. Das kommt mir irgendwie bekannt vor, selten hat es in meinen Projekten geholfen einfach nur mehr Leute auf ein Problem zu werfen.

[Podcast von Felix Schlenther zum Thema](https://open.spotify.com/episode/6ZFvBga9VCnA0atmz9HXnz)

---

_Titelbild: Alter Computer, [Matt Benson](https://unsplash.com/@mattgyver) auf [Unsplash](https://unsplash.com/de/fotos/ein-alter-computer-der-neben-einer-wand-auf-dem-boden-steht-rvfm_b1C6lc)_

_Dieser Beitrag wurde als Entwurf mit KI generiert und von mir überarbeitet._
