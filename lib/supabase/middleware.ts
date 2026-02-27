import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // --- ADMIN AUTH: handled independently of Supabase ---
  if (pathname.startsWith('/admin')) {
    const adminSession = request.cookies.get('admin_session')?.value

    // Always allow the login page
    if (pathname === '/admin/login') {
      // Already logged in → send to home
      if (adminSession === 'authenticated') {
        const url = request.nextUrl.clone()
        url.pathname = '/admin/home'
        return NextResponse.redirect(url)
      }
      return NextResponse.next({ request })
    }

    // All other /admin/* routes require the cookie
    if (adminSession !== 'authenticated') {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }

    // Authenticated: pass through immediately, no Supabase needed
    return NextResponse.next({ request })
  }
  // --- END ADMIN AUTH ---

  let supabaseResponse = NextResponse.next({
    request,
  })

  // Check if environment variables are available
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[v0] Supabase environment variables not configured. Some features may be unavailable.')
    return supabaseResponse
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  let user = null
  try {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()
    user = authUser
  } catch (error) {
    console.error('[v0] Error getting user from Supabase:', error)
  }

  if (
    request.nextUrl.pathname.startsWith('/protected') &&
    !user
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
