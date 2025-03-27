import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { TSignUp } from "../../types";
import { SignUpFetch } from "../../network/fetchApi/auth";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../schemas";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import InputField from "./utils/InputField";
import PhoneField from "./utils/PhoneField";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TSignUp>({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (data: TSignUp) => {
    setLoading(true);
    try {
      const response = await SignUpFetch(data);
      if (!response.success) {
        toast.error(response.message);
        setLoading(false);
      } else {
        toast.success(response.message);
        setLoading(false);
        reset();
        navigate("/");
      }
    } catch (error) {
      toast.error("Ocurrió un error al registrarse");
      console.log("Error en el registro", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-96 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1></h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          label="Nombre"
          id="name"
          placeholder="Ingrese su Nombre Completo"
          register={register("name")}
          error={errors.name}
        />
        <InputField
          label="Correo"
          id="email"
          type="email"
          placeholder="Ingrese su Correo Electrónico"
          register={register("email")}
          error={errors.email}
        />

        <div className="relative">
          <InputField
            label="Contraseña"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Ingrese su Contraseña"
            register={register("password")}
            error={errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        </div>

        <InputField
          label="Dirección"
          id="address"
          placeholder="Ingrese su Dirección"
          register={register("address")}
          error={errors.address}
        />
        <PhoneField
          control={control}
          name="phone"
          error={errors.phone?.message}
        />

        <button
          className="w-full bg-rose-500 text-white p-2 rounded-md hover:bg-rose-600"
          type="submit"
        >
          {loading ? "Registrando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
