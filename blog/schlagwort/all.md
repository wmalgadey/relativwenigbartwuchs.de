---
pagination:
  data: collections.tags
  size: 1
  alias: tag
  addAllPagesToCollections: true
  filter:
    - all
    - familie
layout: empty.njk
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
{% set pagelist = collections.tags[tag] %}

## Schlagwort <em>{{ tag }}</em> {.title .is-spaced}

## Alle {{ pagelist.length }} Beiträge... {.subtitle .is-4}

{% include "partials/pagelist.njk" %}
