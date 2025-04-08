import { useForm } from "react-hook-form";
import { useAppStore } from "../../store/useAppStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { TLogin } from "../../types";
import { loginSchema } from "../../schemas";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginFetch } from "../../network/fetchApi/auth";
import InputField from "./utils/InputField";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAppStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLogin>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: TLogin) => {
    setLoading(true);
    try {
      const response = await LoginFetch(data);
      if (!response.success) {
        toast.error(response.message);
        setLoading(false);
      }
      toast.success(response.message);
      setLoading(false);
      reset();
      navigate("/");
    } catch (error) {
      toast.error("Ocurrio un error al Registrarse");
      console.log("Error en registro", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-96 mx-auto p-6 rounded-lg bg-white shadow-lg ">
      <h1 className="text-2xl text-center font-extrabold my-4 text-gray-500">
        Ingresa tus Datos
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} data-aos="fade-top" data-aos-anchor-placement="top-center" className="space-y-6">
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
        <button
          className="w-full bg-rose-500 text-white p-2 rounded-md hover:bg-rose-600"
          type="submit"
        >
          {loading ? "Registrando..." : "Ingresar"}
        </button>
      </form>

      <button className="text-gray-500 pt-4" onClick={setAuth}>
        Aun no tienes una cuenta? Crea Una
      </button>
    </div>
  );
};

export default Login;
