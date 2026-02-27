import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Check if admin_session cookie exists
    const sessionCookie = request.cookies.get("admin_session")
    
    if (!sessionCookie || sessionCookie.value !== "authenticated") {
      return NextResponse.json(
        { success: false, error: "Non authentifié" },
        { status: 401 }
      )
    }

    return NextResponse.json({ success: true, authenticated: true })
  } catch {
    return NextResponse.json(
      { success: false, error: "Erreur lors de la vérification" },
      { status: 500 }
    )
  }
}
