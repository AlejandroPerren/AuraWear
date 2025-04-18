import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Error } from "../../../utils/ErrorMessage";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  register: UseFormRegisterReturn; 
  error?: FieldError;
}

const InputField = ({ label, id, type = "text", placeholder, register, error }: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative" data-aos="fade-left" >
      <label
        htmlFor={id}
        className={`absolute left-3 text-gray-500 transition-all font-bold duration-300
          ${isFocused ? "-top-2 text-sm bg-white px-1" : "top-3"}`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...register}
        placeholder={isFocused ? placeholder : ""}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(!!e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
      />
      {error && <Error>{error.message}</Error>}
    </div>
  );
};

export default InputField;
