"use client";

import { useState } from "react";
import Link from "next/link";
import { Diamond, ArrowRight, Lock, Mail, Building2, User, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const supabase = createClient();
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isLengthValid = password.length >= 8;
  const hasNumber = /[0-9]/.test(password);
  const isPasswordStrong = isLengthValid && hasNumber;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasswordStrong) {
      setError("Password must be at least 8 characters long and contain a number.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

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
        window.location.href = "/dashboard";
      } else {
        setSuccess("Account created successfully! Check your email to verify your account or sign in with your password.");
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Supabase Signup error:", err);
      setError(err?.message || "Error connecting to Supabase auth service.");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        setError(error.message);
        setGoogleLoading(false);
      }
    } catch (err: any) {
      console.error("Google auth error:", err);
      setError(err?.message || "Failed to initialize Google authentication.");
      setGoogleLoading(false);
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
        <div className="text-center mb-6">
          <h1 className="text-2xl font-light text-white tracking-tight mb-1">Create Atelier Workspace</h1>
          <p className="text-xs font-mono text-amber-200/80">Includes 5 Free Trial Campaign Generation Credits</p>
        </div>

        {/* Social Google Login Button */}
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
          {googleLoading ? "Connecting to Google..." : "Sign up with Google"}
        </Button>

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

        {success && (
          <div className="mb-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300 text-center">
            {success}
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

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-xs font-mono tracking-[0.15em] uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold shadow-[0_0_25px_rgba(197,168,128,0.25)] hover:shadow-[0_0_35px_rgba(197,168,128,0.4)] transition-all duration-300 rounded-xl mt-4 cursor-pointer"
          >
            {loading ? "Creating Supabase Workspace..." : "Create Atelier & Claim Credits"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
          <p className="text-xs text-neutral-400 font-light">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-200 font-mono underline hover:text-white transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}
