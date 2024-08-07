import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { usePluginOptions } from "../context";
import Tree from "./tree";
import Divider from "./Divider";
const Menu = (props) => {
  const { config } = usePluginOptions();
  const { onMenuClick = null } = props;
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
    <div>
      <Tree edges={allMdx.edges} setMenu={onMenuClick} />
      {
        config.sidebar.links &&
        config.sidebar.links.length > 0 &&
        <Divider />
      }
    </div>


  )
}

export default Menu;