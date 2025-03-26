import { ApiResponse, TSignUp } from "../../types";
import { fetchData } from "../util/fetchFunction";
import summaryApi from "../util/SummaryApi";

export const SignUpFetch = async (data: TSignUp) => {
  const response = await fetchData<ApiResponse<{ token: string }>>(
    summaryApi.SignUp.url,{
        method: summaryApi.SignUp.method,
        body: JSON.stringify(data)
    }
  );
  return response
};
