import dynamic from "next/dynamic";
const MonacoEditor = dynamic(() => import("react-monaco-editor"), {
  ssr: false,
});

import {
  useStore,
  getAllModes,
  getCurrentBuffer,
  setCurrentBuffer,
  setCurrentMode,
  compile,
} from "../utils/store";
import Tabs from "../components/Tabs";
import { getMonacoProps } from "../utils/monaco";
import Button from "../components/Button";

const Home = () => {
  const [state, dispatch] = useStore();

  return (
    <div className="section">
      <div className="container">
        <div className="columns">
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
              onChange={(value) =>
                dispatch(setCurrentBuffer({ buffer: value }))
              }
              {...getMonacoProps(state)}
            />
          </div>
          <div className="column is-half">
            <Button title="Compile" onClick={() => dispatch(compile(state))} />
            <div className="box">
              <div dangerouslySetInnerHTML={{__html: state.output}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
