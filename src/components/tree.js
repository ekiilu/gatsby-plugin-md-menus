import React, { useState } from 'react';
import TreeNode from './treeNode';
import { usePluginOptions } from '../context';

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

  return enhancedOrder;
}

// Function to calculate tree data structure
const calculateTreeData = (edges, config) => {
  const { gatsby } = config;
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

// Function to find the order index for sorting
function getOrderIndex(url, forcedNavOrder, level) {
  return forcedNavOrder.findIndex(orderUrl => {
    if (level >= 3) {
      const result = orderUrl.split('/').slice(0, level).join('/');
      return url === result;
    }
    return url === orderUrl;
  });
}


// Function to generate a sorted array based on forcedNavOrder
function generateSortedItems(items, forcedNavOrder, level = 2) {
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

      return orderA - orderB;
    });
}

const Tree = ({ edges, setMenu }) => {
  const { config } = usePluginOptions();

  // Enhance the forcedNavOrder with base paths if necessary
  const enhancedForcedNavOrder = enhanceForcedNavOrder(config.sidebar.forcedNavOrder);


  const treeData = calculateTreeData(edges, config);

  const sortedItems = generateSortedItems(treeData.items, enhancedForcedNavOrder);


  const defaultCollapsed = sortedItems.reduce((acc, item) => {
    acc[item.url] = config.sidebar.collapsedNav?.includes(item.url) || false;
    return acc;
  }, {});

  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const toggle = (url) => {
    setCollapsed(prev => ({
      ...prev,
      [url]: !prev[url],
    }));
  };

  return (
    <TreeNode
      className={`${config.sidebar.frontLine ? 'showFrontLine' : 'hideFrontLine'} firstLevel`}
      setCollapsed={toggle}
      collapsed={collapsed}
      setMenu={setMenu}
      items={sortedItems}
    />
  );
};

export default Tree;
