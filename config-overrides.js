const { override, addBabelPlugins } = require('customize-cra')

module.exports = override(
  addBabelPlugins(
    [
      "babel-plugin-styled-components",
      {
        "displayName": true,
        "minify": true,
        "transpileTemplateLiterals": true,
        "pure": true
      }
    ]
  )
)