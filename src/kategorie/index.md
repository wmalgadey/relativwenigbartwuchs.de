---
title: Kategorien
layout: page.njk
date: "git Last Modified"
eleventyNavigation:
  key: kategorien
  order: 300
---

{% import "macros/navlist.njk" as navlist %}
<ul>
  {%- for entry in collections.kategorien.all %}{{ navlist.renderNavItem(entry) }}{%- endfor -%}
</ul>
