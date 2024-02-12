---
categories:
  - Webseite
source: https://docs.getpelican.com/en/latest/quickstart.html
tags:
  - generator
project:
  - Private-Webseite
date: 2024-01-21T15:20
modified: 2024-02-04T18:25
---
Reading through all the documentation is highly recommended, but for the truly impatient, following are some quick steps to get started.

## Installation

Install Pelican (and optionally Markdown if you intend to use it) on Python 3.6+ by running the following command in your preferred terminal, prefixing with `sudo` if permissions warrant:

## Create a project

First, choose a name for your project, create an appropriately-named directory for your site, and switch to that directory:

Create a skeleton project via the `pelican-quickstart` command, which begins by asking some questions about your site:

For questions that have default values denoted in brackets, feel free to use the Return key to accept those default values [1](https://docs.getpelican.com/en/latest/quickstart.html#tzlocal-fn). When asked for your URL prefix, enter your domain name as indicated (e.g., `https://example.com`).

## Create an article

You cannot run Pelican until you have created some content. Use your preferred text editor to create your first article with the following content:

```
Title: My First Review
date: 2010-12-03T10:20
Category: Review

Following is a review of my favorite mechanical keyboard.
```

Given that this example article is in Markdown format, save it as `~/projects/yoursite/content/keyboard-review.md`.

## Generate your site

From your project root directory, run the `pelican` command to generate your site:

Your site has now been generated inside the `output/` directory. (You may see a warning related to feeds, but that is normal when developing locally and can be ignored for now.)

## Preview your site

Open a new terminal session, navigate to your project root directory, and run the following command to launch Pelican’s web server:

Preview your site by navigating to [http://localhost:8000/](http://localhost:8000/) in your browser.

Continue reading the other documentation sections for more detail, and check out the Pelican wiki’s [Tutorials](https://github.com/getpelican/pelican/wiki/Tutorials) page for links to community-published tutorials.