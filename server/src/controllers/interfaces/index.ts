
import { TRegister, IUser, TLogin } from "../../types/auth.types"
import { IFunctionResponse } from "../../types/functions.types";



export interface IAuthController {
    //register Controller
    registerUser(user: TRegister): Promise<IFunctionResponse<TRegister>> 

    //Login Controller
    loginUser(user: TLogin): Promise<IFunctionResponse<TLogin>>
}


export interface IUsersController {
    getAllUsers(): Promise<IFunctionResponse<IUser[] | null>> ;
    
    getOneUserByEmail(email: string): Promise<IFunctionResponse<IUser | null>> ;
}