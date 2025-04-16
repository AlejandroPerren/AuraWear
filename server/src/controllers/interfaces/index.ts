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

  createAdmin(user: IRegister): Promise<IFunctionResponse<IRegister>>;

}

//CRUD Interface of Product Controller
export interface IProductController {

  getAllProducts(): Promise<IFunctionResponse<IProduct[] | null>>;

  getProductById(id: number): Promise<IFunctionResponse<IProduct | null>>;

  createProduct(product: ICreateProduct): Promise<IFunctionResponse<IProduct>>;

  updateProduct(productId:number , product: ICreateProduct): Promise<IFunctionResponse<IProduct>>;

  deleteProductById(id: number): Promise<IFunctionResponse<null>>;
}

export interface ICategoryController{

  getAllCategories(): Promise<IFunctionResponse<ICategory[] | null>>;

  createCategory(category: ICategory): Promise<IFunctionResponse<ICategory>>;

  deleteCategory(id: number): Promise<IFunctionResponse<null>>;

}
