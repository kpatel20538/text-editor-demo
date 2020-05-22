import resolvers from "./resolvers";
import { fetchApi } from "./sideEffects";

const createActionFactories = (resolvers) =>
  Object.fromEntries(
    Object.keys(resolvers).map((type) => [
      type,
      (values = {}) => ({ type, ...values }),
    ])
  );

export const {
  setCurrentMode,
  setCurrentBuffer,
  startLoading,
  endLoading,
  setOutput,
  reportError,
  pushNotification,
  dismissNotification,
} = createActionFactories(resolvers);

export const compileTemplate = (buffers) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { html } = await fetchApi("/api/compile", buffers);
    dispatch(setOutput({ value: html }));
  } catch (err) {
    console.error(err);
    dispatch(reportError());
    dispatch(
      pushNotification({
        icon: "exclamation-triangle",
        color: "danger",
        title: "Something went wrong",
        description: err.toString(),
      })
    );
  } finally {
    dispatch(endLoading());
  }
};
