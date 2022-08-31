import { createContext, PropsWithChildren, useContext, useState } from "react"
import { loginUser } from "../api/user";
import { User } from "../types/user";
import { clearLocalStorageUser, getLocalStorageUser, setLocalStorageUser } from "../utils/user";

interface AuthState {
  user: User | null,
  login: (username: string) => Promise<User | null>,
  logout: () => void,
  authError: Error | null
}

const initialAuthState: AuthState = {
  user: null,
  authError: null,
  login() { return Promise.resolve(null) },
  logout() {},
};

const AuthContext = createContext(initialAuthState);

export function AuthProvider(props: PropsWithChildren) {
  const [userData, setUserData] = useState<User | null>(getLocalStorageUser);
  const [authError, setAuthError] = useState<Error | null>(null);

  const login = async (username: string) => {
    if (userData) return null;
    let userResponse;
    try {
      userResponse = await loginUser(username);
      setUserData(userResponse);
      setLocalStorageUser(userResponse);
      setAuthError(null);
    } catch(e: any) {
      setAuthError(e);
    }

    return userResponse ?? null;
  };

  const logout = () => {
    clearLocalStorageUser();
    setUserData(null);
  };

  const authContextValue: AuthState = { 
    user: userData,
    authError,
    login,
    logout,
  }

  return <AuthContext.Provider value={authContextValue} {...props} />
}

export const useAuth = () => useContext(AuthContext);