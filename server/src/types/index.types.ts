import { User, Category, Product, Order, OrderDetail, ProductImage, ProductCategory } from "../../generated/prisma";

export type IUser = User;
export type ICategory = Omit<Category, "id">;
export type IProduct = Product;
export type IOrder = Order;
export type IOrderDetail = OrderDetail;


export type IRegister = Omit<User, "role" | "createdAt" | "id" >;
export type ILogin = Pick<User, "email" | "password">;

export type IProductFull = Product & {
  images: ProductImage[];
  categories: (ProductCategory & { category: Category })[];
  orderDetails: OrderDetail[];
};


export type ICreateProduct = Omit<IProduct, "createdAt" | "id"> & {
    price: number | string; 
    images: string[];
    categoryIds?: number[];
  };
