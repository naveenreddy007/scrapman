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
  Camera,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react"

export default function HowItWorksPage() {
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
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">How ScrapMaster Works</h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  A simple, transparent process to sell your scrap and get paid fairly
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Overview Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter">Our Simple Three-Step Process</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    ScrapMaster makes it easy to turn your unwanted items into cash with our streamlined process.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-1 bg-muted hidden md:block"></div>

                  <div className="space-y-12">
                    <div className="relative flex flex-col md:flex-row gap-6">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground md:absolute md:left-0 md:z-10">
                        <Download className="h-8 w-8" />
                      </div>
                      <div className="md:ml-24 space-y-4">
                        <h3 className="text-2xl font-bold">Step 1: Download the App</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          Get started by downloading the ScrapMaster app from the App Store or Google Play Store.
                          Alternatively, you can sign up directly on our website.
                        </p>
                        <div className="grid gap-4 md:grid-cols-2">
                          <Card>
                            <CardContent className="p-4 flex items-start space-x-4">
                              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-medium">Create an Account</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Sign up with your basic details to create your ScrapMaster account.
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 flex items-start space-x-4">
                              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-medium">Verify Your Contact</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Verify your phone number and email to ensure secure transactions.
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>

                    <div className="relative flex flex-col md:flex-row gap-6">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground md:absolute md:left-0 md:z-10">
                        <Upload className="h-8 w-8" />
                      </div>
                      <div className="md:ml-24 space-y-4">
                        <h3 className="text-2xl font-bold">Step 2: Upload Scrap Details</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          Provide information about the scrap items you want to sell. The more details you provide, the
                          more accurate our price estimate will be.
                        </p>
                        <div className="grid gap-4 md:grid-cols-3">
                          <Card>
                            <CardContent className="p-4 flex items-start space-x-4">
                              <Camera className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-medium">Upload Photos</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Take clear photos of your scrap items to help us assess their condition and value.
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 flex items-start space-x-4">
                              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-medium">Select Category</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Choose the appropriate category for your scrap items from our comprehensive list.
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 flex items-start space-x-4">
                              <Clock className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-medium">Specify Condition</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Indicate whether your items are in working or non-working condition for accurate
                                  pricing.
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>

                    <div className="relative flex flex-col md:flex-row gap-6">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground md:absolute md:left-0 md:z-10">
                        <DollarSign className="h-8 w-8" />
                      </div>
                      <div className="md:ml-24 space-y-4">
                        <h3 className="text-2xl font-bold">Step 3: Get Paid</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          Receive a price estimate based on your scrap details. Once you confirm, we'll arrange for
                          collection and payment.
                        </p>
                        <div className="grid gap-4 md:grid-cols-3">
                          <Card>
                            <CardContent className="p-4 flex items-start space-x-4">
                              <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-medium">Price Estimate</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Receive a competitive price estimate based on current market rates and item condition.
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 flex items-start space-x-4">
                              <Calendar className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-medium">Schedule Pickup</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Choose a convenient date and time for our team to collect your scrap items.
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 flex items-start space-x-4">
                              <Truck className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-medium">Home Collection</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Our team will arrive at your location, verify the items, and provide payment on the
                                  spot.
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Commercial Clients Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter">For Commercial Clients</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    ScrapMaster offers specialized services for businesses, including shop owners who are relocating or
                    closing down.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-xl font-bold">Bulk Scrap Purchase</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        For businesses with large quantities of scrap materials, we offer competitive rates and
                        efficient collection services. Our team can handle regular pickups or one-time bulk collections.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span className="text-gray-500 dark:text-gray-400">
                            Competitive pricing for bulk quantities
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span className="text-gray-500 dark:text-gray-400">Scheduled regular collections</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span className="text-gray-500 dark:text-gray-400">Dedicated account manager</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-xl font-bold">Shop Dismantling Services</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        If you're relocating or closing your shop, our professional dismantling services can help you
                        extract maximum value from your fixtures and equipment.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span className="text-gray-500 dark:text-gray-400">Professional dismantling team</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span className="text-gray-500 dark:text-gray-400">
                            Fair valuation of fixtures and equipment
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                          <span className="text-gray-500 dark:text-gray-400">Clean and efficient removal process</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-center pt-6">
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

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <div className="space-y-8">
                <div className="space-y-2 text-center">
                  <h2 className="text-3xl font-bold tracking-tighter">Frequently Asked Questions</h2>
                  <p className="text-gray-500 dark:text-gray-400 max-w-[700px] mx-auto">
                    Find answers to common questions about our scrap collection process
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">How is the price of my scrap determined?</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        The price is determined based on the type, condition, weight, and current market value of the
                        scrap materials. We provide transparent pricing with no hidden fees.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">How long does the pickup process take?</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Once you schedule a pickup, our team will arrive at the designated time. The actual collection
                        process typically takes 15-30 minutes, depending on the quantity and type of items.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">What areas do you service?</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        We currently service all areas within Hyderabad city limits. We're continuously expanding our
                        service areas, so please check our app or contact us for the latest coverage information.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">How do I get paid for my scrap?</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        We offer cash payment on the spot when we collect your scrap items. We also provide digital
                        payment options if you prefer.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">What types of scrap do you accept?</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        We accept a wide range of scrap items including appliances, electronics, metals, and more. Check
                        our pricing page for a complete list of accepted items.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">Is my data secure when using the app?</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Yes, we take data security seriously. Your personal information is encrypted and stored securely
                        in compliance with data protection regulations.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Get Started?</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Download the app today and turn your scrap into cash with just a few taps.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="gap-1">
                    Sign Up Now <ArrowRight className="h-4 w-4" />
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

