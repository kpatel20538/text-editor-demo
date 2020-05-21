const logger = (func) => (...args) => {
  console.log(`${func.name}(${JSON.stringify(args)})`);
  const ret = func(...args);
  console.log(`${func.name}::${JSON.stringify(ret)}`);
  return ret;
};

export const getMonacoProps = (state) => {
  return {
    template: { language: "javascript" },
    query: { language: "graphql" },
    variables: { language: "json" },
  }[state.currentMode];
};
