import "./text-input.style.scss";

const TextInput = ({ label, placeholderText, value, onChange }) => {
  return (
    <div className="text-input">
      <label>{label}</label>
      <input
        type="text"
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
