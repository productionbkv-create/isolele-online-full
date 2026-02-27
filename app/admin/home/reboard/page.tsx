"use client"

import { motion } from "framer-motion"
import { TrendingUp, ShoppingCart, DollarSign, AlertTriangle } from "lucide-react"

export default function ReboardPage() {
  const salesData = [
    { label: "Lun", value: 45 },
    { label: "Mar", value: 52 },
    { label: "Mer", value: 38 },
    { label: "Jeu", value: 71 },
    { label: "Ven", value: 68 },
    { label: "Sam", value: 89 },
    { label: "Dim", value: 56 },
  ]

  const topBooks = [
    { title: "ZAIIRE - Prince of Kongo", sales: 156, views: 4234, conversion: "12.5%", stock: 45 },
    { title: "KIMOYA", sales: 124, views: 3156, conversion: "10.2%", stock: 32 },
    { title: "ZATTAR", sales: 98, views: 2847, conversion: "8.7%", stock: 18 },
    { title: "LES JUMEAUX NJOKO", sales: 67, views: 1923, conversion: "6.5%", stock: 3 },
    { title: "REINE IMVULA", sales: 54, views: 1567, conversion: "5.3%", stock: 8 },
  ]

  const maxSales = Math.max(...salesData.map(d => d.value))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Reboard - Tableau de Bord des Ventes</h1>
        <p className="text-gray-400">Analyse en temps réel des performances et popularité</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Ventes du jour", value: "48", change: "+23%", icon: ShoppingCart, color: "#C9A542" },
          { title: "Chiffre d'affaires", value: "2,847€", change: "+18%", icon: DollarSign, color: "#D4AF37" },
          { title: "Taux de conversion", value: "8.4%", change: "+2.3%", icon: TrendingUp, color: "#B3541E" },
          { title: "Visiteurs uniques", value: "5,234", change: "+12%", icon: TrendingUp, color: "#A67C52" },
        ].map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg border p-6"
              style={{
                backgroundColor: "rgba(201, 165, 66, 0.05)",
                borderColor: `${metric.color}40`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-gray-400 text-sm">{metric.title}</p>
                <Icon size={20} style={{ color: metric.color }} />
              </div>
              <p className="text-2xl font-bold text-white mb-2">{metric.value}</p>
              <p style={{ color: metric.color }} className="text-sm font-medium">{metric.change}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Sales Chart */}
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
        <h2 className="text-lg font-bold text-white mb-6">Ventes cette semaine</h2>
        <div className="flex items-end justify-between h-48 gap-2">
          {salesData.map((data, index) => (
            <motion.div
              key={data.label}
              initial={{ height: 0 }}
              animate={{ height: `${(data.value / maxSales) * 100}%` }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex-1 rounded-t-lg group relative"
              style={{ backgroundColor: "#C9A542" }}
            >
              <div className="hidden group-hover:block absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                {data.value} ventes
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          {salesData.map((data) => (
            <p key={data.label} className="text-gray-400 text-sm">{data.label}</p>
          ))}
        </div>
      </motion.div>

      {/* Top Books & Stock Management */}
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
        <h2 className="text-lg font-bold text-white mb-6">Livres les plus vendus & Gestion des stocks</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottomColor: "rgba(201, 165, 66, 0.2)" }} className="border-b">
                <th className="text-left text-gray-400 py-3 px-4">Titre</th>
                <th className="text-center text-gray-400 py-3 px-4">Ventes</th>
                <th className="text-center text-gray-400 py-3 px-4">Vues</th>
                <th className="text-center text-gray-400 py-3 px-4">Conversion</th>
                <th className="text-center text-gray-400 py-3 px-4">Stock</th>
              </tr>
            </thead>
            <tbody>
              {topBooks.map((book, index) => (
                <motion.tr
                  key={book.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  style={{ borderBottomColor: "rgba(201, 165, 66, 0.1)" }}
                  className="border-b hover:bg-[#C9A54210] transition"
                >
                  <td className="py-3 px-4 text-white">{book.title}</td>
                  <td className="py-3 px-4 text-center text-gray-300">{book.sales}</td>
                  <td className="py-3 px-4 text-center text-gray-300">{book.views}</td>
                  <td className="py-3 px-4 text-center text-[#C9A542]">{book.conversion}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: book.stock < 10 ? "rgba(255, 107, 107, 0.2)" : "rgba(201, 165, 66, 0.2)",
                        color: book.stock < 10 ? "#FF6B6B" : "#C9A542",
                      }}
                    >
                      {book.stock} {book.stock < 10 && <span className="ml-1">⚠️</span>}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Low Stock Alert */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="rounded-lg border p-4 flex gap-3"
        style={{
          backgroundColor: "rgba(255, 107, 107, 0.1)",
          borderColor: "rgba(255, 107, 107, 0.3)",
        }}
      >
        <AlertTriangle size={24} style={{ color: "#FF6B6B" }} className="flex-shrink-0" />
        <div>
          <p className="text-white font-semibold">Alerte stock faible</p>
          <p className="text-gray-300 text-sm">LES JUMEAUX NJOKO: Seulement 3 exemplaires en stock. Envisagez une réimpression.</p>
        </div>
      </motion.div>
    </div>
  )
}
