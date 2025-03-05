import { User, Category, Product, Order, OrderDetail } from "@prisma/client";


export type IUser = User;
export type ICategory = Category;
export type IProduct = Product;
export type IOrder = Order;
export type IOrderDetail = OrderDetail;



export type TRegister = Omit<User, "role" | "createdAt" | "id" >;
export type TLogin = Pick<User, "email" | "password">;
