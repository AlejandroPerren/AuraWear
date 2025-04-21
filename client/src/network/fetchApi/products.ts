import { ApiResponse, TProduct } from "../../types"
import { fetchData } from "../util/fetchFunction"
import summaryApi from "../util/SummaryApi"


export const getAllProducts = async() => {
    return await fetchData<ApiResponse<{ status: number; message: string; data: TProduct[]}>>(
        summaryApi.GetAllProducts.url,
        {
            method: summaryApi.GetAllProducts.method
        }
    )
} 