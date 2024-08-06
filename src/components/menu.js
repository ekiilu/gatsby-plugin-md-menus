import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { usePluginOptions } from "../context";
import Tree from "./tree";
import Divider from "./Divider";
const Menu = (props) => {
  console.log("PROPS", props)
  const { config } = usePluginOptions();
  const { setMenu } = props;
  console.log("SIDEMENU", config)


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
      <Tree edges={allMdx.edges} setMenu={setMenu} />
      {config.sidebar.links && config.sidebar.links.length > 0 && <Divider />}
    </div>


  )
}

export default Menu;