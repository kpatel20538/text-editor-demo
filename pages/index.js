import dynamic from "next/dynamic";
import Tabs from "../components/Tabs";
import Button from "../components/Button";
import { useStore } from "../model/store";
import resolvers from "../model/resolvers";
import initialState from "../model/initialState";
import {
  getAllModes,
  getCurrentMode,
  getCurrentBuffer,
  getIsLoading,
  getHasError,
  getIsSuccess,
  getMonacoProps,
} from "../model/selectors";
import {
  setCurrentBuffer,
  setCurrentMode,
  compileTemplate,
  dismissNotification,
} from "../model/actions";
import Notifications from "../components/Notifications";

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
      <nav className="navbar has-shadow">
        <div className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Button
                  title="Compile"
                  onClick={() => dispatch(compileTemplate(state.buffers))}
                  isLoading={getIsLoading(state)}
                  isSuccess={getIsSuccess(state)}
                  isDanger={getHasError(state)}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <section className="section">
        <div className="container">
          <div className="column is-half">
            <Tabs
              tabs={getAllModes(state)}
              activeTab={currentMode}
              onTabChange={(mode) => dispatch(setCurrentMode(mode))}
            />
            <MonacoEditor
              key={currentMode}
              value={getCurrentBuffer(state)}
              onChange={(buffer) =>
                dispatch(setCurrentBuffer(buffer))
              }
              {...getMonacoProps(currentMode)}
            />
          </div>
          <div className="column is-half">
            <div dangerouslySetInnerHTML={{ __html: state.output }} />
          </div>
        </div>
      </section>
      <footer className="footer">
        Data sourced from <a href="https://anilist.co">AniList GraphQL API</a>
      </footer>
      <Notifications
        notifications={state.notifications}
        onDismiss={(idx) => dispatch(dismissNotification(idx))}
      />
      <style jsx>{`
        main {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        section,
        .container {
          flex: 1;
          display: flex;
        }
      `}</style>
    </main>
  );
};

export default Home;
