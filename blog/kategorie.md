---
title: Alle Kategorien
layout: page.njk
date created: git Last Modified
date modified: 2024-02-04T18:26
eleventyNavigation:
  key: kategorien
  order: 300
tags:
  - type/moc
type: moc
---

{% for parent in collections.categories.parents %}
<h2 class="title is-5">{{ parent.label }}</h2>
<ul class="mb-4">
  {%- for child in parent.children %}
  <li>
    <a href="{{ child.url }}">{{ child.label }}</a>
    <span class="has-text-grey is-size-7">({{ child.used }})</span>
  </li>
  {%- endfor %}
</ul>
{% endfor %}
