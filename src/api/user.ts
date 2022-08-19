import { BOOKS_API_BASE_URL } from "../constants/books-api";
import { User } from "../types/user";
import { request } from "./reqest";

export const loginUser = async (username: string | null): Promise<User> => 
  await request<User>(`${BOOKS_API_BASE_URL}/signin`, 'POST', { username });
