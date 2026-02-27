"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  Bell, LogOut, Menu, X,
  Home, Edit3, BarChart2, Settings,
  ChevronRight, LayoutDashboard,
} from "lucide-react"

interface AdminHomeLayoutProps {
  children: React.ReactNode
}

const navItems = [
  { label: "Accueil",       href: "/admin/home",              icon: Home      },
  { label: "Refact",        href: "/admin/home/refact",        icon: Edit3     },
  { label: "Notifications", href: "/admin/home/notifications", icon: Bell      },
  { label: "Reboard",       href: "/admin/home/reboard",       icon: BarChart2 },
  { label: "Settings",      href: "/admin/home/settings",      icon: Settings  },
]

export default function AdminHomeLayout({ children }: AdminHomeLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    window.location.href = "/admin/login"
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0A0E1A" }}>

      {/* TOP NAV */}
      <header
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 md:px-8 h-16 border-b"
        style={{ background: "rgba(10,14,26,0.97)", borderColor: "rgba(201,165,66,0.2)", backdropFilter: "blur(10px)" }}
      >
        <Link href="/admin/home" className="flex items-center gap-3 shrink-0">
          <Image src="/images/isolele-logo.png" alt="Isolele" width={36} height={36} className="object-contain" />
          <span className="font-bold tracking-widest text-sm hidden sm:inline" style={{ color: "#C9A542" }}>
            ISOLELE.ADMIN
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{ color: active ? "#C9A542" : "#9CA3AF", backgroundColor: active ? "rgba(201,165,66,0.12)" : "transparent" }}>
                <Icon size={16} />{label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/admin"
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs border transition"
            style={{ borderColor: "rgba(201,165,66,0.25)", color: "#C9A542" }}>
            <LayoutDashboard size={14} /><span>Dashboard</span>
          </Link>
          <Link href="/admin/home/notifications" className="relative p-2 rounded-lg text-gray-400 hover:text-[#C9A542] transition">
            <Bell size={20} />
            <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold"
              style={{ backgroundColor: "#C9A542", color: "#0A0E1A" }}>3</span>
          </Link>
          <button onClick={handleLogout}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition">
            <LogOut size={16} /><span>Quitter</span>
          </button>
          <button className="md:hidden p-2 text-gray-400 hover:text-[#C9A542] transition" onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 inset-x-0 z-40 border-b md:hidden"
            style={{ background: "rgba(10,14,26,0.98)", borderColor: "rgba(201,165,66,0.2)" }}>
            <nav className="p-4 space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const active = pathname === href
                return (
                  <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all"
                    style={{ color: active ? "#C9A542" : "#9CA3AF", backgroundColor: active ? "rgba(201,165,66,0.12)" : "transparent" }}>
                    <div className="flex items-center gap-3"><Icon size={18} />{label}</div>
                    <ChevronRight size={14} />
                  </Link>
                )
              })}
              <Link href="/admin" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-400 transition"
                style={{ border: "1px solid rgba(201,165,66,0.2)" }}>
                <div className="flex items-center gap-3"><LayoutDashboard size={18} />Dashboard Complet</div>
                <ChevronRight size={14} />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENT */}
      <main className="flex-1 pt-16">
        <motion.div key={pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          {children}
        </motion.div>
      </main>
    </div>
  )
}


interface AdminHomeLayoutProps {
  children: React.ReactNode
}

const navItems = [
  { label: "Accueil",       href: "/admin/home",              icon: Home          },
  { label: "Refact",        href: "/admin/home/refact",        icon: Edit3         },
  { label: "Notifications", href: "/admin/home/notifications", icon: Bell          },
  { label: "Reboard",       href: "/admin/home/reboard",       icon: BarChart2     },
  { label: "Settings",      href: "/admin/home/settings",      icon: Settings      },
]

export default function AdminHomeLayout({ children }: AdminHomeLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isChecking, setIsChecking]  = useState(true)
  const router   = useRouter()
  const pathname = usePathname()

  // Auth guard
  useEffect(() => {
    fetch("/api/admin/check-auth")
      .then(res => {
        if (!res.ok) router.replace("/admin/login")
        else setIsChecking(false)
      })
      .catch(() => router.replace("/admin/login"))
  }, [router])

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    window.location.href = "/admin/login"
  }

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A0E1A" }}>
        <div className="w-8 h-8 border-2 border-[#C9A542] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0A0E1A" }}>

      {/* ── TOP NAV ── */}
      <header
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 md:px-8 h-16 border-b"
        style={{
          background: "rgba(10,14,26,0.97)",
          borderColor: "rgba(201,165,66,0.2)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Logo */}
        <Link href="/admin/home" className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/isolele-logo.png"
            alt="Isolele"
            width={36}
            height={36}
            className="object-contain"
            style={{ width: 36, height: "auto" }}
          />
          <span className="font-bold tracking-widest text-sm hidden sm:inline" style={{ color: "#C9A542" }}>
            ISOLELE.ADMIN
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  color: active ? "#C9A542" : "#9CA3AF",
                  backgroundColor: active ? "rgba(201,165,66,0.12)" : "transparent",
                }}>
                <Icon size={16} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Dashboard link */}
          <Link href="/admin/dashboard"
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs border transition"
            style={{ borderColor: "rgba(201,165,66,0.25)", color: "#C9A542" }}
            title="Aller au Dashboard complet">
            <LayoutDashboard size={14} />
            <span>Dashboard</span>
          </Link>

          {/* Bell */}
          <Link href="/admin/home/notifications"
            className="relative p-2 rounded-lg text-gray-400 hover:text-[#C9A542] transition">
            <Bell size={20} />
            <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold"
              style={{ backgroundColor: "#C9A542", color: "#0A0E1A" }}>
              3
            </span>
          </Link>

          {/* Logout */}
          <button onClick={handleLogout}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition">
            <LogOut size={16} />
            <span>Déconnexion</span>
          </button>

          {/* Mobile menu toggle */}
          <button className="md:hidden p-2 text-gray-400 hover:text-[#C9A542] transition"
            onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 inset-x-0 z-40 border-b md:hidden"
            style={{ background: "rgba(10,14,26,0.98)", borderColor: "rgba(201,165,66,0.2)" }}>
            <nav className="p-4 space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const active = pathname === href
                return (
                  <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all"
                    style={{
                      color: active ? "#C9A542" : "#9CA3AF",
                      backgroundColor: active ? "rgba(201,165,66,0.12)" : "transparent",
                    }}>
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      {label}
                    </div>
                    <ChevronRight size={14} />
                  </Link>
                )
              })}
              <Link href="/admin/dashboard" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-400 transition"
                style={{ border: "1px solid rgba(201,165,66,0.2)" }}>
                <div className="flex items-center gap-3">
                  <LayoutDashboard size={18} />
                  Dashboard Complet
                </div>
                <ChevronRight size={14} />
              </Link>
              <button onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition">
                <LogOut size={18} />
                Déconnexion
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CONTENT ── */}
      <main className="flex-1 pt-16">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          {children}
        </motion.div>
      </main>
    </div>
  )
}
