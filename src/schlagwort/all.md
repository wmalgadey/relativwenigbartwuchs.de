---
pagination:
  data: collections
  size: 1
  alias: tag
  addAllPageToCollections: true
  filter:
    - familie
layout: empty.njk
permalink: /schlagwort/{{ tag | slugify }}/
eleventyComputed:
  title: "Schlagwort {{ tag }}"
---

## Beiträge mit dem Schlagwort <em>{{ tag }}</em> {.title}

{% set pagelist = collections.schlagworte[tag] %}
{% include "partials/pagelist.njk" %}