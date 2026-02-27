"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Edit3, Upload, Save, CheckCircle, Eye, RotateCcw, Trash2, Plus } from "lucide-react"

interface PageContent {
  heroTitle: string
  heroDesc: string
  heroImage: string
  productCarouselTitle: string
  universeSectionTitle: string
  storySectionTitle: string
  charactersSectionTitle: string
  productSectionTitle: string
}

const DEFAULT_CONTENT: PageContent = {
  heroTitle: "ISOLELE – MYTHOLOGIE AFRICAINE RÉVEILLÉE",
  heroDesc: "Un univers visionnaire où les super-héros sont choisis par le destin, où les royaumes kongo sont vivants, et où chaque histoire porte l'âme d'un continent.",
  heroImage: "/images/hero-bg.jpg",
  productCarouselTitle: "Nos Livres & Produits",
  universeSectionTitle: "L'Univers Isolele",
  storySectionTitle: "L'Histoire Commence",
  charactersSectionTitle: "Nos Héros",
  productSectionTitle: "La Boutique",
}

export default function RefactPage() {
  const [content, setContent] = useState<PageContent>(DEFAULT_CONTENT)
  const [mode, setMode] = useState<"view" | "edit">("view")
  const [editingField, setEditingField] = useState<keyof PageContent | null>(null)
  const [editValue, setEditValue] = useState("")
  const [saved, setSaved] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleEditStart = useCallback((field: keyof PageContent) => {
    setEditingField(field)
    setEditValue(String(content[field]))
    setMode("edit")
  }, [content])

  const handleEditChange = (field: keyof PageContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }))
    setEditValue(value)
  }

  const handleImageUpload = (field: keyof PageContent, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        setContent(prev => ({ ...prev, [field]: dataUrl }))
        setUploadedImage(dataUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    setContent(DEFAULT_CONTENT)
    setEditingField(null)
    setMode("view")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Refact - Éditeur de Page Publique</h1>
        <p className="text-gray-400 mt-1">Modifiez le contenu de la page d'accueil en temps réel</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl border" style={{ backgroundColor: "rgba(15,21,36,0.95)", borderColor: "rgba(201,165,66,0.3)" }}>
        <motion.button
          onClick={() => setMode(mode === "view" ? "edit" : "view")}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{
            backgroundColor: mode === "view" ? "#C9A542" : "rgba(201,165,66,0.08)",
            color: mode === "view" ? "#0A0E1A" : "#9CA3AF",
          }}>
          <Eye size={16} />
          <span className="hidden sm:inline">Aperçu</span>
        </motion.button>
        
        <motion.button
          onClick={() => setMode("edit")}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{
            backgroundColor: mode === "edit" ? "#C9A542" : "rgba(201,165,66,0.08)",
            color: mode === "edit" ? "#0A0E1A" : "#9CA3AF",
          }}>
          <Edit3 size={16} />
          <span className="hidden sm:inline">Éditer</span>
        </motion.button>

        <div className="flex-1" />

        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold"
          style={{ backgroundColor: saved ? "#4ade80" : "#C9A542", color: "#0A0E1A" }}>
          {saved ? <CheckCircle size={16} /> : <Save size={16} />}
          {saved ? "Sauvegardé!" : "Enregistrer"}
        </motion.button>

        <motion.button
          onClick={handleReset}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border"
          style={{ borderColor: "rgba(201,165,66,0.3)", color: "#C9A542" }}>
          <RotateCcw size={16} />
          <span className="hidden sm:inline">Réinitialiser</span>
        </motion.button>
      </div>

      {/* View Mode - Display Public Page */}
      {mode === "view" && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(201,165,66,0.2)", minHeight: "600px" }}>
          <div className="bg-[#0F1524] p-8">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Hero Section Preview */}
              <motion.div
                onClick={() => handleEditStart("heroTitle")}
                className="group cursor-pointer rounded-lg p-6 transition-all"
                style={{ backgroundColor: "rgba(201,165,66,0.05)" }}>
                <div className="relative">
                  {/* Hero Image */}
                  <div className="mb-6 rounded-lg overflow-hidden h-64 bg-gray-800">
                    <img src={content.heroImage} alt="Hero" className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Hero Title */}
                  <h1 className="text-4xl font-bold text-white mb-4 group-hover:text-[#C9A542] transition">
                    {content.heroTitle}
                  </h1>
                  
                  {/* Hero Description */}
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    {content.heroDesc}
                  </p>

                  <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition">
                    Cliquez pour éditer
                  </div>
                </div>
              </motion.div>

              {/* Section Previews */}
              {[
                { key: "productCarouselTitle" as const, label: "Nos Livres & Produits" },
                { key: "universeSectionTitle" as const, label: "L'Univers" },
                { key: "storySectionTitle" as const, label: "L'Histoire" },
                { key: "charactersSectionTitle" as const, label: "Les Héros" },
                { key: "productSectionTitle" as const, label: "La Boutique" },
              ].map(section => (
                <motion.div
                  key={section.key}
                  onClick={() => handleEditStart(section.key)}
                  className="group cursor-pointer rounded-lg p-6 transition-all"
                  style={{ backgroundColor: "rgba(201,165,66,0.05)" }}>
                  <h2 className="text-2xl font-bold text-white group-hover:text-[#C9A542] transition mb-2">
                    {content[section.key]}
                  </h2>
                  <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition">
                    Cliquez pour éditer
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Edit Mode - Content Panels */}
      {mode === "edit" && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Text Fields */}
          <div className="rounded-2xl border p-6 space-y-4" style={{ backgroundColor: "rgba(15,21,36,0.95)", borderColor: "rgba(201,165,66,0.2)" }}>
            <h3 className="font-bold text-white mb-4">Texte Principal</h3>
            
            {[
              { key: "heroTitle" as const, label: "Titre du Hero" },
              { key: "heroDesc" as const, label: "Description" },
              { key: "productCarouselTitle" as const, label: "Titre Livres" },
              { key: "universeSectionTitle" as const, label: "Titre Univers" },
              { key: "storySectionTitle" as const, label: "Titre Histoire" },
              { key: "charactersSectionTitle" as const, label: "Titre Héros" },
              { key: "productSectionTitle" as const, label: "Titre Boutique" },
            ].map(field => (
              <motion.div key={field.key} className="space-y-2">
                <label className="text-xs text-gray-400 block">{field.label}</label>
                <textarea
                  value={content[field.key]}
                  onChange={(e) => handleEditChange(field.key, e.target.value)}
                  onClick={() => setEditingField(field.key)}
                  className="w-full p-3 rounded-lg bg-[#0A0E1A] border text-white text-sm resize-none"
                  style={{
                    borderColor: editingField === field.key ? "#C9A542" : "rgba(201,165,66,0.3)",
                    boxShadow: editingField === field.key ? "0 0 10px rgba(201,165,66,0.2)" : "none",
                  }}
                  rows={field.key === "heroDesc" ? 4 : 2}
                  placeholder={`Modifiez ${field.label.toLowerCase()}...`}
                />
                <p className="text-xs text-gray-500">{content[field.key].length} caractères</p>
              </motion.div>
            ))}
          </div>

          {/* Media Upload */}
          <div className="rounded-2xl border p-6 space-y-4" style={{ backgroundColor: "rgba(15,21,36,0.95)", borderColor: "rgba(201,165,66,0.2)" }}>
            <h3 className="font-bold text-white mb-4">Médias</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-gray-400 block">Image Hero</label>
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload("heroImage", e)}
                    className="hidden"
                  />
                  <div
                    className="p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition hover:border-[#C9A542]"
                    style={{ borderColor: "rgba(201,165,66,0.3)" }}>
                    <Upload size={24} style={{ color: "#C9A542" }} className="mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Cliquez pour uploader</p>
                    <p className="text-xs text-gray-600 mt-1">PNG, JPG, GIF jusqu'à 10MB</p>
                  </div>
                </label>
                {uploadedImage && (
                  <div className="rounded-lg overflow-hidden h-48 bg-gray-800">
                    <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-6 border-t" style={{ borderColor: "rgba(201,165,66,0.2)" }}>
              <p className="text-xs text-gray-400 mb-3">Actions rapides</p>
              <div className="grid grid-cols-2 gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition"
                  style={{ backgroundColor: "rgba(201,165,66,0.1)", color: "#C9A542" }}>
                  <Plus size={14} className="inline mr-1" />
                  Ajouter Section
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="px-3 py-2 rounded-lg text-sm font-medium transition text-red-400"
                  style={{ backgroundColor: "rgba(220,38,38,0.1)" }}>
                  <Trash2 size={14} className="inline mr-1" />
                  Supprimer
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Status Bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm" style={{ backgroundColor: "rgba(201,165,66,0.07)", borderColor: "rgba(201,165,66,0.2)", color: "#C9A542" }}>
        <span className="w-2 h-2 rounded-full bg-[#C9A542] animate-pulse" />
        {editingField ? (
          <>
            En édition: <strong className="ml-1">{editingField}</strong>
            <span className="text-gray-400 ml-2">→ Les modifications sont en temps réel</span>
          </>
        ) : (
          <>
            Mode: <strong className="ml-1">{mode === "view" ? "Aperçu" : "Édition"}</strong>
          </>
        )}
      </motion.div>
    </div>
  )
}
