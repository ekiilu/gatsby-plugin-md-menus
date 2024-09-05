import React, { useState } from 'react';
import TreeNode from './treeNode';
import { usePluginOptions } from '../context';
import calculateTreeData from '../utils/calculateTreeData';
import enhanceForcedNavOrder from '../utils/enhanceForcedNavOrder';
import generateSortedItems from '../utils/generateSortedItems';



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
