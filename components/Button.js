import classNames from 'classnames';

export default ({ title, isLoading, isDanger, isSuccess, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classNames("button", {
        'is-success': isSuccess,
        'is-danger': isDanger,
        'is-loading': isLoading,
      })}
    >
      {title}
    </button>
  );
};
