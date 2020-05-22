import produce from "immer";

const createReducer = (resolvers) => (state, { type, payload }) => {
  const resolver = resolvers[type];
  return resolver ? produce(state, (draft) => resolver(draft, payload)) : state;
};

export default createReducer({
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
