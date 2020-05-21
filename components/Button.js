export default ({ title, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {title}
    </button>
  );
};
