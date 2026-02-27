"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Hand, Edit3, Upload, Trash2, Sparkles, Save, CheckCircle, X, Copy } from "lucide-react"

type ToolMode = "navigate" | "edit" | "upload" | "delete" | "ai"

interface EditableElement {
  id: string
  type: "text" | "image"
  label: string
  currentValue: string | null
  originalValue: string | null
}

const editableElements: EditableElement[] = [
  { id: "hero-title", type: "text", label: "Titre Hero", currentValue: "ISOLELE – MYTHOLOGIE AFRICAINE RÉVEILLÉE", originalValue: "ISOLELE – MYTHOLOGIE AFRICAINE RÉVEILLÉE" },
  { id: "hero-desc", type: "text", label: "Description Hero", currentValue: "Un univers visionnaire où les super-héros sont choisis par le destin...", originalValue: "Un univers visionnaire où les super-héros sont choisis par le destin..." },
  { id: "hero-image", type: "image", label: "Image Hero", currentValue: "/images/hero-bg.jpg", originalValue: "/images/hero-bg.jpg" },
  { id: "cta-button", type: "text", label: "Bouton CTA", currentValue: "Découvrez l'univers", originalValue: "Découvrez l'univers" },
]

const aiSuggestions = [
  "héritage ancestral", "flamme éternelle", "destin scellé",
  "gardien des royaumes", "écho des ancêtres", "puissance mythologique",
  "renaissance africaine", "lumière kongo", "souffle des anciens",
]

const tools = [
  { id: "navigate" as ToolMode, icon: Hand,        label: "Navigation",   desc: "Naviguer comme visiteur" },
  { id: "edit"     as ToolMode, icon: Edit3,       label: "Édition",      desc: "Modifier le texte en direct" },
  { id: "upload"   as ToolMode, icon: Upload,      label: "Upload Média", desc: "Remplacer images/vidéos" },
  { id: "delete"   as ToolMode, icon: Trash2,      label: "Supprimer",    desc: "Supprimer un élément" },
  { id: "ai"       as ToolMode, icon: Sparkles,    label: "IA Locale",    desc: "Suggestions stylistiques" },
]

export default function RefactPage() {
  const [mode, setMode] = useState<ToolMode>("navigate")
  const [elements, setElements] = useState<EditableElement[]>(editableElements)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [saved, setSaved] = useState(false)
  const [showAi, setShowAi] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState("")

  const handleSelectElement = (elementId: string) => {
    const element = elements.find(e => e.id === elementId)
    if (element) {
      setSelectedElement(elementId)
      setEditValue(element.currentValue || "")
    }
  }

  const handleUpdateText = (elementId: string, newValue: string) => {
    setElements(prev => prev.map(e => 
      e.id === elementId ? { ...e, currentValue: newValue } : e
    ))
    setEditValue(newValue)
  }

  const handleDeleteElement = (elementId: string) => {
    setElements(prev => prev.map(e => 
      e.id === elementId ? { ...e, currentValue: null } : e
    ))
    setSelectedElement(null)
  }

  const handleUploadMedia = (elementId: string, file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setElements(prev => prev.map(el => 
        el.id === elementId ? { ...el, currentValue: dataUrl } : el
      ))
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    setElements(editableElements)
    setSelectedElement(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Refact - Éditeur Visuel</h1>
        <p className="text-gray-400 mt-1">Modifiez le contenu du site en temps réel</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl border" style={{ backgroundColor: "rgba(15,21,36,0.95)", borderColor: "rgba(201,165,66,0.3)" }}>
        {tools.map((tool) => {
          const Icon = tool.icon
          const active = mode === tool.id
          return (
            <motion.button
              key={tool.id}
              onClick={() => {
                setMode(tool.id)
                if (tool.id === "ai") setShowAi(true)
              }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              title={tool.desc}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                backgroundColor: active ? "#C9A542" : "rgba(201,165,66,0.08)",
                color: active ? "#0A0E1A" : "#9CA3AF",
              }}
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{tool.label}</span>
            </motion.button>
          )
        })}
        <div className="flex-1" />
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold"
          style={{ backgroundColor: saved ? "#4ade80" : "#C9A542", color: "#0A0E1A" }}
        >
          {saved ? <CheckCircle size={16} /> : <Save size={16} />}
          {saved ? "Sauvegardé !" : "Enregistrer"}
        </motion.button>
      </div>

      {/* Mode banner */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm"
        style={{ backgroundColor: "rgba(201,165,66,0.07)", borderColor: "rgba(201,165,66,0.2)", color: "#C9A542" }}>
        <span className="w-2 h-2 rounded-full bg-[#C9A542] animate-pulse" />
        Mode: <strong className="ml-1">{tools.find(t => t.id === mode)?.label}</strong>
        {mode === "edit" && <span className="text-gray-400 ml-2">→ Cliquez sur un élément pour modifier</span>}
        {mode === "upload" && <span className="text-gray-400 ml-2">→ Cliquez sur une image pour uploader</span>}
        {mode === "delete" && <span className="text-gray-400 ml-2">→ Cliquez sur un élément pour supprimer</span>}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preview */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(201,165,66,0.2)", minHeight: "500px" }}>
          <div className="bg-[#0F1524] p-8 h-full">
            <div className="space-y-6">
              {elements.map(element => {
                const isSelected = selectedElement === element.id
                const isHovered = mode !== "navigate"
                
                return (
                  <motion.div
                    key={element.id}
                    onClick={() => {
                      if (mode === "edit" || mode === "upload" || mode === "delete") {
                        handleSelectElement(element.id)
                      }
                    }}
                    className={`relative p-4 rounded-lg cursor-pointer transition-all ${
                      isSelected ? "ring-2 ring-[#C9A542]" : "hover:ring-1 hover:ring-[#C9A542]"
                    }`}
                    style={{ backgroundColor: isSelected ? "rgba(201,165,66,0.15)" : "rgba(201,165,66,0.05)" }}>
                    
                    {element.type === "text" && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">{element.label}</p>
                        {element.currentValue ? (
                          <p className="text-white font-semibold">{element.currentValue}</p>
                        ) : (
                          <p className="text-gray-500 italic">Supprimé</p>
                        )}
                      </div>
                    )}

                    {element.type === "image" && (
                      <div>
                        <p className="text-xs text-gray-500 mb-2">{element.label}</p>
                        {element.currentValue ? (
                          <div className="w-full h-32 rounded-lg overflow-hidden bg-gray-800">
                            <img src={element.currentValue} alt={element.label} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-full h-32 rounded-lg bg-gray-800 flex items-center justify-center text-gray-600">
                            Média supprimé
                          </div>
                        )}
                      </div>
                    )}

                    {isSelected && mode === "edit" && element.type === "text" && (
                      <div className="absolute -top-10 left-0 right-0 flex gap-2">
                        <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: "#C9A542", color: "#0A0E1A" }}>
                          Mode Edit
                        </span>
                      </div>
                    )}

                    {isSelected && mode === "upload" && element.type === "image" && (
                      <div className="absolute -top-10 left-0 right-0 flex gap-2">
                        <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: "#C9A542", color: "#0A0E1A" }}>
                          Upload Media
                        </span>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Edit Panel */}
        <div className="rounded-2xl border p-6" style={{ backgroundColor: "rgba(15,21,36,0.95)", borderColor: "rgba(201,165,66,0.2)" }}>
          <h3 className="font-bold text-white mb-4">Éditeur</h3>

          {selectedElement ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {(() => {
                const elem = elements.find(e => e.id === selectedElement)
                return (
                  <>
                    <div>
                      <p className="text-xs text-gray-400 mb-2">Élément: <strong style={{ color: "#C9A542" }}>{elem?.label}</strong></p>
                    </div>

                    {mode === "edit" && elem?.type === "text" && (
                      <>
                        <textarea
                          value={editValue}
                          onChange={(e) => handleUpdateText(selectedElement, e.target.value)}
                          className="w-full p-3 rounded-lg bg-[#0A0E1A] border text-white resize-none"
                          style={{ borderColor: "rgba(201,165,66,0.3)" }}
                          rows={4}
                          placeholder="Modifiez le texte..."
                        />
                        <p className="text-xs text-gray-500">Caractères: {editValue.length}</p>
                      </>
                    )}

                    {mode === "upload" && elem?.type === "image" && (
                      <div className="space-y-3">
                        <label className="block">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleUploadMedia(selectedElement, e.target.files[0])
                              }
                            }}
                            className="hidden"
                          />
                          <div className="p-4 border-2 border-dashed rounded-lg text-center cursor-pointer transition" style={{ borderColor: "rgba(201,165,66,0.3)" }}>
                            <Upload size={24} style={{ color: "#C9A542" }} className="mx-auto mb-2" />
                            <p className="text-sm text-gray-400">Cliquez pour uploader</p>
                          </div>
                        </label>
                      </div>
                    )}

                    {mode === "delete" && (
                      <motion.button
                        onClick={() => handleDeleteElement(selectedElement)}
                        whileHover={{ scale: 1.02 }}
                        className="w-full py-2 rounded-lg font-semibold text-white"
                        style={{ backgroundColor: "#DC2626" }}>
                        Supprimer cet élément
                      </motion.button>
                    )}
                  </>
                )
              })()}

              <motion.button
                onClick={() => setSelectedElement(null)}
                className="w-full py-2 rounded-lg text-sm"
                style={{ backgroundColor: "rgba(201,165,66,0.1)", color: "#C9A542" }}>
                Désélectionner
              </motion.button>
            </motion.div>
          ) : (
            <p className="text-gray-500 text-sm">Sélectionnez un élément pour le modifier</p>
          )}

          {/* Reset button */}
          <motion.button
            onClick={handleReset}
            className="w-full mt-6 py-2 rounded-lg text-sm"
            style={{ backgroundColor: "rgba(201,165,66,0.08)", color: "#C9A542" }}>
            Réinitialiser tout
          </motion.button>
        </div>
      </div>

      {/* AI Panel */}
      {showAi && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border p-6"
          style={{ backgroundColor: "rgba(201,165,66,0.05)", borderColor: "rgba(201,165,66,0.2)" }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles size={18} style={{ color: "#C9A542" }} />
              <h3 className="font-bold text-white">Suggestions IA Locale</h3>
              <span className="text-xs px-2 py-0.5 rounded-full ml-2" style={{ backgroundColor: "rgba(201,165,66,0.15)", color: "#C9A542" }}>
                Sans API
              </span>
            </div>
            <button onClick={() => setShowAi(false)} className="text-gray-500 hover:text-white transition">
              <X size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {aiSuggestions.map(s => (
              <motion.button key={s} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSuggestion(s)}
                className="px-3 py-2 rounded-lg text-sm font-medium border transition-all text-center"
                style={{
                  borderColor: selectedSuggestion === s ? "#C9A542" : "rgba(201,165,66,0.25)",
                  backgroundColor: selectedSuggestion === s ? "#C9A542" : "rgba(201,165,66,0.08)",
                  color: selectedSuggestion === s ? "#0A0E1A" : "#C9A542",
                }}>
                {s}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
