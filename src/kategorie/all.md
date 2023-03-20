---
pagination:
  data: collections.kategorien
  size: 1
  alias: kategorie
  filter:
    - all
  #addAllPageToCollections: true
layout: empty.njk
permalink: /kategorie/{{ kategorie | slugify }}/
eleventyComputed:
  title: "Kategorie {{ kategorie }}"
---

## Beiträge der Kategorie <em>{{ kategorie }}</em> {.title}

{% set pagelist = collections.kategorien[kategorie] %}
{% include "partials/pagelist.njk" %}