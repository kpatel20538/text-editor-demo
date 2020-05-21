
export const getAllModes = (state) => Object.keys(state.buffers);
export const getCurrentBuffer = (state) => state.buffers[state.currentMode];
