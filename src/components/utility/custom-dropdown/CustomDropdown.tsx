import { useEffect, useState } from "react";
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
  const [displayedValue, setDisplayedValue] = useState(
    options.find((option) => option.value === selectedValue)?.label
  );
  const handleOptionClick = (value: string) => {
    setIsOpen(false);
    onChange(value);
  };
  useEffect(() => {
    setDisplayedValue(
      options.find((option) => option.value === selectedValue)?.label
    );
  }, [options, selectedValue]);

  return (
    <div className="custom-dropdown" onClick={() => setIsOpen(!isOpen)}>
      <div className="selected-value">{displayedValue}</div>
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
