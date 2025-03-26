import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { TSignUp } from "../../types";
import { SignUpFetch } from "../../network/fetchApi/auth";
import { toast } from "react-toastify";
import { Error } from "../../utils/ErrorMessage";
import { userSchema } from "../../schemas";
import { yupResolver } from "@hookform/resolvers/yup";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSignUp>({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (data: TSignUp) => {
    setLoading(true);

    try {
      const response = await SignUpFetch(data);

      if (!response.success) {
        toast.error(response.message);
        console.log("Error en la API", response);
        setLoading(false);
      } else {
        toast.success(response.message);
        setLoading(false);
        reset();
        navigate("/")
      }
    } catch (error) {
      toast.error("Ocurrio un error al Ingresar");
      console.log("Error en el registro", error);
      setLoading(false);
    }
  };
  return (
    <div className="bg-white">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div>
          <label  htmlFor="dni">Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Ingrese su Nombre Completo"
            {...register("name")}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
        </div>
           {/* Email */}
           <div>
          <label htmlFor="email">Correo</label>
          <input
            id="email"
            type="text"
            placeholder="Ingrese su Correo Electronico"
            {...register("email")}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </div>
           {/* Password */}
           <div>
          <label htmlFor="dni">Contraseña</label>
          <input
            id="password"
            type="text"
            placeholder="Ingrese su Contraseña"
            {...register("password")}
          />
          {errors.password && <Error>{errors.password.message}</Error>}
        </div>
           {/* address */}
           <div>
          <label htmlFor="dni">Direccion</label>
          <input
            id="address"
            type="text"
            placeholder="Ingrese su Direccion"
            {...register("address")}
          />
          {errors.address && <Error>{errors.address.message}</Error>}
        </div>
           {/* phone */}
           <div>
          <label htmlFor="phone">Telefono</label>
          <input
            id="phone"
            type="text"
            placeholder="Ingrese su Telefono"
            {...register("phone")}
          />
          {errors.phone && <Error>{errors.phone.message}</Error>}
        </div>
        <button className="w-full bg-rose-400"
        type="submit">
          Ingresar
        </button>

      </form>
    </div>
  );
};

export default SignUp;
