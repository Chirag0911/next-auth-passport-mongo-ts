"use client";

import classNames from "classnames";
import Header from "../components/header";
import withAuth from "../utils/withAuth";
import { useAuthContext } from "../context/authContext";

const Dashboard = () => {
  const { isAuthenticated }: { isAuthenticated: boolean } = useAuthContext();

  return (
    <div className="flex w-full">
      <div className="h-dvh bg-black w-[18%] hidden md:flex justify-center items-center text-white">
        Sidebar
      </div>
      <div className="w-[82%]">
        <Header />
        <div
          className={classNames(
            "flex items-center justify-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-r from-blue-500 via-blue-300 to-white text-3xl w-full",
            {
              "h-[calc(100dvh-80px)]": isAuthenticated,
              "h-[calc(100dvh-72px)]": !isAuthenticated,
            }
          )}
        >
          Protected Page
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard, false);
