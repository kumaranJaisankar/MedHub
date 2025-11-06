"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { KeycloakProvider } from "@/components/auth/KeycloakProvider";
import { lazy, Suspense } from "react";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { ThemeProvider } from "./Providers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const metadata = {
  title: "MedHub - Medical Discussion Community",
  description:
    "A professional medical discussion platform for doctors, students, and patients to share insights and connect.",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "MedHub",
    description: "Medical Discussion & Community Platform",
    type: "website",
  },
};

const ClientLayout = lazy(() =>
  Promise.resolve({
    default: ({ children }) => (
      <KeycloakProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Navbar />
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </KeycloakProvider>
    ),
  })
);

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </head>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 antialiased">
        <Suspense
          fallback={
            <div className="min-h-screen bg-white dark:bg-slate-950">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="animate-pulse h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>
                <div className="animate-pulse h-4 w-64 bg-slate-200 dark:bg-slate-800 rounded"></div>
              </div>
            </div>
          }
        >
          <ClientLayout>
            <main className="min-h-screen">{children}</main>
          </ClientLayout>
        </Suspense>
      </body>
    </html>
  );
}
