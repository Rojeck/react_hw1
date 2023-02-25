import "./input.css";

const CustomInput = ({ type, placeholder, onChange, value, label }) => {
  return (
    <div className="custom-input">
      <label htmlFor="input">{label}</label>
      <input
        className="custom-input"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type={type}
        id="input"
      />
    </div>
  );
};

export default CustomInput;
