---
pagination:
  data: collections.categories
  size: 1
  alias: category
  filter:
    - all
    - parents
layout: partials/empty.njk
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

## Beiträge der Kategorie <em>{{ category }}</em> {.title}

{% set pagelist = collections.categories[category] %}
{% include "partials/pagelist.njk" %}