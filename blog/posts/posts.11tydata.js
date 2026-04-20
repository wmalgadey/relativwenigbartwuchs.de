export default {
  layout: 'post.njk',
  permalink: '{{ title | slugify }}/',
  eleventyComputed: {
    dateCreated: data => data['date created'],
    dateModified: data => data['date modified'],
  },
};
