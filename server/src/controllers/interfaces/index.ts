import { ResultSetHeader } from "mysql2";
import { IUser } from "../../types/auth.types"

export interface IFunctionResponse<T> {
    status: number,
    message: string,
    error?: string ,
    data?: T;
}



export interface IAuthController {
    //register Controller
    registerUser(user: IUser): Promise<IFunctionResponse<ResultSetHeader>>;
}