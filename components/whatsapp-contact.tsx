import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WhatsAppContactProps {
  phoneNumber: string
  message?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function WhatsAppContact({
  phoneNumber,
  message = "Hello, I'm interested in your scrap pickup service.",
  variant = "default",
  size = "default",
  className = "",
}: WhatsAppContactProps) {
  // Format phone number (remove any non-digit characters)
  const formattedNumber = phoneNumber.replace(/\D/g, "")

  // Create WhatsApp link with pre-filled message
  const whatsappLink = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`

  return (
    <Button variant={variant} size={size} className={className} asChild>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <MessageSquare className="mr-2 h-4 w-4" />
        Chat on WhatsApp
      </a>
    </Button>
  )
}

