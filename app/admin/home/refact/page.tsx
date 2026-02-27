"use client"

import { motion } from "framer-motion"
import { Hand, Pencil, Upload, Trash2, Wand2, Save } from "lucide-react"
import { useState } from "react"

export default function RefactPage() {
  const [mode, setMode] = useState<"navigate" | "edit" | "upload" | "delete" | "ai">("navigate")

  const tools = [
    { id: "navigate", label: "Navigation", icon: Hand, description: "Mode navigation classique" },
    { id: "edit", label: "Édition", icon: Pencil, description: "Modifier le texte" },
    { id: "upload", label: "Média", icon: Upload, description: "Remplacer les images" },
    { id: "delete", label: "Supprimer", icon: Trash2, description: "Supprimer l'élément" },
    { id: "ai", label: "AI", icon: Wand2, description: "Suggestions IA" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Éditeur Visuel - Refact</h1>
        <p className="text-gray-400">Modifiez le site public en direct avec l'interface visuelle</p>
      </div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border p-6"
        style={{
          backgroundColor: "rgba(201, 165, 66, 0.05)",
          borderColor: "rgba(201, 165, 66, 0.2)",
        }}
      >
        <h2 className="text-lg font-bold text-white mb-4">Barre d'outils d'édition</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <button
                key={tool.id}
                onClick={() => setMode(tool.id as any)}
                className={`p-4 rounded-lg border-2 transition flex flex-col items-center gap-2 ${
                  mode === tool.id
                    ? "border-[#C9A542] bg-[#C9A54220]"
                    : "border-[#C9A54230] hover:border-[#C9A542]"
                }`}
              >
                <Icon size={24} style={{ color: mode === tool.id ? "#C9A542" : "#999" }} />
                <span className="text-xs font-medium text-gray-300">{tool.label}</span>
              </button>
            )
          })}
        </div>

        {/* Save Button */}
        <button className="w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition"
          style={{ backgroundColor: "#C9A542", color: "#0F1524" }}
        >
          <Save size={20} />
          Enregistrer et mettre à jour
        </button>
      </motion.div>

      {/* Preview Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-lg border p-6"
        style={{
          backgroundColor: "rgba(201, 165, 66, 0.05)",
          borderColor: "rgba(201, 165, 66, 0.2)",
          minHeight: "600px",
        }}
      >
        <div className="text-center py-20">
          <p className="text-gray-400 mb-4">Mode: <span className="text-[#C9A542] font-bold">{mode === "navigate" ? "Navigation" : mode === "edit" ? "Édition" : mode === "upload" ? "Upload Média" : mode === "delete" ? "Suppression" : "Suggestions IA"}</span></p>
          <p className="text-gray-500 text-sm">L'aperçu du site public s'affichera ici</p>
          <div className="mt-8 text-gray-600">
            <p className="text-lg mb-2">📱 Responsive Preview</p>
            <p className="text-sm">Sélectionnez un mode d'édition ci-dessus pour commencer</p>
          </div>
        </div>
      </motion.div>

      {/* Mode Instructions */}
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
        <h3 className="text-lg font-bold text-white mb-4">Instructions du mode {mode}</h3>
        <div className="text-gray-300 space-y-2">
          {mode === "navigate" && (
            <>
              <p>✓ Naviguez dans le site comme un visiteur classique</p>
              <p>✓ Cliquez sur les liens pour parcourir les différentes sections</p>
              <p>✓ Utilisez le scroll pour explorer le contenu</p>
            </>
          )}
          {mode === "edit" && (
            <>
              <p>✓ Survolez le texte pour voir la bordure pointillée dorée</p>
              <p>✓ Cliquez pour ouvrir l'éditeur de texte inline</p>
              <p>✓ Validez vos modifications avec le bouton ✓</p>
            </>
          )}
          {mode === "upload" && (
            <>
              <p>✓ Survolez les images pour voir le bouton de remplacement</p>
              <p>✓ Cliquez pour sélectionner une nouvelle image</p>
              <p>✓ L'aperçu se met à jour immédiatement</p>
            </>
          )}
          {mode === "delete" && (
            <>
              <p>✓ Cliquez sur l'élément à supprimer</p>
              <p>✓ Confirmez la suppression</p>
              <p>✓ L'élément est immédiatement retiré du site</p>
            </>
          )}
          {mode === "ai" && (
            <>
              <p>✓ Sélectionnez un texte</p>
              <p>✓ L'IA propose des suggestions stylistiques</p>
              <p>✓ Choisissez une suggestion ou écrivez votre propre version</p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
