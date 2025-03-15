import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PricingCard } from "@/components/pricing-card"
import { Recycle, ArrowRight } from "lucide-react"

const scrapItems = [
  {
    id: 1,
    name: "Aluminum Cans",
    working_price_min: 0.5,
    working_price_max: 0.75,
    not_working_price_min: 0.25,
    not_working_price_max: 0.5,
  },
  {
    id: 2,
    name: "Copper Wire",
    working_price_min: 2.0,
    working_price_max: 2.5,
    not_working_price_min: 1.0,
    not_working_price_max: 1.5,
  },
  {
    id: 3,
    name: "Steel Scrap",
    working_price_min: 0.1,
    working_price_max: 0.2,
    not_working_price_min: 0.05,
    not_working_price_max: 0.1,
  },
]

export default function PricingPage() {
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Scrap Metal Pricing</h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Competitive rates for all types of scrap materials
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <Tabs defaultValue="working" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="working">Working Condition</TabsTrigger>
                  <TabsTrigger value="not_working">Non-Working Condition</TabsTrigger>
                </TabsList>
                <div className="mt-6">
                  <TabsContent value="working" className="space-y-4">
                    {scrapItems.map((item) => (
                      <PricingCard
                        key={item.id}
                        name={item.name}
                        minPrice={item.working_price_min}
                        maxPrice={item.working_price_max}
                        condition="working"
                      />
                    ))}
                  </TabsContent>
                  <TabsContent value="not_working" className="space-y-4">
                    {scrapItems.map((item) => (
                      <PricingCard
                        key={item.id}
                        name={item.name}
                        minPrice={item.not_working_price_min}
                        maxPrice={item.not_working_price_max}
                        condition="not_working"
                      />
                    ))}
                  </TabsContent>
                </div>
              </Tabs>

              <div className="mt-12 text-center">
                <Link href="/pricing/comparison">
                  <Button variant="outline" className="gap-1">
                    View Detailed Price Comparison <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Sell Your Scrap?</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started today and turn your unwanted items into cash.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="gap-1">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    Contact Us
                  </Button>
                </Link>
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

