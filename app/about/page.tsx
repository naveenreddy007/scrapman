import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Recycle,
  ArrowRight,
  Download,
  Upload,
  DollarSign,
  Truck,
  Building,
  PenToolIcon as Tool,
  Leaf,
  BarChart,
  Clock,
} from "lucide-react"

export default function AboutPage() {
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
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Turning Scrap into Value, Sustainably
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  ScrapMaster is revolutionizing the scrap collection industry by connecting individuals and businesses
                  with reliable scrap collection services at competitive prices.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="gap-1">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
                <img
                  alt="ScrapMaster service in action"
                  className="object-cover w-full h-full"
                  src="/placeholder.svg?height=550&width=800"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Mission</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  At ScrapMaster, we're committed to creating a sustainable future by promoting responsible scrap
                  recycling while providing fair value to our customers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">What We Do</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We provide a convenient platform for individuals and businesses to sell their scrap materials at
                  competitive prices. Our service includes home collection, ensuring a hassle-free experience for our
                  customers.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  For commercial clients, we offer specialized services including bulk scrap purchase and dismantling
                  services for shops that are relocating or closing down.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Why Choose Us</h3>
                <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                    Transparent pricing with no hidden fees
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                    Convenient home collection service
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                    Environmentally responsible recycling practices
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                    Specialized services for commercial clients
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-primary"></div>
                    Professional and reliable team
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our simple three-step process makes it easy to sell your scrap and get paid
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full bg-primary"></div>
                <CardContent className="p-6 pt-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                    <Download className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">1. Download the App</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Get started by downloading the ScrapMaster app on your smartphone or sign up on our website.
                  </p>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full bg-primary"></div>
                <CardContent className="p-6 pt-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                    <Upload className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">2. Upload Details</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Provide information about your scrap items, including photos and condition details.
                  </p>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full bg-primary"></div>
                <CardContent className="p-6 pt-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">3. Get Paid</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Receive a price estimate, confirm, and we'll collect the scrap from your location and pay you on the
                    spot.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Services Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Services</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Comprehensive scrap collection solutions for individuals and businesses
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-2">
              <div className="flex flex-col items-start space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Truck className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Home Collection</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We come to your doorstep to collect scrap items, making the process convenient and hassle-free. Our
                  team ensures timely pickup and on-the-spot payment.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Building className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Commercial Services</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Specialized solutions for businesses looking to sell scrap materials. We offer competitive rates for
                  bulk purchases and regular collection schedules.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Tool className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Dismantling Services</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  For shop owners who are relocating or closing down, we provide professional dismantling services to
                  help you extract maximum value from your fixtures and equipment.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Leaf className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">Eco-Friendly Recycling</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We ensure that all collected scrap is processed and recycled in an environmentally responsible manner,
                  contributing to a more sustainable future.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Commercial Clients Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full">
                <img
                  alt="Commercial scrap collection"
                  className="object-cover w-full h-full"
                  src="/placeholder.svg?height=550&width=800"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">For Commercial Clients</h2>
                <p className="text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  ScrapMaster offers specialized services for businesses of all sizes. Whether you're a shop owner,
                  manufacturer, or service provider, we have solutions tailored to your needs.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0 mt-0.5">
                      <BarChart className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">Bulk Purchase</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Competitive rates for large quantities of scrap materials with transparent pricing.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0 mt-0.5">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">Regular Collection</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Schedule regular pickups to manage your ongoing scrap generation efficiently.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0 mt-0.5">
                      <Tool className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">Shop Dismantling</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Professional dismantling services for shops that are relocating or closing down, ensuring you
                        get the best value for your fixtures and equipment.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                  <Link href="/contact">
                    <Button size="lg" className="gap-1">
                      Contact for Business Inquiry <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Customers Say</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Don't just take our word for it - hear from our satisfied customers
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-full bg-muted"></div>
                    <div>
                      <h3 className="font-medium">Rahul Sharma</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Hyderabad</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-500 dark:text-gray-400">
                      "I was amazed at how easy it was to sell my old refrigerator. The app is user-friendly, and the
                      team was professional and punctual. Highly recommended!"
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-full bg-muted"></div>
                    <div>
                      <h3 className="font-medium">Priya Patel</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Secunderabad</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-500 dark:text-gray-400">
                      "The price I received for my scrap was much better than what other local dealers were offering.
                      The home collection service made it so convenient!"
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-full bg-muted"></div>
                    <div>
                      <h3 className="font-medium">Suresh Kumar</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Shop Owner, LB Nagar</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-500 dark:text-gray-400">
                      "When I was closing my electronics shop, ScrapMaster's dismantling service was a lifesaver. They
                      handled everything professionally and offered a great price for all my fixtures."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Turn Your Scrap Into Cash?</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of satisfied customers who have simplified their scrap selling process with
                  ScrapMaster.
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

