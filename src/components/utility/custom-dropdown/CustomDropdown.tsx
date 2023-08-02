import { useState } from "react";
import "./CustomDropdown.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  onChange: (value: string) => void;
  selectedValue: string;
}

function CustomDropdown({
  options,
  onChange,
  selectedValue,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOptionClick = (value: string) => {
    setIsOpen(false);
    onChange(value);
  };

  return (
    <div className="custom-dropdown" onClick={() => setIsOpen(!isOpen)}>
      <div className="selected-value">
        {options.find((option) => option.value === selectedValue)?.label}
      </div>
      {isOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <li
              key={option.value}
              className="option"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      <ArrowDropDownIcon />
    </div>
  );
}
export default CustomDropdown;
