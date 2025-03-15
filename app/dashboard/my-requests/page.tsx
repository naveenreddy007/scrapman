"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSupabase } from "@/components/supabase-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, ClipboardList, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface ScrapRequest {
  id: string
  created_at: string
  item_type: string
  condition: string
  status: string
  estimated_price_min: number
  estimated_price_max: number
  pickup_date: string
  scrap_items: {
    name: string
  }
}

export default function MyRequests() {
  const { supabase, user } = useSupabase()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState<ScrapRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<ScrapRequest[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user) return

      try {
        setLoading(true)
        const { data, error } = await supabase
          .from("scrap_requests")
          .select(`
            id,
            created_at,
            item_type,
            condition,
            status,
            estimated_price_min,
            estimated_price_max,
            pickup_date,
            scrap_items (
              name
            )
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) throw error

        setRequests(data || [])
        setFilteredRequests(data || [])
      } catch (error: any) {
        console.error("Error fetching requests:", error)
        toast({
          title: "Error",
          description: "Failed to load your requests. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [supabase, user, toast])

  useEffect(() => {
    // Filter requests based on search query and active tab
    let filtered = [...requests]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (request) => request.scrap_items.name.toLowerCase().includes(query) || request.id.toLowerCase().includes(query),
      )
    }

    // Apply tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter((request) => request.status === activeTab)
    }

    setFilteredRequests(filtered)
  }, [searchQuery, activeTab, requests])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

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
          <h2 className="text-3xl font-bold tracking-tight">My Requests</h2>
          <p className="text-muted-foreground">View and manage your scrap pickup requests</p>
        </div>
        <Link href="/dashboard/new-request">
          <Button className="mt-4 md:mt-0">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Scrap Request
          </Button>
        </Link>
      </div>

      <div className="flex items-center mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search requests..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          {renderRequestsList(filteredRequests)}
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          {renderRequestsList(filteredRequests)}
        </TabsContent>
        <TabsContent value="scheduled" className="mt-4">
          {renderRequestsList(filteredRequests)}
        </TabsContent>
        <TabsContent value="completed" className="mt-4">
          {renderRequestsList(filteredRequests)}
        </TabsContent>
      </Tabs>
    </div>
  )

  function renderRequestsList(requests: ScrapRequest[]) {
    if (requests.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No requests found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {searchQuery
              ? "No requests match your search criteria"
              : "You haven't created any scrap pickup requests yet"}
          </p>
          {!searchQuery && (
            <Link href="/dashboard/new-request" className="mt-4">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Request
              </Button>
            </Link>
          )}
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <h3 className="font-medium text-lg">{request.scrap_items.name}</h3>
                    <span
                      className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        request.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status === "scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Condition: {request.condition === "working" ? "Working" : "Not Working"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Estimated Price: ₹{request.estimated_price_min} - ₹{request.estimated_price_max}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pickup Date: {new Date(request.pickup_date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Request ID: {request.id.slice(0, 8)}</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center">
                  <Link href={`/dashboard/my-requests/${request.id}`}>
                    <Button variant="outline">View Details</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }
}

