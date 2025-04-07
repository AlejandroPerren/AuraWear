import { Controller, Control } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; 
import { Error } from "../../../utils/ErrorMessage";
import { TSignUp } from "../../../types";

interface PhoneFieldProps {
  control: Control<TSignUp>; 
  name: keyof TSignUp;
  error?: string;
}

const PhoneField = ({ control, name, error }: PhoneFieldProps) => {
  return (
    <div className="relative">
      <label className="absolute left-3  text-gray-500 transition-all z-10 duration-300 font-bold -top-2 text-sm bg-white px-1">
        Teléfono
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <PhoneInput
            {...field}
            country={"ar"}
            inputClass="!w-full !border !pl-11 !border-gray-300 !rounded-md !py-5 !bg-transparent focus:!border-blue-500 focus:!ring-blue-500"
            containerClass="relative w-full"
            buttonClass="!border-gray-300 !bg-transparent hover:!bg-gray-100"
            dropdownClass="!border-gray-300 !shadow-md"
          />
        )}
      />
      {error && <Error>{error}</Error>}
    </div>
  );
};

export default PhoneField;
