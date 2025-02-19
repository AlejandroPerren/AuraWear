
export interface IUser {
    id?: number;
    name: string;
    email: string;
    password: string;
    address?: string;
    phone?: string;
    role?: 'customer' | 'admin';
    created_at?: string;
}

export type TLogin = Pick<IUser, "email" | "password">

export interface ICategory {
    id: number;
    name: string;
}

export interface IProduct {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    image?: string;
    category_id: number;
    created_at: string;
}

export interface IOrder {
    id: number;
    user_id: number;
    total: number;
    status: 'pending' | 'paid' | 'shipped' | 'canceled';
    created_at: string;
}


export interface IOrderDetail {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    subtotal: number;
}
