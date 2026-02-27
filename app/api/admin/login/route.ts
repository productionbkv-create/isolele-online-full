import { NextRequest, NextResponse } from "next/server"

const ADMIN_EMAIL = "isoleleuniverse@gmai.com"
const ADMIN_PASSWORD = "Isolele2025#"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (
      email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
      password === ADMIN_PASSWORD
    ) {
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
