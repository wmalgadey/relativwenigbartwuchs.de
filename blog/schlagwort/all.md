---
pagination:
  data: collections.schlagworte
  size: 1
  alias: tag
  addAllPagesToCollections: true
  filter:
    - all
    - familie
layout: partials/empty.njk
permalink: /schlagwort/{{ tag | slugify }}/
eleventyComputed:
  title: Schlagwort {{ tag }}
tags:
  - type/moc
type: moc
date created: git Last Modified
date modified: 2024-02-04T12:34
title: Beiträge mit dem Schlagwort {{ tag }} {.title}
---

## Beiträge mit dem Schlagwort <em>{{ tag }}</em> {.title}

{% set pagelist = collections.schlagworte[tag] %}
{% include "partials/pagelist.njk" %}
