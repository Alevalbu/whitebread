'use client';
import React, { useState } from 'react';

type BaseInputProps = {
    label?: string;
    placeholder?: string;
    required?: boolean;
    onChange?: (value: string) => void;
    className?: string;
    value?: string;
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
  
  type InputProps = TextInputProps | PhoneInputProps | ImageTextInputProps;

const Input: React.FC<InputProps> = (props) => {
    const [value, setValue] = useState(props.value || '');
    const [focused, setFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        props.onChange?.(e.target.value);
    };

    const renderInput = () => {
        const baseInputClases = `w-full p-13 rounded-md border ${
            focused ? 'border-blue-500 outline-none ring-2 ring-blue-200' : 'border-gray-300' }
            transition-all duration-200 focus:outline-none`;
    

        switch(props.type) {
            case 'text':
                return (
                    <input 
                    type='text'
                    value={value}
                    onChange={handleChange}
                    placeholder={props.placeholder}
                    required={props.required}
                    className={baseInputClases}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    />
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
                            className={`${baseInputClases} border-0`}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                        />
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
                            className={`${baseInputClases} pl-10`}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                        />
                    </div>
                )
        }
    };

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