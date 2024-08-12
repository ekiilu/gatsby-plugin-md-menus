// Function to enhance forcedNavOrder by adding base paths if necessary
function enhanceForcedNavOrder(forcedNavOrder) {
  const basePaths = new Set();
  const enhancedOrder = [];

  forcedNavOrder.forEach(path => {
    const segments = path.split('/');
    if (segments.length > 2) {
      basePaths.add(`/${segments[1]}`);
    }

    enhancedOrder.push(path);
  });

  // Add the base paths at the correct position if they are not already in the forcedNavOrder
  basePaths.forEach(basePath => {
    if (!enhancedOrder.includes(basePath)) {
      const lastIndex = enhancedOrder
        .map(path => path.startsWith(basePath))
        .lastIndexOf(true);
      enhancedOrder.splice(lastIndex + 1, 0, basePath);
    }
  });


  //Remove the .md extension from the paths 

  return enhancedOrder.map(path => {
    if (path.endsWith('.md')) {
      return path.replace('.md', '');
    }
    return path;
  });;
}

export default enhanceForcedNavOrder;