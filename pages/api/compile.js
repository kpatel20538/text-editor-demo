import React from "react";
import ReactDOMServer from "react-dom/server";
import { NodeVM } from "vm2";
import mjml2html from "mjml";
import { transformAsync as transform } from "@babel/core";

const fetchGraphQL = async ({ query, variables }) => {
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

  return response.json();
};

export default async ({ body: { template, query, variables } }, res) => {
  const { code } = await transform(template, {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    filename: "Template.js",
    sourceType: "module",
  });
  const engine = new NodeVM({
    require: {
      external: ['react']
    },
  });
  const { default: Component } = engine.run(code, "index.js");
  const { data } = await fetchGraphQL({ query, variables });
  const element = React.createElement(Component, { data });
  const markup = ReactDOMServer.renderToStaticMarkup(element);
  const { html } = mjml2html(markup);
  res.status(200).json({ output: html });
};
