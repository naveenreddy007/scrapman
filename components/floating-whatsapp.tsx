"use client"

import { useState } from "react"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("Hello, I'm interested in your scrap pickup service.")

  const phoneNumber = "917816069085"
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80 shadow-lg">
          <CardHeader className="bg-green-500 text-white p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                WhatsApp Chat
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-green-600 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm mb-4">
              Chat with us directly on WhatsApp for quick assistance with your scrap pickup needs.
            </p>
            <Textarea
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full bg-green-500 hover:bg-green-600" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Chat
              </a>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Button
          className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}

