import dynamic from "next/dynamic";
import Tabs from "../components/Tabs";
import Button from "../components/Button";
import {
  useStore,
  getAllModes,
  getCurrentBuffer,
  setCurrentBuffer,
  setCurrentMode,
  compile,
} from "../utils/store";
import { getMonacoProps } from "../utils/monaco";
import AppLayout from "../components/AppLayout";

const MonacoEditor = dynamic(() => import("react-monaco-editor"), {
  ssr: false,
});

const Home = () => {
  const [state, dispatch] = useStore();

  return (
    <main>
      <div className="buttons">
        <Button
          title="Compile"
          onClick={() => dispatch(compile(state))}
          isLoading={state.loading}
          isSuccess={!state.loading && !state.error}
          isDanger={!state.loading && state.error}
        />
      </div>
      <AppLayout>
        <div className="column is-half">
          <Tabs
            tabs={getAllModes(state)}
            activeTab={state.currentMode}
            onTabChange={(tab) => dispatch(setCurrentMode({ mode: tab }))}
          />
          <MonacoEditor
            key={state.currentMode}
            theme="vs-dark"
            height="800px"
            value={getCurrentBuffer(state)}
            onChange={(value) => dispatch(setCurrentBuffer({ buffer: value }))}
            {...getMonacoProps(state)}
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
