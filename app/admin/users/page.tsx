"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSupabase } from "@/components/supabase-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, User, Mail, Phone, Calendar } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  created_at: string
  request_count: number
}

export default function AdminUsers() {
  const { supabase } = useSupabase()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<UserProfile[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)

        // Fetch users with request count
        const { data, error } = await supabase
          .from("profiles")
          .select(`
            id,
            name,
            email,
            phone,
            created_at
          `)
          .order("created_at", { ascending: false })

        if (error) throw error

        // Get request count for each user
        const usersWithRequestCount = await Promise.all(
          (data || []).map(async (user) => {
            const { count, error: countError } = await supabase
              .from("scrap_requests")
              .select("*", { count: "exact", head: true })
              .eq("user_id", user.id)

            if (countError) throw countError

            return {
              ...user,
              request_count: count || 0,
            }
          }),
        )

        setUsers(usersWithRequestCount)
        setFilteredUsers(usersWithRequestCount)
      } catch (error: any) {
        console.error("Error fetching users:", error)
        toast({
          title: "Error",
          description: "Failed to load users. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [supabase, toast])

  useEffect(() => {
    // Filter users based on search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.phone.includes(query),
      )
      setFilteredUsers(filtered)
    } else {
      setFilteredUsers(users)
    }
  }, [searchQuery, users])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manage Users</h2>
          <p className="text-muted-foreground">View and manage user accounts</p>
        </div>
      </div>

      <div className="flex items-center mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, email, or phone..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Accounts</CardTitle>
          <CardDescription>All registered users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredUsers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Requests</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          {user.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          {user.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>{user.request_count}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/admin/users/${user.id}`}>View</a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <User className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No users found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchQuery ? "No users match your search criteria" : "There are no registered users in the system"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

