import {
  IRegister,
  IUser,
  ILogin,
  IProduct,
  ICreateProduct,
  ICategory,
} from "../../types/index.types";
import { IFunctionResponse } from "../../types/functions.types";

export interface IAuthController {
  //register Controller
  registerUser(user: IRegister): Promise<IFunctionResponse<IRegister>>;

  //Login Controller
  loginUser(user: ILogin): Promise<IFunctionResponse<ILogin>>;
}

export interface IUsersController {
  //Get All users
  getAllUsers(): Promise<IFunctionResponse<IUser[] | null>>;
  //Get One User By Id
  getOneUserByEmail(email: string): Promise<IFunctionResponse<IUser | null>>;
  //Delete User By Id
  deleteUserByID(id: number): Promise<IFunctionResponse<null>>;

}

//CRUD Interface of Product Controller
export interface IProductController {

  getAllProducts(): Promise<IFunctionResponse<IProduct[] | null>>;

  getProductById(id: number): Promise<IFunctionResponse<IProduct[] | null>>;

  createProduct(product: IProduct): Promise<IFunctionResponse<ICreateProduct>>;

  updateProduct(productId:string , product: IProduct): Promise<IFunctionResponse<ICreateProduct>>;

  deleteProductById(id: number): Promise<IFunctionResponse<null>>;
}

export interface ICategoryController{

  getAllCategories(): Promise<IFunctionResponse<ICategory[] | null>>;

  createCategory(category: ICategory): Promise<IFunctionResponse<ICategory>>;

  deleteCategory(id: number): Promise<IFunctionResponse<null>>;

}
