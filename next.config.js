const withFonts = require("next-fonts");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = withFonts({
  webpack: (config) => {
    const rule = config.module.rules
      .find((rule) => rule.oneOf)
      .oneOf.find(
        (r) => r.issuer && r.issuer.include && r.issuer.include.includes("_app")
      );

    if (rule) {
      rule.issuer.include = [
        rule.issuer.include,
        /[\\/]node_modules[\\/]monaco-editor[\\/]/,
      ];
    }

    config.plugins.push(
      new MonacoWebpackPlugin({
        filename: 'static/[name].worker.js',
      })
    );

    return config;
  },
});
