//Displays (TOC) Table of Content for the current page
import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { usePluginOptions } from "../context";
import calculateTreeData from "../utils/calculateTreeData";
import enhanceForcedNavOrder from "../utils/enhanceForcedNavOrder";
import generateSortedItems from "../utils/generateSortedItems";
import TocNode from "./tocNode";



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