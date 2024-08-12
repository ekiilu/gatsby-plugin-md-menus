// Function to calculate tree data structure
const calculateTreeData = (edges, config) => {
  const { gatsby = {
    trailingSlash: false
  } } = config;
  const trailingSlash = gatsby?.trailingSlash || false;

  const filteredData = config.sidebar.ignoreIndex
    ? edges.filter(({ node }) => node.fields && node.fields.slug !== '/')
    : edges;

  const tree = filteredData.reduce((accu, { node: { fields: { slug, title } } }) => {
    const parts = slug.split('/');
    let { items: prevItems } = accu;

    const slicedParts = trailingSlash ? parts.slice(1, -2) : parts.slice(1, -1);

    slicedParts.forEach(part => {
      let tmp = prevItems.find(({ label }) => label === part);
      if (!tmp) {
        tmp = { label: part, items: [] };
        prevItems.push(tmp);
      }
      prevItems = tmp.items;
    });

    const lastPart = trailingSlash ? parts.length - 2 : parts.length - 1;
    const existingItem = prevItems.find(({ label }) => label === parts[lastPart]);

    if (existingItem) {
      existingItem.url = slug;
      existingItem.title = title;
    } else {
      prevItems.push({ label: parts[lastPart], url: slug, items: [], title });
    }

    return accu;
  }, { items: [] });

  return tree;
};

export default calculateTreeData;