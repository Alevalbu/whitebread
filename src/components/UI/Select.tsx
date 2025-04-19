'use client';
import React, { useState } from "react";

export type SelectOption = {
  value: string;
  label: string;
};

type BaseSelectProps = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  options: SelectOption[];
  onChange?: (value: string) => void;
  className?: string;
  value?: string;
  error?: string;
};

type DefaultSelectProps = BaseSelectProps & {
  variant: "default";
};

type ErrorSelectProps = BaseSelectProps & {
  variant: "error";
};

type SelectProps = DefaultSelectProps | ErrorSelectProps;

const Select: React.FC<SelectProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(props.value || "");

  const handleSelectInput = (option: SelectOption) => {
    setSelectedValue(option.value);
    props.onChange?.(option.value);
    setIsOpen(false);
  };

  const selectedOption = props.options.find(
    (option) => option.value === selectedValue
  );

  const getBorderColor = () => {
    if (props.variant === "error") return "border-red-500";
    return isOpen ? "border-blue-500" : "border-gray-300";
  };

  const getFocusRing = () => {
    if (props.variant === "error") return "ring-2 ring-red-200";
    return isOpen ? "ring-2 ring-blue-2" : "";
  };

  return (
    <div className={`relative mb-4 ${props.className || ""}`}>
      {props.label && (
        <label className="block text-gray-700 text-sm font-medium mb-2">
          {props.label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={`relative cursor-pointer ${
          props.variant === "error" ? "border-red-500" : ""
        }`}
      ></div>

      <div
        className={`relative cursor-pointer ${
          props.variant === "error" ? "border-red-500" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`flex items-center justify-between w-full p-3 bg-white rounded-md border ${getBorderColor()} ${getFocusRing()} transition-all duration-200`}
        >
          <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
            {selectedOption
              ? selectedOption.label
              : props.placeholder || "Select an option"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`text-gray-500 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {props.options.map((option) => (
              <div
                key={option.value}
                className={`p-3 hover:bg-gray-100 cursor-pointer ${
                  selectedValue === option.value
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-900"
                }`}
                onClick={() => handleSelectInput(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {props.variant === "error" && props.error && (
        <p className="mt-1 text-red-500 text-sm">{props.error}</p>
      )}
    </div>
  );
};

export default Select;
