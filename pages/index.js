import dynamic from "next/dynamic";
import Tabs from "../components/Tabs";
import Button from "../components/Button";
import {
  useStore,
} from "../utils/store";
import {
  getAllModes,
  getCurrentMode,
  getCurrentBuffer,
  getIsLoading,
  getHasError,
  getIsSuccess,
} from '../utils/selectors'
import {
  setCurrentBuffer,
  setCurrentMode,
  compile,
} from '../utils/actions'
import resolvers from '../utils/resolvers';
import initialState from '../utils/initialState';

import { getMonacoProps } from "../utils/monaco";
import AppLayout from "../components/AppLayout";

const MonacoEditor = dynamic(() => import("react-monaco-editor"), {
  ssr: false,
});

const Home = () => {
  const [state, dispatch] = useStore({
    resolvers,
    initialState,
  });

  const currentMode = getCurrentMode(state);

  return (
    <main>
      <div className="buttons">
        <Button
          title="Compile"
          onClick={() => dispatch(compile(state.buffers))}
          isLoading={getIsLoading(state)}
          isSuccess={getIsSuccess(state)}
          isDanger={getHasError(state)}
        />
      </div>
      <AppLayout>
        <div className="column is-half">
          <Tabs
            tabs={getAllModes(state)}
            activeTab={currentMode}
            onTabChange={(tab) => dispatch(setCurrentMode({ mode: tab }))}
          />
          <MonacoEditor
            key={currentMode}
            value={getCurrentBuffer(state)}
            onChange={(value) => dispatch(setCurrentBuffer({ buffer: value }))}
            {...getMonacoProps(currentMode)}
          />
        </div>
        <div className="column is-half">
          <div dangerouslySetInnerHTML={{ __html: state.output }} />
        </div>
      </AppLayout>
    </main>
  );
};

export default Home;
