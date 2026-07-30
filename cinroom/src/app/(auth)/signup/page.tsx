"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Diamond, ArrowRight, Lock, Mail, Building2, User, CheckCircle2, KeyRound, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

declare global {
  interface Window {
    google?: any;
  }
}

export default function SignupPage() {
  const supabase = createClient();
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<"form" | "otp">("form");
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const GOOGLE_CLIENT_ID = "615256631418-d1gr6vknmfn084scsmvitc68hdvucgs0.apps.googleusercontent.com";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleIdTokenResponse,
        });

        if (googleBtnRef.current) {
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: "outline",
            size: "large",
            width: "380",
            text: "signup_with",
            shape: "pill",
          });
        }
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleIdTokenResponse = async (response: any) => {
    setLoading(true);
    setError("");
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.credential,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("Google ID Token Auth Error:", err);
      setError(err?.message || "Google Sign-Up failed.");
      setLoading(false);
    }
  };

  const isLengthValid = password.length >= 8;
  const hasNumber = /[0-9]/.test(password);
  const isPasswordStrong = isLengthValid && hasNumber;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy to create an account.");
      return;
    }

    if (!isPasswordStrong) {
      setError("Password must be at least 8 characters long and contain a number.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            company_name: companyName,
          },
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        // Logged in immediately
        window.location.href = "/dashboard";
      } else {
        // Move seamlessly to in-app OTP verification step
        setStep("otp");
        setMessage(`A 6-digit security OTP was sent to ${email}. Please enter it below.`);
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Supabase Signup error:", err);
      setError(err?.message || "Error connecting to authentication service.");
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      setError("Please enter the complete 6-digit OTP code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: "signup",
      });

      if (error) {
        // Fallback check for email verification type
        const fallbackRes = await supabase.auth.verifyOtp({
          email,
          token: otpCode,
          type: "email",
        });

        if (fallbackRes.error) {
          setError(fallbackRes.error.message || "Invalid or expired 6-digit OTP code.");
          setLoading(false);
          return;
        }
      }

      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("OTP Verification error:", err);
      setError(err?.message || "OTP verification failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 relative overflow-hidden subtle-grid py-12">
      
      {/* Glow Vignette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Brand Header */}
      <Link href="/" className="flex items-center gap-3 mb-8 group z-10">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400/20 via-amber-200/40 to-white/10 flex items-center justify-center border border-amber-200/40 shadow-[0_0_15px_rgba(197,168,128,0.25)]">
          <Diamond className="w-4 h-4 text-amber-200" />
        </div>
        <span className="font-medium text-base tracking-[0.25em] text-white uppercase font-sans">
          CINROOM
        </span>
      </Link>

      {/* Signup Form Box */}
      <div className="w-full max-w-md glass-panel gold-border-glow p-8 rounded-2xl z-10 shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
        
        {step === "form" ? (
          <>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-light text-white tracking-tight mb-1">Create Atelier Workspace</h1>
              <p className="text-xs font-mono text-amber-200/80">Includes 5 Free Trial Campaign Generation Credits</p>
            </div>

            {/* Native Google Sign-In Button Container */}
            <div className="flex justify-center mb-6">
              <div ref={googleBtnRef} className="w-full flex justify-center" />
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-[#0b0b0e] px-3 text-[10px] font-mono text-neutral-500 uppercase tracking-widest absolute">
                Or Work Email Registration
              </span>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-500" />
                  <Input
                    type="text"
                    required
                    placeholder="Jane Vendôme"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 pl-10 bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 focus:border-amber-200/50 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">Company / Atelier Name</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-500" />
                  <Input
                    type="text"
                    required
                    placeholder="Maison Vendôme Jewelry"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="h-11 pl-10 bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 focus:border-amber-200/50 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">Work Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-500" />
                  <Input
                    type="email"
                    required
                    placeholder="jane@maisonvendome.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 pl-10 bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 focus:border-amber-200/50 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-500" />
                  <Input
                    type="password"
                    required
                    placeholder="Minimum 8 characters with numbers"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pl-10 bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 focus:border-amber-200/50 rounded-xl"
                  />
                </div>
                
                {password.length > 0 && (
                  <div className="flex items-center gap-4 text-[10px] font-mono text-neutral-400 pt-1">
                    <span className={`flex items-center gap-1 ${isLengthValid ? "text-amber-300" : "text-neutral-500"}`}>
                      <CheckCircle2 className="w-3 h-3" /> 8+ Characters
                    </span>
                    <span className={`flex items-center gap-1 ${hasNumber ? "text-amber-300" : "text-neutral-500"}`}>
                      <CheckCircle2 className="w-3 h-3" /> At least 1 Number
                    </span>
                  </div>
                )}
              </div>

              {/* Mandatory Terms & Conditions Checkbox */}
              <div className="flex items-start gap-2.5 pt-2 pb-1">
                <input
                  type="checkbox"
                  id="terms-checkbox"
                  required
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-white/20 bg-black/60 text-amber-500 focus:ring-amber-500/40 cursor-pointer shrink-0"
                />
                <label htmlFor="terms-checkbox" className="text-[11px] font-sans text-neutral-400 leading-snug cursor-pointer select-none">
                  I agree to Cinroom's{" "}
                  <Link href="/terms" target="_blank" className="text-amber-200 underline font-medium hover:text-white">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" target="_blank" className="text-amber-200 underline font-medium hover:text-white">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              <Button
                type="submit"
                disabled={loading || !agreedToTerms}
                className="w-full h-12 text-xs font-mono tracking-[0.15em] uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold shadow-[0_0_25px_rgba(197,168,128,0.25)] hover:shadow-[0_0_35px_rgba(197,168,128,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-xl mt-3 cursor-pointer"
              >
                {loading ? "Creating Workspace..." : "Create Atelier & Claim Credits"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </>
        ) : (
          <>
            {/* Step 2: In-App 6-Digit OTP Verification Screen */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-200/30 flex items-center justify-center mx-auto mb-3">
                <KeyRound className="w-6 h-6 text-amber-200" />
              </div>
              <h1 className="text-2xl font-light text-white tracking-tight mb-1">Enter Verification Code</h1>
              <p className="text-xs font-mono text-neutral-400">
                We dispatched a 6-digit OTP code to <span className="text-amber-200 font-semibold">{email}</span>
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400 text-center">
                {error}
              </div>
            )}

            {message && (
              <div className="mb-6 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300 text-center flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                {message}
              </div>
            )}

            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block text-center">6-Digit Security OTP</label>
                <div className="relative">
                  <Input
                    type="text"
                    required
                    maxLength={6}
                    autoFocus
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="h-14 bg-white/[0.03] border-amber-200/40 text-amber-100 font-mono text-2xl tracking-[0.4em] text-center focus:border-amber-200 rounded-xl"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-xs font-mono tracking-[0.15em] uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold shadow-[0_0_25px_rgba(197,168,128,0.25)] hover:shadow-[0_0_35px_rgba(197,168,128,0.4)] transition-all duration-300 rounded-xl mt-2 cursor-pointer"
              >
                {loading ? "Verifying Code..." : "Verify OTP & Enter Studio"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <button
                type="button"
                onClick={() => { setStep("form"); setOtpCode(""); setError(""); setMessage(""); }}
                className="w-full text-center text-xs font-mono text-neutral-400 hover:text-white pt-2 block"
              >
                ← Back to Registration
              </button>
            </form>
          </>
        )}

        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center space-y-2">
          <p className="text-xs text-neutral-400 font-light">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-200 font-mono underline hover:text-white transition-colors">
              Sign In
            </Link>
          </p>
          <p className="text-[10px] text-neutral-500 font-mono">
            By creating an account, you agree to Cinroom&apos;s{" "}
            <Link href="/terms" className="text-neutral-400 underline hover:text-white">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-neutral-400 underline hover:text-white">
              Privacy Policy
            </Link>.
          </p>
        </div>
      </div>

    </div>
  );
}
