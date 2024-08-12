import React from 'react';
import OpenedSvg from '../images/opened';
import ClosedSvg from '../images/closed';
import Link from './link';
import { usePluginOptions } from '../context';
const TreeNode = ({ className = '', setCollapsed, collapsed, url, title, setMenu, items, level = 0 }) => {
  const isCollapsed = collapsed[url];
  const { config } = usePluginOptions();
  const { gatsby = null } = config;
  const pathPrefix = gatsby && gatsby.pathPrefix || '/';

  const collapse = () => {
    setCollapsed(url);
  };

  const hasChildren = items.length !== 0;

  let location;

  if (typeof document != 'undefined') {
    location = document.location;
  }
  const active =
    location && (location.pathname === url || location.pathname === pathPrefix + url);

  const calculatedClassName = `${className} item  ${active ? 'active' : ''}  ${!isCollapsed && hasChildren ? 'selected' : ''}`;


  return (
    <li className={`${calculatedClassName} ${hasChildren ? "nestedLevel" : ""}`} style={{ listStyle: "none" }}>
      {title && (
        <Link to={url} onClick={setMenu ? setMenu : false}>
          <span onClick={collapse} className='nestedChild' style={{ display: "flex", flexDirection: "row", gap: "10" }}>

            {level > 1 && hasChildren &&
              <button aria-label="collapse" className="collapser" style={{ backgroundColor: "transparent" }}>
                {!isCollapsed ? <ClosedSvg /> : <OpenedSvg />}
              </button>
            }
            {title}
          </span>

          {!config.sidebar.frontLine && title && hasChildren ? (
            level < 2 && <button onClick={collapse} aria-label="collapse" className="collapser">
              {!isCollapsed ? <ClosedSvg /> : <OpenedSvg />}
            </button>
          ) : level < 2 && <button onClick={collapse} aria-label="collapse" className="collapser"></button>}
        </Link>
      )}

      {!isCollapsed && hasChildren ? (
        <ul style={{ marginLeft: level > 1 ? "10px" : "" }}>
          {items.map((item, index) => (
            <TreeNode
              key={item.url + index.toString()}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              setMenu={setMenu}
              {...item}
              level={level + 1}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default TreeNode;
