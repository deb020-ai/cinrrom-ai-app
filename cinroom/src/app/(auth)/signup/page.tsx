"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Diamond, ArrowRight, Lock, Mail, Building2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (error) {
        setError(error.message || "Failed to create account");
        setLoading(false);
        return;
      }

      // Automatically create company organization workspace
      if (companyName) {
        await authClient.organization.create({
          name: companyName,
          slug: companyName.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        });
      }

      router.push("/dashboard");
    } catch (err: any) {
      // Fallback redirect for preview mode
      router.push("/dashboard");
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
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light text-white tracking-tight mb-1">Create Atelier Workspace</h1>
          <p className="text-xs font-mono text-amber-200/80">Includes 5 Free Trial Campaign Generation Credits</p>
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
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 pl-10 bg-white/[0.03] border-white/10 text-white placeholder:text-neutral-600 focus:border-amber-200/50 rounded-xl"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-xs font-mono tracking-[0.15em] uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold shadow-[0_0_25px_rgba(197,168,128,0.25)] hover:shadow-[0_0_35px_rgba(197,168,128,0.4)] transition-all duration-300 rounded-xl mt-4"
          >
            {loading ? "Creating Workspace..." : "Create Atelier & Claim Credits"}
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
