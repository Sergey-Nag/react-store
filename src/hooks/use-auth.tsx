import { createContext, useContext, useMemo, useState } from "react"
import { useQuery } from "react-query";
import { RQ_KEY } from "../config/react-query";
import { loginUser } from "../api/user";
import { User } from "../types/user";
import { clearLocalStorageUser, getLocalStorageUser, setLocalStorageUser } from "../utils/user";

interface AuthState {
  user: User | null,
  login: (username: string) => void,
  logout: () => void
}

const initialAuthState: AuthState = {
  user: null,
  login() {},
  logout() {},
};

const AuthContext = createContext(initialAuthState);


export function AuthProvider(props: any) {
  const [username, setUsername] = useState<string | null>(null);
  const localStorageUser = useMemo(() => getLocalStorageUser(), []);

  const login = (username: string) => {
    if (localStorageUser) return;

    setUsername(username);
  };

  const logout = () => {
    clearLocalStorageUser();
    setUsername(null);
  };

  const { data: userData } = useQuery(
    [RQ_KEY.LOGIN_USER, username],
    () => loginUser(username),
    {
      enabled: !localStorageUser && !!username,
      onSuccess: (data) => {
        setLocalStorageUser(data);
      }
    }
  );

  const authContextValue = { 
    user: localStorageUser ?? userData,
    login,
    logout,
  }

  return <AuthContext.Provider {...props} value={authContextValue} />
}

export const useAuth = () => useContext(AuthContext);