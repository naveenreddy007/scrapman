import { createBrowserClient } from "@supabase/ssr"

// Helper function to check if a user is authenticated
export async function checkAuth() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const { data } = await supabase.auth.getSession()
  return !!data.session
}

// Helper function to redirect to login if not authenticated
export async function redirectIfNotAuthenticated(redirectTo = "/dashboard") {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    window.location.href = `/login?from=${encodeURIComponent(redirectTo)}`
    return false
  }

  return true
}

// Helper function to redirect to dashboard if authenticated
export async function redirectIfAuthenticated(redirectTo = "/dashboard") {
  const isAuthenticated = await checkAuth()

  if (isAuthenticated) {
    window.location.href = redirectTo
    return true
  }

  return false
}

