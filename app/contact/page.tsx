"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useSupabase } from "@/components/supabase-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Recycle, Mail, Phone, MapPin, Send, Loader2, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { supabase } = useSupabase()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Store contact form submission in Supabase
      // Note: You'll need to create a 'contact_submissions' table in your Supabase database
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      })

      if (error) throw error

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
    } catch (error: any) {
      console.error("Error submitting contact form:", error)
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // WhatsApp link with the provided number
  const whatsappLink = `https://wa.me/917816069085`

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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contact Us</h1>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Have questions or need assistance? We're here to help!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">
                    We'd love to hear from you. Fill out the form or contact us directly using the information below.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-500 dark:text-gray-400">+91 7816069085</p>
                      <div className="mt-2 flex space-x-3">
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-primary hover:underline"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Chat on WhatsApp
                        </a>
                        <a
                          href="tel:+917816069085"
                          className="inline-flex items-center text-sm text-primary hover:underline"
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Call us
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <a
                        href="mailto:info@scrapmaster.com"
                        className="text-gray-500 dark:text-gray-400 hover:text-primary"
                      >
                        info@scrapmaster.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-gray-500 dark:text-gray-400">LB Nagar, Hyderabad, Telangana, India</p>
                      <a
                        href="https://maps.google.com/?q=LB+Nagar,+Hyderabad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-primary hover:underline mt-2"
                      >
                        View on Google Maps
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden h-[300px] border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30452.76446460991!2d78.53975082418013!3d17.359645895787383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb98c7a0dc3e87%3A0x6c56d0e7f3dab2e8!2sLB%20Nagar%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1710234567890!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          required
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          placeholder="john@example.com"
                          required
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="+91 9876543210"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="How can we help you?"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Business Hours</CardTitle>
                    <CardDescription>When you can reach us</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                Find answers to common questions about our scrap pickup service
              </p>
              <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How do I schedule a pickup?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      You can schedule a pickup by creating an account and submitting a request through our website or
                      by calling our customer service.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What areas do you service?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      We currently service all areas within Hyderabad city limits. We plan to expand to other cities
                      soon.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How is payment made?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      We offer cash payment on the spot when we collect your scrap items. We also provide digital
                      payment options.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What items do you accept?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      We accept a wide range of items including appliances, electronics, metals, and more. Check our
                      pricing page for a complete list.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How are prices determined?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Prices are determined based on the type, condition, weight, and current market value of the scrap
                      materials.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Is my data secure?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Yes, we take data security seriously. Your personal information is encrypted and stored securely
                      in compliance with data protection regulations.
                    </p>
                  </CardContent>
                </Card>
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

