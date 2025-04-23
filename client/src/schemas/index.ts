import * as yup from "yup";

export const userSchema = yup.object().shape({
  id: yup.number().optional(),
  name: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z\s]+$/, "El nombre solo puede contener letras y espacios")
    .required("El nombre es necesario"),
  email: yup
    .string()
    .trim()
    .email("Ingrese un correo válido")
    .required("El correo electrónico es necesario"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/, "Debe contener al menos una mayúscula")
    .matches(/[a-z]/, "Debe contener al menos una minúscula")
    .matches(/[0-9]/, "Debe contener al menos un número")
    .matches(/[\W_]/, "Debe contener al menos un carácter especial")
    .required("La contraseña es necesaria"),
  address: yup
    .string()
    .trim()
    .min(5, "La dirección debe ser válida")
    .required("La dirección es necesaria"),
  phone: yup
    .string()
    .matches(/^\+?\d{7,15}$/, "El teléfono debe ser válido (7-15 dígitos)")
    .required("El teléfono es necesario"),
  role: yup.string().optional(),
  createdAt: yup.string().optional(),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Ingrese un correo válido")
    .required("El correo electrónico es necesario"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/, "Debe contener al menos una mayúscula")
    .matches(/[a-z]/, "Debe contener al menos una minúscula")
    .matches(/[0-9]/, "Debe contener al menos un número")
    .matches(/[\W_]/, "Debe contener al menos un carácter especial")
    .required("La contraseña es necesaria"),
});

export const productSchema = yup.object({
  id: yup.number(),
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, "Precio inválido")
    .required(),
  stock: yup.number().required(),
  createdAt: yup.date().required(),
  images: yup
    .array()
    .of(
      yup.object({
        id: yup.number().required(),
        url: yup.string().url().required(),
        productId: yup.number().required(),
      })
    )
    .required(),
  categories: yup
    .array()
    .of(
      yup.object({
        productId: yup.number().required(),
        categoryId: yup.number().required(),
        category: yup
          .object({
            id: yup.number().required(),
            name: yup.string().required(),
          })
          .required(),
      })
    )
    .required(),
  orderDetails: yup.array().of(yup.mixed()).required(),
});

export const categorySchema = yup.object({
  id: yup.number(),
  name: yup.string().required(),
});
