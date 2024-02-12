---
source: https://sourceboat.com/blog/dependabot-automatisierung-gitlab
---
Mit Dependabot lassen sich die Abhängigkeiten von Software-Projekten automatisiert aktualisieren. Dies funktioniert nicht nur mit Open Source Projekten auf GitHub - wir haben Dependabot in unserer privaten GitLab-Instanz selbst aufgesetzt, um unsere Projekte aktuell und somit sicher zu halten.

![[blog_thumbnail_dependabot-aca57aa4203baa37134b9f05c41d8107.jpg]]

Es ist eine der wichtigsten Aufgaben, die eigene Software und deren Abhängigkeiten auf dem neusten Stand zu halten, um ausreichende Sicherheit zu gewährleisten. Dennoch wird es oftmals als lästige Aufgabe empfunden und bereitet langfristig eine Vielzahl von Problemen, wenn das Thema vernachlässigt wird. Manuell ist das nur mit guten und regelmäßigen Routinen vereinbar.

[Dependabot](https://dependabot.com/) schafft hier Abhilfe, indem die Paket-Abhängigkeiten eines Projektes aktualisiert werden, sobald die jeweiligen Updates erscheinen. Dabei werden eine Vielzahl von Sprachen unterstützt - für uns besonders relevant sind [Docker](https://dependabot.com/docker), [PHP](https://dependabot.com/php), [JavaScript](https://dependabot.com/javascript), [Elixir](https://dependabot.com/elixir) und [Go](https://dependabot.com/go).

Sowie Dependabot für ein Projekt eingerichtet ist, werden die konfigurierten Abhängigkeiten in eigens festgelegten Intervallen auf Updates überprüft. Im Fall von JavaScript wird die `package.json` analysiert, im Fall von PHP die `composer.json` geprüft und für Docker-Updates wird die `FROM`-Anweisung in der jeweiligen `Dockerfile` entsprechend mit _Docker Hub_ abgeglichen. Sollte ein Update verfügbar sein, wird ein entsprechender Merge Request erstellt.

![[dependabot-merge-request.png]]

Merge Request von Dependabot

Hierbei sucht Dependabot automatisch nach verfügbaren Informationen wie Changelogs, Release Notes oder entsprechenden Commits seit dem letzten Update und verlinkt diese direkt im Merge Request.

## Vom SaaS zur Open Source Software

Ursprünglich war Dependabot ein Software as a Service für Projekte auf GitHub.com. Öffentliche Projekte waren kostenlos und private Projekte konnten kostenpflichtig eingebunden werden. Mittlerweile wurde [Dependabot von GitHub gekauft](https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/) und soll fest in die Plattform integriert werden. Es lassen sich zwar jegliche Arten von Projekten hinzufügen - das funktioniert nach dem Login via GitHub auch recht einfach, jedoch eben nur mit Projekten auf GitHub.

Allerdings wird der Kern von Dependabot komplett Open Source entwickelt, sodass es möglich ist, eine eigene Instanz zu betreiben. Das hat es uns ermöglicht Dependabot in unserer eigenen GitLab-Instanz (und für einen weiteren Kunden auch auf GitLab.com) aufzusetzen. Die dafür relevanten Repositories sind Folgende:

- [`dependabot/dependabot-core`](https://github.com/dependabot/dependabot-core), das Herzstück von Dependabot. Es enthält die Logik, um Abhängigkeiten sämlticher Sprachen aufzulösen und zu aktualisieren und die entprechenden Merge Requests auf GitHub, GitLab oder Azure DevOps zu erstellen.
- [`dependabot/dependabot-script`](https://github.com/dependabot/dependabot-script) demonstriert die Verwendung von `dependabot-core`. Anhand dieses Beispiels wird der Setup für ein oder mehrere eigene Projekte deutlich.

Für einen reibungslosen Ablauf mit einer aktuellen GitLab-Version unter der Verwendung von Docker-Runnern sind allerdings kleine Anpassungen nötig. Wie unser Setup aussieht, zeigen wir im folgenden Abschnitt.

## Setup via GitLab

Vorraussetzung für den folgenden Dependabot Setup ist ein frisches GitLab Projekt und Runner, die den [Docker executor](https://docs.gitlab.com/runner/executors/docker.html) nutzen. Es empfiehlt sich außerdem, einen separaten Benutzer für Dependabot anzulegen. Dieser erhält dann Zugriff auf die zu überprüfenden Projekte und wird dafür verwendet, die Merge Requests automatisiert anzulegen. Die eigentliche Arbeit passiert in CI Jobs via [planmäßiger Pipelines](https://docs.gitlab.com/ee/ci/pipelines/schedules.html), die für jedes Projekt individuell eingerichtet werden können.

Es ist im Folgenden übrigens irrelevant, ob es sich um GitLab.com oder eine private Instanz handelt. Bei uns läuft das Script sowohl in der privaten Instanz, als auch für einen Kunden auf GitLab.com.

### Das Projekt aufsetzen

Für den reibungslosen Ablauf werden genau sechs Dateien benötigt. Als Basis für den Setup können die Inhalte von [`dependabot/dependabot-script`](https://github.com/dependabot/dependabot-script) verwendet werden. Wir benötigen jedoch nicht alles und müssen zudem einige Anpassungen vornehmen.

Zunächst können die Inhalte von [`.ruby-version`](https://github.com/dependabot/dependabot-script/blob/main/.ruby-version), [`Gemfile`](https://github.com/dependabot/dependabot-script/blob/main/Gemfile) und [`Gemfile.lock`](https://github.com/dependabot/dependabot-script/blob/main/Gemfile.lock) übernommen werden. Diese beinhaltet die Ruby-Abhängigkeiten für die Dependabot-Anwendung. Außerdem legen wir eine Datei mit dem Namen `update.rb` an und verwenden den Inhalt aus [`generic-update-script.rb`](https://github.com/dependabot/dependabot-script/blob/main/generic-update-script.rb). In dieser Datei befindet sich die eigentliche Update-Logik.

Damit wir die verwendete Dependabot-Version selbst steuern können, erstellen wir unser eigenes Docker Image. Das hat den Vorteil, dass wir die Aktualisierung der Dependabot-Version selbst automatisieren können. Das wäre nicht möglich, wenn wir die Version in der `.gitlab-ci.yml` fest definieren würden. Wir legen also folgende überschaubare `Dockerfile` an:

```
FROM dependabot/dependabot-core:0.118.7
```

Ein netter Nebeneffekt ist zudem, dass wir das Image in unserer eigenen Registry lagern. Somit sind wir zumindest an dieser Stelle nicht auf Docker Hub angewiesen. Um das Image zu bauen, füllen wir die `.gitlab-ci.yml` mit folgender Job-Definition:

```
build:
  image:
    name: gcr.io/kaniko-project/executor:debug-v0.24.0
    entrypoint: [""]
  script:
    - echo "{\"auths\":{\"$CI_REGISTRY\":{\"username\":\"$CI_REGISTRY_USER\",\"password\":\"$CI_REGISTRY_PASSWORD\"}}}" > /kaniko/.docker/config.json
    - /kaniko/executor --context $CI_PROJECT_DIR --dockerfile Dockerfile --destination $CI_REGISTRY_IMAGE:latest --cache=true
  rules:
    - if: $CI_COMMIT_BRANCH == "master" && $CI_PIPELINE_SOURCE != "schedule"
```

Dann ergänzt man den Basis-Job für Dependabot, von dem alle weiteren sprachspezifischen Jobs erben.

```
.dependabot:
  image: $CI_REGISTRY_IMAGE:latest
  variables:
    PACKAGE_MANAGER: $CI_JOB_NAME
    COMPOSER_MEMORY_LIMIT: -1
  before_script:
    - mkdir ~/.ssh
    - echo "$SSH_KNOWN_HOSTS" >> ~/.ssh/known_hosts
    - chmod 644 ~/.ssh/known_hosts
    - bundle install -j $(nproc) --path vendor
  script:
    - echo $PROJECT_PATH
    - bundle exec ruby ./update.rb
  cache:
    paths:
      - vendor/
```

Damit das `before_script` einwandfrei funktioniert, muss die Umgebungsvariable `SSH_KNOWN_HOSTS` unter _Settings > CI / CD > Variables_ im Projekt angelegt werden. Diese füllt man dem `ssh-keyscan`-Ergebnis der GitLab-Instanz:

```
$ ssh-keyscan gitlab.mycompany.com
...
```

Desweiteren müssen folgende Umgebungsvariablen gesetzt sein, damit Dependabot Zugriff zu den Projekten gewährt wird. Letztere dient dazu, dass man nicht das Rate Limit der GitHub-Schnitstelle erreicht:

- `GITLAB_HOSTNAME`: der Hostname der GitLab-Instanz (z.B. `gitlab.com` oder `gitlab.mycompany.com`)
- `GITLAB_ACCESS_TOKEN`: ein Personal Access Token des oben erwähnten Dependabot-Benutzers mit den Scopes `api`, `read_repository` und `write_repository`
- `GITHUB_ACCESS_TOKEN`: ein Personal Access Token auf GitHub.com mit dem Scope `public_repo`

Nun fehlen nur noch die Job-Definitionen für die unterschiedlichen Programmiersprachen. Alle verfügbaren Sprachen sind in der [`.gitlab-ci.example.yml`](https://github.com/dependabot/dependabot-script/blob/main/.gitlab-ci.example.yml) einsehbar. Es schadet nicht alle hinzuzufügen.

Für NPM bzw. Yarn sieht das wie folgt aus:

```
npm_and_yarn:
  extends: .dependabot
  only:
    variables:
      - $PACKAGE_MANAGER_SET =~ /(\bnpm|yarn\b)/
```

Jedoch wird [seit GitLab 13.0](https://about.gitlab.com/releases/2020/05/06/gitlab-com-13-0-breaking-changes/) eine neue Syntax bevorzugt:

> The use of only and except is discouraged in favor of rules. rules provides more verbose and expressive job execution logic that is less complex to evaluate and understand. […] We have documentation available for help migrating your templates.

Wir haben das in unserem Fall wie folgt gelöst:

```
npm_and_yarn:
  extends: .dependabot
  rules:
    - if: $CI_PIPELINE_SOURCE == "schedule" && $PACKAGE_MANAGER_SET =~ /(\bnpm|yarn\b)/
```

Sofern alle Sprachen ergänzt sind, ist der Grundstein gelegt - die Magie passiert im nächsten Schritt.

### Die Scheduled Pipelines einrichten

Die [Pipeline Schedules](https://docs.gitlab.com/ee/ci/pipelines/schedules.html) im Dependabot-Projekt stellen quasi unsere Oberfläche und Übersicht über alle eingerichteten Projekte dar. Pro Projekt legt man eine geplante Pipeline an, welche das Dependabot Update-Skript mit einem Job für die gewünschte Sprache ausführt. Das Intervall ist frei definierbar.

![[dependabot-pipeline-schedules.png]]

Scheduled Pipelines in GitLab

Beim Einrichten des Schedules müssen neben einer sinnvollen Beschreibung und dem Intervall noch drei Variablen gesetzt werden:

- `PROJECT_PATH`: der Pfad zum GitLab-Projekt (z.B. `mygroup/myproject`)
- `GITLAB_ASSIGNEE_ID`: die ID des Nutzers, welchem die erstellten Merge Requests zugewiesen werden
- `PACKAGE_MANAGER_SET`: der verwendete Paket-Manager im Projekt

Für `PACKAGE_MANAGER_SET` stehen jegliche Job-Bezeichnungen zur Verfügung, die oben angelegt wurden (z.B. `npm_and_yarn` oder `composer`). Mehrere Paket-Manager können mit Komma getrennt angegeben werden, für welche dann jeweils eigene Jobs gestartet werden. So kann dann auch Dependabot selbst aktualisiert werden, indem hier `docker,bundler` angegeben wird.

Sollten sich die Definitionsdateien der Abhängigkeiten nicht auf oberster Ebene im Projekt befinden, lässt sich der Pfad über die Umgebungsvariable `DIRECTORY_PATH` beeinflussen.

**Wichtig:** Der Dependabot User muss im gewünschten Projekt mit der Rolle `Developer` hinzugefügt sein, damit dieser Merge Requests erstellen darf.

### Abwarten und Tee trinken

Nun heißt es: warten. Dependabot prüft nun regelmäßig die Abhängigkeiten im eingerichteten Projekt und erstellt Merge Requests, sobald ein Update verfügbar ist.

Dependabot wird stetig weiterentwickelt. Wir selbst [haben uns schon eingebracht](https://github.com/dependabot/dependabot-core/issues/1730), als der Wechsel von PHP 7.3 auf 7.4 bevor stand. Leider kann Dependabot nämlich mit nur einer einzigen Version einer Sprache zur Zeit umgehen. Diese Versionen sind auch aktuell noch hart kodiert.

Wir freuen uns auch schon auf [den kommenden Dart-Support](https://github.com/dependabot/dependabot-core/issues/2166) für unsere Flutter-Apps. Seit Dart 2.8 gibt es nämlich ein `pub outdated`-Kommando, welches die Grundlage für eine Dependabot-Integration liefert.

### Weitere Beiträge