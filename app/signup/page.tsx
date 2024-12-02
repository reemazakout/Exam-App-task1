"use client";

import Input from "../components/Ui/Input";
import Link from "next/link";
import Welcom from "../components/Layout/Welcom";
import Button from "../components/Ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../components/Common/Schema";
import WelcomeBar from "../components/Layout/WelcomeBar";
import SocialProviders from "../components/Auth/SocialProviders";
import { useFormSubmission } from "../hooks/useFormSubmission";

const Signup = () => {
  const { loading, handleSubmit: apiSubmit } = useFormSubmission({
    apiUrl: "https://exam.elevateegy.com/api/v1/auth/signup",
    method: "POST",
    successRoute: "/",
    successMessage: "Code verified successfully",
    onError: (errorMessage) => {
      console.error("code specific error:", errorMessage);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: Record<string, string>) => {
    apiSubmit(data);
  };
  return (
    <>
      <div className="relative min-h-screen">
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
          <Welcom />

          <div className="col-span-1 flex items-center justify-center ">
            <div className="w-full max-w-[400px] px-6">
              <div className=" py-10">
                <WelcomeBar />
              </div>

              <h1 className="font-bold text-[24px] mb-[20px] text-left">
                Sign up
              </h1>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-[20px]">
                  <Input
                    placeholder="username"
                    type="text"
                    name="username"
                    register={register}
                    error={(errors?.username?.message as string) || undefined}
                  />
                </div>
                <div className="mb-[20px]">
                  <Input
                    placeholder="firstName"
                    type="text"
                    name="firstName"
                    register={register}
                    error={(errors?.firstName?.message as string) || undefined}
                  />
                </div>
                <div className="mb-[20px]">
                  <Input
                    placeholder="lastName"
                    type="text"
                    name="lastName"
                    register={register}
                    error={(errors?.lastName?.message as string) || undefined}
                  />
                </div>
                <div className="mb-[20px]">
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    register={register}
                    error={(errors?.email?.message as string) || undefined}
                  />
                </div>
                <div className="mb-[20px]">
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    register={register}
                    error={(errors?.password?.message as string) || undefined}
                  />
                </div>
                <div className="mb-[20px]">
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    name="rePassword"
                    register={register}
                    error={(errors?.rePassword?.message as string) || undefined}
                  />
                </div>
                <div className="mb-[20px]">
                  <Input
                    placeholder="phone"
                    type="number"
                    name="phone"
                    register={register}
                    error={(errors?.phone?.message as string) || undefined}
                  />
                </div>

                <p className="text-center mt-[16px] mb-[40px] text-sm">
                  Already have an account?{" "}
                  <Link className="text-primary font-semibold" href="/signin">
                    Login
                  </Link>
                </p>

                <Button
                  type="submit"
                  disabled={loading}
                  className="text-white w-full"
                >
                  <span>{loading ? "Loading..." : "Create Account"}</span>
                </Button>
                <div className="text-center my-[16px] text-[16px] text-[#6C737F] font-[400]">
                  or continue with
                </div>
                <SocialProviders />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
