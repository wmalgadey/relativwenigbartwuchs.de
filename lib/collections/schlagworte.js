module.exports = collection => {
  const tags = { all: [] };

  collection.getAll().forEach(item => {

    if (!item.data.tags) return;

    item.data.tags.filter(
      tag => !['posts', 'all'].includes(tag)
    ).forEach(
      tag => {
        if (!tags[tag]) {
          tags.all.push({ title: tag, path: '/schlagwort/' });
          tags[tag] = [];
        }

        tags[tag].push(item);
      }
    );
  });

  let max = 0;
  let min = 999999;

  for (const tag in tags) {
    const all = tags.all.find(c => c.title === tag);

    if (all) {
      all.used = tags[tag].length;

      max = Math.max(max, all.used);
      min = Math.min(min, all.used);
    }
  }

  var weightMin = 1;
  var weightMax = 9;

  for (var tag of tags.all) {
    tag.weight = tag.used === min
      ? weightMin
      : (tag.used / max) * (weightMax - weightMin) + weightMin;
  }

  tags.all.sort((a, b) => {
    const nameA = a.title.toUpperCase(); // ignore upper and lowercase
    const nameB = b.title.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  console.log(`[schlagworte] created collection with ${tags.all.length} tags`);

  return tags;
};
