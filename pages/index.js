import dynamic from "next/dynamic";
const MonacoEditor = dynamic(() => import("react-monaco-editor"), {
  ssr: false,
});

import yaml from "yaml";
import { useState, useEffect } from "react";

const getWorkerUrl = (moduleId, label) => {
  if (label === "json") return "_next/static/json.worker.js";
  if (label === "graphql") return "_next/static/graphql.worker.js";
  if (label === "css") return "_next/static/css.worker.js";
  if (label === "html") return "_next/static/html.worker.js";
  if (label === "typescript" || label === "javascript")
    return "_next/static/ts.worker.js";
  return "_next/static/editor.worker.js";
};

const Home = () => {
  const [templateCode, setTemplateCode] = useState(
    JSON.stringify({ home: 1, dom: 3 }, null, 2)
  );

  const [outputCode, setOutcodeCode] = useState("");
  const [isDanger, setIsDanger] = useState(false);

  useEffect(() => {
    try {
      setOutcodeCode(yaml.stringify(JSON.parse(templateCode)));
      setIsDanger(false);
    } catch {
      setIsDanger(true);
    }
  }, [templateCode]);

  return (
    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-half">
            <MonacoEditor
              language="javascript"
              theme="vs-dark"
              value={templateCode}
              onChange={setTemplateCode}
              editorDidMount={() => {
                window.MonacoEnvironment.getWorkerUrl = getWorkerUrl;
              }}
              height="800px"
            />
          </div>
          <div className="column is-half">
            <div className={`message ${isDanger ? "is-danger" : ""}`}>
              <pre className="message-body">{outputCode}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
