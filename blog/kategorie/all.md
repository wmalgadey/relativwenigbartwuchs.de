---
pagination:
  data: collections.categories
  size: 1
  alias: category
  filter:
    - all
    - parents
layout: empty.njk
permalink: /kategorie/{{ category }}/
eleventyComputed:
  title: Kategorie {{ category | categorylabel }}
tags:
  - type/moc
type: moc
date created: git Last Modified
date modified: 2024-02-04T18:26
title: Beiträge der Kategorie {{ category }} {.title}
---
{% set pagelist = collections.categories[category] %}

## Kategorie <em>{{ category | categorylabel }}</em> {.title}

## Alle {{ pagelist.length }} Beiträge... {.subtitle .is-4}

{% include "partials/pagelist.njk" %}
