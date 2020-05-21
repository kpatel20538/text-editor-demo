export const setCurrentMode = (state, action) => {
  state.currentMode = action.mode;
};

export const setCurrentBuffer = (state, action) => {
  state.buffers[state.currentMode] = action.buffer;
};

export const startLoading = (state) => {
  state.loading = true;
  state.error = null;
};

export const endLoading = (state) => {
  state.loading = false;
};

export const setOutput = (state, action) => {
  state.output = action.value;
};

export const reportError = (state, action) => {
  state.error = action.value;
};
