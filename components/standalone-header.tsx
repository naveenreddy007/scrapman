"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, LogOut, Menu, Settings, User } from "lucide-react"

// This component doesn't use the useSupabase hook
export default function StandaloneHeader() {
  const router = useRouter()
  const pathname = usePathname()

  // Mock user for development
  const mockUser = {
    email: "dev@example.com",
  }

  const handleLogout = () => {
    // Just redirect to login without actually signing out
    router.push("/login")
  }

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">ScrapMaster</span>
            <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">DEV MODE</span>
          </Link>
          <nav className="hidden md:flex">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 text-sm font-medium ${
                        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex">
            <span className="text-sm text-muted-foreground">{mockUser.email}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {navItems.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-destructive">
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" onClick={handleLogout} className="hidden md:flex">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

