import React from 'react';
import OpenedSvg from '../images/opened';
import ClosedSvg from '../images/closed';
import Link from './link';
import { usePluginOptions } from '../context';
const TreeNode = ({ className = '', setCollapsed, collapsed, url, title, setMenu, items, ...rest }) => {
  const isCollapsed = collapsed[url];
  const { config } = usePluginOptions();

  const collapse = () => {
    setCollapsed(url);
  };

  const hasChildren = items.length !== 0;

  let location;

  if (typeof document != 'undefined') {
    location = document.location;
  }
  const active =
    location && (location.pathname === url || location.pathname === config.gatsby.pathPrefix + url);

  const calculatedClassName = `${className} item ${active ? 'active' : ''}  ${!isCollapsed && hasChildren ? 'selected' : ''}`;


  return (
    <li className={calculatedClassName}>
      {title && (
        <Link to={url} onClick={setMenu ? setMenu : false}>
          {title}
          {!config.sidebar.frontLine && title && hasChildren ? (
            <button onClick={collapse} aria-label="collapse" className="collapser">
              {!isCollapsed ? <ClosedSvg /> : <OpenedSvg />}
            </button>
          ) : <button onClick={collapse} aria-label="collapse" className="collapser"></button>}
        </Link>
      )}

      {!isCollapsed && hasChildren ? (
        <ul>
          {items.map((item, index) => (
            <TreeNode
              key={item.url + index.toString()}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              setMenu={setMenu}
              {...item}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default TreeNode;
