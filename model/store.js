import { useReducer } from "react";

const createAsyncDispatcher = (dispatch) => {
  const asyncDispatch = async (action) => {
    if (typeof action === "function") {
      await action(asyncDispatch);
    } else if (Array.isArray(action)) {
      for (const subAction of action) {
        await asyncDispatch(subAction);
      }
    } else {
      dispatch(action);
    }
  }
  return asyncDispatch;
}

export const useStore = ({ resolvers, initialState }) => {
  const [state, dispatch] = useReducer(
    createReducer(resolvers), 
    initialState
  );

  return [
    state, 
    createAsyncDispatcher(dispatch)
  ];
};
