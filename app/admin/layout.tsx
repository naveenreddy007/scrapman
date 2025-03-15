"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import DashboardNav from "@/components/dashboard-nav"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useSupabase()
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      if (loading) return

      if (!user) {
        router.push("/login")
        return
      }

      // Check if user is admin
      if (user.user_metadata?.role !== "admin") {
        router.push("/dashboard")
      }
    }

    checkAdmin()
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!user || user.user_metadata?.role !== "admin") {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNav />
      <div className="flex-1 p-4 md:p-6">{children}</div>
    </div>
  )
}

