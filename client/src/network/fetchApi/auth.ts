import { ApiResponse, TLogin, TSignUp } from "../../types";
import { fetchData } from "../util/fetchFunction";
import summaryApi from "../util/SummaryApi";

export const SignUpFetch = async (data: TSignUp) => {
  const response = await fetchData<ApiResponse<{ token: string }>>(
    summaryApi.SignUp.url,
    {
      method: summaryApi.SignUp.method,
      body: JSON.stringify(data),
    }
  );
  return response;
};

export const LoginFetch = async (data: TLogin) => {
  const response = await fetchData<ApiResponse<{ token: string }>>(
    summaryApi.Login.url,
    {
      method: summaryApi.Login.method,
      body: JSON.stringify(data),
    }
  );
  return response;
};
