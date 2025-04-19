import React, { useState } from "react";

type OccupancyCounterProps = {
  title: string;
  description: string;
  initialValue?: number;
  minValue?: number;
  maxValue?: number;
  onChange?: (value: number) => void;
  className?: string;
};

const OccupancyCounter: React.FC<OccupancyCounterProps> = ({
  title,
  description,
  initialValue = 0,
  minValue = 0,
  maxValue = 10,
  onChange,
  className,
}) => {
  const [count, setCount] = useState<number>(initialValue);

  const decrementCount = () => {
    if (count > minValue) {
      const newValue = count - 1;
      setCount(newValue);
      onChange?.(newValue);
    }
  };

  const incrementCount = () => {
    if (count < maxValue) {
      const newValue = count + 1;
      setCount(newValue);
      onChange?.(newValue);
    }
  };

  const isDecrementDisabled = count <= minValue;
  const isIncrementDisabled = count >= maxValue;

  return (
    <div
      className={`border border-gray-300 rounded-lg p-4 flex items-center justify-between ${
        className || ""
      }`}
    >
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={decrementCount}
          disabled={isDecrementDisabled}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center border
            ${
              isDecrementDisabled
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-gray-300 text-gray-500 hover:bg-gray-100"
            }
            transition-colors duration-200
          `}
          aria-label="Decrease"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>

        <div className="w-16 h-16 border border-gray-300 rounded-md flex items-center justify-center">
          <span className="text-2xl text-gray-800">{count}</span>
        </div>

        <button
          onClick={incrementCount}
          disabled={isIncrementDisabled}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center border
            ${
              isIncrementDisabled
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-teal-500 text-teal-500 hover:bg-teal-50"
            }
            transition-colors duration-200
          `}
          aria-label="Increase"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default OccupancyCounter;
