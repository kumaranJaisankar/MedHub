"use client";

import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || "http://localhost:8080",
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "raect-master",
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "react-healthcare",
};

let keycloak = null;

if (typeof window !== "undefined") {
  keycloak = new Keycloak(keycloakConfig);
}

export default keycloak;
