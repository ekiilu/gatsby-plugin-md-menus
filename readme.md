# gatsby-plugin-md-menus 

## What is this?

This is a Gatsby plugin that generates hierarchical menus from Markdown (`.md`) files . It automatically creates a menu based on the directory structure and filenames of your content directory in your gatsby site.

## How to Use It

### Installation
  
You can install the `gatsby-plugin-md-menus` via npm or yarn:

# Using npm

```bash
npm  install  gatsby-plugin-md-menus
```
  
# Using yarn

```bash
yarn  add  gatsby-plugin-md-menus
```
##Configuration


After  installing  the  plugin,  you  need  to  add  it  to  your  gatsby-config.js  file.  The  plugin  requires  a  configuration  object  to  work  properly.  

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-md-menus',
      options: {
        config: {
          sidebar: {
            forcedNavOrder: [
              '/introduction', // Order of menu items
              '/key-concepts',
            ],
            collapsedNav: [
              '/introduction', // Menu items to collapse
              '/key-concepts',
            ],
          },
          //This is optional 
          gatsby:{
            pathPrefix: "/", // default is '/'
            trailingSlash: false // Default is false 
          }
        }
      }
    }
    // other plugins
  ]
};
```
  

## Configuration Object

The configuration object defines how your menu items should be structured and displayed. Here's an example configuration:
  
```javascript
const config = {
  sidebar: {
    forcedNavOrder: [
      '/introduction', // Order of menu items
      '/key-concepts',
    ],
    collapsedNav: [
      '/introduction', // Menu items to collapse
      '/key-concepts',
    ],
  },
  //This is optional 
  gatsby:{
    pathPrefix: "/", // default is '/'
    trailingSlash: false // Default is false 
  }
};
```
  
## Folder Structure

For the plugin to work correctly, your content folder should have Markdown files and corresponding directories that match the parent Markdown files. Here is an example structure:

![Content](https://raw.githubusercontent.com/ekiilu/gatsby-plugin-md-menus/main/assets/directory.png)
- **introduction** folder

- Contains subcontent related to `introduction.md`.
- **key-concepts** folder
- Contains subcontent related to `key-concepts.md`.

## Usage

Once the configuration is in place and your content is organized, the plugin will automatically generate the hierarchical menu based on the specified order and collapsed items.
## Using the Menu Component

To render the menu in your Gatsby site, you can import and use the Menu component provided by the plugin in your React components. Here's an example of how to do this:

```
import React, { useState } from 'react';
import Sidemenu from 'gatsby-plugin-md-menus/sidemenu';

const Sidebar = ({setMenu}) => {

  return (
    <Sidemenu onClickMenuItem={setMenu} />
  );
};

export default Sidebar;
```

## Contributing
We welcome contributions! Please feel free to submit issues, fork the repository, and make pull requests

## License
This project is licensed under the MIT License - see the LICENSE file for details.