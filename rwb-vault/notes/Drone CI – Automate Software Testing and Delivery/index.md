---
categories:
  - Webseite
source: https://www.drone.io/
tags:
  - devops
  - devel
---
[![](https://www.drone.io/images/og-image.jpg)](https://www.drone.io/images/og-image.jpg)

---

![[og-image.jpg]]

Drone is a self-service Continuous Integration platform for busy development teams.

### Configuration as a code

Pipelines are configured with a simple, easy‑to‑read file that you commit to your git repository.

Each Pipeline step is executed inside an isolated Docker container that is automatically downloaded at runtime.

[Get started](https://docs.drone.io/)

```
kind: pipeline
steps:
- name: test
  image: node
  commands:
  - npm install
  - npm test
services:
- name: database
  image: mysql
  ports:
  - 3306
```

- Drone integrates seamlessly with multiple source code management systems, including GitHub, GitHubEnterprise, Bitbucket, and GitLab.
- Drone natively supports multiple operating systems and architectures, including Linux x64, ARM, ARM64 and Windows x64.
- Drone works with any language, database or service that runs inside a Docker container. Choose from thousands of public Docker images or provide your own.

Drone uses containers to drop pre‑configured steps into your pipeline. Choose from hundreds of existing plugins, or create your own.

```
kind: pipeline

steps:
- name: test
  image: golang
  commands:
  - go test
  - go build

- name: publish
  image: plugins/docker
  settings:
    repo: octocat/hello-world
    tags: [ latest, 1.0, 1 ]

```

## Customization When You Need It

Drone makes advanced customization easy. Implement custom access controls, approval workflows, secret management, yaml syntax extensions and more.

- Simple Configuration
    
    Don’t waste time configuring your build servers. Choose from thousands of Docker images and Drone will auto-provision your environment.
    
- Don’t worry about conflicting builds on shared servers. Every build runs in an isolated Docker container, giving you full control.
- Why choose between simplicity and scalability? Drone installs from a single binary and scales automatically.

## Install Drone in Minutes

Download our official Docker image or build from source. No need to talk with a sales person or request a trial license.

When we started using containers, Drone was the obvious choice. We moved from Jenkins to Drone deploying about 15,000 times a quarter.