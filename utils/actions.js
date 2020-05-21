import resolvers from './resolvers';

const createActionFactories = (resolvers) => Object.fromEntries(
  Object.keys(resolvers)
    .map((type) => [type, (values = {}) => ({ type, ...values })])  
);

const fetchApi  = async (endpoint, body) => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  
  return response.json();
}

export const {
  setCurrentMode,
  setCurrentBuffer,
  startLoading,
  endLoading,
  setOutput,
  reportError
} = createActionFactories(resolvers);

export const compile = (buffers) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { html } = await fetchApi("/api/compile", buffers);
    dispatch(setOutput({ value: html }));
  } catch (err) {
    console.error(err);
    dispatch(reportError({ value: "Something went wrong" }));
  } finally {
    dispatch(endLoading());
  }
};