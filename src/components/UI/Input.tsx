'use client';
import React, { useState } from 'react';

type BaseInputProps = {
    label?: string;
    placeholder?: string;
    required?: boolean;
    onChange?: (value: string) => void;
    className?: string;
    value?: string;
    error?: string; 
  };
  
  type TextInputProps = BaseInputProps & {
    type: 'text';
  };
  
  type PhoneInputProps = BaseInputProps & {
    type: 'phone';
    countryCode?: string;
  };
  
  type ImageTextInputProps = BaseInputProps & {
    type: 'imageText';
    icon: React.ReactNode;
  };

  type DateRangeInputProps = BaseInputProps & {
    type: 'dateRange';
    startDate?: string;
    endDate?: string;
    onDateRangeChange?: (startDate: string, endDate: string) => void;
  };
  
  type InputProps = TextInputProps | PhoneInputProps | ImageTextInputProps | DateRangeInputProps;

const Input: React.FC<InputProps> = (props) => {
    const [value, setValue] = useState(props.value || '');
    const [focused, setFocused] = useState(false);
    const [startDate, setStartDate] = useState((props.type === 'dateRange' ? props.startDate : '') || '');
    const [endDate, setEndDate] = useState((props.type === 'dateRange' ? props.endDate : '') || '');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        props.onChange?.(e.target.value);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStartDate = e.target.value;
        setStartDate(newStartDate);

        if (props.type === 'dateRange' && props.onDateRangeChange) {
            props.onDateRangeChange(newStartDate, endDate);
        }
    }

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEndDate = e.target.value;
        setEndDate(newEndDate);

        if (props.type === 'dateRange' && props.onDateRangeChange) {
            props.onDateRangeChange(startDate, newEndDate);
        }
    }

    const renderInput = () => {
        const baseInputClasses = `w-full p-1 h-[30px] rounded-md border ${
            focused ? 'border-blue-500 outline-none ring-2 ring-blue-200' : 'border-gray-300' }
            transition-all duration-200 focus:outline-none`;
    

        switch(props.type) {
            case 'text':
                return (
                    <>
                    <input 
                    type='text'
                    value={value}
                    onChange={handleChange}
                    placeholder={props.placeholder}
                    required={props.required}
                    className={baseInputClasses}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    />
                    {props.error && <span className='text-red-500'>{props.error}</span>}
                    </>
                );
            case 'phone':
                return (
                    <div className='flex items-center border rounded-md overflow-hidden'>
                        <div className='bg-gray-50 p-3 border-r border-gray-300 flex items-center space-x-1'>
                            {props.countryCode === '+44' ? (
                                 <>
                                 <div className="w-6 h-4 bg-blue-600 relative overflow-hidden">
                                   <div className="absolute inset-0 flex items-center justify-center">
                                     <div className="w-full h-1 bg-white"></div>
                                     <div className="absolute inset-0 flex items-center justify-center">
                                       <div className="w-1 h-full bg-white"></div>
                                     </div>
                                     <div className="absolute inset-0 flex items-center justify-center rotate-45">
                                       <div className="w-full h-1 bg-red-600"></div>
                                     </div>
                                   </div>
                                 </div>
                                 <span>+44</span>
                               </>
                            ) : (
                                <span>{props.countryCode || '+1'}</span>
                            )}
                        </div>
                        <input 
                            type='tel'
                            value={value}
                            onChange={handleChange}
                            placeholder={props.placeholder}
                            required={props.required}
                            className={`${baseInputClasses} border-0`}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                        />
                        {props.error && <span className='text-red-500'>{props.error}</span>}
                    </div>
                );
            case 'imageText':
                return (
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500'>
                            {props.icon}
                        </div>
                        <input 
                            type='text'
                            value={value}
                            onChange={handleChange}
                            placeholder={props.placeholder}
                            required={props.required}
                            className={`${baseInputClasses} pl-10`}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                        />
                        {props.error && <span className='text-red-500'>{props.error}</span>}
                    </div>
                )
                case 'dateRange':
                    return (
                      <div className='relative'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500'>
                          <CalendarIcon />
                        </div>
                        <div className='flex items-center'>
                          <input
                            type='date'
                            value={startDate}
                            onChange={handleStartDateChange}
                            placeholder='From'
                            required={props.required}
                            className={`${baseInputClasses} pl-10 rounded-r-none`}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                          />
                          <div className='flex items-center justify-center w-8 h-[30px] bg-gray-100 border-t border-b border-gray-300'>
                            <span className='text-gray-500'>→</span>
                          </div>
                          <input
                            type='date'
                            value={endDate}
                            onChange={handleEndDateChange}
                            placeholder='To'
                            required={props.required}
                            className={`${baseInputClasses} rounded-l-none`}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                          />
                        </div>
                        {props.error && <span className='text-red-500'>{props.error}</span>}
                      </div>
                    );
        }
    };

    const CalendarIcon = () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      );

    return (
        <div className={`mb-4 ${props.className || ''}`}>
            {props.label && (
                <label className='block text-gray-700 text-sm font-medium mb-2'>
                    {props.label}
                    {props.required && <span className='text-red-500 ml-1'>*</span>}
                </label>
            )}
            {renderInput()}
        </div>
    );
};

export default Input;