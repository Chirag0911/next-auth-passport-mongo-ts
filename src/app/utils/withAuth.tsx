import { useEffect, useState, ComponentType } from "react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useAuthContext } from "@/app/context/authContext";
import Loader from "../components/common/Loader";

type TWrappedComponentProps = {};

type TWrappedComponentType = ComponentType<TWrappedComponentProps>;

const withAuth = (
  WrappedComponent: TWrappedComponentType,
  isSignInOrSignUp: boolean
): ComponentType<TWrappedComponentProps> => {
  const RequiresAuth: React.FC<TWrappedComponentProps> = (props) => {
    const { isAuthenticated, isAuthLoading, session } = useAuthContext();
    const router = useRouter();
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const pathname = usePathname();
    const isDashboardPage = pathname === "/dashboard";

    useEffect(() => {
      if (!isAuthLoading) {
        setTimeout(() => {
          setIsAuthChecked(true);
        }, 500);
      }
    }, [isAuthLoading]);

    useEffect(() => {
      if (isAuthChecked) {
        if (isAuthenticated) {
          if (isSignInOrSignUp) {
            router.replace("/dashboard");
          }
        } else {
          if (!isSignInOrSignUp && !session?.accessToken) {
            router.replace("/signIn");
          }
        }
      }
    }, [isAuthenticated, isAuthChecked, isSignInOrSignUp, router]);

    if (
      (isDashboardPage && !isAuthenticated) ||
      isAuthLoading ||
      !isAuthChecked ||
      (isSignInOrSignUp && isAuthenticated)
    ) {
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
