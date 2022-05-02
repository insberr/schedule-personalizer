/* eslint-disable */
const purgecss = require('@fullhuman/postcss-purgecss')

plugins = [
  require("autoprefixer")
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(purgecss({ 
    content: ["./src/**/*.html", "./src/**/*.tsx"],
  }))
}


module.exports = {
    "plugins": plugins
}