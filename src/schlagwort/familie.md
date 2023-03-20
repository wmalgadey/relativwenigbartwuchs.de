---js
{
  title: "Familie",
  date: "git Last Modified",
  layout: "empty.njk",
  pagination: {
    data: "collections",
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

Der einzige wirklich sinnvolle Grund überhaupt etwas zu tun. Evolution ist undenkbar ohne Familie, ohne Nachwuchs und ohne Heimat.

{% set pagelist = collections.schlagworte[tag] %}
{% include "partials/pagelist.njk" %}