---
categories:
  - Webseite
status: gefunden
source: https://www.heise.de/ct/artikel/c-t-Notfall-Windows-2021-4954598.html
tags:
  - Windows
  - data-rescue
area:
  - Feuerwehreins-tze
---
[![](https://heise.cloudimg.io/bound/1200x1200/q85.png-lossy-85.webp-lossy-85.foil1/_www-heise-de_/ct/imgs/04/3/0/0/0/3/0/1/notwin21-db9772eac49db535.jpeg)](https://heise.cloudimg.io/bound/1200x1200/q85.png-lossy-85.webp-lossy-85.foil1/_www-heise-de_/ct/imgs/04/3/0/0/0/3/0/1/notwin21-db9772eac49db535.jpeg)

---

![[notwin21-397501194ec22f2d.jpeg]]

**Unser Bausatz für das Notfall-Windows erstellt binnen Minuten ein vom USB-Stick bootfähiges, transportables Windows zur Schädlingsbekämpfung und Datenrettung.**

Der Bausatz für das Notfall-Windows erfordert einen Windows-PC nebst Internetzugang. Er erstellt ein vom USB-Stick bootfähiges, transportables Windows mit allerhand nützlichen Werkzeugen, um Windows-PCs auf Schädlinge zu überprüfen, Daten zu retten und Passwörter zurückzusetzen.

Für c't 26/2020 haben wir das Notfall-Windows erneut überarbeitet. Es kann jetzt als Basis auch die letzte reguläre Windows-10-Version (20H2) verwenden. Sie können den [Bausatz direkt hier herunterladen](https://cdnpcf.heise.de/ctnotwin21.zip) (md5 der aktualisierten Fassung: 9d60406b652ad325321662058256bafe, die der Ursprungsversion: 16645adfd8266c7dede52eeacd756cb7). Wie Sie den Bausatz und das erzeugte Notfallsystem anwenden, erklären Artikel aus c't 26/2020:

**c't-Abonnenten mit Zugriff auf digitale Inhalte können die Artikel hier lesen:**

**Ältere, vertiefende Artikel zeigen weitere Anwendungsfälle auf:**

- [Copy & Save, Windows-Installationen als Klon übertragen oder als Image sichern, c't 22/2019, S. 20](https://www.heise.de/ct/ausgabe/2019-22-Windows-Installationen-als-Klon-uebertragen-oder-als-Image-sichern-4547734.html)
- [Die Zeit zurückdrehen, Datenrettung mit dem c't-Notfall-Windows, c't 22/2019, S. 24](https://www.heise.de/ct/ausgabe/2019-22-Datenrettung-mit-dem-c-t-Notfall-Windows-4547722.html)

**heise+-Abonnenten können die Artikel hier vollständig lesen:**

### Noch mehr Tipps

Weitere Tipps zum Umgang mit dem Notfall-System und Hinweise zu den enthaltenen Werkzeugen finden Sie in überarbeiter Fassung als PDF auf dem Desktop des gestarteten Notfallsystems – sie stammen von den in den Vorjahren veröffentlichten Artikeln ab (die hier in der unberarbeiteten Fassung verlinkt sind):

Sollten Sie weder in den Artikeln noch hier die nötige Hilfestellung finden, schauen Sie doch im Forum vorbei. Gern können Sie uns auch per E-Mail Fragen stellen. Richten Sie diese bitte an notwin21@ct.de und fügen Sie bei Bauproblemen gleich ein [Log im HTML-Format](https://www.heise.de/ct/artikel/c-t-Notfall-Windows-2021-4954598.html#anchor_1) an.

### Bausatz-Aktualisierung und Updates

Mit dem Veröffentlichen von Updates, die automatisch in den Bauprozess einfließen und meist nur wenige MByte groß sind, aktualisieren wir sporadisch den Bausatz. Hier finden Sie jeweils eine kurze Erklärung der Änderungen:

Update 1, 6.12.20: korrigiertes Fehler-Reporting, Warnung bei aktiven überwachten Ordnern, die das Schreiben von USB-Sticks mit Rufus verhindern

Update 2, 11.12.20: Erkennung von überwachten Ordnern auf alten Windows-Versionen ohne passendes Cmdlet deaktiviert, Opera experimentell hinzugefügt, Basic-Build-Option raus, Num-Lock ausgeschaltet lassen

Update 3, 14.12.20: wegen Kopierproblemen Freecommander durch Multicommander ersetzt, sichere Auswahl des Verzeichnis mit Windows-Installationsdateien ([wg. eines PEBakery-Bugs](https://www.heise.de/ct/artikel/c-t-Notfall-Windows-2021-4954598.html#anchor_2))

Update 4, 18.5.21: Probleme beim Einbau von SumatraPDF behoben (Veröffentlichung als Update, das beim Bauen eingebunden wird und als neues ZIP-Archiv mit neuer md5 9d60406b652ad325321662058256bafe)

Update 5, 19.5.21: Klarere Warnmeldung, wenn Versionen der verarbeiteten .WIM-Dateien nicht passen, was vereinzelt zu Problemen mit Windows 10 20H2 geführt hat (schwarzer Schirm nach Start des Notfallsystems) – deswegen auch die geänderte Empfehlung für die etwas älteren Eval-ISOs.

Update 6, 27.8.21: die letzte Aktualisierung von Autoruns aus der Sysinternals-Suite enthält weniger Dateien im ZIP-Archiv. Das überarbeitete Bauskript für dieses Werkzeug kopiert die entfallenen Dateien jetzt nicht mehr und läuft so erfolgreich durch.

Update 7, 10.11.21: Versionsnummer von MultiCommander angepasst; Download schlug fehl.

### Download Windows-Eval-ISOs

Empfohlen seit 19.5.2021:

- [Windows 10, 2004, x64 (64 Bit)](https://software-download.microsoft.com/download/pr/19041.264.200511-0456.vb_release_svc_refresh_CLIENTENTERPRISEEVAL_OEMRET_x64FRE_de-de.iso), md5: 219edcda684fa6de532482780064bd99
- [Windows 10, 2004, x86 (32 Bit)](https://software-download.microsoft.com/download/pr/19041.264.200511-0456.vb_release_svc_refresh_CLIENTENTERPRISEEVAL_OEMRET_x86FRE_de-de.iso), md5: c5d36b6c5663e010f62c684da2e8f883

Ursprüngliche Empfehlung:

- [Windows 10, 20H2, x64 (64 Bit)](https://software-download.microsoft.com/download/pr/19042.508.200927-1902.20h2_release_svc_refresh_CLIENTENTERPRISEEVAL_OEMRET_x64FRE_de-de.iso), md5: 2269cda98d8107af371647ccb5175b7c
- [Windows 10, 20H2, x86 (32 Bit)](https://software-download.microsoft.com/download/pr/19042.508.200927-1902.20h2_release_svc_refresh_CLIENTENTERPRISEEVAL_OEMRET_x86FRE_de-de.iso), md5: a861a306e364ab9ccd8dec23d32f3465

Ältere Releases:

- [Windows 10, 1903, x64 (64 Bit)](https://software-download.microsoft.com/download/pr/18362.30.190401-1528.19h1_release_svc_refresh_CLIENTENTERPRISEEVAL_OEMRET_x64FRE_de-de.iso), md5: 9407a205c4a9b76af4828958ee8964e3
- [Windows 10, 1903, x86 (32 Bit)](https://software-download.microsoft.com/download/pr/18362.30.190401-1528.19h1_release_svc_refresh_CLIENTENTERPRISEEVAL_OEMRET_x86FRE_de-de.iso), md5: ea53fecdf21abcc564c7a8ec912f736a
- [Windows 10, LTSC, 1809, x64 (64 Bit)](https://software-download.microsoft.com/download/sg/17763.107.101029-1455.rs5_release_svc_refresh_CLIENT_LTSC_EVAL_x64FRE_de-de.iso), Re-Release, md5: 7fc69f19b63c57dd2feba110222ce0b5
- [Windows 10, LTSC, 1809, x86 (32 Bit)](https://software-download.microsoft.com/download/sg/17763.107.101029-1455.rs5_release_svc_refresh_CLIENT_LTSC_EVAL_x86FRE_de-de.iso), Re-Release, md5: 2c74f070564311e228eb590840d7d373
- [Windows 10, 1803, x64 (64 Bit)](https://software-download.microsoft.com/download/pr/17134.1.180410-1804.rs4_release_CLIENTENTERPRISEEVAL_OEMRET_x64FRE_de-de.iso), md5: 7e5de046248c730015a71c602b929220
- [Windows 10, 1803, x86 (32 Bit)](https://software-download.microsoft.com/download/pr/17134.1.180410-1804.rs4_release_CLIENTENTERPRISEEVAL_OEMRET_x86FRE_de-de.iso), md5: 3a77678628fe3f0c42be1c8eecb8ea78
- [Windows 10, 1709, x64 (64 Bit)](http://download.microsoft.com/download/9/4/E/94E5BB0D-D2D7-4F91-A1A2-3976E39BAF14/16299.15.170928-1534.rs3_release_CLIENTENTERPRISEEVAL_OEMRET_x64FRE_de-de.iso), md5: 5fedb59f7e86653c7bf393c193fe7130
- [Windows 10, 1709, x86 (32 Bit)](http://download.microsoft.com/download/9/4/E/94E5BB0D-D2D7-4F91-A1A2-3976E39BAF14/16299.15.170928-1534.rs3_release_CLIENTENTERPRISEEVAL_OEMRET_x86FRE_de-de.iso), md5: bb26fe2649e8d274c362e777588a94f4

Unter Windows 10 können Sie die md5-Summen der ISOs und auch die des ZIP-Archivsdes Bausatzes mit dem eingebauten Befehl certutil in einer Eingabeaufforderung überprüfen (der Name der ISO-Datei muss dabei angepasst werden):

`certutil -hashfile windows.iso MD5`

### Vermeintliche Viren-Funde

Dauerthema bei Bausätzen für ein Windows-PE-basiertes Notfallsystem sind Fehlalarme von Antivirus-Software beim Entpacken der Zip-Archive, beim Bauen oder auch im Betrieb, wenn ein Scanner das laufende System untersucht. Wir prüfen die Bausätze des Notfall-Windows deshalb vor Veröffentlichung und haben die Ergebnisse und Methoden erstmals 2017 [in einem eigenen Artikel zusammengefasst](https://www.heise.de/ct/ausgabe/2017-21-Vom-c-t-Notfall-Windows-getriggerte-Viren-Alarme-3840078.html).

Der aktuellen Ausgabe des c't-Notfall-Windows sind wir ebenfalls wieder zu Leibe gerückt und dabei auf die in der folgenden Tabelle genannten Programme gestoßen, die den einen oder anderen VIrenscanner auf den Plan rufen. Die Tabelle dokumentiert nur Dateien, die mehr als zwei Scanner Alarm schlagen lassen. Nach bestem Wissen und Gewissen handelt es sich dabei um Fehlalarme, die meist durch heuristische Verfahren ausgelöst werden – wirkliche Malware verwendet ähnliche Verfahren oder Techniken.

**Programmname**

**Funktionsbeschreibung**

### Hilfestellungen bei Antiviren-Alarm

Wenn der Bausatz feststellt, dass eine Sicherheitssoftware im Bauverzeichnis aktiv ist, empfiehlt er den Abbruch.

Wie Antivirus-Software auf den aktuellen Bausatz reagiert, scheint von der Tagesform des jeweiligen Programms abzuhängen. Microsofts eigener Defender torpediert in der aktuellen Fassung jeden Versuch, weil er ein zentrales Download-Werkzeug in Quarantäne schickt. Die Plausibilitätsprüfung erkennt das üblicherweise und bricht den Bauvorgang ab.

Mit einer Ausnahmeregel für das von Ihnen verwendete Bauverzeichnis (im Beispiel c:\ctnot) können Sie dieses Eingreifen unterbinden.

Eine Ausnahme für das zum Bauen verwendete Verzeichnis lässt den Defender stillhalten.

Wenn unsere Plausiblitätsprüfung zugeschlagen hat oder eine Antivirus-Software andere Dateien aus dem Verkehr gezogen hat, ist die Bausubstanz in der Regel beschädigt. Löschen Sie dann unbedingt das Bauverzeichnis und entpacken Sie das Zip-Archiv erneut.

### Probleme beim Bespielen eines USB-Sticks

Bei aktivem "Überwachten Ordnerzugriff" braucht es eine Ausnahmeregel, damit Rufus das Notfallsystem auf einen USB-Stick schreiben kann.

Wenn in einer Windows-Installation der "Überwachte Ordnerzugriff" eingeschaltet ist, misslingt das Beschreiben von USB-Sticks mit Rufus. Es gibt Fehlermeldungen, dass der Zugriff auf das Gerät verweigert würde. In den Windows-Sicherheitseinstellungen besteht die Möglichkeit, einzelne Programme von der Überwachung auszunehmen. Die Option heißt "App durch überwachten Ordnerzugriff zulassen". Wenn Sie unserer Empfehlung für die Benennung des Bauordners gefolgt sind, müsste dort c:\ctnot\Projects\Tools\rufus-3.12p.exe eingetragen werden.

### Probleme bei der Auswahl der Windows-Installationsdateien

Wählen Sie das Verzeichnis mit den Windows-Installationsdateien (2) unbedingt unterhalb von "Dieser PC" (1) aus. Wenn Sie hingegen das Laufwerk weiter unten (3) auswählen, kommt diese Auswahl aufgrund eines Bugs nicht in PEBakery an.

Die von uns eingesetzte PEBakery-Version hat Schwierigkeiten beim Festlegen des Verzeichnis mit den Windows-Installationsdateien. Es erscheint dann der Hinweis "install.wim image was not found ...", obwohl das ausgewählte Laufwerk existiert und die Datei im Ordner sources vorhanden ist.

Der Fehler tritt auf, je nachdem, auf welche Weise man in den Windows-Standarddialogen das Laufwerk mit den Dateien auswählt.

Wenn die Auswahl des Verzeichnis mit den Windows-Installationsdateien nicht geklappt hat oder Sie den Vorgang abbrechen, erscheint diese Meldung. Der Bauvorgang misslingt dann.

Seit Update 3 überprüft der Bausatz, ob die Auswahl geklappt hat. Ist das nicht der Fall gibt er einen entsprechenden Warnhinweis aus.

### Build-Logs als Beispiel

Die folgenden Logs im HTML-Format sind mit der ersten veröffentlichten Fassung entstanden. Sie verwenden als Basis beide Windows 10 (20H2).Die Gesamtlaufzeit des Bauens liegt über 10 Minuten. Das lag daran, dass einige Downloads länger als üblich dauerten. Als Referenz sind auch die Logs der 32-Bit-Version beigefügt, die beim Beschreiben eines USB-Sticks entstehen (CreateISO) und das Systemlog, das PEBakery optional sichert.

Bitte etwas Geduld beim Rendern im Browser die Dateien sind einige MByte groß:

[Buildlog, 64-Bit, Windows 20H2](https://www.heise.de/ct/downloads/04/3/0/0/0/3/0/1/ctnot21_v100_20h2_64bit_buildlog.html)

[Buildlog, 32-Bit, Windows 10 20H2](https://www.heise.de/ct/downloads/04/3/0/0/0/3/0/1/ctnot21_v100_20h2_32bit_buildlog.html)

[Log CreateISO, 32-Bit, Windows 20H2](https://www.heise.de/ct/downloads/04/3/0/0/0/3/0/1/ctnot21_v100_20h2_32bit_buildlog_createiso.html)

[Systemlog, 32-Bit, Windows 20H2](https://www.heise.de/ct/downloads/04/3/0/0/0/3/0/1/ctnot21_v100_20h2_32bit_systemlog.html)

Die von PEBakery angelegten Protokolle (Logs) helfen bei einer eventuellen Fehlersuche. Zum Exportieren klicken Sie zunächst im „Log Viewer“ auf „Export“ (1). Wählen Sie im Dialog „Export Logs“ als Format „HTML“ (2). Nach dem Betätigen von „Export“ (3) erfragt das Programm einen Pfad zum Speichern des Protokolls und öffnet es anschließend in einem Browserfenster.

Wenn Sie uns Build-Logs schicken wollen: Das Log-Fenster öffnet sich nach einem Baulauf automatisch, lässt sich aber auch später noch über den Log-Knopf in der Kopfzeile des PEBakery-Fensters öffnen. Über Drop-Downfelder können Sie gezielt einen Baulauf auswählen. PEBakery sichert die Daten über Programmläufe hinweg.

Noch ein Hinweis zum Speichern: Der Log-Export gelingt nicht in jedes Verzeichnis. Auf den Desktop gelingt er ebenso wie in das Bauverzeichnis. In Dokumente hingegen will die Exportfunktion nicht speichern.

### Videos zum Bauvorgang

Bewegte Bilder sagen mehr als tausend Worte: Wir haben die typischen Handgriffe eines Bauvorgangs mit einem Screencast-Programm aufgezeichnet und mit Untertiteln versorgt; geringe Abweichungen zum Verhalten sind möglich, weil die Videos noch mit der vorletzten Version entstanden sind:

Bauvorgang – Vorbereiten und starten

Bauvorgang – Abschließen und Protokoll sichern

Bauvorgang – USB-Stick bespielen

Kommentare

[](https://www.heise.de/forum/c-t/Kommentare-zu-c-t-Artikeln/c-t-Notfall-Windows-2021/forum-462971/comment/)[**Kommentare lesen (347 Beiträge)**](https://www.heise.de/forum/c-t/Kommentare-zu-c-t-Artikeln/c-t-Notfall-Windows-2021/forum-462971/comment/)[](https://www.heise.de/forum/c-t/Kommentare-zu-c-t-Artikeln/c-t-Notfall-Windows-2021/forum-462971/comment/)

Anzeige[](https://pubads.g.doubleclick.net/gampad/clk?id=5945133834&iu=/6514/www.heise.de/clicktracking/usAd)[](https://pubads.g.doubleclick.net/gampad/clk?id=5945133834&iu=/6514/www.heise.de/clicktracking/usAd)

![[Huawei_OA-08171b4a69eafbcf.jpg]]

Anzeige