---
source: https://docs.microsoft.com/de-de/windows/terminal/tutorials/powerline-setup
---
Powerline bietet eine angepasste Erfahrung für die Eingabeaufforderung, die Farbcodierungen und Aufforderungen für den Git-Status bietet.

![[powerline-powershell.png]]

In diesem Tutorial erfahren Sie, wie Sie die folgenden Aufgaben durchführen:

- Einrichten von Powerline in PowerShell
- Einrichten von Powerline in Ubuntu/WSL
- Hinzufügen fehlender Powerline-Glyphen

## Voraussetzungen

### Installieren einer Powerline-Schriftart

Powerline verwendet Glyphen, um die Eingabeaufforderung zu formatieren. Wenn Ihre Schriftart keine Powerline-Glyphen enthält, werden an der Eingabeaufforderung möglicherweise mehrere Unicode-Ersetzungszeichen „▯“ angezeigt. Obwohl [Cascadia Mono](https://docs.microsoft.com/de-de/windows/terminal/cascadia-code) keine Powerline-Glyphen enthält, können Sie Cascadia Code PL oder Cascadia Mono PL installieren, die die Powerline-Glyphen enthalten. Diese Schriftarten können auf der GitHub-Seite mit [Cascadia Code-Versionen](https://github.com/microsoft/cascadia-code/releases) installiert werden.

## Einrichten von Powerline in PowerShell

### PowerShell-Voraussetzungen

Wenn Sie dies nicht bereits erledigt haben, [installieren Sie Git für Windows](https://git-scm.com/downloads).

Installieren Sie mit PowerShell Posh-Git und Oh-My-Posh:

```
Install-Module posh-git -Scope CurrentUser
Install-Module oh-my-posh -Scope CurrentUser
```

Tipp

Möglicherweise müssen Sie NuGet installieren, wenn es auf Ihrem System noch nicht vorhanden ist. Wenn dies der Fall ist, werden Sie in der PowerShell-Befehlszeile gefragt, ob Sie NuGet installieren möchten. Wählen Sie [Y] (Ja) aus. Möglicherweise müssen Sie auch genehmigen, dass Module aus [PSGallery](https://docs.microsoft.com/de-de/powershell/scripting/gallery/getting-started?view=powershell-7), einem „nicht vertrauenswürdigen Repository“, installiert werden. Wählen Sie [Y] (Ja) aus.

[Posh-Git](https://github.com/dahlbyk/posh-git) fügt Git-Statusinformationen zu Ihrer Eingabeaufforderung sowie die Befehlszeilenergänzung für Git-Befehle, Parameter, Remotes und Branchnamen hinzu. [Oh-My-Posh](https://github.com/JanDeDobbeleer/oh-my-posh) bietet Designfunktionen für Ihre PowerShell-Eingabeaufforderung.

Wenn Sie PowerShell Core verwenden, installieren Sie PSReadline:

```
Install-Module -Name PSReadLine -Scope CurrentUser -Force -SkipPublisherCheck
```

Mit [PSReadline](https://docs.microsoft.com/de-de/powershell/module/psreadline/?view=powershell-6) können Sie die Bearbeitungsumgebung für die Befehlszeile in PowerShell anpassen.

### Anpassen der PowerShell-Eingabeaufforderung

Öffnen Sie Ihr PowerShell-Profil mit `notepad $PROFILE` oder dem Texteditor Ihrer Wahl. Dabei handelt es sich nicht um Ihr Windows Terminal-Profil. Ihr PowerShell-Profil ist ein Skript, das bei jedem Start von PowerShell ausgeführt wird. [Weitere Informationen zu PowerShell-Profilen](https://docs.microsoft.com/de-de/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7).

Fügen Sie in Ihrem PowerShell-Profil am Ende der Datei Folgendes hinzu:

```
Import-Module posh-git
Import-Module oh-my-posh
Set-Theme Paradox
```

Nun beginnt jede neue Instanz mit dem Import von Posh-Git und Oh-My-Posh und legt dann das Paradox-Design von Oh-My-Posh fest. Oh-My-Posh verfügt über mehrere [integrierte Designs](https://github.com/JanDeDobbeleer/oh-my-posh#themes).

### Festlegen von Cascadia Code PL als Schriftart in den Einstellungen

Um die Schriftart Cascadia Code PL für die Nutzung in Powerline festzulegen (nach dem Herunterladen, Entzippen und Installieren auf dem System), müssen Sie Ihre [Profileinstellungen](https://docs.microsoft.com/de-de/windows/terminal/customize-settings/profile-settings) in Ihrer settings.json-Datei öffnen, indem Sie im Dropdownmenü von Windows Terminal **Einstellungen** (STRG+,) auswählen.

Suchen Sie in der geöffneten settings.json-Datei das Windows PowerShell-Profil, und fügen Sie `"fontFace": "Cascadia Code PL"` hinzu, um Cascadia Code PL als Schriftart anzugeben. Dadurch werden diese hübschen Cascadia Code Powerline-Glyphen bereitgestellt. Die Änderung sollte in Ihrem Terminal sichtbar werden, sobald Sie im Editor **Speichern** auswählen.

Die settings.json-Datei mit Ihren Windows PowerShell-Profileinstellungen sollte jetzt wie folgt aussehen:

```
{
    // Make changes here to the powershell.exe profile.
    "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
    "name": "Windows PowerShell",
    "commandline": "powershell.exe",
    "fontFace": "Cascadia Code PL",
    "hidden": false
},
```

## Einrichten von Powerline in WSL Ubuntu

### Voraussetzungen für WSL Ubuntu

Ubuntu verfügt über mehrere Powerline-Optionen für die Installation. In diesem Tutorial werden Go und Powerline-Go verwendet:

```
sudo apt install golang-go
go get -u github.com/justjanne/powerline-go
```

### Anpassen der Ubuntu-Eingabeaufforderung

Öffnen Sie die `~/.bashrc`-Datei mit `nano ~/.bashrc` oder dem Text-Editor Ihrer Wahl. Dies ist ein Bash-Skript, das bei jedem Start von bash ausgeführt wird. Fügen Sie Folgendes hinzu, aber beachten Sie, dass GOPATH möglicherweise bereits vorhanden ist:

```
GOPATH=$HOME/go
function _update_ps1() {
    PS1="$($GOPATH/bin/powerline-go -error $?)"
}
if [ "$TERM" != "linux" ] && [ -f "$GOPATH/bin/powerline-go" ]; then
    PROMPT_COMMAND="_update_ps1; $PROMPT_COMMAND"
fi
```

## Zusätzliche Ressourcen

- [Scott Hanselman „How to Make a Pretty prompt in Windows Terminal“ (Erstellen einer ansprechenden Eingabeaufforderung in Windows Terminal)](https://www.hanselman.com/blog/HowToMakeAPrettyPromptInWindowsTerminalWithPowerlineNerdFontsCascadiaCodeWSLAndOhmyposh.aspx)
- [[ho]]