"use client";

import Welcom from "../components/Layout/Welcom";
import Button from "../components/Ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reSetPasswordSchema } from "../components/Common/Schema";
import Input from "../components/Ui/Input";
import WelcomeBar from "../components/Layout/WelcomeBar";
import SocialProviders from "../components/Auth/SocialProviders";
import { useFormSubmission } from "../hooks/useFormSubmission";

const SetPassword = () => {
  const { loading, handleSubmit: apiSubmit } = useFormSubmission({
    apiUrl: "https://exam.elevateegy.com/api/v1/auth/resetPassword",
    method: "PUT",
    successRoute: "/",
    successMessage: " password changed sucessfully ",
    onError: (errorMessage) => {
      console.error("code specific error:", errorMessage);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reSetPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: Record<string, string>) => {
    apiSubmit(data);
  };
  return (
    <>
      <div className="relative min-h-screen">
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
          <div className="lg:block w-full">
            <Welcom />
          </div>

          <div className="col-span-1 flex items-center justify-center py-10 px-4">
            <div className="w-full max-w-[400px]">
              <div className=" py-10">
                <WelcomeBar />
              </div>
              <h1 className="font-bold text-[24px] mb-[20px] text-left">
                Change Password ?
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
                    placeholder="New Password"
                    type="password"
                    name="newPassword"
                    register={register}
                    error={
                      (errors?.newPassword?.message as string) || undefined
                    }
                  />
                </div>

                <Button
                  type="submit"
                  className="text-white w-full"
                  disabled={loading}
                >
                  {loading ? "Changing Password..." : "Change Password"}
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

export default SetPassword;
