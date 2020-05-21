
export const getAllModes = (state) => Object.keys(state.buffers);
export const getCurrentMode = (state) => state.currentMode;
export const getCurrentBuffer = (state) => state.buffers[state.currentMode];

export const getIsLoading = (state) => state.loading;
export const getIsSuccess = (state) => !state.loading && !state.error && state.called;
export const getHasError = (state) => !state.loading && state.error && state.called;
