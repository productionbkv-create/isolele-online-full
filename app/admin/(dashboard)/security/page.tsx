"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Key,
  Eye,
  EyeOff,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Fingerprint,
  Globe,
  Monitor,
  Activity,
} from "lucide-react"

interface SecurityEvent {
  id: string
  type: "login" | "failed_login" | "password_change" | "role_change" | "settings_change"
  message: string
  ip: string
  timestamp: string
  status: "success" | "warning" | "danger"
}

interface AdminUser {
  id: string
  email: string
  full_name: string
  role: string
  last_sign_in: string
  created_at: string
}

const eventTypeConfig = {
  login: { icon: Lock, color: "#4CAF50" },
  failed_login: { icon: ShieldAlert, color: "#FF5252" },
  password_change: { icon: Key, color: "#FF9800" },
  role_change: { icon: Users, color: "#2196F3" },
  settings_change: { icon: RefreshCw, color: "#9C27B0" },
}

const statusConfig = {
  success: { color: "#4CAF50", bg: "bg-green-500/10" },
  warning: { color: "#FF9800", bg: "bg-orange-500/10" },
  danger: { color: "#FF5252", bg: "bg-red-500/10" },
}

export default function SecurityPage() {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [securityScore, setSecurityScore] = useState(78)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState("24")
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const supabase = createClient()

  const recentEvents: SecurityEvent[] = [
    {
      id: "1",
      type: "login",
      message: "Connexion reussie - Admin Isolele",
      ip: "192.168.1.xxx",
      timestamp: new Date().toISOString(),
      status: "success",
    },
    {
      id: "2",
      type: "failed_login",
      message: "Tentative de connexion echouee",
      ip: "10.0.0.xxx",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      status: "danger",
    },
    {
      id: "3",
      type: "settings_change",
      message: "Parametres de securite modifies",
      ip: "192.168.1.xxx",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      status: "warning",
    },
    {
      id: "4",
      type: "login",
      message: "Connexion reussie - Admin Isolele",
      ip: "192.168.1.xxx",
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      status: "success",
    },
  ]

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })

      if (data) {
        setAdminUsers(data.map((p: { id: string; email: string; full_name: string; role: string; updated_at: string; created_at: string }) => ({
          id: p.id,
          email: p.email || "",
          full_name: p.full_name || "Utilisateur",
          role: p.role || "admin",
          last_sign_in: p.updated_at || p.created_at,
          created_at: p.created_at,
        })))
      }
      setIsLoading(false)
    }
    fetchUsers()
  }, [supabase])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Securite</h1>
          <p className="text-gray-400">Gerez la securite et les acces de votre panneau</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-3 h-3 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <span className="text-sm text-green-400">Systeme protege</span>
        </div>
      </div>

      {/* Security Score & Quick Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-4 gap-4"
      >
        {/* Score */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-1 p-6 rounded-xl text-center"
          style={{
            backgroundColor: "#0a0f1a",
            border: "1px solid rgba(201, 165, 66, 0.2)",
          }}
        >
          <div className="relative w-28 h-28 mx-auto mb-4">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={securityScore >= 80 ? "#4CAF50" : securityScore >= 60 ? "#FF9800" : "#FF5252"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${securityScore * 2.51} 251`}
                initial={{ strokeDasharray: "0 251" }}
                animate={{ strokeDasharray: `${securityScore * 2.51} 251` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{securityScore}</span>
            </div>
          </div>
          <p className="text-white font-medium">Score de securite</p>
          <p className="text-sm text-gray-400 mt-1">
            {securityScore >= 80 ? "Excellent" : securityScore >= 60 ? "Ameliorable" : "Critique"}
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            {
              icon: ShieldCheck,
              label: "Connexions reussies",
              value: "156",
              sub: "Dernieres 30 jours",
              color: "#4CAF50",
            },
            {
              icon: ShieldAlert,
              label: "Tentatives echouees",
              value: "3",
              sub: "Dernieres 30 jours",
              color: "#FF5252",
            },
            {
              icon: Users,
              label: "Administrateurs",
              value: String(adminUsers.length || 1),
              sub: "Comptes actifs",
              color: "#2196F3",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-xl"
              style={{
                backgroundColor: "#0a0f1a",
                border: "1px solid rgba(201, 165, 66, 0.2)",
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="p-2.5 rounded-xl"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Settings */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="p-6 rounded-xl"
          style={{
            backgroundColor: "#0a0f1a",
            border: "1px solid rgba(201, 165, 66, 0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-5 h-5 text-[#C9A542]" />
            <h2 className="text-lg font-bold text-white">Parametres de securite</h2>
          </div>

          <div className="space-y-5">
            {/* 2FA */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-3">
                <Fingerprint className="w-5 h-5 text-[#C9A542]" />
                <div>
                  <p className="text-white font-medium">Authentification a deux facteurs</p>
                  <p className="text-sm text-gray-400">Ajoutez une couche de securite supplementaire</p>
                </div>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  twoFactorEnabled ? "bg-[#C9A542]" : "bg-gray-600"
                }`}
              >
                <motion.div
                  className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
                  animate={{ left: twoFactorEnabled ? "26px" : "2px" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            {/* Session Timeout */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#C9A542]" />
                <div>
                  <p className="text-white font-medium">Expiration de session</p>
                  <p className="text-sm text-gray-400">Deconnexion automatique apres inactivite</p>
                </div>
              </div>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="bg-[#1a2035] text-white text-sm px-3 py-2 rounded-lg border border-[#C9A542]/20 outline-none"
              >
                <option value="1">1 heure</option>
                <option value="4">4 heures</option>
                <option value="8">8 heures</option>
                <option value="24">24 heures</option>
                <option value="168">7 jours</option>
              </select>
            </div>

            {/* Change Password */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-3">
                <Key className="w-5 h-5 text-[#C9A542]" />
                <div>
                  <p className="text-white font-medium">Changer le mot de passe</p>
                  <p className="text-sm text-gray-400">Mettez a jour votre mot de passe regulierement</p>
                </div>
              </div>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-[#C9A542]/30 text-[#C9A542] hover:bg-[#C9A542]/10 transition-colors"
              >
                Modifier
              </button>
            </div>

            {/* IP Restriction */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-[#C9A542]" />
                <div>
                  <p className="text-white font-medium">Restriction par IP</p>
                  <p className="text-sm text-gray-400">Limitez les acces par adresse IP</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400">
                Desactive
              </span>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="p-6 rounded-xl"
          style={{
            backgroundColor: "#0a0f1a",
            border: "1px solid rgba(201, 165, 66, 0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-[#C9A542]" />
            <h2 className="text-lg font-bold text-white">Activite recente</h2>
          </div>

          <div className="space-y-3">
            {recentEvents.map((event, index) => {
              const eventConfig = eventTypeConfig[event.type]
              const eventStatus = statusConfig[event.status]
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start gap-3 p-3 rounded-xl ${eventStatus.bg}`}
                >
                  <div
                    className="p-2 rounded-lg mt-0.5"
                    style={{ backgroundColor: `${eventConfig.color}20` }}
                  >
                    <eventConfig.icon className="w-4 h-4" style={{ color: eventConfig.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{event.message}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {event.ip}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(event.timestamp).toLocaleString("fr-FR")}
                      </span>
                    </div>
                  </div>
                  {event.status === "success" ? (
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1" />
                  ) : event.status === "danger" ? (
                    <XCircle className="w-4 h-4 text-red-400 mt-1" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-orange-400 mt-1" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Admin Users */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="p-6 rounded-xl"
        style={{
          backgroundColor: "#0a0f1a",
          border: "1px solid rgba(201, 165, 66, 0.2)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#C9A542]" />
            <h2 className="text-lg font-bold text-white">Administrateurs</h2>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : adminUsers.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Aucun administrateur enregistre</p>
        ) : (
          <div className="space-y-3">
            {adminUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5"
              >
                <div className="w-10 h-10 rounded-full bg-[#C9A542]/20 flex items-center justify-center">
                  <span className="text-[#C9A542] font-bold">
                    {user.full_name?.[0]?.toUpperCase() || "A"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{user.full_name}</p>
                  <p className="text-sm text-gray-400 truncate">{user.email}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#C9A542]/20 text-[#C9A542] capitalize">
                  {user.role}
                </span>
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-gray-500">Derniere connexion</p>
                  <p className="text-xs text-gray-400">
                    {user.last_sign_in
                      ? new Date(user.last_sign_in).toLocaleDateString("fr-FR")
                      : "Jamais"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Password Change Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setShowPasswordModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 rounded-2xl p-6"
              style={{
                backgroundColor: "#0a0f1a",
                border: "1px solid rgba(201, 165, 66, 0.3)",
              }}
            >
              <h2 className="text-xl font-bold text-white mb-6">Changer le mot de passe</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Mot de passe actuel</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-[#1a2035] text-white rounded-lg border border-[#C9A542]/20 outline-none focus:border-[#C9A542]"
                    placeholder="Votre mot de passe actuel"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Nouveau mot de passe</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-[#1a2035] text-white rounded-lg border border-[#C9A542]/20 outline-none focus:border-[#C9A542]"
                    placeholder="Min. 8 caracteres"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Confirmer le mot de passe</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-[#1a2035] text-white rounded-lg border border-[#C9A542]/20 outline-none focus:border-[#C9A542]"
                    placeholder="Retapez le mot de passe"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 rounded-lg text-gray-400 hover:text-white"
                >
                  Annuler
                </button>
                <motion.button
                  className="px-6 py-2 rounded-lg font-medium text-[#0F1524] bg-[#C9A542]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sauvegarder
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
