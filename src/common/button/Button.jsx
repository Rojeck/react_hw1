import './button.css';

const Button = ({ text, onClick, fontSize }) => {
  return (
    <button
      onClick={onClick}
      className="common-btn"
      style={{ fontSize: `${fontSize}px` }}
    >
      {text}
    </button>
  );
};

export default Button;
