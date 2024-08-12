import React from "react";
import useNav from '../src/hooks/useNav';

const Navigation = ({ mdx, children }) => {
  const nav = useNav();
  if (!nav) {
    return null;
  }
  if (children) {
    return React.cloneElement(children, { mdx, nav });
  }
  return null;
}

export default Navigation;