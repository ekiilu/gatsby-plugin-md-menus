//Displays (TOC) Table of Content for the current page
import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { usePluginOptions } from "../context";
import calculateTreeData from "../utils/calculateTreeData";
import enhanceForcedNavOrder from "../utils/enhanceForcedNavOrder";
import generateSortedItems from "../utils/generateSortedItems";
import TocNode from "./tocNode";
function flattenItems(items, parentUrl = '') {
  let flatArray = [];

  items.forEach(item => {
    // Construct the full URL by combining the parent URL and the current item's URL
    const fullUrl = parentUrl + item.url;

    // Add the current item to the flat array with the full URL and parent URL
    flatArray.push({ url: fullUrl, title: item.title, parentUrl: parentUrl || null });

    // If the item has nested items, recursively flatten them and add to the array
    if (item.items && item.items.length > 0) {
      flatArray = flatArray.concat(flattenItems(item.items, fullUrl));
    }
  });

  return flatArray;
}




const Toc = ({ mdx }) => {
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



  const treeData = calculateTreeData(data.allMdx.edges, config);
  const enhancedForcedNavOrder = enhanceForcedNavOrder(config.sidebar.forcedNavOrder);
  const sortedItems = generateSortedItems(treeData.items, enhancedForcedNavOrder);
  const flattenedArray = flattenItems(sortedItems);

  console.log("sortedItems", flattenedArray);



  const getTocItems = (items, paths = []) => {

    if (paths.length === 0) {
      return [...items];
    }

    let currentPaths = [...paths];

    let currentPath = currentPaths.shift(); // remove first element

    const currentItems = items.find((item) => {

      return item.url === currentPath;
    });
    return getTocItems(currentItems.items, currentPaths);

  }

  function getRecursivePaths(path) {
    return path
      .split('/')
      .filter(segment => segment !== '')
      .map((_, index, array) => '/' + array.slice(0, index + 1).join('/'));
  }


  const paths = getRecursivePaths(mdx.fields.slug);

  if (paths.length === 0) return null;

  let toc = getTocItems(sortedItems, paths);

  if (!toc) return null;

  return (
    <ul className='nav_links' style={{ listStyle: "none", marginLeft: 0 }}>
      <TocNode items={toc} />
    </ul>
  )
};

export default Toc;