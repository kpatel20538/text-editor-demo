import { useReducer, useRef } from "react";

export const useStore = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stateRef = useRef(initialState);
  stateRef.current = state;

  const asyncDispatch = async (action) => {
    if (typeof action === "function") {
      await action(asyncDispatch, stateRef.current);
    } else if (Array.isArray(action)) {
      for (const subAction of action) {
        await asyncDispatch(subAction, stateRef.current);
      }
    } else {
      dispatch(action);
    }
  };

  return [state, asyncDispatch];
};
