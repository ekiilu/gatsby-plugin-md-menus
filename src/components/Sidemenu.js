import React, { useEffect, useContext } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { usePluginOptions } from "../context";
import Tree from "./tree";
import Divider from "./Divider";
import SidebarWrapper from "./SidebarWrapper";
import { ThemeContext, withTheme } from '@emotion/react';

const Sidemenu = (props) => {
  const { config } = usePluginOptions();
  const { onMenuClick = null } = props;
  const themeContext = useContext(ThemeContext)

  const [theme, setTheme] = React.useState({
    section: {
      navActive: "#C1DD7A",
    },
    leftSideBar: {
      menuHover: "#A3CD39",
    }
  })


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

  const allMdx = data.allMdx;

  return (
    <SidebarWrapper
      menuHover={theme.leftSideBar.menuHover}
      navActive={theme.section.navActive}>
      <Tree edges={allMdx.edges} setMenu={onMenuClick} />
      {
        config.sidebar.links &&
        config.sidebar.links.length > 0 &&
        <Divider />
      }
    </SidebarWrapper>
  )
}

export default withTheme(Sidemenu);