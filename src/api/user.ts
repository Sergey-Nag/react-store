import axios from "axios";
import { BOOKS_API_BASE_URL } from "../constants/books-api";
import { User } from "../types/user";

export const loginUser = async (username: string | null): Promise<User> => 
  (await axios.post(`${BOOKS_API_BASE_URL}/signin`, { username })).data;
