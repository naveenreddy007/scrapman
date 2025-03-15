"use client"

import { useSupabase } from "@/components/supabase-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function AuthTestPage() {
  const { user, session, loading, supabase } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  const handleRefresh = async () => {
    const { data } = await supabase.auth.getSession()
    toast({
      title: "Session refreshed",
      description: "Your authentication session has been refreshed.",
    })
    console.log("Session data:", data)
  }

  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Test Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p>
              <strong>Loading:</strong> {loading ? "True" : "False"}
            </p>
            <p>
              <strong>User:</strong> {user ? user.email : "Not logged in"}
            </p>
            <p>
              <strong>Session:</strong> {session ? "Active" : "None"}
            </p>
            {user && (
              <div>
                <p>
                  <strong>User ID:</strong> {user.id}
                </p>
                <p>
                  <strong>User Role:</strong> {user.user_metadata?.role || "No role"}
                </p>
                <p>
                  <strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
            <Button variant="outline" onClick={() => router.push("/")}>
              Go to Home
            </Button>
            <Button variant="outline" onClick={handleRefresh}>
              Refresh Session
            </Button>
            {user && (
              <Button variant="destructive" onClick={handleLogout}>
                Log Out
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

