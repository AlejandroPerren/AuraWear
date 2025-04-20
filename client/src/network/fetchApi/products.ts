import { ApiResponse } from "../../types"
import { fetchData } from "../util/fetchFunction"
import summaryApi from "../util/SummaryApi"


export const getAllProducts = async() => {
    return await fetchData<ApiResponse<{token: string}>>(
        summaryApi.GetAllProducts.url,
        {
            method: summaryApi.GetAllProducts.method
        }
    )
} 