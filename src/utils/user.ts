import { USER_LOCAL_STATE_KEY } from "../constants/user";
import { User } from "../types/user";

export const getLocalStorageUser = (): User | null => {
  const user = localStorage.getItem(USER_LOCAL_STATE_KEY);

  return user ? JSON.parse(user) : null;
};

export const setLocalStorageUser = (user: User) =>
  localStorage.setItem(USER_LOCAL_STATE_KEY, JSON.stringify(user));

export const clearLocalStorageUser = () =>
  localStorage.removeItem(USER_LOCAL_STATE_KEY);
