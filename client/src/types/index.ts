import * as yup from "yup";
import { userSchema } from "../schemas";
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
  }

export type TUser = yup.InferType<typeof userSchema>;

export type TSignUp = Omit<TUser, 'id' | 'role' | 'createdAt'>

export type TLogin = Pick<TUser, 'email' | 'password'>