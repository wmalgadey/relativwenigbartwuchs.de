---
title: start
layout: main.njk
eleventyNavigation:
  key: start
  order: 100
pagination:
  data: collections.post
  alias: pagelist
  reverse: true
  size: 9
permalink: "/{% if pagination.pageNumber > 0 %}seite/{{ pagination.pageNumber }}/{% endif %}/index.html"
eleventyComputed:
  title: "Seite {{ pagination.pageNumber }}"
---

{% if pagination.pageNumber == 0 %}
# Was gibt es neues? {.title .is-size-2}
{% else %}
# Wo waren wir? {.title .is-size-2}
{% endif %}
