---
title: Schlagworte
layout: page.njk
date: "git Last Modified"
eleventyNavigation:
  key: schlagworte
  order: 400
---

<ul class="tag-cloud">
  {% for tag in collections.schlagworte.all -%}
    <li><a href="/schlagwort/{{ tag.title | slugify }}" data-weight="{{ tag.weight }}">{{ tag.title }}</a></li>
  {%- endfor %}
</ul>
