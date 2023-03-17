---
pagination:
  data: collections
  size: 1
  alias: tag
  addAllPageToCollections: true
  filter:
    - familie
layout: page.njk
permalink: /schlagwort/{{ tag | slugify }}/
eleventyComputed:
  title: "Schlagwort {{ tag }}"
---

## Beiträge mit dem Schlagwort <em>{{ tag }}</em> {.title}

<ul>
{% for post in collections[tag] %}
<li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{% endfor %}
</ul>
