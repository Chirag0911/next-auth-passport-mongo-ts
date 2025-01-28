import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface IInputProps {
  type: string;
  isRequired?: boolean;
  label?: string;
  helperText?: string;
  isError?: boolean;
  errorMessage?: string;
  value?: string;
  placeholder?: string;
  onChange: (v: string) => void;
}

const Input: React.FC<IInputProps> = ({
  type,
  isRequired = false,
  label,
  helperText,
  isError = false,
  errorMessage,
  value,
  placeholder,
  onChange,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div>
      {label && (
        <label className="block text-gray-700 font-semibold mb-2">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type === "password" && !isPasswordVisible ? "password" : "text"}
          id="username"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required={isRequired}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {isPasswordVisible ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
          </button>
        )}
      </div>
      {helperText && <p className="text-sm mt-0.5">{helperText}</p>}
      {isError && <p className="text-red-500 text-sm mt-0.5">{errorMessage}</p>}
    </div>
  );
};

export default Input;
