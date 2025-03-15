"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/components/supabase-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, ClipboardList, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

interface RequestStats {
  pending: number
  scheduled: number
  completed: number
  total: number
}

export default function Dashboard() {
  const { supabase, user } = useSupabase()
  const [stats, setStats] = useState<RequestStats>({
    pending: 0,
    scheduled: 0,
    completed: 0,
    total: 0,
  })
  const [loading, setLoading] = useState(true)
  const [recentRequests, setRecentRequests] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      try {
        // Fetch request stats
        const { data: statsData, error: statsError } = await supabase
          .from("scrap_requests")
          .select("status")
          .eq("user_id", user.id)

        if (statsError) throw statsError

        const counts = {
          pending: 0,
          scheduled: 0,
          completed: 0,
          total: statsData.length,
        }

        statsData.forEach((request) => {
          counts[request.status as keyof typeof counts]++
        })

        setStats(counts)

        // Fetch recent requests
        const { data: recentData, error: recentError } = await supabase
          .from("scrap_requests")
          .select(`
            id,
            created_at,
            item_type,
            condition,
            status,
            estimated_price_min,
            estimated_price_max,
            pickup_date
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5)

        if (recentError) throw recentError

        setRecentRequests(recentData || [])
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase, user])

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
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, {user?.user_metadata?.name || "User"}</p>
        </div>
        <Link href="/dashboard/new-request">
          <Button className="mt-4 md:mt-0">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Scrap Request
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All time scrap pickup requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.scheduled}</div>
            <p className="text-xs text-muted-foreground">Confirmed for pickup</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Successfully picked up</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Requests</CardTitle>
          <CardDescription>Your latest scrap pickup requests</CardDescription>
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
                    <p className="font-medium">
                      {request.item_type} ({request.condition})
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="mr-2">
                        ₹{request.estimated_price_min} - ₹{request.estimated_price_max}
                      </span>
                      <span>•</span>
                      <span className="ml-2">{new Date(request.pickup_date).toLocaleDateString()}</span>
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
                    <Link href={`/dashboard/my-requests/${request.id}`}>
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
              <p className="text-sm text-muted-foreground mt-1">
                Create your first scrap pickup request to get started
              </p>
              <Link href="/dashboard/new-request" className="mt-4">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Request
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

