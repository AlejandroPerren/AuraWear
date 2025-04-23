import * as yup from "yup";
import { categorySchema, loginSchema, productSchema, userSchema } from "../schemas";
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    token?: string | undefined
  }

export type TUser = yup.InferType<typeof userSchema>;

export type TSignUp = Omit<TUser, 'id' | 'role' | 'createdAt'>

export type TLogin = yup.InferType<typeof loginSchema>

export type TProduct = yup.InferType<typeof productSchema >

export type TCategory = yup.InferType<typeof categorySchema>