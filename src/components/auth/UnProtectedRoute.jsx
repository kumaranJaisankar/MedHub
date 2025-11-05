"use client";

import { useAuth } from "@/hooks/useAuth";
// import { useRouter, usePathname } from "next/navigation";
import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import SignInPage from "../../app/account/signin/page";

export function UnProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  //   const router = useRouter();
  //   const pathname = usePathname();
  const path = useLocation();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Store the attempted URL
      sessionStorage.setItem("redirectUrl", path.pathname);
      //   sessionStorage.setItem("redirectUrl", pathname);
      //   router.push("/account/signin");
      navigate("/search");
    }
  }, [isAuthenticated, isLoading, navigate, path.pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return children;
  }

  return null;
}
