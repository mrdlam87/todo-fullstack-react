import "./date-picker.style.scss";

const DatePicker = ({ label, value, onChange }) => {
  return (
    <div className="date-input">
      <label>{label}</label>
      <input type="date" value={value} onChange={onChange} />
    </div>
  );
};

export default DatePicker;
