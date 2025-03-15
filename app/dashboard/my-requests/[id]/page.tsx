"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, Clock, MapPin, Phone, Trash2 } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

interface RequestDetails {
  id: string
  created_at: string
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
  scrap_items: {
    name: string
  }
  images: {
    id: string
    image_path: string
    image_url?: string
  }[]
}

export default function RequestDetails() {
  const { id } = useParams()
  const { supabase, user } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [request, setRequest] = useState<RequestDetails | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetchRequestDetails = async () => {
      if (!user || !id) return

      try {
        setLoading(true)

        // Fetch request details
        const { data, error } = await supabase
          .from("scrap_requests")
          .select(`
            *,
            scrap_items (
              name
            )
          `)
          .eq("id", id)
          .eq("user_id", user.id)
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

        setRequest({
          ...data,
          images: imagesWithUrls,
        })
      } catch (error: any) {
        console.error("Error fetching request details:", error)
        toast({
          title: "Error",
          description: "Failed to load request details. Please try again.",
          variant: "destructive",
        })
        router.push("/dashboard/my-requests")
      } finally {
        setLoading(false)
      }
    }

    fetchRequestDetails()
  }, [supabase, user, id, router, toast])

  const handleDeleteRequest = async () => {
    if (!request) return

    try {
      setDeleting(true)

      // Delete images from storage
      for (const image of request.images) {
        await supabase.storage.from("scrap_images").remove([image.image_path])
      }

      // Delete image records
      await supabase.from("scrap_request_images").delete().eq("request_id", request.id)

      // Delete request
      await supabase.from("scrap_requests").delete().eq("id", request.id)

      toast({
        title: "Request deleted",
        description: "Your scrap pickup request has been deleted successfully",
      })

      router.push("/dashboard/my-requests")
    } catch (error: any) {
      console.error("Error deleting request:", error)
      toast({
        title: "Error",
        description: "Failed to delete request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleting(false)
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
        <p className="text-sm text-muted-foreground mt-1">
          The request you're looking for doesn't exist or you don't have permission to view it.
        </p>
        <Link href="/dashboard/my-requests" className="mt-4">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Requests
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex items-center">
          <Link href="/dashboard/my-requests">
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
          {request.status === "pending" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Cancel Request
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your scrap pickup request.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteRequest}
                    disabled={deleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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
            <Separator />
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Request Date</p>
              <p>{new Date(request.created_at).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pickup Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Pickup Address</p>
                <p className="text-muted-foreground">
                  {request.address}, {request.city}, {request.state}, {request.pincode}
                </p>
              </div>
            </div>
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
            {request.status === "scheduled" && (
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Contact</p>
                  <p className="text-muted-foreground">Our team will contact you before pickup</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Item Images</CardTitle>
          <CardDescription>Photos of the scrap item you uploaded</CardDescription>
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

      {request.status === "pending" && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-medium text-yellow-800">Awaiting Confirmation</h3>
                <p className="text-yellow-700 text-sm mt-1">
                  Your request is being reviewed. We'll update you once it's confirmed.
                </p>
              </div>
              <Button variant="outline" className="border-yellow-300 text-yellow-800" asChild>
                <Link href="/dashboard/my-requests">View All Requests</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {request.status === "scheduled" && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-medium text-blue-800">Pickup Scheduled</h3>
                <p className="text-blue-700 text-sm mt-1">
                  Your pickup has been scheduled. Our team will arrive at the specified date and time.
                </p>
              </div>
              <Button variant="outline" className="border-blue-300 text-blue-800" asChild>
                <Link href="/dashboard/my-requests">View All Requests</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {request.status === "completed" && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-medium text-green-800">Pickup Completed</h3>
                <p className="text-green-700 text-sm mt-1">
                  Your scrap item has been successfully picked up. Thank you for using our service!
                </p>
              </div>
              <Button variant="outline" className="border-green-300 text-green-800" asChild>
                <Link href="/dashboard/new-request">Create New Request</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

