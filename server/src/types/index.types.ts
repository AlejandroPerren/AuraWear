import { User, Category, Product, Order, OrderDetail } from "@prisma/client";

export type IUser = User;
export type ICategory = Omit<Category, "id">;
export type IProduct = Product;
export type IOrder = Order;
export type IOrderDetail = OrderDetail;


export type IRegister = Omit<User, "role" | "createdAt" | "id" >;
export type ILogin = Pick<User, "email" | "password">;

export type ICreateProduct = Omit<IProduct, "createdAt"> & {
    id?: number;
    price: number | string; 
    images: string[];
  };
