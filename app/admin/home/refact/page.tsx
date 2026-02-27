"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Hand, Edit3, UploadCloud, Trash2, Sparkles, Save, CheckCircle } from "lucide-react"

type ToolMode = "navigate" | "edit" | "upload" | "delete" | "ai"

const tools = [
  { id: "navigate" as ToolMode, icon: Hand,        label: "Navigation",   desc: "Naviguer comme visiteur" },
  { id: "edit"     as ToolMode, icon: Edit3,       label: "Édition",      desc: "Modifier le texte en direct" },
  { id: "upload"   as ToolMode, icon: UploadCloud, label: "Upload Média", desc: "Remplacer images/vidéos" },
  { id: "delete"   as ToolMode, icon: Trash2,      label: "Supprimer",    desc: "Supprimer un élément" },
  { id: "ai"       as ToolMode, icon: Sparkles,    label: "IA Locale",    desc: "Suggestions stylistiques" },
]

const aiSuggestions = [
  "héritage ancestral", "flamme éternelle", "destin scellé",
  "gardien des royaumes", "écho des ancêtres", "puissance mythologique",
  "renaissance africaine", "lumière kongo", "souffle des anciens",
]

export default function RefactPage() {
  const [mode, setMode] = useState<ToolMode>("navigate")
  const [saved, setSaved] = useState(false)
  const [showAi, setShowAi] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState("")

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Refact</h1>
        <p className="text-gray-400 mt-1">Éditeur visuel en direct du site public</p>
      </div>

      {/* Toolbar */}
      <div
        className="flex flex-wrap items-center gap-2 p-3 rounded-2xl border"
        style={{ backgroundColor: "rgba(15,21,36,0.95)", borderColor: "rgba(201,165,66,0.3)" }}
      >
        {tools.map((tool) => {
          const Icon = tool.icon
          const active = mode === tool.id
          return (
            <motion.button
              key={tool.id}
              onClick={() => { setMode(tool.id); if (tool.id === "ai") setShowAi(true) }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              title={tool.desc}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                backgroundColor: active ? "#C9A542" : "rgba(201,165,66,0.08)",
                color: active ? "#0A0E1A" : "#9CA3AF",
                border: `1px solid ${active ? "#C9A542" : "rgba(201,165,66,0.15)"}`,
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
          {saved ? "Sauvegardé !" : "Save & Update"}
        </motion.button>
      </div>

      {/* Mode banner */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm"
        style={{ backgroundColor: "rgba(201,165,66,0.07)", borderColor: "rgba(201,165,66,0.2)", color: "#C9A542" }}>
        <span className="w-2 h-2 rounded-full bg-[#C9A542] animate-pulse" />
        Mode actif: <strong className="ml-1">{tools.find(t => t.id === mode)?.label}</strong>
        <span className="text-gray-400 ml-2 hidden sm:inline">— {tools.find(t => t.id === mode)?.desc}</span>
      </div>

      {/* iframe preview */}
      <div className="relative rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(201,165,66,0.2)", height: "600px" }}>
        {mode !== "navigate" && (
          <div className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: "rgba(10,14,26,0.06)", border: "2px dashed rgba(201,165,66,0.5)" }} />
        )}
        <iframe src="/" className="w-full h-full"
          style={{ pointerEvents: mode === "navigate" ? "auto" : "none" }}
          title="Aperçu du site public" />
        {mode === "edit" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full text-sm font-semibold shadow-lg"
            style={{ backgroundColor: "#C9A542", color: "#0A0E1A" }}>
            Cliquez sur un texte pour le modifier
          </motion.div>
        )}
        {mode === "upload" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full text-sm font-semibold shadow-lg"
            style={{ backgroundColor: "#C9A542", color: "#0A0E1A" }}>
            Survolez une image pour la remplacer
          </motion.div>
        )}
        {mode === "delete" && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full text-sm font-semibold shadow-lg"
            style={{ backgroundColor: "rgba(220,38,38,0.9)", color: "#fff" }}>
            Survolez un élément pour le supprimer
          </motion.div>
        )}
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
              <span className="text-xs px-2 py-0.5 rounded-full ml-2"
                style={{ backgroundColor: "rgba(201,165,66,0.15)", color: "#C9A542" }}>
                Sans API externe
              </span>
            </div>
            <button onClick={() => setShowAi(false)} className="text-gray-500 hover:text-white transition">✕</button>
          </div>
          <p className="text-gray-400 text-sm mb-4">Sélectionnez une suggestion stylistique à insérer :</p>
          <div className="flex flex-wrap gap-2">
            {aiSuggestions.map(s => (
              <motion.button key={s} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSuggestion(s)}
                className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                style={{
                  borderColor: selectedSuggestion === s ? "#C9A542" : "rgba(201,165,66,0.25)",
                  backgroundColor: selectedSuggestion === s ? "#C9A542" : "rgba(201,165,66,0.08)",
                  color: selectedSuggestion === s ? "#0A0E1A" : "#C9A542",
                }}>
                {s}
              </motion.button>
            ))}
          </div>
          {selectedSuggestion && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mt-4 p-3 rounded-lg text-sm"
              style={{ backgroundColor: "rgba(201,165,66,0.12)", color: "#C9A542" }}>
              Sélectionné: <strong>"{selectedSuggestion}"</strong> — sera appliqué au prochain Save & Update.
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  )
}
