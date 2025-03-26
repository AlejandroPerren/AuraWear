import { ApiResponse } from "../../types";


interface FetchOptions extends RequestInit {
  token?: string; // Optional authentication token support
}

/**
 * A reusable function for making API requests with optional authentication support.
 *
 * @template T - The expected response data type.
 * @param {RequestInfo} input - The URL or request object.
 * @param {FetchOptions} [options={}] - Additional fetch options, including an optional authentication token.
 * @returns {Promise<ApiResponse<T>>} - A promise resolving to an API response object.
 *
 * @example
 * // Fetching data without authentication
 * const response = await fetchData<User[]>("/api/users");
 * if (response.success) {
 *   console.log(response.data);
 * } else {
 *   console.error(response.message);
 * }
 *
 * @example
 * // Fetching data with authentication
 * const response = await fetchData<User>("/api/profile", {
 *   method: "GET",
 *   token: userToken,
 * });
 * if (response.success) {
 *   console.log("User profile:", response.data);
 * } else {
 *   console.error("Error:", response.message);
 * }
 */
export async function fetchData<T>(
  input: RequestInfo,
  { token, ...init }: FetchOptions = {}
): Promise<ApiResponse<T>> {
  try {
    const headers = new Headers(init.headers || {});

    // Add Authorization header if a token is provided
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    // Ensure Content-Type is set to JSON
    headers.set("Content-Type", "application/json");

    const response = await fetch(input, { ...init, headers });

    // Handle non-successful responses
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({
        message: "Unknown error",
      }));
      const errorMessage = errorBody.message || `Error ${response.status}`;
      console.error(`❌ Fetch Error: ${errorMessage}`);
      return { success: false, message: errorMessage };
    }

    // Parse and return successful response
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("❌ fetchData Error:", error);
    return { success: false, message: "Connection or unexpected error" };
  }
}
