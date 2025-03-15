"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/components/supabase-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AuthCheckPage() {
  const { user, session, loading, supabase } = useSupabase()
  const router = useRouter()
  const [checkingSession, setCheckingSession] = useState(true)
  const [directSession, setDirectSession] = useState<any>(null)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      setDirectSession(data.session)
      setCheckingSession(false)
    }

    if (!loading) {
      checkSession()
    }
  }, [loading, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  const handleRedirectToDashboard = () => {
    window.location.href = "/dashboard"
  }

  if (loading || checkingSession) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Checking authentication...</span>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Check</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p>
              <strong>Context API User:</strong> {user ? "Logged In" : "Not Logged In"}
            </p>
            <p>
              <strong>Context API Session:</strong> {session ? "Active" : "None"}
            </p>
            <p>
              <strong>Direct Session Check:</strong> {directSession ? "Active" : "None"}
            </p>

            {user && (
              <div className="mt-4 space-y-1">
                <p>
                  <strong>User Email:</strong> {user.email}
                </p>
                <p>
                  <strong>User ID:</strong> {user.id}
                </p>
                <p>
                  <strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleRedirectToDashboard}>Go to Dashboard</Button>
            {user && (
              <Button variant="destructive" onClick={handleLogout}>
                Log Out
              </Button>
            )}
            {!user && (
              <Button variant="outline" onClick={() => router.push("/login")}>
                Go to Login
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

