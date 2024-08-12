import React, { useEffect, useState } from "react";
import calculateTreeData from "../utils/calculateTreeData";
import enhanceForcedNavOrder from "../utils/enhanceForcedNavOrder";
import generateSortedItems from "../utils/generateSortedItems";
import { usePluginOptions } from "../context";
import { useStaticQuery, graphql } from "gatsby";
function flattenItems(items, parent = '') {
  let flatArray = [];

  items.forEach(item => {
    // Construct the full URL by combining the parent URL and the current item's URL
    const fullUrl = item.url;

    // Add the current item to the flat array with the full URL and parent URL
    flatArray.push({ url: fullUrl, title: item.title, parent: parent || null });

    // If the item has nested items, recursively flatten them and add to the array
    if (item.items && item.items.length > 0) {
      flatArray = flatArray.concat(flattenItems(item.items, fullUrl));
    }
  });

  return flatArray;
}

const useNav = (nav) => {

  const [navItems, setNavItems] = useState(null);

  const { config } = usePluginOptions();

  const data = useStaticQuery(graphql`
    query {
      allMdx {
        edges {
          node {
            fields {
              slug
              title
            }
          }
        }
      }
    }
`);

  useEffect(() => {
    if (data && data.allMdx) {
      const treeData = calculateTreeData(data.allMdx.edges, config);
      const enhancedForcedNavOrder = enhanceForcedNavOrder(config.sidebar.forcedNavOrder);
      const sortedItems = generateSortedItems(treeData.items, enhancedForcedNavOrder);
      const flattenedArray = flattenItems(sortedItems);
      setNavItems(flattenedArray);
    }
  }, [data]);
  return navItems;
}

export default useNav;