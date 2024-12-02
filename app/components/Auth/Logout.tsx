"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../Ui/Button";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logout = async () => {
    setLoading(true);
    try {
      await signOut({ redirect: false });

      localStorage.removeItem("userData");
      sessionStorage.removeItem("userData");

      router.push("/signin");
      toast.success("Logout successful.");
    } catch (error) {
      console.error("Logout error:", error);
      setLoading(false);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button
        onClick={logout}
        disabled={loading}
        className="bg-red-500 text-white rounded-md"
      >
        {loading ? "Logging out..." : "Logout"}
      </Button>
    </div>
  );
};

export default Logout;
