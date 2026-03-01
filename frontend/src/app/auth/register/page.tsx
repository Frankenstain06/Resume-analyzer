/**
 * Sign Up Page
 * Modern registration form with name, email, password, confirm password.
 * Includes client-side validation, error handling, and auto-login on success.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Eye, EyeOff, Loader2, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Validation constants
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

// Password strength requirements displayed as checklist
const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "Contains a number", test: (p: string) => /\d/.test(p) },
  { label: "Contains uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
];

interface FormErrors {
  full_name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterPage() {
  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // UI state
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();

  /**
   * Validate all form fields.
   * Returns true if the form is valid.
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!fullName.trim()) {
      newErrors.full_name = "Full name is required.";
    } else if (fullName.trim().length < 2) {
      newErrors.full_name = "Name must be at least 2 characters.";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      newErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
    } else if (!/\d/.test(password)) {
      newErrors.password = "Password must contain at least one number.";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter.";
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission.
   * Validates client-side, then calls register API via auth context.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await register(fullName.trim(), email, password);
      // On success, AuthContext redirects to /dashboard
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Clear a specific field error when user starts typing.
   */
  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-50 via-white to-emerald-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-teal-700">
            <FileText size={28} />
            MyReazr
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Create your account</h1>
          <p className="mt-2 text-gray-500">Start analyzing your resume with AI</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-teal-100/50 border border-gray-100 p-8">
          {/* API Error Banner */}
          {apiError && (
            <div className="mb-6 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  clearError("full_name");
                }}
                className={`w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 transition-all outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 ${
                  errors.full_name ? "border-red-400 focus:ring-red-500/20 focus:border-red-500" : "border-gray-200"
                }`}
                placeholder="John Doe"
              />
              {errors.full_name && (
                <p className="mt-1.5 text-sm text-red-600">{errors.full_name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError("email");
                }}
                className={`w-full px-4 py-2.5 rounded-lg border text-gray-900 placeholder-gray-400 transition-all outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 ${
                  errors.email ? "border-red-400 focus:ring-red-500/20 focus:border-red-500" : "border-gray-200"
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearError("password");
                  }}
                  className={`w-full px-4 py-2.5 pr-11 rounded-lg border text-gray-900 placeholder-gray-400 transition-all outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 ${
                    errors.password ? "border-red-400 focus:ring-red-500/20 focus:border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
              )}

              {/* Password strength checklist — shown once user starts typing */}
              {password.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  {PASSWORD_RULES.map((rule) => {
                    const passed = rule.test(password);
                    return (
                      <div key={rule.label} className="flex items-center gap-2 text-xs">
                        <Check
                          size={14}
                          className={passed ? "text-teal-600" : "text-gray-300"}
                        />
                        <span className={passed ? "text-teal-700" : "text-gray-400"}>
                          {rule.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    clearError("confirmPassword");
                  }}
                  className={`w-full px-4 py-2.5 pr-11 rounded-lg border text-gray-900 placeholder-gray-400 transition-all outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 ${
                    errors.confirmPassword ? "border-red-400 focus:ring-red-500/20 focus:border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-teal-700 text-white py-2.5 rounded-lg font-medium hover:bg-teal-800 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        {/* Footer link to login */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-teal-700 font-medium hover:text-teal-800 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
