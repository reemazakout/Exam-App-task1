"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const WelcomeBar = () => {
  const pathname = usePathname();

  const linkStyles =
    "text-primary font-[700] text-[20px] px-4 py-2 rounded-[15px]";

  const activeLinkStyles =
    "border-2 border-[#E0E0E9] font-[400] text-[20px]  p-5";

  return (
    <div className="flex gap-5">
      <Link
        href="/signin"
        className={`${linkStyles} ${
          pathname === "/signin" ? activeLinkStyles : ""
        }`}
      >
        Sign in
      </Link>
      <Link
        href="/signup"
        className={`${linkStyles} ${
          pathname === "/signup" ? activeLinkStyles : ""
        }`}
      >
        Register
      </Link>
    </div>
  );
};

export default WelcomeBar;
