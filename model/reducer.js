import produce from "immer";
import initialTemplate from "./data/initialTemplate";
import initialQuery from "./data/initialQuery";
import initialVariables from "./data/initialVariables";

const createReducer = (resolvers) => (state, { type, payload }) => {
  const resolver = resolvers[type];
  return resolver ? produce(state, (draft) => resolver(draft, payload)) : state;
};

export const reducer = createReducer({
  setCurrentMode: (state, mode) => {
    state.currentMode = mode;
  },
  setCurrentBuffer: (state, buffer) => {
    state.buffers[state.currentMode] = buffer;
  },
  startLoading: (state) => {
    state.loading = true;
    state.error = false;
  },
  endLoading: (state) => {
    state.called = true;
    state.loading = false;
  },
  setOutput: (state, html) => {
    state.output = html;
  },
  reportError: (state) => {
    state.error = true;
  },
  pushNotification: (state, notification) => {
    state.notifications.push(notification);
  },
  dismissNotification: (state, idx) => {
    state.notifications.splice(idx, 1);
  },
});

export const initialState = {
  currentMode: "template",
  buffers: {
    template: initialTemplate,
    query: initialQuery,
    variables: initialVariables,
  },
  called: false,
  loading: false,
  error: null,
  notifications: [],
  output: "",
};
