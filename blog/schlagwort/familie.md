---js
{
  title: "Familie",
  "date created": "git Last Modified",
  layout: "partials/empty.njk",
  tags: ["type/moc"],
  pagination: {
    data: "collections.schlagworte",
    size: 4,
    reverse: true,
    alias: "tag",
    before: function(paginationData, fullData) {
      return paginationData.filter(x => x === 'familie' );
    }
  }
}
---

## Familie {.title}

Ich komme aus einer großen Familie, vielleicht ist mir deshalb meine eigene Familie so wichtig.


{% set pagelist = collections.schlagworte[tag] %}
{% include "partials/pagelist.njk" %}
