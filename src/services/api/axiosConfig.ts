import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {ApiResponse, ApiError} from "../../types/api.types";
import {config} from "../../config/env";

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: config.api.baseUrl,
      timeout: config.api.timeout,
      headers: {
        "Content-Type": "application/json"
      }
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (requestConfig: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("authToken");

        if (token && requestConfig.headers) {
          requestConfig.headers.Authorization = `Bearer ${token}`;
        }

        // eslint-disable-next-line no-console
        console.log(`🚀 ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`);

        return requestConfig;
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.error("❌ Request error:", error);

        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        // eslint-disable-next-line no-console
        console.log(`✅ ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);

        return response;
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.error("❌ Response error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("authToken");
          window.location.href = "/login";
        }

        const apiError: ApiError = {
          message: error.response?.data?.message || "Error de conexión",
          statusCode: error.response?.status || 500,
          error: error.response?.data?.error
        };

        return Promise.reject(apiError);
      }
    );
  }

  public get<T>(url: string, requestConfig?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.axiosInstance.get(url, requestConfig);
  }

  public post<T>(url: string, data?: any, requestConfig?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.axiosInstance.post(url, data, requestConfig);
  }

  public put<T>(url: string, data?: any, requestConfig?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.axiosInstance.put(url, data, requestConfig);
  }

  public delete<T>(url: string, requestConfig?: AxiosRequestConfig): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.axiosInstance.delete(url, requestConfig);
  }
}

export const apiClient = new ApiClient();
