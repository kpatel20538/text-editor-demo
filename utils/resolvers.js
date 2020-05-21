const setCurrentMode = (state, action) => {
  state.currentMode = action.mode;
};

const setCurrentBuffer = (state, action) => {
  state.buffers[state.currentMode] = action.buffer;
};

const startLoading = (state) => {
  state.loading = true;
  state.error = null;
};

const endLoading = (state) => {
  state.called = true;
  state.loading = false;
};

const setOutput = (state, action) => {
  state.output = action.value;
};

const reportError = (state, action) => {
  state.error = action.value;
};

export default {
  setCurrentMode,
  setCurrentBuffer,
  startLoading,
  endLoading,
  setOutput,
  reportError
}