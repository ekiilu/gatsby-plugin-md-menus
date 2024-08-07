//Displays (TOC) Table of Content for the current page
import React from "react";
import Link from "./link"
import { useStaticQuery, graphql } from "gatsby";
import { usePluginOptions } from "../context";

const Toc = ({ mdx }) => {
  const { config } = usePluginOptions();
  const forcedNavOrder = config.sidebar.forcedNavOrder;

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



  const navItems = data.allMdx.edges
    .filter(({ node }) => node.fields !== null)
    .map(({ node }) => node.fields.slug)
    .filter((slug) => slug !== '/')
    .sort()
    .reduce(
      (acc, cur) => {
        if (forcedNavOrder.find((url) => url === cur)) {
          return { ...acc, [cur]: [cur] };
        }

        let prefix = cur.split('/')[1];

        if (config.gatsby && config.gatsby.trailingSlash) {
          prefix = prefix + '/';
        }

        if (prefix && forcedNavOrder.find((url) => url === `/${prefix}`)) {
          return { ...acc, [`/${prefix}`]: [...acc[`/${prefix}`], cur] };
        } else {
          return { ...acc, items: [...acc.items, cur] };
        }
      },
      { items: [] }
    );


  const tocs = navItems[mdx.fields.slug];
  if (!tocs) return null;


  return (
    <ul className='nav_links'>
      {tocs.map((toc, index) => {
        const current_page = data.allMdx.edges.find((page) => {
          return page.node.fields != null && page.node.fields.slug === toc;
        });

        if (index > 0) {
          return (
            <li>
              <Link to={toc}>{current_page.node.fields.title}</Link>
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
};

export default Toc;