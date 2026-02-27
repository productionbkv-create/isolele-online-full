"use client"

import { motion } from "framer-motion"
import { Bell, ShoppingCart, MessageSquare, AlertCircle, Users, CheckCircle } from "lucide-react"

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "order",
      icon: ShoppingCart,
      title: "Nouvelle commande",
      description: "Commande #2847: ZAIIRE - Prince of Kongo (45€)",
      time: "À l'instant",
      color: "#C9A542",
    },
    {
      id: 2,
      type: "comment",
      icon: MessageSquare,
      title: "Commentaire en attente",
      description: "Un nouveau commentaire attend la modération",
      time: "Il y a 5 minutes",
      color: "#B3541E",
    },
    {
      id: 3,
      type: "subscriber",
      icon: Users,
      title: "Nouvel abonné",
      description: "Nouvel abonné à la newsletter: +147 cette semaine",
      time: "Il y a 2 heures",
      color: "#D4AF37",
    },
    {
      id: 4,
      type: "alert",
      icon: AlertCircle,
      title: "Stock faible",
      description: "LES JUMEAUX NJOKO: Seulement 3 exemplaires en stock",
      time: "Il y a 4 heures",
      color: "#FF6B6B",
    },
    {
      id: 5,
      type: "success",
      icon: CheckCircle,
      title: "Mise à jour effectuée",
      description: "Mise à jour du contenu de la page d'accueil réussie",
      time: "Hier",
      color: "#51CF66",
    },
    {
      id: 6,
      type: "order",
      icon: ShoppingCart,
      title: "Commande expédiée",
      description: "Commande #2831 a été expédiée avec succès",
      time: "Hier",
      color: "#C9A542",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Centre de Notifications</h1>
        <p className="text-gray-400">Gérez toutes les alertes et événements importants</p>
      </div>

      {/* Notifications Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-3 flex-wrap"
      >
        {["Tous", "Commandes", "Commentaires", "Alertes", "Succès"].map((filter) => (
          <button
            key={filter}
            className="px-4 py-2 rounded-lg border transition"
            style={{
              borderColor: "rgba(201, 165, 66, 0.3)",
              color: "#C9A542",
            }}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notif, index) => {
          const Icon = notif.icon
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border p-4 hover:border-[#C9A542] transition cursor-pointer"
              style={{
                backgroundColor: "rgba(201, 165, 66, 0.05)",
                borderColor: "rgba(201, 165, 66, 0.2)",
              }}
            >
              <div className="flex gap-4">
                <div
                  className="p-3 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: `${notif.color}30` }}
                >
                  <Icon size={24} style={{ color: notif.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{notif.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{notif.description}</p>
                  <p className="text-gray-500 text-xs mt-2">{notif.time}</p>
                </div>
                <div className="flex-shrink-0">
                  <button className="text-gray-500 hover:text-gray-300">×</button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Mark All as Read */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <button className="text-[#C9A542] hover:text-[#D4AF37] transition font-medium">
          Marquer tout comme lu
        </button>
      </motion.div>
    </div>
  )
}
