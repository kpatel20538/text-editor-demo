const setCurrentMode = (state, action) => {
  state.currentMode = action.mode;
};

const setCurrentBuffer = (state, action) => {
  state.buffers[state.currentMode] = action.buffer;
};

const startLoading = (state) => {
  state.loading = true;
  state.error = false;
};

const endLoading = (state) => {
  state.called = true;
  state.loading = false;
};

const setOutput = (state, action) => {
  state.output = action.value;
};

const reportError = (state) => {
  state.error = true;
};

const pushNotification = (state, { icon, color, title, description }) => {
  state.notifications.push({
    icon,
    color,
    title,
    description,
  });
};

const dismissNotification = (state, action) => {
  state.notifications.splice(action.idx, 1);
};

export default {
  setCurrentMode,
  setCurrentBuffer,
  startLoading,
  endLoading,
  setOutput,
  reportError,
  pushNotification,
  dismissNotification,
};
