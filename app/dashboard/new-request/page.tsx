"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Loader2, Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface ScrapItem {
  id: string
  name: string
  working_price_min: number
  working_price_max: number
  not_working_price_min: number
  not_working_price_max: number
}

export default function NewRequest() {
  const { supabase, user } = useSupabase()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [scrapItems, setScrapItems] = useState<ScrapItem[]>([])
  const [images, setImages] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 })
  const [formData, setFormData] = useState({
    itemType: "",
    condition: "working",
    description: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    pickupDate: new Date(),
    pickupTimeSlot: "morning",
  })

  useEffect(() => {
    const fetchScrapItems = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase.from("scrap_items").select("*").order("name")

        if (error) throw error
        setScrapItems(data || [])
      } catch (error) {
        console.error("Error fetching scrap items:", error)
        toast({
          title: "Error",
          description: "Failed to load scrap items. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchScrapItems()
  }, [supabase, toast])

  useEffect(() => {
    // Update price range when item type or condition changes
    if (formData.itemType && formData.condition) {
      const selectedItem = scrapItems.find((item) => item.id === formData.itemType)
      if (selectedItem) {
        if (formData.condition === "working") {
          setPriceRange({
            min: selectedItem.working_price_min,
            max: selectedItem.working_price_max,
          })
        } else {
          setPriceRange({
            min: selectedItem.not_working_price_min,
            max: selectedItem.not_working_price_max,
          })
        }
      }
    }
  }, [formData.itemType, formData.condition, scrapItems])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData({
        ...formData,
        pickupDate: date,
      })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newImages = Array.from(files)
    const totalImages = images.length + newImages.length

    if (totalImages > 5) {
      toast({
        title: "Too many images",
        description: `You can upload a maximum of 5 images. You've selected ${newImages.length} but can only add ${5 - images.length} more.`,
        variant: "destructive",
      })
      return
    }

    // Create preview URLs
    const newImageUrls = newImages.map((file) => URL.createObjectURL(file))

    setImages((prev) => [...prev, ...newImages])
    setImageUrls((prev) => [...prev, ...newImageUrls])
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    const newImageUrls = [...imageUrls]

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newImageUrls[index])

    newImages.splice(index, 1)
    newImageUrls.splice(index, 1)

    setImages(newImages)
    setImageUrls(newImageUrls)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (images.length === 0) {
      toast({
        title: "Images required",
        description: "Please upload at least one image of your scrap item",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    try {
      // 1. Create the scrap request in the database
      const { data: requestData, error: requestError } = await supabase
        .from("scrap_requests")
        .insert({
          user_id: user?.id,
          item_type: formData.itemType,
          condition: formData.condition,
          description: formData.description,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          pickup_date: formData.pickupDate.toISOString(),
          pickup_time_slot: formData.pickupTimeSlot,
          status: "pending",
          estimated_price_min: priceRange.min,
          estimated_price_max: priceRange.max,
        })
        .select("id")
        .single()

      if (requestError) throw requestError

      const requestId = requestData.id

      // 2. Upload images to Supabase Storage
      for (let i = 0; i < images.length; i++) {
        const file = images[i]
        const filePath = `${user?.id}/${requestId}/${Date.now()}-${file.name}`

        const { error: uploadError } = await supabase.storage.from("scrap_images").upload(filePath, file)

        if (uploadError) throw uploadError

        // 3. Add image reference to the database
        const { error: imageError } = await supabase.from("scrap_request_images").insert({
          request_id: requestId,
          image_path: filePath,
        })

        if (imageError) throw imageError
      }

      toast({
        title: "Request submitted",
        description: "Your scrap pickup request has been submitted successfully",
      })

      router.push(`/dashboard/my-requests/${requestData.id}`)
    } catch (error: any) {
      console.error("Error submitting request:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to submit your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">New Scrap Request</h2>
        <p className="text-muted-foreground">Fill out the form below to request a scrap pickup</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
              <CardDescription>Provide details about the scrap item you want to sell</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="itemType">Item Type</Label>
                <Select
                  value={formData.itemType}
                  onValueChange={(value) => handleSelectChange("itemType", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select item type" />
                  </SelectTrigger>
                  <SelectContent>
                    {scrapItems.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Condition</Label>
                <RadioGroup
                  value={formData.condition}
                  onValueChange={(value) => handleSelectChange("condition", value)}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="working" id="working" />
                    <Label htmlFor="working" className="cursor-pointer">
                      Working
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not_working" id="not_working" />
                    <Label htmlFor="not_working" className="cursor-pointer">
                      Not Working
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.itemType && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-medium">Estimated Price Range:</p>
                  <p className="text-2xl font-bold text-primary">
                    ₹{priceRange.min} - ₹{priceRange.max}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Final price will be confirmed during pickup</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Provide any additional details about your item"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Images (1-5 photos)</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                      <img
                        src={url || "/placeholder.svg"}
                        alt={`Uploaded image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <div className="aspect-square flex items-center justify-center border border-dashed rounded-md relative hover:bg-muted/50 transition-colors cursor-pointer">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        multiple={images.length < 4} // Only allow multiple if we can accept more than one
                        onClick={(e) => {
                          // Reset the value to allow selecting the same file again
                          ;(e.target as HTMLInputElement).value = ""
                        }}
                      />
                      <div className="flex flex-col items-center text-muted-foreground pointer-events-none">
                        <Upload className="h-8 w-8 mb-2" />
                        <span className="text-xs">
                          Upload {5 - images.length} more {images.length === 4 ? "image" : "images"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pickup Details</CardTitle>
              <CardDescription>Provide your address and preferred pickup time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Enter your full address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode">PIN Code</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  placeholder="PIN Code"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Pickup Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.pickupDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.pickupDate ? format(formData.pickupDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.pickupDate}
                        onSelect={handleDateChange}
                        initialFocus
                        disabled={(date) => {
                          const today = new Date()
                          today.setHours(0, 0, 0, 0)
                          return date < today || date > new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickupTimeSlot">Preferred Time</Label>
                  <Select
                    value={formData.pickupTimeSlot}
                    onValueChange={(value) => handleSelectChange("pickupTimeSlot", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12 PM - 3 PM)</SelectItem>
                      <SelectItem value="evening">Evening (3 PM - 6 PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}

