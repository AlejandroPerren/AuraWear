import * as yup from "yup";
import { loginSchema, userSchema } from "../schemas";
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
  }

export type TUser = yup.InferType<typeof userSchema>;

export type TSignUp = Omit<TUser, 'id' | 'role' | 'createdAt'>

export type TLogin = yup.InferType<typeof loginSchema>