import classNames from "classnames";

export default ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="tabs">
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab}
            className={classNames({ "is-active": tab === activeTab })}
            onClick={() => onTabChange(tab)}
          >
            <a>{tab}</a>
          </li>
        ))}
      </ul>
      <style jsx>{`
        li {
          text-transform: capitalize;
        }
      `}</style>
    </div>
  );
};
