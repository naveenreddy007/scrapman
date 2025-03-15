"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSupabase } from "@/components/supabase-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Recycle, Home, PlusCircle, ClipboardList, Settings, LogOut, Menu, User } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"

export default function DashboardNav() {
  const { supabase, user } = useSupabase()
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  const isAdmin = user?.user_metadata?.role === "admin"

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: Home,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/new-request",
      label: "New Request",
      icon: PlusCircle,
      active: pathname === "/dashboard/new-request",
    },
    {
      href: "/dashboard/my-requests",
      label: "My Requests",
      icon: ClipboardList,
      active: pathname === "/dashboard/my-requests",
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/dashboard/settings",
    },
  ]

  const adminRoutes = [
    {
      href: "/admin",
      label: "Admin Dashboard",
      icon: Home,
      active: pathname === "/admin",
    },
    {
      href: "/admin/requests",
      label: "Manage Requests",
      icon: ClipboardList,
      active: pathname === "/admin/requests",
    },
    {
      href: "/admin/pricing",
      label: "Pricing",
      icon: Settings,
      active: pathname === "/admin/pricing",
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: User,
      active: pathname === "/admin/users",
    },
  ]

  const navItems = isAdmin ? adminRoutes : routes

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4">
        <Link href={isAdmin ? "/admin" : "/dashboard"} className="flex items-center gap-2">
          <Recycle className="h-6 w-6 text-primary" />
          <span className="font-bold">ScrapMaster</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          {navItems.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium transition-colors flex items-center gap-1 hover:text-primary ${
                route.active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {user?.user_metadata?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href={isAdmin ? "/admin" : "/dashboard"} className="flex items-center gap-2 mb-8">
                <Recycle className="h-6 w-6 text-primary" />
                <span className="font-bold">ScrapMaster</span>
              </Link>
              <nav className="flex flex-col gap-4">
                {navItems.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                      route.active ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <route.icon className="h-4 w-4" />
                    {route.label}
                  </Link>
                ))}
                <Button variant="ghost" className="justify-start px-2" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

