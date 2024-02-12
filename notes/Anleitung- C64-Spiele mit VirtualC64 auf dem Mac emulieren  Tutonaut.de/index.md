---
source: https://www.tutonaut.de/anleitung-c64-spiele-mit-virtualc64-auf-dem-mac-emulieren/
---
![[VirtualC64_Teaser-780x470.jpg.webp]]

Erinnert Ihr Euch noch an den guten, alten C64? Schön – ich nämlich nicht. Mein erster Computerkontakt war ein Schneider/Amstrad CPC 128. Ich war ein Kind, es waren die 80er und Disketten waren so viel besser als Tapes. Nun… auch der C64 hatte beides, Tapes und Disketten. Und noch vieles mehr, was Menschen, die ihre Kindheit oder Jugend in den 80ern verbrachten, so gerne mögen: Erste Computererinnerungen und Spieleklassiker mit Pixelgrafik. Gut… so weit waren Amstrad und C64 nicht auseinander. Weshalb ich mich dann mal per [C64-Emulator](http://www.aptgetupdate.de/2012/07/03/virtualc64-commodore-64-emulator-fr-den-mac/) am Mac ins Vergnügen gestürzt habe.

## 1. VirtualC64 laden und installieren

Möglich wird eine Emulation des C64 das auf dem Mac mit dem erstaunlich guten Emulator VirtualC64 [des deutschen Informatikers Prof. Dr. Dirk W. Hoffmann](http://www.dirkwhoffmann.de/virtualc64/index.html): Das kostenlose Programm kommt als ZIP-Datei und muss wie beim Mac üblich einfach heruntergeladen, entpackt und in den Programme-Ordner kopiert werden. Die Installation ist danach abgeschlossen.

VirtualC64 muss nur entpackt und anschließend in den Programme-Ordner kopiert werden.

![[VirtualC64_1.jpg]]

## 2. VirtualC64 starten

Allerdings benötigt Ihr noch Zusatzsoftware, um den Emulator dann auch nutzen zu können: [[30jahrecommodoreamigasoholtihrdiespiel]] sind für den Betrieb des C64-Emulators nämlich Festspeicher-Dateien, sogenannte System-ROMs, notwendig. In diesen sind einige Kernparameter des C64 festgehalten, vergleichbar mit dem BIOS am PC oder dem EFI am Mac. Nur mit deren Hilfe könnt Ihr den Emulator in Betrieb nehmen.

Nach dem ersten Start geht erst einmal nichts: Ihr müsst erst noch System-ROMs für den C64-Emulator besorgen.

![[VirtualC64_2.jpg]]

## 3. System-ROMs einfügen

Diese ROM-Dateien könnt Ihr [kostenlos aus Internet laden](http://www.zimmers.net/anonftp/pub/cbm/firmware/computers/c64/index.html). Was Ihr braucht, sind die folgenden vier Dateien:

`Kernel Rom: kernal.901227-03.bin` `Basic Rom: basic.901226-01.bin` `Character Rom: characters.901225-01.bin` `VC1541 Rom: 1541-II.355640-01.bin (ROM des Diskettenlaufwerks)`

Diese müsst Ihr dann nur noch ins jeweilige Feld des Emulators ziehen, um den Emulator ans Laufen zu bekommen. Sind alle ROMs eingefügt, startet der Emulator. Wichtig dabei: VirtualC64 merkt sich, wo die ROMs lagen, das heißt, wenn Ihr die ROM-Dateien verschiebt, findet er sie wieder nicht. Es ist daher sinnvoll, einen Ordner „C64-ROMs“ im Programme- oder Dokumente-Ordner anzulegen und die ROM-Dateien hier dauerhaft abzulegen.

Die passenden ROM-Dateien müssen aus dem Netz geladen und in den Emulator gezogen werden.

![[VirtualC64_3.jpg]]

## 4. C64-Spiele für VirtualC64 besorgen

Der Emulator ist jetzt betriebsbereit und zeigt die bekannte C64-Basic-Oberfläche. Was Ihr jetzt noch braucht, sind die passenden Spiele. Die gibt es entweder als Disk- oder als Tape-Image. Websites, die entsprechende Dateien zum Download anbieten, gibt es genug. Wie immer hilft eine Google-Suche, etwa nach „C64 Disk Images“. Zudem gibt es eine Reihe von Websites, die Demos und Public-Domain-Spiele legal anbieten. Wichtig dabei: Auch wenn die Spiele schon lange nicht mehr hergestellt und die Softwareunternehmen längt Vergangenheit sind, gibt es immer Rechtsnachfolger, die möglicherweise auf Einhaltung der Rechte pochen. Spiele liegen entweder als TAP-Datei (Tape-Image) oder als D64-Datei (Disk-Image) vor. Da der Emulator auch die schnarchige Ladegeschwindigkeiten der Kassetten-Laufwerke emuliert, ist es natürlich sinnvoll, auf Disks zu setzen.

## 5. C64-Spiele in VirtualC64 starten

Alles, was Ihr jetzt noch tun müsst, ist die Disk- oder Tape-Datei ins Emulator-Fenster zu ziehen. Im folgenden Fenster listet der Emulator alle auf der Diskette enthaltenen Dateien auf. Mit einem Doppelklick könnt Ihr diese dann in den Arbeitsspeicher laden.

Dann passiert erst einmal… nichts. Hier war ich als Amiga-Kind dann doch etwas überfragt, bis mir ein C64-Veteran flüsterte, dass das Spiel C64 nach dem Laden erst noch mit dem RUN-Befehl gestartet werden muss. Und ich erinnerte mich: Beim Amstrad-CPC war es seinerzeit ja ähnlich. Sobald die C64-Kommandozeile nach dem Laden des Disk-Images also wieder „Ready“ anzeigt, kann das Spiel mit „run“ gestartet werden.

## 6. Retrogaming bis der Arzt kommt

Das war es dann auch schon: Das Spiel – [in unserem Fall Bubble Bobble](https://de.wikipedia.org/wiki/Bubble_Bobble) – startet und kann verwendet werden. Mir fiel auf, dass die Steuerung per Tastatur etwas knifflig ist. Allerdings kann man im laufenden Betrieb zwischen den verschiedenen Keysets und gegebenenfalls am USB-Port angeschlossenen Joysticks umschalten. Dank der hübschen Emulation der C64-Sounds kommt auch sofort echtes Retro-Feeling auf: Ich bin wieder acht Jahre alt und sitze bei meinem Cousin vor einem Zauberding namens Computer, auf dem man mit einigen bunten Pixeln und einem Competition-Pro-Joystick unendlich viel Spaß haben kann. Toll – und absolut empfehlenswert für alle Nostalgiker und solche, die es werden wollen!