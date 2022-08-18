import axios from "axios";

export const request = async <T>(url: string, method = 'GET', data?: any): Promise<T> => {
  const response = await axios({
    url,
    method,
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    data,
  });

  return response?.data;
}