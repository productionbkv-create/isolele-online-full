import { redirect } from "next/navigation"

// /admin redirects to the real dashboard at /admin/home
export default function AdminPage() {
  redirect("/admin/home")
}
