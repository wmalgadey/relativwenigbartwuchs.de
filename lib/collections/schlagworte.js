module.exports = collection => {
  const tags = { all: [] };

  collection.getAll().forEach(item => {

    if (!item.data.tags) return;

    item.data.tags.filter(
      tag => !['posts', 'all'].includes(tag)
    ).forEach(
      tag => {
        if (!tags[tag]) {
          tags.all.push({ title: tag, url: `/schlagwort/${tag}` });
          tags[tag] = [];
        }

        tags[tag].push(item);
      }
    );
  });
  return tags;
};
