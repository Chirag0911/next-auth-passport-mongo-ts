"use client";

import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
  ReactNode,
} from "react";
import axios from "@/lib/axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getDecodedAccessToken } from "../utils/auth";

interface IUserDetails {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

interface IAuthContextType {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  userLogOut: () => void;
  verifyUser: () => void;
  isAuthLoading: boolean;
  session: any;
}

export const AuthContext = createContext<IAuthContextType | undefined>(
  undefined
);

export const useAuthContext = (): IAuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

interface IAuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: IAuthProviderProps) {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<IUserDetails>({
    userId: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const { data: session }: any = useSession();
  let accessToken = "";
  if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  ) {
    accessToken = localStorage.getItem("access_token") as string;
  }

  const verifyUser = async () => {
    try {
      setIsAuthLoading(true);
      const token = localStorage.getItem("access_token");
      const decodedToken: any = getDecodedAccessToken(token as string);
      if (!token || !decodedToken.isAuthTokenValid) {
        setUserDetails({
          userId: "",
          firstName: "",
          lastName: "",
          username: "",
          email: "",
        });
        return;
      }

      const response: any = await axios.get("/api/auth/verify");

      if (response?._id) {
        setUserDetails({
          userId: response._id,
          firstName: response.firstName,
          lastName: response.lastName,
          username: response.username,
          email: response.email,
        });
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Failed to verify user:", error);
      setUserDetails({
        userId: "",
        firstName: "",
        lastName: "",
        username: "",
        email: "",
      });
      setIsAuthenticated(false);
    }
    setIsAuthLoading(false);
  };

  useEffect(() => {
    if (session?.accessToken || accessToken) {
      if (session?.accessToken && session.accessToken !== accessToken) {
        localStorage.setItem("access_token", session.accessToken);
      }
      verifyUser();
    }
  }, [session, accessToken]);

  const userLogOut = () => {
    localStorage.removeItem("access_token");
    signOut({ callbackUrl: "/", redirect: true });
    router.push("/");
  };

  const values = useMemo<IAuthContextType>(
    () => ({
      userId: userDetails.userId,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      username: userDetails.username,
      email: userDetails.email,
      isAuthenticated,
      setIsAuthenticated,
      userLogOut,
      verifyUser,
      isAuthLoading,
      session,
    }),
    [isAuthenticated, userDetails, isAuthLoading, session]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
