"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload,
  Search,
  Grid,
  List,
  ImageIcon,
  Film,
  Music,
  FileText,
  Trash2,
  Download,
  Copy,
  Eye,
  FolderPlus,
  HardDrive,
  X,
} from "lucide-react"

interface MediaItem {
  id: string
  name: string
  type: "image" | "video" | "audio" | "document"
  size: string
  url: string
  created_at: string
  dimensions?: string
}

const typeConfig = {
  image: { icon: ImageIcon, color: "#4CAF50", label: "Image" },
  video: { icon: Film, color: "#2196F3", label: "Video" },
  audio: { icon: Music, color: "#FF9800", label: "Audio" },
  document: { icon: FileText, color: "#9C27B0", label: "Document" },
}

export default function MediaManagementPage() {
  const [mediaItems] = useState<MediaItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterType, setFilterType] = useState<string | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)

  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = !filterType || item.type === filterType
    return matchesSearch && matchesFilter
  })

  const totalSize = "0 MB"

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // File upload logic would go here
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Mediatheque</h1>
          <p className="text-gray-400">Gerez vos images, videos et fichiers</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-[#0F1524] bg-[#C9A542]"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(201, 165, 66, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Upload className="w-5 h-5" />
            Telecharger
          </motion.button>
          <motion.button
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white border border-[#C9A542]/20 hover:bg-white/5"
            whileTap={{ scale: 0.95 }}
          >
            <FolderPlus className="w-5 h-5" />
            Nouveau dossier
          </motion.button>
        </div>
      </div>

      {/* Storage Stats */}
      <div
        className="p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        style={{
          backgroundColor: "#0a0f1a",
          border: "1px solid rgba(201, 165, 66, 0.2)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#C9A542]/20">
            <HardDrive className="w-5 h-5 text-[#C9A542]" />
          </div>
          <div>
            <p className="text-white font-medium">Stockage utilise</p>
            <p className="text-sm text-gray-400">{totalSize} sur 5 GB</p>
          </div>
        </div>
        <div className="w-full sm:w-64">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C9A542] rounded-full"
              style={{ width: "0%" }}
            />
          </div>
        </div>
        <div className="flex gap-4 text-sm">
          {Object.entries(typeConfig).map(([type, config]) => (
            <div key={type} className="flex items-center gap-1.5">
              <config.icon className="w-4 h-4" style={{ color: config.color }} />
              <span className="text-gray-400">0</span>
            </div>
          ))}
        </div>
      </div>

      {/* Search and View Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un fichier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#0a0f1a] text-white rounded-lg border border-[#C9A542]/20 outline-none focus:border-[#C9A542] transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex flex-wrap gap-2">
            {Object.entries(typeConfig).map(([type, config]) => (
              <button
                key={type}
                onClick={() => setFilterType(filterType === type ? null : type)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                  filterType === type
                    ? "bg-[#C9A542]/20 text-[#C9A542] border border-[#C9A542]"
                    : "border border-[#C9A542]/20 text-gray-400 hover:text-white"
                }`}
              >
                <config.icon className="w-4 h-4" />
                {config.label}
              </button>
            ))}
          </div>
          <div className="flex rounded-lg overflow-hidden border border-[#C9A542]/20">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 transition-colors ${
                viewMode === "grid" ? "bg-[#C9A542]/20 text-[#C9A542]" : "text-gray-400 hover:text-white"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-3 transition-colors ${
                viewMode === "list" ? "bg-[#C9A542]/20 text-[#C9A542]" : "text-gray-400 hover:text-white"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Drop Zone / Empty State */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`rounded-2xl border-2 border-dashed transition-all ${
          isDragging
            ? "border-[#C9A542] bg-[#C9A542]/10"
            : "border-[#C9A542]/20 hover:border-[#C9A542]/40"
        }`}
      >
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center">
            <motion.div
              animate={isDragging ? { scale: 1.1, y: -10 } : { scale: 1, y: 0 }}
            >
              <Upload className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            </motion.div>
            <p className="text-gray-400 text-lg mb-2">
              {isDragging ? "Deposez vos fichiers ici" : "Aucun media dans la bibliotheque"}
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Glissez-deposez vos fichiers ou cliquez pour telecharger
            </p>
            <motion.button
              onClick={() => setShowUploadModal(true)}
              className="px-6 py-3 rounded-lg font-medium text-[#0F1524] bg-[#C9A542]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Upload className="w-5 h-5 inline mr-2" />
              Telecharger des fichiers
            </motion.button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
            {filteredItems.map((item, index) => {
              const config = typeConfig[item.type]
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => setSelectedItem(item)}
                  className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: "#0a0f1a",
                    border: "1px solid rgba(201, 165, 66, 0.2)",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <config.icon className="w-10 h-10 opacity-30" style={{ color: config.color }} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-sm text-white truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.size}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="divide-y divide-[#C9A542]/10">
            {filteredItems.map((item, index) => {
              const config = typeConfig[item.type]
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => setSelectedItem(item)}
                  className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${config.color}20` }}
                  >
                    <config.icon className="w-5 h-5" style={{ color: config.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.size} {item.dimensions && `- ${item.dimensions}`}</p>
                  </div>
                  <p className="text-sm text-gray-400 hidden sm:block">
                    {new Date(item.created_at).toLocaleDateString("fr-FR")}
                  </p>
                  <div className="flex gap-1">
                    <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setShowUploadModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50 rounded-2xl p-6"
              style={{
                backgroundColor: "#0a0f1a",
                border: "1px solid rgba(201, 165, 66, 0.3)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Telecharger des fichiers</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div
                className="border-2 border-dashed border-[#C9A542]/30 rounded-xl p-12 text-center hover:border-[#C9A542] transition-colors cursor-pointer"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                <p className="text-white font-medium mb-1">Glissez vos fichiers ici</p>
                <p className="text-sm text-gray-400 mb-4">ou cliquez pour parcourir</p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF, SVG, MP4, MP3, PDF (max 50MB)
                </p>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors mr-2"
                >
                  Annuler
                </button>
                <motion.button
                  className="px-6 py-2 rounded-lg font-medium text-[#0F1524] bg-[#C9A542]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Telecharger
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Media Detail Panel */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="fixed right-0 top-0 h-full w-96 z-50 p-6 overflow-y-auto"
              style={{
                backgroundColor: "#0a0f1a",
                borderLeft: "1px solid rgba(201, 165, 66, 0.2)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Details</h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div
                  className="aspect-square rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${typeConfig[selectedItem.type].color}20` }}
                >
                  {(() => {
                    const Icon = typeConfig[selectedItem.type].icon
                    return <Icon className="w-16 h-16 opacity-40" style={{ color: typeConfig[selectedItem.type].color }} />
                  })()}
                </div>

                <div>
                  <p className="text-sm text-gray-400">Nom du fichier</p>
                  <p className="text-white">{selectedItem.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Type</p>
                  <p className="text-white">{typeConfig[selectedItem.type].label}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Taille</p>
                  <p className="text-white">{selectedItem.size}</p>
                </div>
                {selectedItem.dimensions && (
                  <div>
                    <p className="text-sm text-gray-400">Dimensions</p>
                    <p className="text-white">{selectedItem.dimensions}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-400">Date de creation</p>
                  <p className="text-white">
                    {new Date(selectedItem.created_at).toLocaleDateString("fr-FR")}
                  </p>
                </div>

                <div className="pt-4 space-y-2">
                  <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-white bg-white/5 hover:bg-white/10 transition-colors">
                    <Copy className="w-4 h-4" />
                    Copier le lien
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-white bg-white/5 hover:bg-white/10 transition-colors">
                    <Download className="w-4 h-4" />
                    Telecharger
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-white bg-white/5 hover:bg-white/10 transition-colors">
                    <Eye className="w-4 h-4" />
                    Apercu
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
