import dynamic from "next/dynamic";
import Tabs from "../components/Tabs";
import Button from "../components/Button";
import Notifications from "../components/Notifications";
import { useStore } from "../model/store";
import { reducer, initialState } from "../model/reducer";
import {
  getAllModes,
  getCurrentMode,
  getCurrentBuffer,
  getIsLoading,
  getHasError,
  getIsSuccess,
  getMonacoProps,
  getNotifications,
  getOutputDocument,
} from "../model/selectors";
import {
  setCurrentBuffer,
  setCurrentMode,
  compileTemplate,
  dismissNotification,
} from "../model/actions";

const MonacoEditor = dynamic(() => import("react-monaco-editor"), {
  ssr: false,
});

const Home = () => {
  const [state, dispatch] = useStore(reducer, initialState);

  return (
    <main>
      <nav className="navbar has-shadow">
        <div className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Button
                  title="Compile"
                  onClick={() => dispatch(compileTemplate())}
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
              activeTab={getCurrentMode(state)}
              onTabChange={(mode) => dispatch(setCurrentMode(mode))}
            />
            <MonacoEditor
              key={getCurrentMode(state)}
              value={getCurrentBuffer(state)}
              onChange={(buffer) => dispatch(setCurrentBuffer(buffer))}
              {...getMonacoProps(state)}
            />
          </div>
          <div className="column is-half">
            <div dangerouslySetInnerHTML={{ __html: getOutputDocument(state) }} />
          </div>
        </div>
      </section>
      <footer className="footer">
        Data sourced from <a href="https://anilist.co">AniList GraphQL API</a>
      </footer>
      <Notifications
        notifications={getNotifications(state)}
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
