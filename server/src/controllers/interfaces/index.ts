
import { IUser, TLogin } from "../../types/auth.types"
import { IFunctionResponse } from "../../types/functions.types";



export interface IAuthController {
    //register Controller
    registerUser(user: IUser): Promise<IFunctionResponse<IUser>> 

    //Login Controller
    loginUser(user: TLogin): Promise<IFunctionResponse<Omit<IUser, "password"> | null>>
}


export interface IUsersController {
    getAllUsers(): Promise<IFunctionResponse<IUser[] | null>> ;
    
    getOneUserByEmail(email: string): Promise<IFunctionResponse<IUser | null>> ;
}