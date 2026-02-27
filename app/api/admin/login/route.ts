import { NextRequest, NextResponse } from "next/server"

// Allowed admin credentials
const ADMIN_CREDENTIALS = [
  {
    email: "isoleleuniverse@gmail.com",
    password: "Isolele2025#"
  },
  {
    email: "admin@isolele.com",
    password: "Isolele2025#"
  }
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Check if credentials match any of the allowed admin accounts
    const isValidAdmin = ADMIN_CREDENTIALS.some(
      (cred) =>
        email?.toLowerCase() === cred.email.toLowerCase() &&
        password === cred.password
    )

    if (isValidAdmin) {
      const response = NextResponse.json({ success: true })
      response.cookies.set("admin_session", "authenticated", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
      return response
    }

    return NextResponse.json(
      { success: false, error: "Email ou mot de passe incorrect" },
      { status: 401 }
    )
  } catch {
    return NextResponse.json(
      { success: false, error: "Une erreur s'est produite" },
      { status: 500 }
    )
  }
}
