---js
{
  title: "Beiträge mit dem Schlagwort {{ tag }}",
  layout: "page.njk",
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

<h1>Familie</h1>

<p>Der einzige wirklich sinnvolle Grund überhaupt etwas zu tun. Evolution ist undenkbar ohne Familie, ohne Nachwuchs und ohne Heimat.</p>

<ul>
{% for post in collections[tag] %}
<li><a href="{{ post.url }}">{{ post.data.title }}<a></li>
{% endfor %}
</ul>