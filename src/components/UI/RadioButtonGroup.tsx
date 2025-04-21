"use client";
import React, { useState } from "react";

type RadioOption = {
  id: string;
  label: string;
  value: string;
};

type RadioButtonGroupProps = {
  options: RadioOption[];
  name: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  className?: string;
};

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  name,
  onChange,
  defaultValue,
  className,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    defaultValue || ""
  );

  const handleChange = (value: string) => {
    setSelectedValue(value);
    if (onChange) onChange(value);
  };

  return (
    <div className={`flex flex-col w-full ${className || ""}`}>
      {options.map((option, index) => (
        <div
          key={option.id}
          className={`
            border border-gray-300 p-4 flex items-center
            ${index === 0 ? "rounded-t-lg" : ""} 
            ${index === options.length - 1 ? "rounded-b-lg" : ""}
            ${index > 0 ? "border-t-0" : ""}
          `}
        >
          <label aria-label={option.label} className="flex items-center w-full cursor-pointer">
            <div className="relative">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => handleChange(option.value)}
                className="opacity-0 absolute h-6 w-6"
              />
              <div
                className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${
                  selectedValue === option.value
                    ? "border-gray-400"
                    : "border-gray-400"
                }
              `}
              >
                {selectedValue === option.value && (
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                )}
              </div>
            </div>
            <span className="ml-3 text-gray-700 text-lg">{option.label}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioButtonGroup;