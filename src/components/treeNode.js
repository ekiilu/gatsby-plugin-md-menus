import React, { useEffect, useContext, useState } from 'react';
import OpenedSvg from '../images/opened';
import ClosedSvg from '../images/closed';
import Link from './link';
import { usePluginOptions } from '../context';
import { ThemeContext } from '@emotion/react';

const TreeNode = ({ className = '', setCollapsed, collapsed, url, title, setMenu, items, level = 0 }) => {
  const isCollapsed = collapsed[url];
  const { config } = usePluginOptions();
  const { gatsby = null } = config;
  const pathPrefix = gatsby && gatsby.pathPrefix || '/';
  const themeContext = useContext(ThemeContext)

  const [theme, setTheme] = useState({
    section: {
      navActiveCol: '#333333',
      navChildCol: '#333333',
    }
  })
  /* submenu default collapse */

  useEffect(() => {

    if (level > 1 && !isCollapsed) {
      setCollapsed(url);
    }
  }, []);



  useEffect(() => {
    if (themeContext) {
      setTheme((currentTheme) => {
        return {
          ...currentTheme,
          ...themeContext
        }
      })
    }
  }, [themeContext])


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
    <li className={`${calculatedClassName} ${hasChildren ? "nestedLevel" : ""}`}
      style={{ listStyle: "none", background: active && level > 2 ? theme.leftSideBar.menuActive : "" }}>
      {title && (
        <Link to={url} onClick={setMenu ? setMenu : false}>
          <span onClick={collapse} className='nestedChild'
            style={{ display: "flex", flexDirection: "row", gap: "20" }}>

            <span style={{ color: active ? theme.section.navActiveCol : theme.section.navChildCol }}>
              {title}
            </span>


            {level > 1 && hasChildren &&
              <button aria-label="collapse navbutton"
                className="collapser navbutton" style={{ backgroundColor: "transparent", marginLeft: "10px" }}>
                {!isCollapsed ? <ClosedSvg /> : <OpenedSvg />}
              </button>
            }
          </span>

          {!config.sidebar.frontLine && title && hasChildren ? (
            level < 2 && <button onClick={collapse} aria-label="collapse" className="collapser navbutton">
              {!isCollapsed ? <ClosedSvg /> : <OpenedSvg />}
            </button>
          ) : level < 2 && <button onClick={collapse} aria-label="collapse" className="collapser navbutton"></button>}
        </Link>
      )}

      {!isCollapsed && hasChildren ? (
        <ul style={{ padding: level > 1 ? "10px" : "", background: "" }}>
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
