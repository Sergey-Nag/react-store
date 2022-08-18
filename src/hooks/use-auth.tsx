import { createContext, useContext, useMemo, useState } from "react"
import { useQuery } from "react-query";
import { RQ_KEY } from "../config/react-query";
import { loginUser } from "../api/user";
import { User } from "../types/user";
import { clearLocalStorageUser, getLocalStorageUser, setLocalStorageUser } from "../utils/user";

interface AuthState {
  user: User | null,
  login: (username: string) => Promise<User | null>,
  logout: () => void
}

const initialAuthState: AuthState = {
  user: null,
  login() { return Promise.resolve(null) },
  logout() {},
};

const AuthContext = createContext(initialAuthState);


export function AuthProvider(props: any) {
  const [userData, setUserData] = useState<User | null>(getLocalStorageUser);
  const [authError, setAuthError] = useState<Error | null>(null);

  const login = async (username: string) => {
    if (userData) return;
    let userResponse;
    try {
      userResponse = await loginUser(username);
      setUserData(userResponse);
      setLocalStorageUser(userResponse)
    } catch(e) {
      setAuthError(e as Error);
    }

    return userResponse ?? null;
  };

  const logout = () => {
    clearLocalStorageUser();
    setUserData(null);
  };

  const authContextValue = { 
    user: userData,
    authError,
    login,
    logout,
  }

  return <AuthContext.Provider {...props} value={authContextValue} />
}

export const useAuth = () => useContext(AuthContext);