---
title: Alle Schlagworte
layout: page.njk
date: git Last Modified
modified: 2024-02-04T18:25
eleventyNavigation:
  key: schlagworte
  order: 400
tags:
  - type/moc
type: moc
---

<ul class="tag-cloud">
  {% for tag in collections.schlagworte.all -%}
    <li><a href="/schlagwort/{{ tag.title | slugify }}" data-weight="{{ tag.weight }}">{{ tag.title }}</a></li>
  {%- endfor %}
</ul>
