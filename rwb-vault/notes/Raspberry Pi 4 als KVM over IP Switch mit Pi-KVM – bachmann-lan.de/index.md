---
source: https://www.bachmann-lan.de/raspberry-pi-4-als-kvm-over-ip-switch/
---
Eine vollwertige KVM over IP Konsole mit einem Raspberry Pi, ein bischen zusätzlicher Hardware und [**Pi-KVM**](https://pikvm.org/).

Server oder Workstations können damit vollständig remote verwaltet werden. Unabhängig vom Zustand des Betriebssystems.  
Probleme beheben, BIOS konfigurieren oder einfach das Betriebssystem mithilfe der virtuellen CD-ROM oder des Flash-Laufwerks neu installieren.  

Meine Anleitung basiert auf der DIY v2 Variante mit einem Raspberry Pi 4 und einer HDMI zu CSI-2 Bridge. (empfohlenes Setup)

## benötigte Hardware

- Raspberry Pi 4 (die 2GB Variante ist ausreichend)
- microSD Karte (mindestens 16GB Class 10)
- HDMI zu CSI-2 Modul (Video Capture Karte, geringe Latenz ~100ms, basiert auf dem TC358743 Chip) [AliExpress](https://de.aliexpress.com/item/4000102166176.html) oder [Amazon](https://www.amazon.de/gp/product/B08B1CCNS7/ref=ox_sc_act_title_1?smid=A2PBQMPS4N8CJ2&psc=1)
- HDMI Kabel (von der Capture Karte zum PC ⇒ Bildsignal)
- USB-A auf USB-C Kabel (vom Power Splitter zum PC ⇒ Tastatur, Maus)
- USB-C auf USB-C Kabel (vom Power Splitter zum Pi ⇒ Stromversorgung)
- [USB-C Power Splitter](https://www.tindie.com/products/8086net/usb-cpwr-splitter/), 3x USB-C (damit kann das originale Pi Netzteil verwendet werden)
- [VGA auf HDMI Konverter](https://www.amazon.de/gp/product/B088699FJV/ref=ppx_yo_dt_b_asin_title_o01_s01?ie=UTF8&psc=1) (wenn der Server nur VGA hat)

Das HDMI/CSI-2 Modul hab ich bei Amazon bestellt da ich nicht so lange warten wollte. ;)  
Der USB-C Splitter von Tindie war in 4 Tagen aus England da!  

![[raspberry-pi-kvm-hw-all-components.jpg]]

![[raspberry-pi-kvm-hw-hdmi-csi-bridge.jpg]]

![[raspberry-pi-kvm-hw-usb-c-splitter.jpg]]

## Pi-KVM OS installieren

Das fertige Image [herunterladen](https://pikvm.org/download.html) und mit dem [Win32 Disk Imager](https://sourceforge.net/projects/win32diskimager/) auf die microSD Karte schreiben. (**v2-hdmi-rpi4.img.bz2**)

![[raspberry-pi-kvm-flash-image.png]]

Per SSH kann man sich jetzt mit dem Pi-KVM verbinden. (Benutzer und Passwort: root)

![[raspberry-pi-kvm-ssh-login.png]]

Nach der ersten Installation sollte das System aktualisiert werden.

Passwörter ändern.

Das Webinterface im Browser aufrufen. **https://pikvm** oder **https://ip-adresse** (Benutzer und Passwort: admin)

![[raspberry-pi-kvm-web-login.png]]

![[raspberry-pi-kvm-web-main.png]]

Von einer hochgeladenen ISO booten.

![[raspberry-pi-kvm-iso-boot-1.png]]

![[raspberry-pi-kvm-iso-boot-2.png]]

![[raspberry-pi-kvm-iso-boot-3.png]]

Dell Server mit dem VGA auf HDMI Konverter.

![[raspberry-pi-kvm-dell-boot-1.png]]

![[raspberry-pi-kvm-dell-boot-2.png]]

## Pi-KVM Gehäuse

Ich hab noch keine Ahnung wie ich alles gut und geschützt in ein Gehäuse packen soll, mal schauen. Vielleicht gibt’s eine 1HE Variante für’s Serverrack ;)

![[raspberry-pi-kvm-aufbau.jpg]]

### Pi-KVM Case Mod \#1 (Netgear FS108)

- Gehäuse eines Netgear FS108 Switch (bekommt man für ein paar Euro auf [ebay](https://www.ebay.de/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=netgear+fs108&_sacat=0))
- kurzes USB-C Kabel, 20cm ([Amazon](https://www.amazon.de/gp/product/B00WG674IW/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1))
- M3 Schrauben, Muttern, Distanzhülsen, Unterlegscheiben
- den LED Block hab ich aus der Platine rausgetrennt, kommt mit einem 330 Ohm Widerstand an den Pi als Power LED (Pin 6 GND, Pin 8 TxD)
- die Bohrungen der Platinen auf 3mm erweitern
- damit es keine Kurzschlüsse gibt, ein Stück Plastik unter dem Pi und LED Ausschnitt befestigen
- Streifen Lochblech um vorne den Ausschnitt zu verdecken (ist aus nem alten PC Gehäuse)

Alles gut geschützt in einem soliden Metallgehäuse untergebracht. (Lackierung folgt…)

## Pi-KVM Misc

- [Pi-KVM Tips](https://github.com/pikvm/pikvm#tips)
- [Pi-KVM Cookbook](https://github.com/pikvm/pikvm/blob/master/pages/cookbook.md)
- [Pi-KVM on YouTube](https://www.youtube.com/watch?v=9YhPWjWv5gw)

## Pi-KVM v3 coming soon…

Wer nicht selber basteln will kann auf die v3 warten, ein HAT für den Pi 4. Soll ab April 2021 für ca. $130 verfügbar sein.

- [https://github.com/pikvm/pikvm#the-future-v3-platform-work-in-progress](https://github.com/pikvm/pikvm#the-future-v3-platform-work-in-progress)