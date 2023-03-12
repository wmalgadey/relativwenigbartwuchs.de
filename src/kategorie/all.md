---
pagination:
  data: collections.kategorien
  size: 1
  alias: kategorie
  filter:
    - all
  #addAllPageToCollections: true
layout: page.njk
permalink: /kategorie/{{ kategorie | slugify }}/
eleventyComputed:
  title: Beiträge der Kategorie "{{ kategorie }}"
---

<h1>Beiträge der Kategorie {{ kategorie }}</h1>

<ul>
{% for post in collections.kategorien[kategorie] %}
<li><a href="{{ post.url }}">{{ post.data.title }}<a></li>
{% endfor %}
</ul>