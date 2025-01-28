import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuthContext } from "@/app/context/authContext";
import Loader from "../components/common/Loader";

interface IWithAuthProps {
  isSignInOrSignUp: boolean;
}

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  isSignInOrSignUp: boolean = false
) => {
  const RequiresAuth: React.FC<P & IWithAuthProps> = (props) => {
    const {
      isAuthenticated,
      isAuthLoading,
    }: { isAuthenticated: boolean; isAuthLoading: boolean } = useAuthContext();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      if (!isClient || isAuthLoading) return;

      if (isAuthenticated) {
        if (isSignInOrSignUp) {
          router.replace("/dashboard");
        }
      } else {
        if (!isSignInOrSignUp) {
          router.replace("/signIn");
        }
      }
    }, [isAuthenticated, isClient, isSignInOrSignUp, isAuthLoading, router]);

    if (!isClient || isAuthLoading || (isSignInOrSignUp && isAuthenticated)) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Loader className="border-blue-500" />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  RequiresAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return RequiresAuth;
};

export default withAuth;
