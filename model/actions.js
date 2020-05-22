import { fetchApi } from "./sideEffects";

const createActionFactories = () =>
  new Proxy(Object.freeze({}), {
    has: () => true,
    get: (_, type) => (payload) => ({ type, payload }),
  });

export const {
  setCurrentMode,
  setCurrentBuffer,
  startLoading,
  endLoading,
  setOutput,
  reportError,
  pushNotification,
  dismissNotification,
} = createActionFactories();

export const compileTemplate = (buffers) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { html } = await fetchApi("/api/compile", buffers);
    dispatch(setOutput(html));
  } catch (err) {
    console.error(err);
    dispatch([
      reportError(),
      pushNotification({
        icon: "exclamation-triangle",
        color: "danger",
        title: "Something went wrong",
        description: err.toString(),
      }),
    ]);
  } finally {
    dispatch(endLoading());
  }
};
