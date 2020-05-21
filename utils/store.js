import { useReducer } from "react";
import produce from "immer";

const createReducer = (resolvers) => (state, action) => {
  const resolver = resolvers[action.type];
  return resolver
    ? produce(state, (draft) => resolver(draft, action))
    : state;
}

export const useStore = ({ resolvers, initialState }) => {
  const [state, dispatch] = useReducer(
    createReducer(resolvers), 
    initialState
  );

  const asyncCompositeDispatch = async (action) => {
    if (typeof action === "function") {
      await action(asyncCompositeDispatch);
    } else if (Array.isArray(action)) {
      for (const subAction of action) {
        await asyncCompositeDispatch(subAction);
      }
    } else {
      dispatch(action);
    }
  };

  return [state, asyncCompositeDispatch];
};
