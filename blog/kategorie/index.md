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

{% import "macros/navlist.njk" as navlist %}
<ul>
  {%- for entry in collections.kategorien.all %}{{ navlist.renderNavItem(entry) }}{%- endfor -%}
</ul>
