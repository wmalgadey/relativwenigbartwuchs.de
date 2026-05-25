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
{% for parent in collections.categories.parents -%}

## {{ parent.label }} {.title .is-5}

{% for child in parent.children -%}
- [{{ child.label }}]({{ child.url }}) <span class="has-text-grey is-size-7">({{ child.used }})</span>
{% endfor -%}
{% endfor -%}
