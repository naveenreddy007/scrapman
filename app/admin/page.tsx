"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/components/supabase-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, ClipboardList, Clock, CheckCircle, Settings } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface AdminStats {
  totalUsers: number
  totalRequests: number
  pendingRequests: number
  scheduledRequests: number
  completedRequests: number
}

interface RecentRequest {
  id: string
  created_at: string
  status: string
  user_id: string
  profiles: {
    name: string
    phone: string
  }
  scrap_items: {
    name: string
  }
}

export default function AdminDashboard() {
  const { supabase } = useSupabase()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalRequests: 0,
    pendingRequests: 0,
    scheduledRequests: 0,
    completedRequests: 0,
  })
  const [recentRequests, setRecentRequests] = useState<RecentRequest[]>([])

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true)

        // Fetch user count
        const { count: userCount, error: userError } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })

        if (userError) throw userError

        // Fetch request stats
        const { data: requestData, error: requestError } = await supabase.from("scrap_requests").select("status")

        if (requestError) throw requestError

        const counts = {
          totalRequests: requestData.length,
          pendingRequests: 0,
          scheduledRequests: 0,
          completedRequests: 0,
        }

        requestData.forEach((request) => {
          if (request.status === "pending") counts.pendingRequests++
          if (request.status === "scheduled") counts.scheduledRequests++
          if (request.status === "completed") counts.completedRequests++
        })

        setStats({
          totalUsers: userCount || 0,
          ...counts,
        })

        // Fetch recent requests
        const { data: recentData, error: recentError } = await supabase
          .from("scrap_requests")
          .select(`
            id,
            created_at,
            status,
            user_id,
            profiles (
              name,
              phone
            ),
            scrap_items (
              name
            )
          `)
          .order("created_at", { ascending: false })
          .limit(5)

        if (recentError) throw recentError

        setRecentRequests(recentData || [])
      } catch (error: any) {
        console.error("Error fetching admin data:", error)
        toast({
          title: "Error",
          description: "Failed to load admin dashboard data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAdminData()
  }, [supabase, toast])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage scrap pickup requests, users, and pricing</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Link href="/admin/requests">
            <Button variant="outline">
              <ClipboardList className="mr-2 h-4 w-4" />
              Manage Requests
            </Button>
          </Link>
          <Link href="/admin/pricing">
            <Button>
              <Settings className="mr-2 h-4 w-4" />
              Manage Pricing
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRequests}</div>
            <p className="text-xs text-muted-foreground">All time requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.scheduledRequests}</div>
            <p className="text-xs text-muted-foreground">Confirmed for pickup</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedRequests}</div>
            <p className="text-xs text-muted-foreground">Successfully picked up</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Requests</CardTitle>
          <CardDescription>Latest scrap pickup requests from users</CardDescription>
        </CardHeader>
        <CardContent>
          {recentRequests.length > 0 ? (
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{request.scrap_items.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="mr-2">
                        {request.profiles.name} • {request.profiles.phone}
                      </span>
                      <span>•</span>
                      <span className="ml-2">{new Date(request.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        request.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status === "scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                    <Link href={`/admin/requests/${request.id}`}>
                      <Button variant="ghost" size="sm" className="ml-2">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No requests yet</h3>
              <p className="text-sm text-muted-foreground mt-1">There are no scrap pickup requests in the system</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

