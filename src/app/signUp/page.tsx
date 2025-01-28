"use client";

import { useState } from "react";
import axios from "axios";
import Input from "../containers/Input";
import { isBlank, isEmailValid, isPasswordValid } from "../utils/helpers";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Button from "../components/common/Button";
import withAuth from "../utils/withAuth";

interface IUserDetails {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialData: IUserDetails = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const router = useRouter();
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

    if (isBlank(userDetails.username)) {
      newErrors.username = "Please enter a username";
    }

    if (isBlank(userDetails.firstName)) {
      newErrors.firstName = "Please enter a first name";
    }
    if (isBlank(userDetails.lastName)) {
      newErrors.lastName = "Please enter a last name";
    }

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
    if (isBlank(userDetails.confirmPassword)) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (userDetails.confirmPassword !== userDetails.password) {
      newErrors.confirmPassword =
        "Confirm password must be equal to new password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const res: { data: { isSuccess?: boolean } } = await axios.post(
      "/api/auth/signup",
      {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        username: userDetails.username,
        email: userDetails.email,
        password: userDetails.password,
      }
    );

    if (res?.data?.isSuccess) {
      toast(
        `${userDetails.firstName} ${userDetails.lastName} Registered Successfully!`
      );
      setErrors({ ...initialData });
      setUserDetails({ ...initialData });
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-gradient-to-l from-blue-500 via-blue-300 to-white flex items-center justify-center min-h-screen p-5">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form
          id="registrationForm"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-3">
            <Input
              type="text"
              label="First Name"
              placeholder="Enter your first name"
              value={userDetails.firstName}
              onChange={(v) => handleChange("firstName", v)}
              isError={!!errors.firstName}
              errorMessage={errors.firstName}
            />
            <Input
              type="text"
              label="Last Name"
              placeholder="Enter your last name"
              value={userDetails.lastName}
              onChange={(v) => handleChange("lastName", v)}
              isError={!!errors.lastName}
              errorMessage={errors.lastName}
            />
          </div>
          <Input
            type="text"
            label="Username"
            placeholder="Enter your username"
            value={userDetails.username}
            onChange={(v) => handleChange("username", v)}
            isError={!!errors.username}
            errorMessage={errors.username}
          />
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
          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={userDetails.confirmPassword}
            onChange={(v) => handleChange("confirmPassword", v)}
            isError={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword}
          />

          <Button
            type="submit"
            buttonText={"Register"}
            onClick={handleSubmit}
            isLoading={isLoading}
            className="py-3 bg-blue-500 text-white hover:shadow"
          />
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-500 font-semibold cursor-pointer"
            onClick={() => router.push("/signIn")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

const SignUpWithAuth = withAuth(SignUp, true);

export default SignUpWithAuth;
