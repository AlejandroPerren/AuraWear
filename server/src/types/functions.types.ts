

export interface IFunctionResponse<T> {
    status: number,
    message: string,
    error?: string ,
    data?: T,
    token?: string;
}