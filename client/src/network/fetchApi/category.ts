import { ApiResponse, TCategory } from "../../types";
import { fetchData } from "../util/fetchFunction";
import summaryApi from "../util/SummaryApi";

export const getAllCategories = async () => {
  return await fetchData<
    ApiResponse<{ status: number; message: string; data: TCategory[] }>
  >(summaryApi.GetAllCategories.url, {
    method: summaryApi.GetAllCategories.method,
  });
};

export const createCategory = async (data: TCategory) => {
  const response = await fetchData<
    ApiResponse<{ status: number; message: string; data: TCategory[] }>
  >(summaryApi.CreateCategories.url, {
    method: summaryApi.CreateCategories.method,
    body: JSON.stringify(data),
  });
  return response;
};

export const deleteCategory = async (id: number) => {
  return await fetchData<ApiResponse<{ status: number; message: string }>>(
    `${summaryApi.DeleteCategories.url}/${id}`,
    {
      method: summaryApi.DeleteCategories.method,
    }
  );
};
