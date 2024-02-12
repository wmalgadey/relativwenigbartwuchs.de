---
pagination:
  data: collections.kategorien
  size: 1
  alias: kategorie
  filter:
    - all
layout: empty.njk
permalink: /kategorie/{{ kategorie | slugify }}/
eleventyComputed:
  title: Kategorie {{ kategorie }}
tags:
  - type/moc
type: moc
date: git Last Modified
modified: 2024-02-04T18:26
title: Beiträge der Kategorie {{ kategorie }} {.title}
---

## Beiträge der Kategorie <em>{{ kategorie }}</em> {.title}

{% set pagelist = collections.kategorien[kategorie] %}
{% include "partials/pagelist.njk" %}