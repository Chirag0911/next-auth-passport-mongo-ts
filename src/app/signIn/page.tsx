"use client";

import { useState } from "react";
import Input from "../containers/Input";
import { isBlank, isEmailValid, isPasswordValid } from "../utils/helpers";
import axios from "@/lib/axios";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { TbLogin2 } from "react-icons/tb";
import Button from "../components/common/Button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import withAuth from "../utils/withAuth";
import { useAuthContext } from "../context/authContext";

interface IUserDetails {
  email: string;
  password: string;
}

const initialData: IUserDetails = {
  email: "",
  password: "",
};

const SignIn = () => {
  const router = useRouter();
  const { verifyUser }: { verifyUser: () => void } = useAuthContext();
  const [userDetails, setUserDetails] = useState<IUserDetails>({
    ...initialData,
  });
  const [errors, setErrors] = useState<Partial<IUserDetails>>({
    ...initialData,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name: keyof IUserDetails, value: string) => {
    setUserDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((s) => ({ ...s, [name]: false }));
  };

  const validateForm = () => {
    const newErrors: Partial<IUserDetails> = {};

    if (isBlank(userDetails.email)) {
      newErrors.email = "Please enter an email address";
    } else if (!isEmailValid(userDetails.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (isBlank(userDetails.password)) {
      newErrors.password = "New password is required.";
    } else if (!isPasswordValid(userDetails.password)) {
      newErrors.password =
        "Please ensure your password is between 8 and 30 characters, includes at least 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsLoading(true);

    const res: { isSuccess?: boolean; accessToken: string; _id: string } =
      await axios.post("/api/auth/signin", {
        email: userDetails.email,
        password: userDetails.password,
      });
    if (res?.isSuccess) {
      setErrors({ ...initialData });
      setUserDetails({ ...initialData });
      localStorage.setItem("access_token", res.accessToken);
      verifyUser();
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-500 via-blue-300 to-white text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-4 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <button
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-blue-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline h-14 cursor-pointer"
                  onClick={() =>
                    signIn("google", {
                      callbackUrl: "/dashboard",
                      redirect: true,
                    })
                  }
                >
                  <div className="bg-white p-2 rounded-full">
                    <FcGoogle />
                  </div>
                  <span className="ml-4">Login with Google</span>
                </button>

                <button
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-blue-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5 h-14 cursor-pointer"
                  onClick={() =>
                    signIn("facebook", {
                      callbackUrl: "/dashboard",
                      redirect: true,
                    })
                  }
                >
                  <div className="bg-white p-1 rounded-full">
                    <FaFacebook className="text-[#3464f5] text-lg" />
                  </div>
                  <span className="ml-4">Login with Facebook</span>
                </button>
              </div>

              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or Login with Mail
                </div>
              </div>

              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <Input
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  value={userDetails.email}
                  onChange={(v) => handleChange("email", v)}
                  isError={!!errors.email}
                  errorMessage={errors.email}
                />
                <Input
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  value={userDetails.password}
                  onChange={(v) => handleChange("password", v)}
                  isError={!!errors.password}
                  errorMessage={errors.password}
                />
                <Button
                  buttonText={
                    <div className="flex gap-1 items-center justify-center py-1">
                      <span className="mr-3">Login</span>
                      <TbLogin2 className="text-xl" />
                    </div>
                  }
                  onClick={handleSubmit}
                  isLoading={isLoading}
                />
              </div>
              <p className="text-center text-gray-600 mt-4">
                Not have an account?{" "}
                <span
                  className="text-blue-500 font-semibold cursor-pointer"
                  onClick={() => router.push("/signUp")}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-blue-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("/login.svg")`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default withAuth(SignIn, true);
