---js
{
  title: "Familie",
  "date created": "git Last Modified",
  layout: "empty.njk",
  tags: ["type/moc"],
  pagination: {
    data: "collections.tags",
    size: 4,
    reverse: true,
    alias: "tag",
    before: function(paginationData, fullData) {
      return paginationData.filter(x => x === 'familie' );
    }
  }
}
---
{% set pagelist = collections.tags[tag] %}

## Familie {.title .is-spaced}

Ich komme aus einer großen Familie, vielleicht ist mir deshalb meine Eigene so wichtig.

## Alle {{ pagelist.length }} Beiträge... {.subtitle .is-4}

{% include "partials/pagelist.njk" %}
