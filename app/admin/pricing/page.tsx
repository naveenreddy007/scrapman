"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/components/supabase-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Plus, Save, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ScrapItem {
  id: string
  name: string
  working_price_min: number
  working_price_max: number
  not_working_price_min: number
  not_working_price_max: number
}

export default function AdminPricing() {
  const { supabase } = useSupabase()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [scrapItems, setScrapItems] = useState<ScrapItem[]>([])
  const [newItem, setNewItem] = useState<Omit<ScrapItem, "id">>({
    name: "",
    working_price_min: 0,
    working_price_max: 0,
    not_working_price_min: 0,
    not_working_price_max: 0,
  })
  const [showNewItemForm, setShowNewItemForm] = useState(false)

  useEffect(() => {
    const fetchScrapItems = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase.from("scrap_items").select("*").order("name")

        if (error) throw error
        setScrapItems(data || [])
      } catch (error: any) {
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

  const handleItemChange = (id: string, field: keyof ScrapItem, value: string) => {
    const numValue = Number.parseInt(value, 10) || 0
    setScrapItems((items) => items.map((item) => (item.id === id ? { ...item, [field]: numValue } : item)))
  }

  const handleNewItemChange = (field: keyof Omit<ScrapItem, "id">, value: string) => {
    if (field === "name") {
      setNewItem((prev) => ({ ...prev, [field]: value }))
    } else {
      const numValue = Number.parseInt(value, 10) || 0
      setNewItem((prev) => ({ ...prev, [field]: numValue }))
    }
  }

  const saveChanges = async () => {
    try {
      setSaving(true)

      // Update existing items
      for (const item of scrapItems) {
        const { error } = await supabase
          .from("scrap_items")
          .update({
            working_price_min: item.working_price_min,
            working_price_max: item.working_price_max,
            not_working_price_min: item.not_working_price_min,
            not_working_price_max: item.not_working_price_max,
          })
          .eq("id", item.id)

        if (error) throw error
      }

      toast({
        title: "Prices updated",
        description: "Scrap item prices have been updated successfully",
      })
    } catch (error: any) {
      console.error("Error updating prices:", error)
      toast({
        title: "Error",
        description: "Failed to update prices. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const addNewItem = async () => {
    // Validate form
    if (!newItem.name) {
      toast({
        title: "Missing information",
        description: "Please provide a name for the new item",
        variant: "destructive",
      })
      return
    }

    try {
      setSaving(true)

      // Add new item
      const { data, error } = await supabase
        .from("scrap_items")
        .insert({
          name: newItem.name,
          working_price_min: newItem.working_price_min,
          working_price_max: newItem.working_price_max,
          not_working_price_min: newItem.not_working_price_min,
          not_working_price_max: newItem.not_working_price_max,
        })
        .select()
        .single()

      if (error) throw error

      // Update local state
      setScrapItems([...scrapItems, data])

      // Reset form
      setNewItem({
        name: "",
        working_price_min: 0,
        working_price_max: 0,
        not_working_price_min: 0,
        not_working_price_max: 0,
      })

      setShowNewItemForm(false)

      toast({
        title: "Item added",
        description: "New scrap item has been added successfully",
      })
    } catch (error: any) {
      console.error("Error adding new item:", error)
      toast({
        title: "Error",
        description: "Failed to add new item. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Pricing</h2>
          <p className="text-muted-foreground">Set and update prices for different scrap items</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={() => setShowNewItemForm(!showNewItemForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Item
          </Button>
          <Button onClick={saveChanges} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scrap Item Pricing</CardTitle>
          <CardDescription>Set price ranges for different scrap items based on their condition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {scrapItems.map((item) => (
              <div key={item.id} className="space-y-4">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-muted-foreground">Working Condition</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${item.id}-working-min`}>Minimum Price (₹)</Label>
                        <Input
                          id={`${item.id}-working-min`}
                          type="number"
                          value={item.working_price_min}
                          onChange={(e) => handleItemChange(item.id, "working_price_min", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${item.id}-working-max`}>Maximum Price (₹)</Label>
                        <Input
                          id={`${item.id}-working-max`}
                          type="number"
                          value={item.working_price_max}
                          onChange={(e) => handleItemChange(item.id, "working_price_max", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-sm text-muted-foreground">Non-Working Condition</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${item.id}-not-working-min`}>Minimum Price (₹)</Label>
                        <Input
                          id={`${item.id}-not-working-min`}
                          type="number"
                          value={item.not_working_price_min}
                          onChange={(e) => handleItemChange(item.id, "not_working_price_min", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${item.id}-not-working-max`}>Maximum Price (₹)</Label>
                        <Input
                          id={`${item.id}-not-working-max`}
                          type="number"
                          value={item.not_working_price_max}
                          onChange={(e) => handleItemChange(item.id, "not_working_price_max", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
              </div>
            ))}

            {showNewItemForm && (
              <div className="space-y-4 border p-4 rounded-lg">
                <h3 className="text-lg font-medium">Add New Item</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-item-name">Item Name</Label>
                    <Input
                      id="new-item-name"
                      value={newItem.name}
                      onChange={(e) => handleNewItemChange("name", e.target.value)}
                      placeholder="e.g., Air Conditioner"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm text-muted-foreground">Working Condition</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-working-min">Minimum Price (₹)</Label>
                          <Input
                            id="new-working-min"
                            type="number"
                            value={newItem.working_price_min}
                            onChange={(e) => handleNewItemChange("working_price_min", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-working-max">Maximum Price (₹)</Label>
                          <Input
                            id="new-working-max"
                            type="number"
                            value={newItem.working_price_max}
                            onChange={(e) => handleNewItemChange("working_price_max", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm text-muted-foreground">Non-Working Condition</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-not-working-min">Minimum Price (₹)</Label>
                          <Input
                            id="new-not-working-min"
                            type="number"
                            value={newItem.not_working_price_min}
                            onChange={(e) => handleNewItemChange("not_working_price_min", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-not-working-max">Maximum Price (₹)</Label>
                          <Input
                            id="new-not-working-max"
                            type="number"
                            value={newItem.not_working_price_max}
                            onChange={(e) => handleNewItemChange("not_working_price_max", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowNewItemForm(false)}>
                      Cancel
                    </Button>
                    <Button onClick={addNewItem} disabled={saving}>
                      {saving ? "Adding..." : "Add Item"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

