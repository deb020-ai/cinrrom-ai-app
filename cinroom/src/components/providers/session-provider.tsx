"use client";

import { createContext, useContext, ReactNode } from "react";
import { authClient } from "@/lib/auth-client";

type SessionContextType = ReturnType<typeof authClient.useSession>;

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const session = authClient.useSession();

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useAppSession() {
  const context = useContext(SessionContext);
  if (context === null) {
    throw new Error("useAppSession must be used within a SessionProvider");
  }
  return context;
}
