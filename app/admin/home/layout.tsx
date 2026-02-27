"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { Bell, Settings, LogOut, Menu, X } from "lucide-react"

interface AdminHomeLayoutProps {
  children: React.ReactNode
}

export default function AdminHomeLayout({ children }: AdminHomeLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/check-auth")
        if (!response.ok) {
          router.push("/admin/login")
          return
        }
        setIsAuthenticated(true)
        setIsLoading(false)
      } catch {
        router.push("/admin/login")
      }
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F1524] flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.5, 1] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="text-center"
        >
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: "#C9A54220" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-8 h-8 border-2 border-[#C9A542] border-t-transparent rounded-full"
            />
          </div>
          <p className="text-gray-400">Vérification de l'authentification...</p>
        </motion.div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const navItems = [
    { label: "Accueil", href: "/admin/home", icon: "🏠" },
    { label: "Refact", href: "/admin/home/refact", icon: "✏️" },
    { label: "Notifications", href: "/admin/home/notifications", icon: "🔔" },
    { label: "Reboard", href: "/admin/home/reboard", icon: "📊" },
    { label: "Settings", href: "/admin/home/settings", icon: "⚙️" },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0F1524" }}>
      {/* Top Navigation Bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          backgroundColor: "rgba(15, 21, 36, 0.95)",
          borderColor: "rgba(201, 165, 66, 0.2)",
        }}
      >
        <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto w-full">
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#C9A542]"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/admin/home" className="text-xl font-bold text-[#C9A542]">
              ISOLELE.ADMIN
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-[#C9A542] transition">
              <Bell size={20} />
              <span
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center"
                style={{ backgroundColor: "#C9A542" }}
              >
                3
              </span>
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-500 transition flex items-center gap-2"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline text-sm">Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
            style={{ borderColor: "rgba(201, 165, 66, 0.2)" }}
          >
            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 rounded text-gray-400 hover:text-[#C9A542] hover:bg-[#C9A54220] transition"
                >
                  {item.icon} {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Sidebar for Desktop */}
      <div
        className="hidden md:fixed md:left-0 md:top-20 md:w-64 md:h-[calc(100vh-80px)] md:border-r md:block overflow-y-auto"
        style={{ borderColor: "rgba(201, 165, 66, 0.2)" }}
      >
        <nav className="p-6 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 rounded-lg text-gray-400 hover:text-[#C9A542] hover:bg-[#C9A54220] transition"
            >
              <span className="text-lg mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="md:ml-64 pt-20 p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}
