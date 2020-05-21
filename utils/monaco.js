export const getMonacoProps = (mode) => {
  return {
    template: { language: "javascript" },
    query: { language: "graphql" },
    variables: { language: "json" },
  }[mode];
};
