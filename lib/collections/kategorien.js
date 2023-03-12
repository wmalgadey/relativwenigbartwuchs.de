module.exports = collection => {
  let categories = { all: [] };

  collection.getAll().forEach(item => {

    if (!item.data.categories) return;

    item.data.categories.filter(
      cat => !['posts', 'all'].includes(cat)
    ).forEach(
      cat => {
        if (!categories[cat]) {
          categories.all.push({title: cat, url: `/kategorie/${cat}`});
          categories[cat] = [];
        }

        categories[cat].push(item);
      }
    );
  });

  return categories;
};
