import { createContext, useContext, useState, type ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { DEFAULT_AUTH_CONTEXT_VALUES } from "../constants/providers/DefaultAuthContextValues";
import type { AuthContextType, UserType } from "../types/Provider/authProvider";

const AuthContext = createContext<AuthContextType>(DEFAULT_AUTH_CONTEXT_VALUES);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [user, setUser] = useState<UserType | null | undefined>(null);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
