"use client";
import { useAuth } from "@/hooks/useAuth";

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

export const withAuth = (WrappedComponent) => {
  const { isAuthenticated, isLoading } = useAuth();

  const navigate = useNavigate();
  const path = useLocation();
  return function WithAuth(props) {
    const session = isUserAuthenticated;
    useEffect(() => {
      if (!isAuthenticated && !isLoading) {
        sessionStorage.setItem("redirectUrl", path.pathname);

        navigate("/account/signin");
      }
    }, []);

    if (!isAuthenticated) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};
