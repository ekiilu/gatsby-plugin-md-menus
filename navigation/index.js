import React from "react";
import useNav from '../src/hooks/useNav';

const Navigation = ({ mdx = null, children }) => {
  const nav = useNav();
  if (!nav || !mdx) {
    return null;
  }
  if (children) {
    return React.cloneElement(children, { mdx, nav });
  }
  return null;
}

export default Navigation;