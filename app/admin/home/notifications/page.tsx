"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, ShoppingCart, MessageSquare, UserPlus, AlertTriangle, RefreshCw, Package, Check, X } from "lucide-react"

type NotifType = "order" | "comment" | "subscriber" | "alert" | "update" | "stock"

interface Notif {
  id: number; type: NotifType; title: string; message: string; time: string; read: boolean
}

const ICON: Record<NotifType, React.ElementType> = {
  order: ShoppingCart, comment: MessageSquare, subscriber: UserPlus,
  alert: AlertTriangle, update: RefreshCw, stock: Package,
}
const COLOR: Record<NotifType, string> = {
  order: "#C9A542", comment: "#60a5fa", subscriber: "#4ade80",
  alert: "#f87171", update: "#a78bfa", stock: "#fb923c",
}

const INITIAL: Notif[] = [
  { id:1,  type:"order",      title:"Nouvelle commande",       message:"ZAIIRE – Prince of Kongo × 1 — 47 $",              time:"Il y a 2 min",  read:false },
  { id:2,  type:"comment",    title:"Commentaire en attente",  message:"Commentaire sur KIMOYA – en attente de modération", time:"Il y a 8 min",  read:false },
  { id:3,  type:"subscriber", title:"Nouvel abonné",           message:"Nouvel inscrit à la newsletter",                    time:"Il y a 15 min", read:false },
  { id:4,  type:"alert",      title:"Anomalie détectée",       message:"/shop/zattar – temps de chargement élevé (4.2s)",  time:"Il y a 1 h",   read:false },
  { id:5,  type:"order",      title:"Nouvelle commande",       message:"LES JUMEAUX NJOKO × 2 — 94 $",                    time:"Il y a 1 h",   read:true  },
  { id:6,  type:"stock",      title:"Stock faible",            message:"ZATTAR — 3 exemplaires restants",                  time:"Il y a 2 h",   read:true  },
  { id:7,  type:"update",     title:"Mise à jour effectuée",   message:"Dépendances mises à jour avec succès",             time:"Il y a 3 h",   read:true  },
  { id:8,  type:"order",      title:"Nouvelle commande",       message:"REINE IMVULA × 1 — 32 $",                         time:"Hier",          read:true  },
  { id:9,  type:"alert",      title:"Erreur 404",              message:"/shop/kimoya-vol2 — Page introuvable",             time:"Hier",          read:true  },
  { id:10, type:"subscriber", title:"Nouvel abonné",           message:"Nouvel inscrit à la newsletter",                   time:"Il y a 2 jours",read:true  },
]

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notif[]>(INITIAL)
  const [filter, setFilter] = useState<"all"|"unread">("all")

  const unread = notifs.filter(n => !n.read).length
  const list = filter === "unread" ? notifs.filter(n => !n.read) : notifs

  const markRead   = (id: number) => setNotifs(p => p.map(n => n.id === id ? {...n, read:true} : n))
  const markAllRead = ()          => setNotifs(p => p.map(n => ({...n, read:true})))
  const dismiss    = (id: number) => setNotifs(p => p.filter(n => n.id !== id))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
          <p className="text-gray-400 mt-1">Centre d'alertes et d'événements du site</p>
        </div>
        <div className="flex items-center gap-3">
          {unread > 0 && (
            <span className="px-3 py-1 rounded-full text-sm font-bold" style={{ backgroundColor:"#C9A542", color:"#0A0E1A" }}>
              {unread} non lues
            </span>
          )}
          <button onClick={markAllRead}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm border transition"
            style={{ borderColor:"rgba(201,165,66,0.3)", color:"#C9A542" }}>
            <Check size={15}/> Tout marquer comme lu
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(["all","unread"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{ backgroundColor: filter===f ? "#C9A542" : "rgba(201,165,66,0.08)", color: filter===f ? "#0A0E1A" : "#9CA3AF" }}>
            {f === "all" ? `Toutes (${notifs.length})` : `Non lues (${unread})`}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {list.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <Bell size={40} className="mx-auto mb-3 opacity-30"/>
            <p>Aucune notification</p>
          </div>
        )}
        {list.map((n, i) => {
          const Icon  = ICON[n.type]
          const color = COLOR[n.type]
          return (
            <motion.div key={n.id}
              initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-start gap-4 p-4 rounded-xl border transition-all"
              style={{
                backgroundColor: n.read ? "rgba(201,165,66,0.03)" : "rgba(201,165,66,0.09)",
                borderColor:     n.read ? "rgba(201,165,66,0.1)"  : "rgba(201,165,66,0.3)",
              }}>
              <div className="p-2.5 rounded-xl shrink-0" style={{ backgroundColor:`${color}18` }}>
                <Icon size={18} style={{ color }}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-white text-sm">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor:"#C9A542" }}/>}
                </div>
                <p className="text-gray-400 text-sm mt-0.5">{n.message}</p>
                <p className="text-gray-600 text-xs mt-1">{n.time}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                {!n.read && (
                  <button onClick={() => markRead(n.id)} title="Marquer comme lu"
                    className="p-1.5 rounded-lg text-gray-500 hover:text-[#C9A542] transition">
                    <Check size={14}/>
                  </button>
                )}
                <button onClick={() => dismiss(n.id)} title="Supprimer"
                  className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 transition">
                  <X size={14}/>
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}


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
