import DropdownUser from "../dropdownUser";
import Button from "../common/Button";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/app/context/authContext";

const Header = (props: {
  sidebarOpen?: string | boolean | undefined | null;
  setSidebarOpen?: (arg0: boolean) => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated }: { isAuthenticated: boolean } = useAuthContext();
  const isUnprotectedPage = pathname === "/";

  return (
    <header className="sticky top-0 z-999 flex w-full bg-blue drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none justify-center">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11 max-w-7xl">
        <img
          src="/next.svg"
          alt="next"
          className="h-8 w-auto mt-1"
          onClick={() => router.push("/")}
        />
        {isAuthenticated ? (
          <div className="flex items-center gap-3 2xsm:gap-7">
            <div
              className="text-sm cursor-pointer select-none hover:text-blue-500 hover:underline"
              onClick={() => router.push(isUnprotectedPage ? "dashboard" : "/")}
            >
              {isUnprotectedPage ? "Protected Page" : "Unprotected Page"}
            </div>
            <DropdownUser />
          </div>
        ) : (
          <div>
            <Button
              buttonText="Sign In"
              onClick={() => router.push("/signIn")}
            />
            <Button
              buttonText="Sign Up"
              onClick={() => router.push("/signUp")}
              className="bg-transparent text-black"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
