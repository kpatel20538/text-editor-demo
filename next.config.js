const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = withFonts({
  webpack: (config) => {
    const rule = config.module.rules
      .find((rule) => rule.oneOf)
      .oneOf.find(
        (r) =>
          // Find the global CSS loader
          r.issuer && r.issuer.include && r.issuer.include.includes("_app")
      );

    if (rule) {
      rule.issuer.include = [
        rule.issuer.include,
        // Allow `monaco-editor` to import global CSS:
        /[\\/]node_modules[\\/]monaco-editor[\\/]/,
      ];
    }
    
    config.plugins.push(
      new MonacoWebpackPlugin({
        languages: ["graphql", "javascript", "json"],
        filename: "static/[name].worker.js",
      })
    );

    return config;
  },
});
