"use client"

import { motion } from "framer-motion"
import { Save, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  const tabs = [
    { id: "general", label: "Général" },
    { id: "seo", label: "SEO Global" },
    { id: "appearance", label: "Apparence" },
    { id: "users", label: "Utilisateurs" },
    { id: "integrations", label: "Intégrations" },
    { id: "maintenance", label: "Maintenance" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Configuration Globale</h1>
        <p className="text-gray-400">Paramètres de site et de l'administration</p>
      </div>

      {/* Tabs Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2 overflow-x-auto pb-2"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
              activeTab === tab.id
                ? "bg-[#C9A542] text-[#0F1524] font-semibold"
                : "border border-[#C9A54240] text-gray-400 hover:text-[#C9A542]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* General Settings */}
      {activeTab === "general" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border p-6 space-y-6"
          style={{
            backgroundColor: "rgba(201, 165, 66, 0.05)",
            borderColor: "rgba(201, 165, 66, 0.2)",
          }}
        >
          <div>
            <label className="text-white font-semibold mb-2 block">Nom du site</label>
            <input
              type="text"
              defaultValue="ISOLELE - Mythologie Africaine Réveillée"
              className="w-full bg-transparent border rounded-lg px-4 py-2 text-white"
              style={{ borderColor: "rgba(201, 165, 66, 0.3)" }}
            />
          </div>
          <div>
            <label className="text-white font-semibold mb-2 block">Slogan</label>
            <input
              type="text"
              defaultValue="Un univers visionnaire où les super-héros sont choisis par le destin"
              className="w-full bg-transparent border rounded-lg px-4 py-2 text-white"
              style={{ borderColor: "rgba(201, 165, 66, 0.3)" }}
            />
          </div>
          <div>
            <label className="text-white font-semibold mb-2 block">Langues activées</label>
            <div className="space-y-2">
              {["Français", "English", "Español"].map((lang) => (
                <label key={lang} className="flex items-center gap-3 text-gray-300 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  {lang}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-white font-semibold mb-2 block">Coordonnées de contact</label>
            <input
              type="email"
              placeholder="Email de contact"
              className="w-full bg-transparent border rounded-lg px-4 py-2 text-white mb-3"
              style={{ borderColor: "rgba(201, 165, 66, 0.3)" }}
            />
            <input
              type="tel"
              placeholder="Téléphone"
              className="w-full bg-transparent border rounded-lg px-4 py-2 text-white"
              style={{ borderColor: "rgba(201, 165, 66, 0.3)" }}
            />
          </div>
        </motion.div>
      )}

      {/* SEO Settings */}
      {activeTab === "seo" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border p-6 space-y-6"
          style={{
            backgroundColor: "rgba(201, 165, 66, 0.05)",
            borderColor: "rgba(201, 165, 66, 0.2)",
          }}
        >
          <div>
            <label className="text-white font-semibold mb-2 block">Titre SEO par défaut</label>
            <input
              type="text"
              defaultValue="ISOLELE - Mythologie Africaine Réveillée | Comics & Produits"
              className="w-full bg-transparent border rounded-lg px-4 py-2 text-white"
              style={{ borderColor: "rgba(201, 165, 66, 0.3)" }}
            />
          </div>
          <div>
            <label className="text-white font-semibold mb-2 block">Méta-description par défaut</label>
            <textarea
              defaultValue="Découvrez ISOLELE: un univers visionnaire de comics africains, de personnages mythologiques et de produits exclusifs."
              className="w-full bg-transparent border rounded-lg px-4 py-2 text-white h-20"
              style={{ borderColor: "rgba(201, 165, 66, 0.3)" }}
            />
          </div>
          <div>
            <label className="text-white font-semibold mb-2 block">Mots-clés globaux</label>
            <input
              type="text"
              defaultValue="comics africains, mythologie, ZAIIRE, KIMOYA, patrimoine"
              className="w-full bg-transparent border rounded-lg px-4 py-2 text-white"
              style={{ borderColor: "rgba(201, 165, 66, 0.3)" }}
            />
            <p className="text-xs text-gray-400 mt-2">Séparés par des virgules</p>
          </div>
        </motion.div>
      )}

      {/* Appearance Settings */}
      {activeTab === "appearance" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border p-6 space-y-6"
          style={{
            backgroundColor: "rgba(201, 165, 66, 0.05)",
            borderColor: "rgba(201, 165, 66, 0.2)",
          }}
        >
          <div>
            <label className="text-white font-semibold mb-2 block">Couleur primaire</label>
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-lg border-2"
                style={{
                  backgroundColor: "#C9A542",
                  borderColor: "rgba(201, 165, 66, 0.5)",
                }}
              />
              <input
                type="text"
                defaultValue="#C9A542"
                className="flex-1 bg-transparent border rounded-lg px-4 py-2 text-white font-mono text-sm"
                style={{ borderColor: "rgba(201, 165, 66, 0.3)" }}
              />
            </div>
          </div>
          <div>
            <label className="text-white font-semibold mb-2 block">Thème</label>
            <div className="space-y-2">
              {["Mode sombre", "Mode clair"].map((theme) => (
                <label key={theme} className="flex items-center gap-3 text-gray-300 cursor-pointer">
                  <input type="radio" name="theme" defaultChecked={theme === "Mode sombre"} />
                  {theme}
                </label>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Users Management */}
      {activeTab === "users" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border p-6 space-y-6"
          style={{
            backgroundColor: "rgba(201, 165, 66, 0.05)",
            borderColor: "rgba(201, 165, 66, 0.2)",
          }}
        >
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C9A542] text-[#0F1524] font-semibold hover:bg-[#D4AF37] transition">
            <Plus size={20} />
            Ajouter un utilisateur
          </button>

          <div className="space-y-3">
            {[
              { email: "isoleleuniverse@gmail.com", role: "Super Admin", status: "Actif" },
              { email: "admin@isolele.com", role: "Admin", status: "Actif" },
            ].map((user) => (
              <div
                key={user.email}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: "rgba(201, 165, 66, 0.1)" }}
              >
                <div>
                  <p className="text-white font-semibold">{user.email}</p>
                  <p className="text-gray-400 text-sm">{user.role}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-green-400 font-semibold">{user.status}</span>
                  <button className="text-gray-500 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Maintenance */}
      {activeTab === "maintenance" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border p-6 space-y-6"
          style={{
            backgroundColor: "rgba(201, 165, 66, 0.05)",
            borderColor: "rgba(201, 165, 66, 0.2)",
          }}
        >
          <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: "rgba(201, 165, 66, 0.1)" }}>
            <div>
              <p className="text-white font-semibold">Mode maintenance</p>
              <p className="text-gray-400 text-sm">Le site sera inaccessible aux visiteurs</p>
            </div>
            <input type="checkbox" className="w-6 h-6" />
          </div>

          <button className="w-full py-3 rounded-lg border-2 border-[#C9A542] text-[#C9A542] font-semibold hover:bg-[#C9A54220] transition">
            Sauvegarder la base de données
          </button>

          <button className="w-full py-3 rounded-lg border-2 border-[#C9A542] text-[#C9A542] font-semibold hover:bg-[#C9A54220] transition">
            Voir les logs système
          </button>
        </motion.div>
      )}

      {/* Save Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition"
        style={{ backgroundColor: "#C9A542", color: "#0F1524" }}
      >
        <Save size={20} />
        Enregistrer les modifications
      </motion.button>
    </div>
  )
}
