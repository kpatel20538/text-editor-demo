export default ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="tabs">
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab}
            className={tab === activeTab ? "is-active" : ""}
            onClick={() => onTabClick(tab)}
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
