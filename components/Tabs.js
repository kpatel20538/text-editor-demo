import { Children, useState } from "react";

export default ({ tabs, children }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <div className="tabs">
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab}
              className={tab === activeTab ? "is-active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              <a>{tab}</a>
            </li>
          ))}
        </ul>
      </div>
      {Children.toArray(children).find(
        (element) => element.props.tab === activeTab
      )}
    </>
  );
};
