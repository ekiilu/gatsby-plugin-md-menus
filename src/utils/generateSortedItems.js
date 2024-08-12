import getOrderIndex from './getOrderIndex';

// Function to generate a sorted array based on forcedNavOrder and then by URL
const generateSortedItems = (items, forcedNavOrder, level = 2) => {
  return items
    .map(item => {
      const newItem = { ...item };
      if (newItem.items?.length > 0) {
        const miscPaths = forcedNavOrder.filter(path => path.startsWith(newItem.url));
        newItem.items = generateSortedItems(newItem.items, miscPaths, level + 1);
      }
      return newItem;
    })
    .sort((a, b) => {
      const indexA = getOrderIndex(a.url, forcedNavOrder, level);
      const indexB = getOrderIndex(b.url, forcedNavOrder, level);

      // Ensure that items not found in forcedNavOrder are placed at the end
      const orderA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA;
      const orderB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB;

      // First, sort by forcedNavOrder index
      const orderComparison = orderA - orderB;
      if (orderComparison !== 0) {
        return orderComparison;
      }

      // If they have the same order, sort alphabetically by URL
      return a.url.localeCompare(b.url);
    });
}

export default generateSortedItems;
