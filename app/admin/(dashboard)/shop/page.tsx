"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  Package,
  DollarSign,
  Tag,
  ShoppingCart,
  TrendingUp,
  Archive,
  Star,
} from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  status: "active" | "draft" | "archived"
  stock: number
  image_url: string | null
  is_featured: boolean
  created_at: string
}

const statusConfig = {
  active: { bg: "bg-green-500/20", text: "text-green-400", label: "Actif" },
  draft: { bg: "bg-gray-500/20", text: "text-gray-400", label: "Brouillon" },
  archived: { bg: "bg-orange-500/20", text: "text-orange-400", label: "Archive" },
}

export default function ShopManagementPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [stats, setStats] = useState({ total: 0, active: 0, revenue: 0, orders: 0 })

  const supabase = createClient()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setProducts(data)
      setStats({
        total: data.length,
        active: data.filter((p: Product) => p.status === "active").length,
        revenue: data.reduce((sum: number, p: Product) => sum + (p.price || 0), 0),
        orders: 0,
      })
    }
    setIsLoading(false)
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = !filterStatus || product.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id)
    if (!error) {
      setProducts(products.filter((p) => p.id !== id))
    }
    setActiveMenu(null)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
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
          <h1 className="text-2xl font-bold text-white">Boutique</h1>
          <p className="text-gray-400">Gerez vos produits et commandes</p>
        </div>
        <motion.button
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-[#0F1524] bg-[#C9A542]"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(201, 165, 66, 0.4)" }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          Nouveau produit
        </motion.button>
      </div>

      {/* Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: "Total produits", value: String(stats.total), icon: Package, color: "#C9A542" },
          { label: "Produits actifs", value: String(stats.active), icon: Star, color: "#4CAF50" },
          { label: "Commandes", value: String(stats.orders), icon: ShoppingCart, color: "#2196F3" },
          { label: "Revenus", value: `$${stats.revenue.toLocaleString()}`, icon: TrendingUp, color: "#FF9800" },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="p-4 rounded-xl"
            style={{
              backgroundColor: "#0a0f1a",
              border: "1px solid rgba(201, 165, 66, 0.2)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#0a0f1a] text-white rounded-lg border border-[#C9A542]/20 outline-none focus:border-[#C9A542] transition-colors"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
            showFilters
              ? "border-[#C9A542] text-[#C9A542] bg-[#C9A542]/10"
              : "border-[#C9A542]/20 text-gray-400 hover:text-white"
          }`}
        >
          <Filter className="w-5 h-5" />
          Filtres
        </button>
      </div>

      {/* Filter Tags */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2"
          >
            {Object.entries(statusConfig).map(([status, config]) => (
              <button
                key={status}
                onClick={() => setFilterStatus(filterStatus === status ? null : status)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  filterStatus === status
                    ? `${config.bg} ${config.text} ring-2 ring-current`
                    : "bg-[#0a0f1a] text-gray-400 hover:text-white"
                }`}
              >
                {config.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-[#0a0f1a] border border-[#C9A542]/20 animate-pulse"
            />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400 text-lg mb-2">Aucun produit trouve</p>
          <p className="text-gray-500 text-sm mb-6">Commencez par ajouter votre premier produit a la boutique</p>
          <motion.button
            className="px-6 py-3 rounded-lg font-medium text-[#0F1524] bg-[#C9A542]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Ajouter un produit
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group relative rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "#0a0f1a",
                border: "1px solid rgba(201, 165, 66, 0.2)",
              }}
            >
              {/* Product Image */}
              <div
                className="h-40 relative"
                style={{
                  background: `linear-gradient(135deg, #C9A54240 0%, #0a0f1a 100%)`,
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-6xl font-black opacity-20 text-[#C9A542]">
                  {product.name[0]}
                </span>
                {product.is_featured && (
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-[#C9A542] text-[#0F1524] text-xs font-bold">
                    Vedette
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[product.status].bg} ${statusConfig[product.status].text}`}>
                    {statusConfig[product.status].label}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-white truncate">{product.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-[#C9A542]" />
                    <span className="text-lg font-bold text-[#C9A542]">{product.price}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Archive className="w-4 h-4" />
                    <span>{product.stock} en stock</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#C9A542]/10">
                  <button className="flex-1 py-2 rounded-lg text-sm font-medium text-white bg-white/5 hover:bg-white/10 transition-colors">
                    <Edit className="w-4 h-4 inline mr-1" />
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="py-2 px-3 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
