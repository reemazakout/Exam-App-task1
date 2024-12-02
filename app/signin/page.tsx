"use client";

import Input from "../components/Ui/Input";
import Link from "next/link";
import Welcom from "../components/Layout/Welcom";
import Button from "../components/Ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../components/Common/Schema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import WelcomeBar from "../components/Layout/WelcomeBar";
import SocialProviders from "../components/Auth/SocialProviders";
import { signIn } from "next-auth/react";

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      setValue("email", parsedData.email);
      setValue("password", parsedData.password);
      setRememberMe(true);
    }
  }, [setValue]);

  const onSubmit = async (data: Record<string, string>) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/home",
      });

      if (res?.error) {
        switch (res.error) {
          case "CredentialsSignin":
            toast.error("Invalid email or password");
            break;
          default:
            toast.error("An unexpected error occurred");
        }
      } else {
        toast.success("Sign in successful.");
        if (rememberMe) {
          localStorage.setItem("userData", JSON.stringify(data));
        }
        router.push(res?.url || "/home");
      }
    } catch (error) {
      console.error("Signin error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        <div className="hidden lg:flex">
          <Welcom />
        </div>

        <div className="flex items-center justify-center p-8 lg:p-0">
          <div className="w-full max-w-[400px]">
            <div className="py-10">
              <WelcomeBar />
            </div>
            <h1 className="font-bold text-[24px] mb-[20px] text-center lg:text-left">
              Sign in
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
              <div className="text-right mt-[16px] mb-[40px] text-sm">
                <Link
                  className="text-primary font-semibold"
                  href="/forgetpassword"
                >
                  Forgot your password?
                </Link>
                <div>
                  <div className="text-primary font-semibold text-right text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <label
                        htmlFor="remember_me"
                        className="text-sm text-gray-700"
                      >
                        Remember Me
                      </label>
                      <input
                        type="checkbox"
                        id="remember_me"
                        name="remember_me"
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="text-white w-full"
              >
                <span>{loading ? "Signing in..." : "Sign in"}</span>
              </Button>

              <div className="text-center my-[16px] text-[16px] text-[#6C737F] font-[400]">
                or continue with
              </div>
              <SocialProviders />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
