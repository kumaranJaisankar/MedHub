"use client";

import { ReactKeycloakProvider } from "@react-keycloak/web";
import { useState, useEffect } from "react";
import Keycloak from "keycloak-js";

export function KeycloakProvider({ children }) {
  const [keycloak, setKeycloak] = useState(null);

  useEffect(() => {
    const keycloakConfig = {
      url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || "http://localhost:8080",
      realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "your-realm",
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "your-client-id",
    };

    const keycloakInstance = new Keycloak(keycloakConfig);
    setKeycloak(keycloakInstance);
  }, []);

  if (typeof window === "undefined" || !keycloak) {
    return children;
  }

  const initOptions = {
    onLoad: "check-sso",
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
  };

  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions}>
      {children}
    </ReactKeycloakProvider>
  );
}
