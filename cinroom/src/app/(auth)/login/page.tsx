"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Diamond, ArrowRight, Lock, Mail, KeyRound, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

declare global {
  interface Window {
    google?: any;
  }
}

export default function LoginPage() {
  const supabase = createClient();
  const [authMethod, setAuthMethod] = useState<"password" | "otp">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const GOOGLE_CLIENT_ID = "615256631418-d1gr6vknmfn084scsmvitc68hdvucgs0.apps.googleusercontent.com";

  // Load Google Identity Services SDK for direct cinroom.com Sign-In
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
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleIdTokenResponse = async (response: any) => {
    setGoogleLoading(true);
    setError("");
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.credential,
      });

      if (error) {
        setError(error.message);
        setGoogleLoading(false);
        return;
      }

      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("Google ID Token Auth Error:", err);
      setError(err?.message || "Google Sign-In failed.");
      setGoogleLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setError("");
    setGoogleLoading(true);
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback to standard OAuth if prompt is suppressed
          supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          });
        }
      });
    } else {
      supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("Supabase Login error:", err);
      setError(err?.message || "Authentication failed. Please check your credentials.");
      setLoading(false);
    }
  };

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your work email address.");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setOtpSent(true);
      setMessage("A 6-digit security OTP / Magic link has been dispatched to your email address!");
      setLoading(false);
    } catch (err: any) {
      console.error("OTP Request error:", err);
      setError(err?.message || "Error requesting OTP code.");
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: "email",
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("OTP Verify error:", err);
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

      {/* Login Box */}
      <div className="w-full max-w-md glass-panel gold-border-glow p-8 rounded-2xl z-10 shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-light text-white tracking-tight mb-1">Welcome Back</h1>
          <p className="text-xs font-mono text-neutral-400">Sign in to your Cinroom Studio</p>
        </div>

        {/* Direct Google Sign In Button */}
        <Button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          variant="outline"
          className="w-full h-11 bg-white/[0.04] border-white/10 hover:bg-white/[0.08] text-white text-xs font-mono tracking-wider rounded-xl mb-6 flex items-center justify-center gap-3 cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.1 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.1-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
            />
          </svg>
          {googleLoading ? "Connecting..." : "Continue with Google"}
        </Button>

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#0b0b0e] px-3 text-[10px] font-mono text-neutral-500 uppercase tracking-widest absolute">
            Or Work Email
          </span>
        </div>

        {/* Auth Method Selector */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-white/[0.03] rounded-xl border border-white/5 mb-6 text-xs font-mono">
          <button
            type="button"
            onClick={() => { setAuthMethod("password"); setError(""); setMessage(""); }}
            className={`py-2 rounded-lg transition-all ${
              authMethod === "password"
                ? "bg-amber-400/10 text-amber-200 border border-amber-200/30"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Password Sign In
          </button>
          <button
            type="button"
            onClick={() => { setAuthMethod("otp"); setError(""); setMessage(""); }}
            className={`py-2 rounded-lg transition-all ${
              authMethod === "otp"
                ? "bg-amber-400/10 text-amber-200 border border-amber-200/30"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            OTP Security Sign In
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400 text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300 text-center flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            {message}
          </div>
        )}

        {/* Password Form */}
        {authMethod === "password" && (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-500" />
                <Input
                  type="email"
                  required
                  placeholder="name@maison.com"
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
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pl-10 bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 focus:border-amber-200/50 rounded-xl"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-xs font-mono tracking-[0.15em] uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold shadow-[0_0_25px_rgba(197,168,128,0.25)] hover:shadow-[0_0_35px_rgba(197,168,128,0.4)] transition-all duration-300 rounded-xl mt-2 cursor-pointer"
            >
              {loading ? "Authenticating..." : "Sign In to Studio"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        )}

        {/* OTP Code Form */}
        {authMethod === "otp" && (
          <form onSubmit={otpSent ? handleVerifyOTP : handleRequestOTP} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">Work Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-500" />
                <Input
                  type="email"
                  required
                  disabled={otpSent}
                  placeholder="name@maison.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 pl-10 bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 focus:border-amber-200/50 rounded-xl"
                />
              </div>
            </div>

            {otpSent && (
              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider block">6-Digit Security OTP</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-3.5 text-amber-200" />
                  <Input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="h-11 pl-10 bg-white/[0.03] border-amber-200/40 text-amber-100 font-mono text-lg tracking-[0.3em] placeholder:text-neutral-600 focus:border-amber-200 rounded-xl text-center"
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-xs font-mono tracking-[0.15em] uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold shadow-[0_0_25px_rgba(197,168,128,0.25)] hover:shadow-[0_0_35px_rgba(197,168,128,0.4)] transition-all duration-300 rounded-xl mt-2 cursor-pointer"
            >
              {loading
                ? "Processing..."
                : otpSent
                ? "Verify OTP Code"
                : "Send 6-Digit OTP"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            {otpSent && (
              <button
                type="button"
                onClick={() => { setOtpSent(false); setOtpCode(""); setMessage(""); }}
                className="w-full text-center text-xs font-mono text-neutral-400 hover:text-white pt-2 block"
              >
                Change email or resend code
              </button>
            )}
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
          <p className="text-xs text-neutral-400 font-light">
            Don't have an Atelier account yet?{" "}
            <Link href="/signup" className="text-amber-200 font-mono underline hover:text-white transition-colors">
              Create Workspace
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}
