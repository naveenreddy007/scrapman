"use client"

import { useEffect, useState } from "react"
import { useSupabase } from "@/components/supabase-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowRight, Recycle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface ScrapItem {
  id: string
  name: string
  working_price_min: number
  working_price_max: number
  not_working_price_min: number
  not_working_price_max: number
}

export default function PricingComparisonPage() {
  const { supabase } = useSupabase()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [scrapItems, setScrapItems] = useState<ScrapItem[]>([])

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
          description: "Failed to load pricing information. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchScrapItems()
  }, [supabase, toast])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <Recycle className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold">ScrapMaster</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
        <div className="ml-4 flex items-center gap-2">
          <Link href="/login">
            <Button variant="outline" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Detailed Price Comparison</h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Compare prices for all scrap items in both working and non-working conditions
                </p>
              </div>
              <Link href="/pricing" className="flex items-center text-primary hover:underline">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Pricing
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Complete Price List</CardTitle>
                  <CardDescription>Detailed pricing for all scrap items we accept</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[200px]">Item</TableHead>
                            <TableHead className="text-center" colSpan={2}>
                              Working Condition
                            </TableHead>
                            <TableHead className="text-center" colSpan={2}>
                              Non-Working Condition
                            </TableHead>
                          </TableRow>
                          <TableRow>
                            <TableHead></TableHead>
                            <TableHead className="text-right">Min Price (₹)</TableHead>
                            <TableHead className="text-right">Max Price (₹)</TableHead>
                            <TableHead className="text-right">Min Price (₹)</TableHead>
                            <TableHead className="text-right">Max Price (₹)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {scrapItems.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell className="text-right">{item.working_price_min}</TableCell>
                              <TableCell className="text-right">{item.working_price_max}</TableCell>
                              <TableCell className="text-right">{item.not_working_price_min}</TableCell>
                              <TableCell className="text-right">{item.not_working_price_max}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="mt-12">
                <CardHeader>
                  <CardTitle>Pricing Factors</CardTitle>
                  <CardDescription>Factors that affect the final price of your scrap items</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-medium">Condition</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Working items generally fetch a higher price than non-working ones. We test all electronic items
                        to verify their condition.
                      </p>
                    </div>
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-medium">Age & Model</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Newer models and recent releases typically have higher value due to better components and
                        materials.
                      </p>
                    </div>
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-medium">Weight</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Heavier items often contain more valuable materials, affecting the final price within the range.
                      </p>
                    </div>
                    <div className="border-b pb-4">
                      <h3 className="text-lg font-medium">Material Composition</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Items with higher amounts of valuable metals like copper, aluminum, and steel will be priced
                        higher in the range.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Market Conditions</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Scrap material prices fluctuate based on market demand. Our prices are updated regularly to
                        reflect current market conditions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col items-center justify-center space-y-4 text-center mt-12">
                <h2 className="text-3xl font-bold">Ready to Schedule a Pickup?</h2>
                <p className="text-xl text-muted-foreground">
                  Get paid for your scrap items with our convenient pickup service
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Link href="/signup">
                    <Button size="lg" className="gap-2">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/how-it-works">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 ScrapMaster. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

