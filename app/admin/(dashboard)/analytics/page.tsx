"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Eye,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  ArrowUpRight,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
} from "lucide-react"

interface StatCard {
  label: string
  value: string
  change: number
  icon: typeof Eye
  color: string
}

interface PageView {
  page: string
  views: number
  percentage: number
}

interface TrafficSource {
  source: string
  sessions: number
  percentage: number
  color: string
}

const stats: StatCard[] = [
  { label: "Visiteurs uniques", value: "12,543", change: 12.5, icon: Users, color: "#C9A542" },
  { label: "Pages vues", value: "45,891", change: 8.3, icon: Eye, color: "#4CAF50" },
  { label: "Duree moyenne", value: "3m 24s", change: -2.1, icon: Clock, color: "#2196F3" },
  { label: "Taux de rebond", value: "38.2%", change: -5.4, icon: Activity, color: "#FF9800" },
]

const topPages: PageView[] = [
  { page: "/", views: 15420, percentage: 34 },
  { page: "/shop", views: 8930, percentage: 19 },
  { page: "/characters", views: 6780, percentage: 15 },
  { page: "/news", views: 5430, percentage: 12 },
  { page: "/about", views: 4210, percentage: 9 },
  { page: "/founder", views: 2890, percentage: 6 },
  { page: "/supporters", views: 1340, percentage: 3 },
  { page: "/faq", views: 891, percentage: 2 },
]

const trafficSources: TrafficSource[] = [
  { source: "Recherche organique", sessions: 5420, percentage: 43, color: "#C9A542" },
  { source: "Reseaux sociaux", sessions: 3210, percentage: 26, color: "#E91E63" },
  { source: "Acces directs", sessions: 2340, percentage: 19, color: "#4CAF50" },
  { source: "Referral", sessions: 890, percentage: 7, color: "#2196F3" },
  { source: "Email", sessions: 683, percentage: 5, color: "#FF9800" },
]

const weeklyData = [
  { day: "Lun", value: 65 },
  { day: "Mar", value: 40 },
  { day: "Mer", value: 80 },
  { day: "Jeu", value: 55 },
  { day: "Ven", value: 90 },
  { day: "Sam", value: 70 },
  { day: "Dim", value: 85 },
]

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("7d")

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
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400">Suivez les performances de votre site</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          {["24h", "7d", "30d", "90d"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                period === p
                  ? "bg-[#C9A542]/20 text-[#C9A542] border border-[#C9A542]"
                  : "text-gray-400 hover:text-white border border-transparent"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="p-5 rounded-xl group hover:border-[#C9A542]/40 transition-all"
            style={{
              backgroundColor: "#0a0f1a",
              border: "1px solid rgba(201, 165, 66, 0.2)",
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="p-2.5 rounded-xl"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  stat.change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {stat.change >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{Math.abs(stat.change)}%</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Chart */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 p-6 rounded-xl"
          style={{
            backgroundColor: "#0a0f1a",
            border: "1px solid rgba(201, 165, 66, 0.2)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#C9A542]" />
              <h2 className="text-lg font-bold text-white">Trafic</h2>
            </div>
          </div>

          {/* Simple bar chart */}
          <div className="h-64 flex items-end gap-3">
            {weeklyData.map((d, i) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  className="w-full rounded-t-lg relative group"
                  style={{ backgroundColor: "#C9A542" }}
                  initial={{ height: 0 }}
                  animate={{ height: `${d.value}%` }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block px-2 py-1 rounded bg-white/10 text-xs text-white whitespace-nowrap">
                    {Math.round(d.value * 150)} visites
                  </div>
                </motion.div>
                <span className="text-xs text-gray-400">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Traffic Sources */}
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
            <PieChart className="w-5 h-5 text-[#C9A542]" />
            <h2 className="text-lg font-bold text-white">Sources de trafic</h2>
          </div>

          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <motion.div
                key={source.source}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-white">{source.source}</span>
                  <span className="text-sm text-gray-400">{source.percentage}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: source.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${source.percentage}%` }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
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
            <Globe className="w-5 h-5 text-[#C9A542]" />
            <h2 className="text-lg font-bold text-white">Pages les plus vues</h2>
          </div>

          <div className="space-y-3">
            {topPages.map((page, index) => (
              <motion.div
                key={page.page}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span className="text-sm text-gray-500 w-6 text-right">{index + 1}</span>
                <div className="flex-1">
                  <p className="text-sm text-white font-mono">{page.page}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">{page.views.toLocaleString()}</span>
                  <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C9A542] rounded-full"
                      style={{ width: `${page.percentage}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Device Breakdown */}
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
            <Monitor className="w-5 h-5 text-[#C9A542]" />
            <h2 className="text-lg font-bold text-white">Appareils</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Monitor, label: "Desktop", value: "48%", count: "6,021", color: "#C9A542" },
              { icon: Smartphone, label: "Mobile", value: "42%", count: "5,268", color: "#4CAF50" },
              { icon: Tablet, label: "Tablette", value: "10%", count: "1,254", color: "#2196F3" },
            ].map((device, index) => (
              <motion.div
                key={device.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div
                  className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${device.color}20` }}
                >
                  <device.icon className="w-6 h-6" style={{ color: device.color }} />
                </div>
                <p className="text-xl font-bold text-white">{device.value}</p>
                <p className="text-sm text-gray-400">{device.label}</p>
                <p className="text-xs text-gray-500 mt-1">{device.count} sessions</p>
              </motion.div>
            ))}
          </div>

          {/* Real-time indicator */}
          <div className="mt-6 pt-4 border-t border-[#C9A542]/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2.5 h-2.5 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="text-sm text-gray-400">Utilisateurs actifs maintenant</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold text-white">24</span>
                <ArrowUpRight className="w-4 h-4 text-green-400" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
