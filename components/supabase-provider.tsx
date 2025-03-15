"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import type { Session, User } from "@supabase/supabase-js"

type SupabaseContextType = {
  supabase: ReturnType<typeof createBrowserClient>
  session: Session | null
  user: User | null
  loading: boolean
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  return <SupabaseContext.Provider value={{ supabase, session, user, loading }}>{children}</SupabaseContext.Provider>
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }
  return context
}

