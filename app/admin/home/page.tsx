"use client"

import { motion } from "framer-motion"
import { Users, TrendingUp, ShoppingCart, Eye } from "lucide-react"

export default function AdminHomePage() {
  const stats = [
    {
      title: "Visiteurs en direct",
      value: "2,453",
      change: "+12%",
      icon: Users,
      color: "#C9A542",
    },
    {
      title: "Pages consultées",
      value: "1,847",
      change: "+8%",
      icon: Eye,
      color: "#B3541E",
    },
    {
      title: "Commandes",
      value: "48",
      change: "+23%",
      icon: ShoppingCart,
      color: "#D4AF37",
    },
    {
      title: "Engagement",
      value: "6.8%",
      change: "+4%",
      icon: TrendingUp,
      color: "#A67C52",
    },
  ]

  const topPages = [
    { name: "Homepage", views: 5234, engagement: "8.2%" },
    { name: "Shop - ZAIIRE", views: 3421, engagement: "12.5%" },
    { name: "About", views: 2156, engagement: "5.3%" },
    { name: "Shop - KIMOYA", views: 1923, engagement: "11.2%" },
    { name: "Contact", views: 1234, engagement: "3.1%" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Tableau de Bord</h1>
        <p className="text-gray-400">Bienvenue dans l'espace d'administration ISOLELE</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border p-6"
              style={{
                backgroundColor: "rgba(201, 165, 66, 0.05)",
                borderColor: `${stat.color}40`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon size={24} style={{ color: stat.color }} />
                </div>
              </div>
              <p className="text-sm" style={{ color: stat.color }}>
                {stat.change} ce mois
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Top Pages & SEO Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-lg border p-6"
          style={{
            backgroundColor: "rgba(201, 165, 66, 0.05)",
            borderColor: "rgba(201, 165, 66, 0.2)",
          }}
        >
          <h2 className="text-xl font-bold text-white mb-6">Pages les plus consultées</h2>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div
                key={page.name}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: "rgba(201, 165, 66, 0.1)" }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: "#C9A542" }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{page.name}</p>
                    <p className="text-sm text-gray-400">{page.views} vues</p>
                  </div>
                </div>
                <p className="text-[#C9A542] font-medium">{page.engagement}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SEO Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-lg border p-6"
          style={{
            backgroundColor: "rgba(201, 165, 66, 0.05)",
            borderColor: "rgba(201, 165, 66, 0.2)",
          }}
        >
          <h2 className="text-xl font-bold text-white mb-6">Gestion SEO</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg" style={{ backgroundColor: "rgba(201, 165, 66, 0.1)" }}>
              <label className="text-sm text-gray-400 mb-2 block">Titre SEO Global</label>
              <input
                type="text"
                placeholder="Entrez le titre SEO..."
                className="w-full bg-transparent border rounded px-3 py-2 text-white placeholder-gray-600"
                style={{ borderColor: "rgba(201, 165, 66, 0.3)" }}
              />
            </div>
            <div className="p-4 rounded-lg" style={{ backgroundColor: "rgba(201, 165, 66, 0.1)" }}>
              <label className="text-sm text-gray-400 mb-2 block">Méta-description</label>
              <textarea
                placeholder="Entrez la description..."
                className="w-full bg-transparent border rounded px-3 py-2 text-white placeholder-gray-600 h-20"
                style={{ borderColor: "rgba(201, 165, 66, 0.3)" }}
              />
            </div>
            <button
              className="w-full py-2 rounded-lg font-medium transition"
              style={{ backgroundColor: "#C9A542", color: "#0F1524" }}
            >
              Enregistrer les modifications
            </button>
          </div>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-lg border p-6"
        style={{
          backgroundColor: "rgba(201, 165, 66, 0.05)",
          borderColor: "rgba(201, 165, 66, 0.2)",
        }}
      >
        <h2 className="text-xl font-bold text-white mb-6">Interactions Récentes</h2>
        <div className="space-y-3">
          {[
            "Nouvelle commande: ZAIIRE - Prince of Kongo",
            "Nouvel abonné à la newsletter",
            "Commentaire en attente de modération",
            "Mise à jour du stock: LES JUMEAUX NJOKO",
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{ backgroundColor: "rgba(201, 165, 66, 0.1)" }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#C9A542" }}
              />
              <p className="text-gray-300 text-sm">{activity}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
