// plugins/my-custom-plugin/gatsby-browser.js

import React from 'react';
import { PluginOptionsProvider } from './src/context';
import "./src/styles.css";
export const wrapRootElement = ({ element }, pluginOptions) => {

  return (
    <PluginOptionsProvider options={pluginOptions}>
      {element}
    </PluginOptionsProvider>
  );
};