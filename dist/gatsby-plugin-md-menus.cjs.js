'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./gatsby-plugin-md-menus.cjs.prod.js");
} else {
  module.exports = require("./gatsby-plugin-md-menus.cjs.dev.js");
}
