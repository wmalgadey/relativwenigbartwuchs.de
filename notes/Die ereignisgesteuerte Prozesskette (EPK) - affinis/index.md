---
categories:
  - Webseite
status: gefunden
source: https://www.affinis.de/fachartikel/projektmanagement/ereignisgesteuerte-prozesskette-epk/
tags:
  - EPK
area:
  - Consultant
project:
  - APOSAN-Pacemaker
---
[![](https://www.affinis.de/wp-content/uploads/2019/01/ereignisgesteuerte-prozesskette-epk.jpg)](https://www.affinis.de/wp-content/uploads/2019/01/ereignisgesteuerte-prozesskette-epk.jpg)

---

Die Ereignisgesteuerte Prozesskette (EPK) wird zur Darstellung und Analyse von Standardprozessen herangezogen. Die einzelnen Elemente der Ereignisgesteuerten Prozesskette und die Verknüpfungsregeln dieser Elemente, sowie Vor- und Nachteile der Methode werden nachfolgend beschrieben.

## Objekte der ereignisgesteuerten Prozesskette

Die einzelnen Komponenten der EPK sind in der Tabelle 1 beschrieben.

![[EPK-Elemente.jpg]]

Tabelle 1: Graphische Symbole des EPK Modells (Vgl. Baumgartner, Ebert, Schleider S.6-7, Hansmann (2006), S. 205.)

## Regeln der Ereignisgesteuerten Prozesskette

_**(Vgl. Baumgartner, Ebert, Schleider S.11-15 19-21, Mands (2015), S. 17.)**_

Der Aufbau der EPK folgt einigen relativ übersichtlichen Regeln.

![[EPK-Beispiele.png]]

Abbildung 1: Beispiele für Ereignisgesteuerte Prozessketten (Vgl. Hansmann (2006), S. 206.)

Die Ausrichtung der EPK sollte möglichst von oben nach unten verlaufen.

Eine EPK darf entweder mit einem Ereignis oder einem Prozesswegweiser beginnen, aber niemals mit einer Funktion. Eine EPK endet entweder mit einem Prozesswegweiser oder einem Ergebnis (End-ereignis), aber nicht mit einer Funktion.

Ein Ereignis kann nicht direkt einem anderen Ereignis folgen bzw. bevorstehen. Ein Ereignis folgt oder geht einer Funktion voraus und hat nur eine Ausgangs- und nur eine Eingangslinie.

Eine Funktion kann nicht direkt mit einer anderen Funktion verbunden werden. Die Verbindung einer Funktion zu einem Prozesswegweiser ist ebenfalls ungültig. Mit Funktionen werden Organisationseinheiten und Informationsobjekte verknüpft. Hierzu werden Pfeile verwendet, wobei die Richtung der Pfeile den Informationsfluss beschreibt.

Die Abbildung 1a) bietet ein Beispiel für einen Informationsfluss zwischen Informationsobjekten einer Funktion.

Ein Prozesswegweiser kann nicht direkt mit einer Funktion verbunden werden, d.h. ein Prozesswegweiser folgt oder steht vor einem Ereignis und kann nur eine Ausgangs- und nur eine Eingangslinie haben.

Alle Objekte einer EPK müssen miteinander entweder durch Pfeile, im Fall von Ereignissen, Prozesswegweisern, Funktionen, Operatoren und Daten, oder, im Fall von Organisationseinheiten, mit Linien verbunden werden. Lose Objekte sind ungültig.

### Die UND-Verknüpfung der EPK

Es ist möglich, dass mehrere Ereignisse einer Funktion bevorstehen bzw. folgen, oder, dass einem Ereignis mehrere Funktionen bevorstehen, von denen eins oder mehrere zum betrachteten Zeitpunkt ihre Gültigkeit haben. Diese Fälle werden mit Hilfe von logischen Verknüpfungen (Bedingungen) abgebildet:

Die UND-Verknüpfung zeigt an, dass alle Ereignisse erfüllt sein müssen, damit eine Funktion ausgeführt werden kann, bzw. dass alle Funktionen abgeschlossen sein müssen, bevor ein Ergebnis, oder auch mehrere Ereignisse, eintritt, bzw. eintreten.

In der Abbildung 1b) ist ein Beispiel abgebildet, indem zwei Ereignisse eine Funktion anstoßen, und eine Funktion zu zwei Ereignissen (Ergebnissen) führt. Die Abbildung 2 stellt alle möglichen UND-Verknüpfungen dar.

![[UND-Verknuepfung.png]]

Abbildung 2: Erlaubte UND-Verknüpfungen

### Die ODER-Verknüpfung der EPK

Die ODER-Verknüpfung gibt an, dass mindestens ein Ereignis eingetreten sein muss, damit eine Funktion angestoßen wird bzw. das Ausführen einer Funktion zu mindestens einem Ereignis führt. Es schließt nicht aus, dass auch mehrere Ereignisse gleichzeitig eintreten können, damit eine Funktion angestoßen wird bzw. dass eine Funktion gleichzeitig zu mehreren Ereignissen führt.

In der Abbildung 3 sind alle erlaubten ODER-Verknüpfungen abgebildet.

![[ODER-Verknuepfung-uai-720x175.png]]

Abbildung 3: Erlaubte ODER-Verknüpfungen

### Die XOR-Verknüpfung der EPK

Die XOR-Verknüpfung ist eine Ausschluss-Verknüpfung, d.h. aus mehreren Ereignissen, die eine Funktion anstoßen können, muss genau eins und nur eins von mehreren eintreten, damit eine Funktion ausgeführt wird. Wenn eine Funktion zu mehreren Ereignissen führen kann, so ist bei dieser Verknüpfung nur eins von mehreren Ereignissen gültig (siehe Abbildung 1 a) EPK: Wareneingangsbeschreibung).

In der Abbildung 4 sind alle erlaubten XOR-Verknüpfungen abgebildet.

![[XOR-Verknuepfung-uai-720x175.png]]

Abbildung 4: Erlaubte XOR-Verknüpfungen

Alle logischen Verknüpfungen können entweder mehrere Eingangs-, aber dann nur eine Ausganslinie, oder mehrere Ausgangs-, aber dann nur eine Eingangslinie haben.

Im Gegensatz zur Funktion hat ein Ereignis keine Entscheidungskraft, d.h. nach einem Ereignis darf keine ODER- bzw. XOR-Verknüpfung zu mehreren Funktionen stattfinden. Abbildung 5 gibt die verbotenen Verknüpfungen wieder.

![[Verbotene-Verknuepfungen.png]]

Abbildung 5: Verbotene Verknüpfungen

## Vor- und Nachteile der Ereignisgesteuerte Prozesskett

Wie jedes Modell hat auch die EPK ihre Vor- und Nachteile:

|Vorteile|Nachteile|
|---|---|
|[[EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK EPK...]]|•  <br>Die Abbildung von kreativen und komplexen Abläufen, sowie von Überwachungstätigkeiten ist problematisch. (Vgl. Gronau (2016), S. 21)  <br>•  <br>Die Top-Down-Modellierung kann unübersichtlich werden.  <br>•  <br>Das Modell ist aufgrund der fehlenden Standardisierung wenig außerhalb Deutschlands verbreitet.|

  
  

**Tabelle 2: Vor- und Nachteile des EPK-Modells**

Trotz der genannten Nachteile, ist das Modell für die Analyse und Optimierung von Standardprozessen zu empfehlen, vor allem wenn diese noch nicht beschrieben sind.

**Literaturverzeichnis**

- **DVZ (2011):** DVZ Datenverarbeitungszentrum Mecklenburg-Vorpommern GmbH (2011) Ausgewählte Modellierungs-Notationen im Überblick, S. 12;

[http://www.cio.m-v.de/static/CIO/Dateien/KE/Prozessmanagement/Anlage_Modellierungsnotationen_im_Ueberblick_V03.pdf](http://www.cio.m-v.de/static/CIO/Dateien/KE/Prozessmanagement/Anlage_Modellierungsnotationen_im_Ueberblick_V03.pdf)

- **Baumgartner, Ebert, Schleider:** Heinz Baumgartner, Klaus Ebert, Karsten Schleider: „Regeln zur Modellierung von ereignisgesteuerten Prozessketten“ in Beilage zur kaufmännischen ZPG – Mitteilung Nr. 24, S. 6 ff.;

http://www.netzwerk-welt.de/common_files/BWL/EPK (Zuletzt aufgerufen am 07.01.2019, 17:13)

- **Schmidt (2016):** Dennis Schmidt (2016): „Modellierung von Geschäftsprozessen“, BF/M-Bayreuth, S. 17, 21-22.

[http://www.ebusinesslotse-owl.de/wp-content/uploads/Teil_2_Gesch%C3%A4ftsprozesse_Detmold_DS_20141112.pdf](http://www.ebusinesslotse-owl.de/wp-content/uploads/Teil_2_Gesch%C3%A4ftsprozesse_Detmold_DS_20141112.pdf) (Zuletzt aufgerufen am 07.01.2019, 17:16)

- **Gronau (2016):** Univ.-Prof. Dr.–Ing. habil. Norbert Gronau: „Modellierung von Geschäftsprozessen mit EPK und BPMN“ (2016), S. 21.

[https://wi.uni-potsdam.de/homepage/lehrewi.nsf/0/ceda9d16f28d54dfc1257ede003e674b/$FILE/EPK_BPMN-Modellierung.pdf](https://wi.uni-potsdam.de/homepage/lehrewi.nsf/0/ceda9d16f28d54dfc1257ede003e674b/$FILE/EPK_BPMN-Modellierung.pdf) (Zuletzt aufgerufen am 07.01.2019, 17:17)

- **Ipekbayrak (2014):** Gözde Ipekbayrak: „Eine vergleichende Betrachtung verschiedener Ansätze zur Modellierung von Prozessvarianten“ (2014, Universität Ulm), S. 8

[http://dbis.eprints.uni-ulm.de/1122/1/BA_Ipekbayrak_14.pdf](http://dbis.eprints.uni-ulm.de/1122/1/BA_Ipekbayrak_14.pdf) (Zuletzt aufgerufen am 07.01.2019, 17:20)

- **Hansmann (2006):** Dr. Karl-Werner Hansmann: Industrielles Management (2006, Oldenburg, 8. Auflage), S. 205 ff.
- **Mands (2015):** Marcel Mands: „Methoden der Geschäftsprozessmodellierung und deren Eignung zur Visualisierung von logistischen Prozessen. Aufgezeigt an Beispielen aus der Praxis.“ (2015), Hochschule für angewandte Wissenschaften Hamburg, S. 17.

[http://edoc.sub.uni-hamburg.de/haw/volltexte/2017/3983/pdf/Masterarbeit_Marcel_Mands.pdf](http://edoc.sub.uni-hamburg.de/haw/volltexte/2017/3983/pdf/Masterarbeit_Marcel_Mands.pdf) (Zuletzt aufgerufen am 07.01.2019, 17:23)

- Beitragsbild: Pixabay.com