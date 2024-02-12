---
source: https://docs.microsoft.com/de-de/visualstudio/install/build-tools-container?view=vs-2019
---
![[assets/logo-ms-social 3.png|logo-ms-social 3.png]]

Warnung

Diese Dockerfile-Beispieldatei kann lediglich bei älteren Windows SDKs nicht verwendet werden, die nicht in Containern installiert werden können. Bei älteren Releases schlägt der Buildbefehl fehl.

Hinweis

Wenn der Docker-Container nicht gestartet werden kann, liegt vermutlich ein Visual Studio-Installationsproblem vor. Sie können das Dockerfile aktualisieren, um den Schritt zu entfernen, der den Visual Studio-Batchbefehl aufruft. Dadurch können Sie den Docker-Container starten und die Installationsfehlerprotokolle lesen.

Entfernen Sie die Parameter `C:\\BuildTools\\Common7\\Tools\\VsDevCmd.bat` und `&&` aus dem Befehl `ENTRYPOINT` in Ihrer Dockerfile-Datei. Der Befehl sollte nun wie folgt lauten: `ENTRYPOINT ["powershell.exe", "-NoLogo", "-ExecutionPolicy", "Bypass"]`. Erstellen Sie das Dockerfile dann neu, und führen Sie den Befehl `run` aus, um auf die Containerdateien zuzugreifen. Navigieren Sie zum Verzeichnis `$env:TEMP`, und suchen Sie die Datei `dd_setup_<timestamp>_errors.log`, um die Installationsfehlerprotokolle zu finden.

Nachdem Sie das Installationsproblem identifiziert und behoben haben, können Sie die Parameter `C:\\BuildTools\\Common7\\Tools\\VsDevCmd.bat` und `&&` wieder zum Befehl `ENTRYPOINT` hinzufügen und Ihr Dockerfile neu erstellen.