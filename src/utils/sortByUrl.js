import getOrderIndex from './getOrderIndex';

// Function to generate a sorted array based on forcedNavOrder and URL
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
      const indexA = forcedNavOrder.indexOf(a.url);
      const indexB = forcedNavOrder.indexOf(b.url);

      // Sort by forcedNavOrder index if found
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }

      // If one is in forcedNavOrder, prioritize it
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      // If neither is in forcedNavOrder, sort by URL
      return a.url.localeCompare(b.url);
    });
}

export default generateSortedItems;
