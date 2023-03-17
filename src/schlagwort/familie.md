---js
{
  title: "Familie",
  layout: "main.njk",
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

{% for post in collections[tag] %}
 * [{{ post.data.title }}]({{ post.url }})
{% endfor %}
