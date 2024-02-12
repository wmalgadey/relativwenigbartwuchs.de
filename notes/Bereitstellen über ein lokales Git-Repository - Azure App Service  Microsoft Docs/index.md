[https://docs.microsoft.com/de-de/azure/app-service/deploy-local-git?tabs=cli](https://docs.microsoft.com/de-de/azure/app-service/deploy-local-git?tabs=cli)

  

![[logo-ms-social.png]]

|Stammverzeichnisdateien|
|---|
|[[ASP.NET (nur Windows)]]|
|[[ASP.NET Core]]|
|[[PHP]]|
|[[Ruby (nur Linux)]]|
|[[Node.js]]|
|[[Python]]|
|[[HTML]]|
|[[WebJobs]]|

  
  

Hinweis

Wenn Sie in Visual Studio entwickeln, kann [Visual Studio ein Repository für Sie erstellen](https://docs.microsoft.com/de-de/azure/devops/repos/git/creatingrepo?tabs=visual-studio). Das Projekt kann sofort über Git bereitgestellt werden.

Führen Sie [`az webapp create`](https://docs.microsoft.com/de-de/cli/azure/webapp) mit der Option `--deployment-local-git` aus. Beispiel:

```
az webapp create --resource-group <group-name> --plan <plan-name> --name <app-name> --runtime "<runtime-flag>" --deployment-local-git
```

Die Ausgabe enthält eine URL wie `https://<deployment-username>@<app-name>.scm.azurewebsites.net/<app-name>.git`. Verwenden Sie diese URL zum Bereitstellen Ihrer App im nächsten Schritt.

Führen Sie [`az webapp deployment source config-local-git`](https://docs.microsoft.com/de-de/cli/azure/webapp/deployment/source) aus. Beispiel:

```
az webapp deployment source config-local-git --name <app-name> --resource-group <group-name>
```

Die Ausgabe enthält eine URL wie `https://<deployment-username>@<app-name>.scm.azurewebsites.net/<app-name>.git`. Verwenden Sie diese URL zum Bereitstellen Ihrer App im nächsten Schritt.

|Title|Unable to access '[siteURL]': Failed to connect to [scmAddress]|Die App wird nicht ordnungsgemäß ausgeführt.|Starten Sie die App im Azure-Portal. Die Git-Bereitstellung ist nicht verfügbar, wenn die Web-App beendet wurde.|
|---|---|---|---|
|[[Sammlung/Bereitstellen über ein lokales Git-Repository - Azure App Service Microsoft Docs/Unbenannte Datenbank/Unbenannt\|Unbenannt]]|`Couldn't resolve host 'hostname'`|Die Adressinformationen für die ‚azure‘-Remotewebsite sind falsch.|Verwenden Sie den Befehl `git remote -v`, um alle Remotewebsites zusammen mit der jeweils zugehörigen URL aufzulisten. Überprüfen Sie, ob die URL für die 'azure'-Remotewebsite korrekt ist. Entfernen Sie diese Remote-Website bei Bedarf und erstellen Sie sie mit der korrekten URL neu.|
|[[Unbenannt 6]]|`No refs in common and none specified; doing nothing. Perhaps you should specify a branch such as 'main'.`|Sie haben während `git push` keinen Branch angegeben, oder Sie haben den Wert `push.default` in `.gitconfig` nicht festgelegt.|Führen Sie `git push` erneut aus, und geben Sie dabei den Hauptbranch an: `git push azure main`.|
|[[Unbenannt 4]]|`Error - Changes committed to remote repository but deployment to website failed.`|Sie haben einen lokalen Branch gepusht, der nicht mit dem App-Bereitstellungsbranch auf „azure“ übereinstimmt.|Vergewissern Sie sich, dass Current Branch gleich `master` ist. Um den Standardbranch zu ändern, verwenden Sie die Anwendungseinstellung `DEPLOYMENT_BRANCH`.|
|[[Unbenannt 2]]|`src refspec [branchname] does not match any.`|Sie haben versucht, einen anderen Branch als den Hauptbranch mithilfe von Push in das „azure“-Remoterepository zu übertragen.|Führen Sie `git push` erneut aus, und geben Sie dabei den Hauptbranch an: `git push azure main`.|
|[[Unbenannt 3]]|`RPC failed; result=22, HTTP code = 5xx.`|Dieser Fehler kann auftreten, wenn Sie versuchen, ein großes Git-Repository über HTTPS mithilfe von Push zu übertragen.|Ändern Sie die Git-Konfiguration auf dem lokalen Computer, um den `postBuffer` zu vergrößern. Beispiel: `git config --global http.postBuffer 524288000`.|
|[[Unbenannt 5]]|`Error - Changes committed to remote repository but your web app not updated.`|Sie haben eine Node.js-App mit einer Datei von Typ _package.json_ bereitgestellt, die zusätzliche erforderliche Module angibt.|Überprüfen Sie die Fehlermeldungen vom Typ `npm ERR!` vor diesem Fehler, um mehr Kontext zu erhalten. Es folgen die bekannten Ursachen für diesen Fehler und die entsprechenden Meldungen vom Typ `npm ERR!`:**Falsch formatierte „package.json“-Datei**: `npm ERR! Couldn't read dependencies.`**Systemeigenes Modul verfügt über keine binäre Verteilung für Windows**:`npm ERR! \cmd "/c" "node-gyp rebuild"\ failed with 1` oder `npm ERR! [modulename@version] preinstall: \make \| gmake\`|