export const getMonacoProps = (state) => {
  return {
    template: { language: "javascript" },
    query: { language: "graphql" },
    variables: { language: "json" },
  }[state.currentMode];
};
