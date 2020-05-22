import DOMPurify from 'dompurify'

export const getAllModes = (state) => Object.keys(state.buffers);
export const getAllBuffers = (state) => state.buffers;
export const getCurrentMode = (state) => state.currentMode;
export const getCurrentBuffer = (state) => state.buffers[state.currentMode];
export const getNotifications = (state) => state.notifications;
export const getOutputDocument = (state) => DOMPurify.sanitize(state.output);

export const getIsLoading = (state) => state.loading;
export const getIsSuccess = (state) => !state.loading && !state.error && state.called;
export const getHasError = (state) => !state.loading && state.error && state.called;

export const getMonacoProps = (mode) => {
  return {
    template: { language: "javascript" },
    query: { language: "graphql" },
    variables: { language: "json" },
  }[mode];
};
