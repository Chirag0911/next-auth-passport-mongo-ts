"use client";

import classNames from "classnames";
import Header from "./components/header";
import { useAuthContext } from "./context/authContext";

export default function Home() {
  const { isAuthenticated }: { isAuthenticated: boolean } = useAuthContext();

  return (
    <div>
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
        Unprotected Page
      </div>
    </div>
  );
}
