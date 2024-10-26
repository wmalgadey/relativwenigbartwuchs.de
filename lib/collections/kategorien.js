module.exports = collection => {
  let categories = { all: [] };

  collection.getAll().forEach(item => {

    if (!item.data.categories) return;

    item.data.categories.filter(
      cat => !['posts', 'all'].includes(cat)
    ).forEach(
      cat => {
        if (!categories[cat]) {
          categories.all.push({ title: cat, path: '/kategorie/' });
          categories[cat] = [];
        }

        categories[cat].push(item);
      }
    );
  });

  for (const category in categories) {
    const all = categories.all.find(c => c.title === category);

    if (all) {
      all.used = categories[category].length;
    }
  }

  categories.all.sort((a, b) => {
    const nameA = a.title ? a.title.toUpperCase() : ""; // ignore upper and lowercase
    const nameB = b.title ? b.title.toUpperCase() : ""; // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  console.log(`[kategorien] created collection with ${categories.all.length} categorien`);

  return categories;
};
