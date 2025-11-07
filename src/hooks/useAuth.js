"use client";

import { useKeycloak } from "@react-keycloak/web";

const defaultAuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  accountManagement: () => Promise.resolve(),
  hasRole: () => false,
  getToken: () => null,
};

export function useAuth() {
  if (typeof window === "undefined") {
    return defaultAuthState;
  }

  try {
    const { keycloak, initialized } = useKeycloak();

    if (!keycloak) {
      return defaultAuthState;
    }

    return {
      isAuthenticated: keycloak.authenticated ?? false,
      user: keycloak.tokenParsed,
      isLoading: !initialized,
      login: () => keycloak.login(),
      logout: () => keycloak.logout(),
      register: () => keycloak.register(),
      accountManagement: () => keycloak.accountManagement(),
      hasRole: (role) => keycloak.hasRealmRole(role) ?? false,
      getToken: () => keycloak.token,
    };
  } catch (error) {
    console.error("Error in useAuth:", error);
    return defaultAuthState;
  }
}
