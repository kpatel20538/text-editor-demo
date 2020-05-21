import React from "react";
import ReactDOMServer from "react-dom/server";
import { NodeVM } from "vm2";
import mjml2html from "mjml";
import { transformAsync as transform } from "@babel/core";

const fetchQuery = async ({ query, variables }) => {
  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  const { data, errors } = await response.json();
  if (errors) {
    throw new Error(errors);
  }

  return data;
};

const compileComponent = ({ template }) => {
  const { code } = await transform(template, {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    filename: "Template.js",
    sourceType: "module",
  });

  const engine = new NodeVM({ require: { external: ['react'] }, });
  const { default: Component } = engine.run(code, "index.js");

  return Component;
}

const renderTemplate = ({ template, query, variables }) => {
  const [Component, data] = await Promise.all([
    compileComponent({ template }),
    fetchQuery({ query, variables })
  ])
  const element = React.createElement(Component, { data });
  const mjml = ReactDOMServer.renderToStaticMarkup(element);
  const { html } = mjml2html(mjml);
  return { html, mjml, data };
}

export default async (req, res) => {
  try {
    res.status(200).json(renderTemplate(req.body));  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
