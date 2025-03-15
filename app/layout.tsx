import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SupabaseProvider } from "@/components/supabase-provider"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ScrapMaster - Scrap Pickup Service",
  description: "Request scrap pickups from your home and get paid for your scrap items",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SupabaseProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <FloatingWhatsApp />
            <Toaster />
          </ThemeProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}



import './globals.css'