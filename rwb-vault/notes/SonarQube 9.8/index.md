---
categories:
  - Webseite
source: https://docs.sonarqube.org/latest/
tags:
  - devops
---
[SonarQube](http://www.sonarqube.org/) is a self-managed, automatic code review tool that systematically helps you deliver _clean code_. As a core element of our [Sonar solution](https://www.sonarsource.com/), SonarQube integrates into your existing workflow and detects issues in your code to help you perform continuous code inspections of your projects. The tool analyses [30+ different programming languages](https://rules.sonarsource.com/) and integrates into your [CI pipeline](https://docs.sonarqube.org/latest/analyzing-source-code/ci-integration/overview/) and [DevOps platform](https://docs.sonarqube.org/latest/devops-platform-integration/github-integration/) to ensure that your code meets high-quality standards.

## Writing clean code

Writing clean code is essential to maintaining a healthy codebase. We define clean code as code that meets a certain defined standard, i.e. code that is reliable, secure, maintainable, readable, and modular, in addition to having other key attributes. This applies to all code: source code, test code, infrastructure as code, glue code, scripts, etc.

Sonar's [Clean as You Code](https://docs.sonarqube.org/latest/user-guide/clean-as-you-code/) approach eliminates many of the pitfalls that arise from reviewing code at a late stage in the development process. The Clean as You Code approach uses your [quality gate](https://docs.sonarqube.org/latest/user-guide/quality-gates/) to alert/inform you when there’s something to fix or review in your [new code](https://docs.sonarqube.org/latest/project-administration/defining-new-code/) (code that has been added or changed), allowing you to maintain high standards and focus on code quality.

## Developing with Sonar

![[sonar-development-workflow.png]]

The Sonar solution performs checks at every stage of the development process:

- [SonarLint](https://www.sonarlint.org/) provides immediate feedback in your IDE as you write code so you can find and fix issues before a commit.
- SonarQube’s [PR analysis](https://docs.sonarqube.org/latest/analyzing-source-code/pull-request-analysis/) fits into your CI/CD workflows with SonarQube’s PR analysis and use of quality gates.
- [Quality gates](https://docs.sonarqube.org/latest/user-guide/quality-gates/) keep code with issues from being released to production, a key tool in helping you incorporate the Clean as You Code methodology.
- The [Clean as You Code](https://docs.sonarqube.org/latest/user-guide/clean-as-you-code/) approach helps you focus on submitting new, clean code for production, knowing that your existing code will be improved over time.

Learn more about the [types of issues](https://docs.sonarqube.org/latest/user-guide/issues/) that SonarQube detects.

Organizations start off with a default set of rules and metrics called the [Sonar way quality profile](https://docs.sonarqube.org/latest/instance-administration/quality-profiles/). This can be customized per project to satisfy different technical requirements. Issues raised in the analysis are compared against the conditions defined in the quality profile to establish your quality gate.

A [quality gate](https://docs.sonarqube.org/latest/user-guide/quality-gates/) is an indicator of code quality that can be configured to give a go/no-go signal on the current release-worthiness of the code. It indicates whether your code is clean and can move forward.

- A passing (green) quality gate means the code meets your standard and is ready to be merged.
- A failing (red) quality gate means there are issues to address.

SonarQube provides feedback through its UI, email, and in decorations on pull or merge requests (in commercial editions) to notify your team that there are issues to address. Feedback can also be obtained in SonarLint supported IDEs when running in [connected mode](https://docs.sonarqube.org/latest/user-guide/sonarlint-connected-mode/). SonarQube also provides in-depth guidance on the issues telling you why each issue is a problem and how to fix it, adding a valuable layer of education for developers of all experience levels. Developers can then address issues effectively, so code is only promoted when the code is clean and passes the quality gate.

## Getting started

Now that you've heard about how [SonarQube](https://www.sonarqube.org/) can help you write clean code, you are ready to [try out SonarQube for yourself](https://docs.sonarqube.org/latest/try-out-sonarqube/). You can run a local non-production instance of SonarQube and initial project analysis. Installing a local instance gets you up and running quickly, so you can experience SonarQube firsthand. Then, when you're ready to set up SonarQube in production, you'll need to [install the server](https://docs.sonarqube.org/latest/setup-and-upgrade/install-the-server/) before configuring your first code analysis.

The [Analyzing source code](https://docs.sonarqube.org/latest/analyzing-source-code/overview/) section explains how to set up all flavors of analysis, including how to analyze your project’s branches and pull requests.

## More getting started resources

## Learn more

## Staying connected

Use the following links to get help and support:

© 2008-2022, SonarSource S.A, Switzerland. Except where otherwise noted, content in this space is licensed under a [Creative Commons Attribution-NonCommercial 3.0 United States License.](https://creativecommons.org/licenses/by-nc/3.0/us/) SONARQUBE is a trademark of SonarSource SA. All other trademarks and copyrights are the property of their respective owners.