---
title: Red, Green, Refactor
date created: 2012-02-04
categories:
  - Kommentar
tags:
  - entwicklung
  - kommentar
  - maschinen
  - mein-leben-als-entwickler
  - test-driven-development
  - type/post
type: post
preview: images/red_green_refactor_tshirt.jpg
date modified: 2024-02-04T18:04
---

Für die, denen **red, green, refactor** nichts sagt. _Rot_ steht für einen fehlerhaften Test, _grün_ für einen der Läuft und _refactor_ macht man wenn man nix rotes sieht! Und das weiß ich, weil ich das sehr gut zu lesende Buch [Test-Driven Development by Kent Beck](http://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530) gelesen habe. Zum Buch sei kurz angemerkt, dass es sehr nett geschrieben ist. Herr Beck versteht es angenehm auflockernde Nebensätze einzubauen.

## Ich bin kein Code für eine Nacht, oder wieso ich den Wald vor lauter Bäumen nicht sehe...

Zum Thema Test-Driven (oder TDD) hab ich eine unglaublich divergente Meinung. Ich habe zwar mit meinen 33 Jahren schon einige Jahre Entwickler-Dasein auf dem Buckel, aber mich begeistern neue Ideen und Konzepte ungemein. Auf der Firma laufe ich daher schon seit Wochen mit neuen Erkentnissen aus dem Reich der Tests herum und erzähle sie jedem der es nicht hören will.

Das klingt jetzt nach einem großen Spass und viel begeisterung für TDD. Leider sieht es aber anders aus, als es scheint. Test-Driven klingt in erster Linie wie das Elysium der Programmierung. Baust du deine Anwendung Test-Driven, dann hast du nie wieder Probleme damit. Alternativ wird die Möglichkeit, die Granularität der Entwicklung jederzeit bis auf atomare Operation herunter zu fahren hervorgehoben. Beides sind schöne Dinge, ja wenn... Ja wenn Sie denn umzusetzen sind.

Für Test-Driven muss sich auch in meinem offenen und interessierten Kopf noch einiges ändern.

## Was macht Test-Driven so anders, so unbrauchbar für meine aktuelle Arbeit?

- Für TDD müssen die Anforderungen bis ins Detail ausformuliert sein. Ein Test kann keine abstrakte Formulierung beinhalten. Da muss stehen "1 + 2 = 3" und nicht "Addiere zwei Zahlen". Erst wenn man es schafft, jedes Problem auf eine solch konkrete Ebene zu bringen (und damit auch die Schranken des Systems zu ermitteln), kann Test-Driven beginnen. Wenn man direkt mit Use-Cases arbeitet, mag das schneller gehen. Wir haben aber in einem 3-Entwickler-Haus keine Erfahrung mit Use-Cases in dieser Form.
- Es nützt nichts, wenn es nur einer macht. Das ganze Team muss Test-Driven entwickeln. Gerade, wenn man zusammen an einem Projekt arbeitet bringt es nicht, wenn der Gegenüber einem die Test ständig zerhaut. Klar kann man für sich damit beginnen, aber das ganze Team muss diese Entscheidung tragen. Denn es dauert unter Umständen viel länger, bis ich Test-Driven etwas sehe (außer red, green :))
- Das Werkzeug muss dafür geeignet sein. Visual Studio ist im Grunde dafür geeignet. Es ist dafür aber nicht gemacht. Das ist ein entscheidender Unterschied. Man kann damit arbeiten, aber gerade bei Test-Driven ist es wichtig, so wenig Reibung wie möglich zu erzeugen. Dauern Tests zu lange, oder ist es zu Aufwendig sie zu Erzeugen oder auszuführen, ist Test-Driven ein Problem.
- Es geht darum, dem Entwickler das beste Gefühl zu geben, das er haben kann. Vertrauen in den Code. Das ist unglaublich wichtig. Denn damit kann man auf lange Sicht an einem Projekt erfolgreich arbeiten. Wenn ich dafür aber umständlich lange wege in kauf nehmen muss, vergesse ich bald das große, heere Ziel und entwickle wie früher. Quick'n'Dirty...
- Ich entwickle zu einem großteil Anwendungen die einen Hauptteil der Aufgaben im UI erfüllen. LOB oder _line of business_ Anwendungen erfordern also erstmal ein korrektes UI. Auch wollen die Stakeholder gerne etwas sehen. Es nützt mir also nichts, wenn die Infrastruktur da ist und funktioniert, wenn ich noch kein Formular erzeugt habe.
- Wenn ich Test-Driven entwickle, darf ich nicht zu viele Schritte vorraus machen. Am besten sind granulare, atomare Schritte. Ändere eine Zeile (laufen die Test?), ändere eine weitere Zeile (laufen die Test?). Das ist eine tolle Vorgehensweise. Leider verliere ich dabei den Blick für das große ganze. Die Angst ist dann einfach da, das ich mir mit den gerade erzeugten Strukturen einen Weg verbaue, oder das das später Refaktoring teuer wird.

## Die Vorteile einer Test getriebenen Softwarearchitektur habe ich verstanden

Den Wunsch danach verinnerlicht. Leider scheitert die Umsetztung enorm. Für rein funktionale Anwendungen (COM-Server, Bibliotheken) werde ich nichts anderes mehr nehmen. Aber für eine GUI-zentrierte Anwendung im C#/WPF Umfeld weiß ich nicht, wo ich da Anfangen soll.

- Man kann das Entity-Framework ist nicht Test-Driven verwenden. Im Grunde kann man Linq nicht testdriven entwickeln, da Linq in der klinisch reinen Testumgebung anders läuft als in der laufenden Anwendung, die auf eine Datenbank zugreift.
- "Dann teste doch mit Datenbank..." Klar, dann bin ich aber nicht mehr schnell und dann führt die warterei auf Datenbank, oder das hinzufügen eines weiteren Testfalles in die Datenbank, oder das Aufräumen der Datenbank für die nächsten Test dazu, dass zu viele Schritte im vorraus mache. Denn wenn es eines gibt, dass keine von uns zu viel hat, dann ist es Zeit.
- Nur weil ich im Test in einer Eigenschaft einen Wert stehen habe, sehe ich den noch lange nicht im UI. Denn gerade in WPF funktioniert alles über Binding. Es muss (dank der Tests ;)) alles über Binding laufen. Wenn das Binding aber niemand refrecht, dann hab ich ein Problem
- "Dann fake doch das Binding..." Klar, dann muss ich erstmal die Sturkutren des Binding-Mechanismus verstehen, analysieren und nachbauen. Evtl. habe ich dann 10-15 nutzlose Klassen erzeugt, die nur dafür da sind, dass ich testen kann.

## Warum schreibt das keiner mal richtig auf?

Am liebsten würde ich mir wünsche, es schreibt mal jemand auf, wie er eine vollständige, komplexe Anwendung Test-Driven entwickelt hat.

- Welche Fragen hat er sich vor den Tests gestellt?
- Wie hat er die vielen Abhängigkeiten ausgeräumt?
- Wann hat der funktionen eingefügt, die für den Test nicht wichtig waren, aber z.B. für die GUI?
- Wann und mit welchen Argumenten wurden Werkzeuge, Frameworks und Tools ausgesucht oder abgelehnt?

Keine Frage: "separation of concerns" ist ein prima Konzept, aber wer sagt denn, womit sich eine Klasse beschäftigen soll oder darf? So dass war jetzt genug Bullshit-Bingo hier. Ich geht jetzt weiter coden und mach meine nicht Test getriebene Anwendung weiter... STRG+F5 anstatt STRG+R +T
