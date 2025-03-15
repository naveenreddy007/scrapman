"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Clock, MapPin, Phone, User, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface RequestDetails {
  id: string
  created_at: string
  user_id: string
  item_type: string
  condition: string
  description: string
  address: string
  city: string
  state: string
  pincode: string
  pickup_date: string
  pickup_time_slot: string
  status: string
  estimated_price_min: number
  estimated_price_max: number
  profiles: {
    name: string
    email: string
    phone: string
  }
  scrap_items: {
    name: string
  }
  images: {
    id: string
    image_path: string
    image_url?: string
  }[]
}

export default function AdminRequestDetails() {
  const { id } = useParams()
  const { supabase } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [request, setRequest] = useState<RequestDetails | null>(null)
  const [status, setStatus] = useState("")
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    const fetchRequestDetails = async () => {
      if (!id) return

      try {
        setLoading(true)

        // Fetch request details
        const { data, error } = await supabase
          .from("scrap_requests")
          .select(`
            *,
            profiles (
              name,
              email,
              phone
            ),
            scrap_items (
              name
            )
          `)
          .eq("id", id)
          .single()

        if (error) throw error

        // Fetch images
        const { data: imageData, error: imageError } = await supabase
          .from("scrap_request_images")
          .select("*")
          .eq("request_id", id)

        if (imageError) throw imageError

        // Get image URLs
        const imagesWithUrls = await Promise.all(
          imageData.map(async (image) => {
            const { data: urlData } = await supabase.storage
              .from("scrap_images")
              .createSignedUrl(image.image_path, 3600)

            return {
              ...image,
              image_url: urlData?.signedUrl,
            }
          }),
        )

        const requestData = {
          ...data,
          images: imagesWithUrls,
        }

        setRequest(requestData)
        setStatus(requestData.status)
      } catch (error: any) {
        console.error("Error fetching request details:", error)
        toast({
          title: "Error",
          description: "Failed to load request details. Please try again.",
          variant: "destructive",
        })
        router.push("/admin/requests")
      } finally {
        setLoading(false)
      }
    }

    fetchRequestDetails()
  }, [supabase, id, router, toast])

  const handleStatusChange = async () => {
    if (!request || status === request.status) return

    try {
      setUpdating(true)

      // Update request status
      const { error } = await supabase.from("scrap_requests").update({ status }).eq("id", request.id)

      if (error) throw error

      toast({
        title: "Status updated",
        description: `Request status has been updated to ${status}`,
      })

      // Update local state
      setRequest({
        ...request,
        status,
      })
    } catch (error: any) {
      console.error("Error updating status:", error)
      toast({
        title: "Error",
        description: "Failed to update request status. Please try again.",
        variant: "destructive",
      })
      // Reset status to original
      setStatus(request.status)
    } finally {
      setUpdating(false)
    }
  }

  const getTimeSlotText = (slot: string) => {
    switch (slot) {
      case "morning":
        return "Morning (9 AM - 12 PM)"
      case "afternoon":
        return "Afternoon (12 PM - 3 PM)"
      case "evening":
        return "Evening (3 PM - 6 PM)"
      default:
        return slot
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!request) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-lg font-medium">Request not found</h3>
        <p className="text-sm text-muted-foreground mt-1">The request you're looking for doesn't exist.</p>
        <Link href="/admin/requests" className="mt-4">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Requests
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex items-center">
          <Link href="/admin/requests">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Request Details</h2>
            <p className="text-muted-foreground">Request ID: {request.id.slice(0, 8)}</p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(request.status)}`}
          >
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </span>
          <div className="flex items-center gap-2">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleStatusChange} disabled={updating || status === request.status} size="sm">
              {updating ? "Updating..." : "Update"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-2">
              <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Customer Name</p>
                <p className="text-muted-foreground">{request.profiles.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Phone Number</p>
                <p className="text-muted-foreground">{request.profiles.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Pickup Address</p>
                <p className="text-muted-foreground">
                  {request.address}, {request.city}, {request.state}, {request.pincode}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Item Type</p>
              <p className="font-medium">{request.scrap_items.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Condition</p>
              <p>{request.condition === "working" ? "Working" : "Not Working"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Estimated Price</p>
              <p className="text-xl font-bold text-primary">
                ₹{request.estimated_price_min} - ₹{request.estimated_price_max}
              </p>
            </div>
            {request.description && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p>{request.description}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pickup Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Pickup Date</p>
                <p className="text-muted-foreground">{new Date(request.pickup_date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Pickup Time</p>
                <p className="text-muted-foreground">{getTimeSlotText(request.pickup_time_slot)}</p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Request Date</p>
            <p>{new Date(request.created_at).toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Item Images</CardTitle>
          <CardDescription>Photos of the scrap item uploaded by the customer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {request.images.map((image, index) => (
              <div key={image.id} className="aspect-square rounded-md overflow-hidden border">
                <img
                  src={image.image_url || "/placeholder.svg?height=200&width=200"}
                  alt={`Item image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-medium">Actions</h3>
              <p className="text-muted-foreground text-sm mt-1">Manage this scrap pickup request</p>
            </div>
            <div className="flex gap-2">
              {request.status === "pending" && (
                <Button
                  onClick={() => {
                    setStatus("scheduled")
                    handleStatusChange()
                  }}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Schedule Pickup
                </Button>
              )}
              {request.status === "scheduled" && (
                <Button
                  onClick={() => {
                    setStatus("completed")
                    handleStatusChange()
                  }}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark as Completed
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link href="/admin/requests">View All Requests</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

