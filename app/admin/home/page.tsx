"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Users, Eye, ShoppingCart, TrendingUp,
  Globe, Save, Plus, X, Activity,
} from "lucide-react"

const stats = [
  { title: "Visiteurs en direct", value: "2 453", change: "+12%", icon: Users,        color: "#C9A542" },
  { title: "Pages consultées",    value: "1 847", change: "+8%",  icon: Eye,          color: "#B3541E" },
  { title: "Commandes du jour",   value: "48",    change: "+23%", icon: ShoppingCart, color: "#D4AF37" },
  { title: "Taux d'engagement",   value: "6.8%",  change: "+4%",  icon: TrendingUp,   color: "#A67C52" },
]

const topPages = [
  { name: "Accueil",            views: 5234, engagement: "8.2%"  },
  { name: "Shop – ZAIIRE",      views: 3421, engagement: "12.5%" },
  { name: "À propos",           views: 2156, engagement: "5.3%"  },
  { name: "Shop – KIMOYA",      views: 1923, engagement: "11.2%" },
  { name: "Contact",            views: 1234, engagement: "3.1%"  },
]

const recentActivities = [
  { text: "Nouvelle commande: ZAIIRE – Prince of Kongo (47 $)",          time: "Il y a 2 min"   },
  { text: "Nouvel abonné à la newsletter",                                time: "Il y a 8 min"   },
  { text: "Commentaire en attente de modération sur KIMOYA",              time: "Il y a 15 min"  },
  { text: "Mise à jour automatique du stock: LES JUMEAUX NJOKO",         time: "Il y a 1 h"     },
  { text: "Anomalie détectée: page /shop/zattar – temps de chargement élevé", time: "Il y a 2 h" },
]

const seoPages = [
  { url: "/",               title: "ISOLELE – African Mythology Reawakened",               meta: "Univers de super-héros africains" },
  { url: "/comics/zaiire",  title: "ZAIIRE Prince of Kongo – Isolele Comics",              meta: "Premier tome de la saga ZAIIRE"    },
  { url: "/shop",           title: "Boutique Isolele – Livres & Goodies",                   meta: "Commandez vos comics africains"    },
  { url: "/about",          title: "À propos – Héritage Congolais",                        meta: "La vision d'Isolele"               },
]

export default function AdminHomePage() {
  const [seoData, setSeoData] = useState(seoPages)
  const [saved, setSaved] = useState(false)

  const handleSeoChange = (index: number, field: "title" | "meta", value: string) => {
    setSeoData((prev) => prev.map((p, i) => i === index ? { ...p, [field]: value } : p))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-8">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Tableau de Bord</h1>
          <p className="text-gray-400 mt-1">Bienvenue dans l'espace d'administration ISOLELE</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs" style={{ backgroundColor: "rgba(201,165,66,0.12)", color: "#C9A542" }}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Site en ligne
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border p-5"
              style={{ backgroundColor: "rgba(201,165,66,0.04)", borderColor: `${stat.color}30` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}18` }}>
                  <Icon size={20} style={{ color: stat.color }} />
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(74,222,128,0.1)", color: "#4ade80" }}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-gray-400 text-sm mt-0.5">{stat.title}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Top Pages + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Top 5 Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="rounded-xl border p-6"
          style={{ backgroundColor: "rgba(201,165,66,0.04)", borderColor: "rgba(201,165,66,0.15)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Globe size={18} style={{ color: "#C9A542" }} />
            <h2 className="text-lg font-bold text-white">Pages les plus consultées</h2>
          </div>
          <div className="space-y-3">
            {topPages.map((page, i) => (
              <div key={page.name} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: "rgba(201,165,66,0.07)" }}>
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ backgroundColor: "#C9A542", color: "#0A0E1A" }}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{page.name}</p>
                  <p className="text-gray-500 text-xs">{page.views.toLocaleString()} vues</p>
                </div>
                <span className="text-xs font-semibold shrink-0" style={{ color: "#C9A542" }}>{page.engagement}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-xl border p-6"
          style={{ backgroundColor: "rgba(201,165,66,0.04)", borderColor: "rgba(201,165,66,0.15)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Activity size={18} style={{ color: "#C9A542" }} />
            <h2 className="text-lg font-bold text-white">Interactions Récentes</h2>
          </div>
          <div className="space-y-3">
            {recentActivities.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: "rgba(201,165,66,0.07)" }}>
                <span className="mt-1 w-2 h-2 rounded-full shrink-0 bg-green-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-200 text-sm">{a.text}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* SEO Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="rounded-xl border p-6"
        style={{ backgroundColor: "rgba(201,165,66,0.04)", borderColor: "rgba(201,165,66,0.15)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Gestion SEO par Page</h2>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ backgroundColor: saved ? "#4ade80" : "#C9A542", color: "#0A0E1A" }}
          >
            <Save size={15} />
            {saved ? "Enregistré !" : "Enregistrer"}
          </button>
        </div>

        <div className="space-y-4">
          {seoData.map((page, i) => (
            <div key={page.url} className="p-4 rounded-xl border" style={{ backgroundColor: "rgba(201,165,66,0.06)", borderColor: "rgba(201,165,66,0.12)" }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(201,165,66,0.15)", color: "#C9A542" }}>
                  {page.url}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Titre SEO</label>
                  <input
                    value={page.title}
                    onChange={(e) => handleSeoChange(i, "title", e.target.value)}
                    className="w-full bg-transparent border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none"
                    style={{ borderColor: "rgba(201,165,66,0.25)" }}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Méta-description</label>
                  <input
                    value={page.meta}
                    onChange={(e) => handleSeoChange(i, "meta", e.target.value)}
                    className="w-full bg-transparent border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none"
                    style={{ borderColor: "rgba(201,165,66,0.25)" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
