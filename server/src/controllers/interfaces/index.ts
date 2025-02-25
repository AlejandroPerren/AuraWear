import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IUser, TLogin } from "../../types/auth.types"
import { IFunctionResponse } from "../../types/functions.types";



export interface IAuthController {
    //register Controller
    registerUser(user: IUser): Promise<IFunctionResponse<ResultSetHeader>>;

    //Login Controller
    loginUser(user: TLogin): Promise<IFunctionResponse<RowDataPacket | null>>
}


export interface IUsersController {
    getAllUsers(): Promise<IFunctionResponse<RowDataPacket[] | null>>;
    
    getOneUserByEmail(email: string): Promise<IFunctionResponse<RowDataPacket[] | null>>;
}