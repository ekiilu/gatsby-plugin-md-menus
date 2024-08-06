
import React, { createContext, useContext } from 'react';

const PluginOptionsContext = createContext({});

export const PluginOptionsProvider = ({ children, options }) => (
  <PluginOptionsContext.Provider value={options}>
    {children}
  </PluginOptionsContext.Provider>
);

export const usePluginOptions = () => useContext(PluginOptionsContext);
