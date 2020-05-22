import { FaExclamationTriangle } from "react-icons/fa";

const getColor = (color) => (color ? `is-${color}` : "");

const getIcon = (icon) => {
  return {
    "exclamation-triangle": <FaExclamationTriangle color="white" size="2rem" />,
  }[icon];
};

export default ({ notifications, onDismiss }) => {
  return (
    <div className="notifications">
      {notifications.map(({ icon, color, title, description }, idx) => (
        <div className={`notification ${getColor(color)}`}>
          <article className="media">
            <div className="media-left">{getIcon(icon)}</div>
            <div className="media-content">
              <div className="title is-4">{title}</div>
              <div className="subtitle is-6">{description}</div>
            </div>
            <div className="media-right">
              <button className="delete is-medium" onClick={() => onDismiss(idx)} />
            </div>
          </article>
        </div>
      ))}
      <style jsx>{`
        .notifications {
          position: fixed;
          top: 64px;
          right: 0;
        }
        .notification {
          width: 300px;
          margin: 16px;
        }
      `}</style>
    </div>
  );
};
