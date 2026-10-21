"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage({ initialMode = "login" }: { initialMode?: "login" | "signup" }) {
  const router = useRouter();

  const [authMode, setAuthMode] = useState<"login" | "signup">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "authenticating" | "success">("idle");

  const handleModeChange = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setErrorMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (authMode === "login") {
      if (email.trim().toLowerCase() !== "admin@gmail.com" || password !== "admin") {
        setErrorMessage("Invalid credentials. Use admin@gmail.com / admin");
        return;
      }
    }

    setSubmitStatus("authenticating");

    setTimeout(() => {
      setSubmitStatus("success");
      setTimeout(() => {
        router.push("/client-stack");
      }, 700);
    }, 600);
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-6 py-12 min-h-[calc(100vh-144px)]">
      {/* Ambient Warm Radial Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[720px] h-[580px] rounded-full bg-gradient-to-tr from-primary-fixed/40 via-surface-container-low/60 to-secondary-fixed/20 blur-3xl opacity-70"></div>
      </div>

      <div className="relative z-10 w-full max-w-[460px] mx-auto">
        <div
          className="w-full bg-[#ffffff] rounded-3xl p-8 sm:p-10 transition-all duration-300"
          style={{
            boxShadow:
              "0 20px 40px -15px rgba(0,0,0,0.06), 0 0 1px 1px rgba(0,0,0,0.04)",
          }}
        >
          {/* Header & Logo */}
          <div className="flex flex-col items-center text-center mb-7">
            <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center shadow-[0_6px_16px_-2px_rgba(255,92,56,0.35)] mb-4 select-none">
              <span className="text-on-primary font-headline-md text-headline-md leading-none">
                N
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#0f172a] tracking-tight">
              {authMode === "login" ? "Welcome to NEXUS" : "Create an account"}
            </h1>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="bg-[#f1f5f9] p-1 rounded-full flex items-center mb-7 relative select-none">
            <button
              className={`flex-1 py-2 text-center text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                authMode === "login"
                  ? "bg-white text-[#0f172a] shadow-sm"
                  : "text-[#64748b] hover:text-[#0f172a]"
              }`}
              onClick={() => handleModeChange("login")}
              type="button"
            >
              Log In
            </button>
            <button
              className={`flex-1 py-2 text-center text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                authMode === "signup"
                  ? "bg-white text-[#0f172a] shadow-sm"
                  : "text-[#64748b] hover:text-[#0f172a]"
              }`}
              onClick={() => handleModeChange("signup")}
              type="button"
            >
              Sign Up
            </button>
          </div>

          {/* Error notification if credentials fail */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <AnimatePresence initial={false}>
              {authMode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-1.5 overflow-hidden"
                >
                  <label className="text-xs font-semibold text-[#0f172a] uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[#94a3b8] text-[20px] pointer-events-none">
                      person
                    </span>
                    <input
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] pl-11 pr-4 py-3 rounded-xl text-sm text-[#0f172a] placeholder:text-gray-400 outline-none focus:bg-white focus:border-[#ff5c38] focus:ring-2 focus:ring-[#ff5c38]/20 transition-all duration-150"
                      placeholder="Alex Morgan"
                      type="text"
                      required={authMode === "signup"}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#0f172a] uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#94a3b8] text-[20px] pointer-events-none">
                  mail
                </span>
                <input
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] pl-11 pr-4 py-3 rounded-xl text-sm text-[#0f172a] placeholder:text-gray-400 outline-none focus:bg-white focus:border-[#ff5c38] focus:ring-2 focus:ring-[#ff5c38]/20 transition-all duration-150"
                  placeholder="alex@company.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[#0f172a] uppercase tracking-wider">
                  Password
                </label>
                {authMode === "login" && (
                  <a
                    className="text-xs font-semibold text-[#ff5c38] hover:text-[#e1745a] transition-colors duration-150"
                    href="#"
                  >
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-[#94a3b8] text-[20px] pointer-events-none">
                  lock
                </span>
                <input
                  className="w-full bg-[#f8fafc] border border-[#e2e8f0] pl-11 pr-11 py-3 rounded-xl text-sm text-[#0f172a] placeholder:text-gray-400 outline-none focus:bg-white focus:border-[#ff5c38] focus:ring-2 focus:ring-[#ff5c38]/20 transition-all duration-150"
                  placeholder="••••••••"
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  aria-label="Toggle password visibility"
                  className="absolute right-3 text-[#94a3b8] hover:text-[#0f172a] transition-colors p-1 flex items-center justify-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[19px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                className="group relative w-full inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-primary-container to-[#ff7352] text-on-primary font-semibold text-sm tracking-wide shadow-[0_8px_24px_-4px_rgba(255,92,56,0.38)] hover:shadow-[0_12px_28px_-4px_rgba(255,92,56,0.48)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-80"
                type="submit"
                disabled={submitStatus === "authenticating"}
              >
                <span>
                  {submitStatus === "authenticating" ? (
                    <span className="inline-block animate-pulse">Authenticating...</span>
                  ) : submitStatus === "success" ? (
                    authMode === "login" ? (
                      "Success ✓ Redirecting..."
                    ) : (
                      "Account Created ✓ Redirecting..."
                    )
                  ) : authMode === "login" ? (
                    "Log In"
                  ) : (
                    "Create Account"
                  )}
                </span>
                <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
