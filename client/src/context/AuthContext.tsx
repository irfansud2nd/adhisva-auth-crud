import axios from "@/lib/axios";
import React, { createContext, useState, useEffect, useContext } from "react";

interface AuthContextProps {
  user: { name: string; email: string } | null;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<
    | {
        accessToken: string;
        name: string;
        email: string;
      }
    | undefined
  >;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(
        "auth/login",
        { email, password },
        { withCredentials: true }
      );
      setAccessToken(res.data.accessToken);
      setUser({ name: res.data.name, email });
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await axios.get("auth/logout", { withCredentials: true });
    setAccessToken(null);
    setUser(null);
  };

  const checkAuth = async () => {
    try {
      const res = await axios.get("auth/refresh", {
        withCredentials: true,
      });

      const accessToken: string = res.data.accessToken;
      const name: string = res.data.name;
      const email: string = res.data.email;

      setAccessToken(accessToken);
      setUser({ name, email });

      return { accessToken, name, email };
    } catch {
      setAccessToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
