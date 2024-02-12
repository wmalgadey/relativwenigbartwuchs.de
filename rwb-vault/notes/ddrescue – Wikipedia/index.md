---
title: ddrescue
categories:
  - Webseite
status: gefunden
source: https://de.wikipedia.org/wiki/Ddrescue
tags:
  - data-rescue
area:
  - Feuerwehreins-tze
---

# ddrescue

[![](https://upload.wikimedia.org/wikipedia/commons/7/72/Ddrescue_2.png)](https://upload.wikimedia.org/wikipedia/commons/7/72/Ddrescue_2.png)

---

Bildschirmausgabe von ddrescue

![[600px-Ddrescue_2.png]]

**GNU ddrescue** (von engl. [to rescue](https://de.wiktionary.org/wiki/en:rescue))[[1]](https://de.wikipedia.org/wiki/Ddrescue\#cite_note-gddrescue_versus_ddrescue-1) ist ein Kommandozeilenprogramm zur Datenwiederherstellung. Das Programm kopiert Daten aus einer Datei oder von einem [blockorientierten Gerät](https://de.wikipedia.org/wiki/Ger%C3%A4tedatei#Blockorientierte_Ger%C3%A4te) ([Festplatte](https://de.wikipedia.org/wiki/Festplattenlaufwerk), [CD-ROM](https://de.wikipedia.org/wiki/CD-ROM) oder dergleichen) in eine andere Datei oder auf ein anderes blockorientiertes Gerät. Auch bei Lesefehlern versucht es, die Daten so weit wie irgend möglich wiederzugeben; dabei werden Bereiche mit Lesefehlern zunächst großzügig übersprungen und zurückgestellt, um sich erst später möglichst nah an nicht mehr zu lesende Bereiche heranzutasten. Im Angesicht der (bei möglicherweise drohendem Komplettausfall begrenzten) Restlebensdauer des Datenträgers wird dadurch erreicht, zunächst große Mengen an problemlos zu lesenden Daten zu kopieren, ehe man sich mit zeitraubenden wiederholten Leseversuchen an defekten Stellen abarbeitet.

Antonio Diaz Diaz begann mit der Entwicklung von ddrescue im Sommer 2004, um Daten aus einer fehlerhaften CD-ROM zu retten, nachdem er kein Programm fand, das seinen Ansprüchen für diese Aufgabe genügte.

Diaz war und ist der alleinige Entwickler und Programmierer von ddrescue und bezeichnet es als ein zwar etwas komplexes, aber kleines Projekt, für das daher nicht mehr als ein Entwickler benötigt wird.[[2]](https://de.wikipedia.org/wiki/Ddrescue\#cite_note-diaz-interview-2)

ddrescue unterscheidet sich von [dd](https://de.wikipedia.org/wiki/Dd_(Unix)) durch einen ausgeklügelten Algorithmus, der Daten von aussetzenden Laufwerken auf eine Weise kopiert, bei der so wenig weiterer Schaden verursacht wird wie möglich.[[3]](https://de.wikipedia.org/wiki/Ddrescue\#cite_note-3)

GNU ddrescue ist nicht identisch mit dem älteren Hilfsprogramm `dd_rescue` von Kurt Garloff.[[1]](https://de.wikipedia.org/wiki/Ddrescue\#cite_note-gddrescue_versus_ddrescue-1)

Namen der Programme und ihrer Programmpakete

|Debian u. ä.|
|---|
|[[gddrescue 2]]|
|[[– 2]]|

  
  

Zwar gibt es ein Shell Script namens `dd_rhelp`, das Garloffs `dd_rescue` mehrfach aufruft, um etwas Ähnliches zu leisten wie GNU ddrescue; jedoch soll die Zusammenarbeit von `dd_rescue` und `dd_rhelp` laut Antonio Diáz Diáz und anderen vergleichsweise ineffizient sein.[[2]](https://de.wikipedia.org/wiki/Ddrescue\#cite_note-diaz-interview-2)

Eine kurze Protokolldatei von ddrescue; wenn mehr Fehler aufgetreten sind, kann solch eine Datei viel länger sein.

[![](https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ddrescue_log_file.png/700px-Ddrescue_log_file.png)](https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ddrescue_log_file.png/700px-Ddrescue_log_file.png)

Laut seinem Programmautor kann ddrescue vor allem für zwei Aufgaben verwendet werden:[[2]](https://de.wikipedia.org/wiki/Ddrescue\#cite_note-diaz-interview-2)

1. die Wiederherstellung der Daten einer defekten Festplatte auf einer anderen Festplatte
2. das Löschen aller guten Sektoren einer Festplatte unter Beibehaltung der fehlerhaften, um die Festplatte zur Reklamation an den Hersteller schicken zu können, ohne unnötig eigene Daten preiszugeben.

GNU ddrescue hat den differenziertesten Algorithmus zur Änderung von Blockgrößen, den es in einer [Open-Source-Software](https://de.wikipedia.org/wiki/Open-Source-Software) gibt.[[4]](https://de.wikipedia.org/wiki/Ddrescue\#cite_note-4)[[5]](https://de.wikipedia.org/wiki/Ddrescue#cite_note-5) Es gilt als bedeutendes Datenwiederherstellungswerkzeug[[6]](https://de.wikipedia.org/wiki/Ddrescue#cite_note-6)[[7]](https://de.wikipedia.org/wiki/Ddrescue#cite_note-7) und wird professionell eingesetzt.[[8]](https://de.wikipedia.org/wiki/Ddrescue#cite_note-8)

Wenn man die _Mapfile-Option_ von ddrescue benutzt, werden die Daten besonders effizient kopiert, weil nur die benötigten Blöcke gelesen werden. Darüber hinaus kann man dadurch die Datenwiederherstellung jederzeit unterbrechen und später an derselben Stelle fortsetzen.

Automatische Kombination von [gesicherten Daten](https://de.wikipedia.org/wiki/Datensicherung): Hat man bereits mehrere beschädigte Abbilder einer Datei, einer CD-ROM oder eines anderen blockorientierten Speichers vorliegen, so kann ddrescue diese verwenden, um ein Abbild mit minimalen Fehlerblöcken zu kompilieren; im Idealfall gar ein fehlerfreies. Ansonsten wird ddrescue unter Verwendung der als Parameter anzugebenden Protokolldatei (engl. mapfile) beim zweiten und jedem folgenden Kopiervorgang nur die Blöcke lesen, die noch benötigt werden.

Der Autor von ddrescue empfiehlt, Sicherungen mit [lzip](https://de.wikipedia.org/wiki/Lzip) zu komprimieren, weil das Lzip-Format für die Langzeitarchivierung von Daten ausgelegt ist und Datenwiederherstellungsfunktionen bietet, die gut die Fähigkeiten von ddrescue ergänzen. Wenn der Datenverlust in einer Datei auf einem beschädigten Datenträger beruht, ist eine Zusammenarbeit von ddrescue und Lziprecover die beste Möglichkeit zur Wiederherstellung von Daten aus mehreren beschädigten Kopien.

ddrescue kann ausgewählte Teile der Ausgabedatei überschreiben (fill mode). Damit können zum Beispiel Daten gelöscht oder fehlerhafte Sektoren gekennzeichnet werden und in manchen Fällen beschädigte Sektoren wieder nutzbar gemacht werden.[[9]](https://de.wikipedia.org/wiki/Ddrescue\#cite_note-9)

Die einfachste und in der Regel beste Möglichkeit, ddrescue zu verwenden, ist _ddrescue quelle ziel mapfile_ ohne spezielle Parameter. Dies ist anstelle der Verwendung von [dd](https://de.wikipedia.org/wiki/Dd_(Unix)) bereits dann sinnvoll, wenn man auch nur den leisen Verdacht hat, das Gerät, von dem man das Image ziehen will, könnte Lesefehler produzieren. Beispiel: angenommen eine zu sichernde alte Diskette befinde sich im Laufwerk /dev/sdg, so startet man

```
ddrescue /dev/sdg  myfloppy.img  myfloppyddrescue_map
```

wobei sicherzustellen ist, dass das Laufwerk nicht oder nur zum Lesen gemountet ist. Nach dem Start zeigt ddrescue laufend an, welche Bereiche es gerade liest oder zu lesen versucht. Ist der Lesevorgang sofort oder nach einigen Versuchen fehlerfrei, so erhält man damit schnellstmöglich ein fehlerfreies Abbild. myfloppyddrescue_map enthält eine einfache, lesbare Liste mit Bereichen mit und ohne Fehler. Im Idealfall ist das nur ein Bereich von der Gesamtgröße der Diskettenkapazität, der als fehlerfrei markiert ist.

Die so erzeugte Datei kann unter [unixoiden Betriebssystemen](https://de.wikipedia.org/wiki/Unixoides_Betriebssystem) als [Loop device](https://de.wikipedia.org/wiki/Loop_device) gemountet werden.

```
mount -o loop,ro myfloppy.img /mnt
```

Beispiel: Mit ddrescue eine Festplatte mit zwei [Ext2](https://de.wikipedia.org/wiki/Ext2)-[Partitionen](https://de.wikipedia.org/wiki/Partition_(Informatik)\#Unter_Linux) von [/dev/sda](https://de.wikipedia.org/wiki/Ger%C3%A4tedatei#Blockorientierte_Ger%C3%A4te) auf [/dev/sdb](https://de.wikipedia.org/wiki/Ger%C3%A4tedatei#Blockorientierte_Ger%C3%A4te) wiederherstellen. Wir verwenden die nicht existierenden Gerätedateien _sdXa_ und _sdXb_ in allen untenstehenden Befehlen als Platzhalter für die tatsächlichen Gerätedateien (z. B. _sda_, _sdb_), um versehentlichen Datenverlust zu verhindern, wenn man beim Kopieren und Einfügen übersieht, einzelne Platzhalter zu ersetzen.[[10]](https://de.wikipedia.org/wiki/Ddrescue\#cite_note-10)

**Hardwarekonstellation**

Das Beispiel setzt – auch wenn andere Konstellationen möglich sind – voraus, dass vier Datenträger an den Rechner angeschlossen sind:

die wiederherzustellende oder zu kopierende Festplatte (`/dev/sdXa`), eine leere zweite Festplatte (`/dev/sdXb`), die mindestens so groß ist wie die erste, die kopiert werden soll,

Die Verwendung eines gesonderten USB-Sticks für die Mapdatei sorgt dafür, dass die Datei selbst bei einem Systemabsturz erhalten bleibt. Speichert man sie hingegen nur im (lediglich im [Arbeitsspeicher](https://de.wikipedia.org/wiki/Arbeitsspeicher) vorhandenen) Dateisystem der Live-CD, dann geht sie bei einem eventuellen Systemneustart verloren, wodurch ddrescue seine Arbeit nicht an der Stelle fortsetzen könnte, an der es unterbrochen wurde. Da ein Wiederherstellungslauf von ddrescue etliche Stunden dauern kann, ist dies ein nicht zu vernachlässigendes Risiko.

ddrescue beim Programmlauf

[![](https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Ddrescue-second_run.png/440px-Ddrescue-second_run.png)](https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Ddrescue-second_run.png/440px-Ddrescue-second_run.png)

**Die Befehlsfolge**

Der Computer wird über eine Linux-Live-CD wie Parsix, [Kanotix](https://de.wikipedia.org/wiki/Kanotix) gestartet, dann gibt man an der Kommandozeile nacheinander folgende Befehle ein:

```
ddrescue -f -n /dev/sdXa /dev/sdXb /media/myusb/rescue.map
ddrescue -d -f -r3 /dev/sdXa /dev/sdXb /media/myusb/rescue.map
fdisk /dev/sdXb
e2fsck -v -f -p /dev/sdXb1
e2fsck -v -f -p /dev/sdXb2
```

**Die Befehle im Einzelnen**

|Title|ddrescue -f -n /dev/sdXa /dev/sdXb /media/myusb/rescue.map|Der erste Durchlauf von ddrescue, bei dem nur jene Daten kopiert werden, die ddrescue problemlos lesen kann.|
|---|---|---|
|[[Sammlung/ddrescue – Wikipedia/Unbenannte Datenbank/Unbenannt 6\|Unbenannt 6]]|`ddrescue -d -f -r3 /dev/sdXa /dev/sdXb /media/myusb/rescue.map`|Zweiter Durchlauf von ddrescue, bei dem es jeden nicht problemlos zu lesenden Sektor bis zu dreimal (Parameter „`-r3`“) zu lesen versucht. Die Ausgabe des ersten Durchlaufs wird durch diesen zweiten Durchlauf ergänzt, das heißt ddrescue versucht bei diesem zweiten Durchlauf, die Lücken in der Ausgabe seines ersten Durchlaufs zu füllen.|
|[[Sammlung/ddrescue – Wikipedia/Unbenannte Datenbank/Unbenannt 5\|Unbenannt 5]]|`fdisk /dev/sdXb`|Falls die Partitionstabelle beschädigt ist, muss man in diesem Schritt versuchen, mit fdisk die Partitionstabelle zu restaurieren.|
|[[Sammlung/ddrescue – Wikipedia/Unbenannte Datenbank/Unbenannt 4\|Unbenannt 4]]|`e2fsck -v -f -p /dev/sdXb2`|Ermittelt und verbessert eventuelle Fehler im Dateisystem der von ddrescue geschriebenen Partition sdb2.|

  
  

**Einige Live-Systeme, die standardmäßig ddrescue mitbringen:**