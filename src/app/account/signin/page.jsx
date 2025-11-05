"use client";

import { useState } from "react";
import useAuth from "@/utils/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { UnProtectedRoute } from "../../../components/auth/UnProtectedRoute";

export default function SignInPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signInWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      console.error("Sign in error:", err);
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <UnProtectedRoute>
      <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Logo Area */}
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-gradient-to-br from-blue-500 to-teal-500 p-3">
                <span className="text-3xl">🏥</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-slate-900">MedHub</h1>
            <p className="mt-2 text-slate-600">Medical Discussion Community</p>
          </div>

          {/* Form Card */}
          <form
            noValidate
            onSubmit={onSubmit}
            className="rounded-2xl bg-white p-8 shadow-lg"
          >
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Welcome Back
            </h2>

            <div className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    required
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 pr-12 text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 px-4 py-3 font-semibold text-white transition hover:from-blue-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-slate-600">
                Don't have an account?{" "}
                <a
                  href="/account/signup"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Sign up
                </a>
              </p>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
            <p className="font-semibold mb-2">Demo Credentials:</p>
            <p>
              Email:{" "}
              <code className="bg-blue-100 px-2 py-1 rounded">
                demo@example.com
              </code>
            </p>
            <p>
              Password:{" "}
              <code className="bg-blue-100 px-2 py-1 rounded">password123</code>
            </p>
          </div>
        </div>
      </div>
    </UnProtectedRoute>
  );
}
