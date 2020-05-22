import React from "react";
import ReactDOMServer from "react-dom/server";
import { NodeVM } from "vm2";
import mjml2html from "mjml";
import { transformAsync as transform } from "@babel/core";
import { fetchGraphQLQuery } from "../../util/template";

const compileReactComponent = async ({ template }) => {
  const { code } = await transform(template, {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    filename: "index.js",
    sourceType: "module",
  });

  console.log(code);

  const engine = new NodeVM({
    require: {
      external: [
        "react",
        "core-js/*",
        "lodash",
        "date-fns",
      ],
    },
  });
  const { default: Component } = engine.run(code, "index.js");

  return Component;
};

const renderTemplate = async ({ template, query, variables }) => {
  const [Component, data] = await Promise.all([
    compileReactComponent({ template }),
    fetchGraphQLQuery({ query, variables }),
  ]);

  const element = React.createElement(Component, { data });
  const mjml = ReactDOMServer.renderToStaticMarkup(element);
  const { html } = mjml2html(mjml);
  return { html, mjml, data };
};

export default async (req, res) => {
  try {
    res.status(200).json(await renderTemplate(req.body));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
