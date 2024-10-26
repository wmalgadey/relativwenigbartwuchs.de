---
title: Was gibt es neues?
layout: empty.njk
eleventyNavigation:
  key: start
  order: 100
pagination:
  data: collections.post
  alias: pagelist
  reverse: true
  size: 12
permalink: /{% if pagination.pageNumber > 0 %}seite/{{ pagination.pageNumber }}/{% endif %}/index.html
eleventyComputed:
  title: Seite {{ pagination.pageNumber }}
tags:
  - type/page
date: git Last Modified
modified: 2024-02-04T18:26
type: page
---

{% if pagination.pageNumber == 0 -%}
# Was gibt es neues? {.title}
{% else -%}
# Wo waren wir? {.title}
{% endif -%}

{% include "partials/pagelist.njk" %}
{% include "partials/pagelist-prevnext.njk" %}
