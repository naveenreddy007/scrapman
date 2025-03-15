import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Recycle, Clock, CreditCard } from "lucide-react"

export default function Home() {
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
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Turn Your Scrap Into Cash
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Schedule a pickup for your old appliances and electronics. We'll pay you for your scrap and handle
                    the disposal responsibly.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="gap-1">
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
              <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last">
                <img
                  alt="Scrap collection service"
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=550&q=80"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our simple process makes it easy to get rid of your unwanted items and earn money
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 border rounded-lg p-6 bg-background">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Recycle className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">1. Request a Pickup</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Fill out our simple form with details about your scrap items and upload photos.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 border rounded-lg p-6 bg-background">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">2. Schedule Collection</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Choose a convenient date and time for our team to collect your items.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 border rounded-lg p-6 bg-background">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">3. Get Paid</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Receive payment for your scrap items on the spot when we collect them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What We Accept</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  We accept a wide range of scrap items, including appliances, electronics, and more
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                <img
                  alt="Washing Machine"
                  className="aspect-square rounded-lg object-cover object-center"
                  height="100"
                  src="/placeholder.svg?height=100&width=100"
                  width="100"
                />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold">Washing Machines</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Working or non-working</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                <img
                  alt="Refrigerator"
                  className="aspect-square rounded-lg object-cover object-center"
                  height="100"
                  src="/placeholder.svg?height=100&width=100"
                  width="100"
                />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold">Refrigerators</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">All sizes accepted</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                <img
                  alt="Television"
                  className="aspect-square rounded-lg object-cover object-center"
                  height="100"
                  src="/placeholder.svg?height=100&width=100"
                  width="100"
                />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold">Televisions</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">LCD, LED, or CRT</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                <img
                  alt="Computers"
                  className="aspect-square rounded-lg object-cover object-center"
                  height="100"
                  src="/placeholder.svg?height=100&width=100"
                  width="100"
                />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold">Computers</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Desktops and laptops</p>
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

