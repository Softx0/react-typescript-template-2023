import {ApiError} from "../types/api.types";

export const handleApiResponse = <T>(response: any): T => {
  if (response.data.success) {
    return response.data.data;
  }

  throw new Error(response.data.message || "Error en la respuesta");
};

export const handleApiError = (error: ApiError): string => error.message || "Ha ocurrido un error inesperado";

export const createFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key];

    if (value !== null && value !== undefined) {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else {
        formData.append(key, String(value));
      }
    }
  });

  return formData;
};
