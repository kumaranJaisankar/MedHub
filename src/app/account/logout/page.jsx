"use client";

import { useEffect } from "react";
import useAuth from "@/utils/useAuth";

export default function LogoutPage() {
  const { signOut } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      await signOut({
        callbackUrl: "/account/signin",
        redirect: true,
      });
    };
    performLogout();
  }, [signOut]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4">
      <div className="text-center">
        <div className="mb-4 inline-block rounded-full bg-gradient-to-br from-blue-500 to-teal-500 p-3">
          <span className="text-3xl">👋</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Signing Out...</h1>
        <p className="mt-2 text-slate-600">
          You're being redirected to the login page
        </p>
      </div>
    </div>
  );
}
