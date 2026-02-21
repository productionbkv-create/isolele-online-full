"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import {
  Settings,
  Globe,
  Palette,
  Bell,
  Mail,
  Database,
  Zap,
  Save,
  Check,
  RefreshCw,
  Languages,
  Sun,
  Moon,
  Monitor,
  Link2,
  Instagram,
  ExternalLink,
  Search,
  Code,
  FileText,
  Shield,
} from "lucide-react"

interface SiteSettings {
  siteName: string
  siteDescription: string
  siteUrl: string
  contactEmail: string
  instagram: string
  language: string
  theme: string
  maintenanceMode: boolean
  analyticsEnabled: boolean
  newsletterEnabled: boolean
  seoTitle: string
  seoDescription: string
  ogImage: string
}

const defaultSettings: SiteSettings = {
  siteName: "ISOLELE Universe",
  siteDescription: "African Mythology. Reawakened. - BD et univers africain unique",
  siteUrl: "https://isolele.com",
  contactEmail: "Isoleleuniverse@gmail.com",
  instagram: "@isoleleuniverse",
  language: "fr",
  theme: "dark",
  maintenanceMode: false,
  analyticsEnabled: true,
  newsletterEnabled: true,
  seoTitle: "ISOLELE Universe - African Mythology. Reawakened.",
  seoDescription: "Decouvrez l'univers mythologique africain d'Isolele. BD, personnages epiques et histoires captivantes.",
  ogImage: "/images/og-isolele.jpg",
}

type TabId = "general" | "seo" | "notifications" | "integrations" | "advanced"

const tabs: { id: TabId; label: string; icon: typeof Settings }[] = [
  { id: "general", label: "General", icon: Settings },
  { id: "seo", label: "SEO", icon: Search },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "integrations", label: "Integrations", icon: Zap },
  { id: "advanced", label: "Avance", icon: Code },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("general")
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSaved, setShowSaved] = useState(false)

  const supabase = createClient()

  const handleChange = (key: keyof SiteSettings, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save delay
    await new Promise((r) => setTimeout(r, 1500))
    setIsSaving(false)
    setHasChanges(false)
    setShowSaved(true)
    setTimeout(() => setShowSaved(false), 2000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Parametres</h1>
          <p className="text-gray-400">Configurez votre site et vos preferences</p>
        </div>
        <AnimatePresence mode="wait">
          {hasChanges && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-[#0F1524] bg-[#C9A542] disabled:opacity-50"
            >
              {isSaving ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : showSaved ? (
                <Check className="w-5 h-5" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {isSaving ? "Enregistrement..." : showSaved ? "Enregistre!" : "Enregistrer"}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-[#C9A542]/20 text-[#C9A542] border border-[#C9A542]"
                : "text-gray-400 hover:text-white border border-transparent hover:border-[#C9A542]/20"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "general" && (
          <motion.div
            key="general"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="space-y-6"
          >
            {/* Site Info */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "#0a0f1a",
                border: "1px solid rgba(201, 165, 66, 0.2)",
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Globe className="w-5 h-5 text-[#C9A542]" />
                <h2 className="text-lg font-bold text-white">Informations du site</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Nom du site</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => handleChange("siteName", e.target.value)}
                    className="w-full px-4 py-3 bg-[#1a2035] text-white rounded-lg border border-[#C9A542]/20 outline-none focus:border-[#C9A542] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">URL du site</label>
                  <input
                    type="url"
                    value={settings.siteUrl}
                    onChange={(e) => handleChange("siteUrl", e.target.value)}
                    className="w-full px-4 py-3 bg-[#1a2035] text-white rounded-lg border border-[#C9A542]/20 outline-none focus:border-[#C9A542] transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1.5">Description du site</label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => handleChange("siteDescription", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-[#1a2035] text-white rounded-lg border border-[#C9A542]/20 outline-none focus:border-[#C9A542] transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Email de contact</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => handleChange("contactEmail", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-[#1a2035] text-white rounded-lg border border-[#C9A542]/20 outline-none focus:border-[#C9A542] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Instagram</label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      value={settings.instagram}
                      onChange={(e) => handleChange("instagram", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-[#1a2035] text-white rounded-lg border border-[#C9A542]/20 outline-none focus:border-[#C9A542] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Appearance */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "#0a0f1a",
                border: "1px solid rgba(201, 165, 66, 0.2)",
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Palette className="w-5 h-5 text-[#C9A542]" />
                <h2 className="text-lg font-bold text-white">Apparence</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Theme</label>
                  <div className="flex gap-3">
                    {[
                      { value: "dark", icon: Moon, label: "Sombre" },
                      { value: "light", icon: Sun, label: "Clair" },
                      { value: "auto", icon: Monitor, label: "Auto" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleChange("theme", option.value)}
                        className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                          settings.theme === option.value
                            ? "bg-[#C9A542]/20 border border-[#C9A542] text-[#C9A542]"
                            : "bg-white/5 border border-transparent text-gray-400 hover:text-white"
                        }`}
                      >
                        <option.icon className="w-5 h-5" />
                        <span className="text-xs">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Langue</label>
                  <div className="flex gap-3">
                    {[
                      { value: "fr", label: "Francais" },
                      { value: "en", label: "English" },
                      { value: "ln", label: "Lingala" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleChange("language", option.value)}
                        className={`flex-1 p-3 rounded-xl text-sm transition-all ${
                          settings.language === option.value
                            ? "bg-[#C9A542]/20 border border-[#C9A542] text-[#C9A542]"
                            : "bg-white/5 border border-transparent text-gray-400 hover:text-white"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === "seo" && (
          <motion.div
            key="seo"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "#0a0f1a",
                border: "1px solid rgba(201, 165, 66, 0.2)",
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Search className="w-5 h-5 text-[#C9A542]" />
                <h2 className="text-lg font-bold text-white">Optimisation SEO</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Titre SEO par defaut</label>
                  <input
                    type="text"
                    value={settings.seoTitle}
                    onChange={(e) => handleChange("seoTitle", e.target.value)}
                    className="w-full px-4 py-3 bg-[#1a2035] text-white rounded-lg border border-[#C9A542]/20 outline-none focus:border-[#C9A542] transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">{settings.seoTitle.length}/60 caracteres</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Meta description</label>
                  <textarea
                    value={settings.seoDescription}
                    onChange={(e) => handleChange("seoDescription", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-[#1a2035] text-white rounded-lg border border-[#C9A542]/20 outline-none focus:border-[#C9A542] transition-colors resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">{settings.seoDescription.length}/160 caracteres</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Image Open Graph (OG)</label>
                  <input
                    type="text"
                    value={settings.ogImage}
                    onChange={(e) => handleChange("ogImage", e.target.value)}
                    className="w-full px-4 py-3 bg-[#1a2035] text-white rounded-lg border border-[#C9A542]/20 outline-none focus:border-[#C9A542] transition-colors"
                    placeholder="/images/og-image.jpg"
                  />
                </div>

                {/* SEO Preview */}
                <div className="mt-6 p-4 rounded-xl bg-white/5">
                  <p className="text-xs text-gray-500 mb-2">Apercu dans Google</p>
                  <p className="text-blue-400 text-lg hover:underline cursor-pointer">{settings.seoTitle}</p>
                  <p className="text-green-500 text-sm">{settings.siteUrl}</p>
                  <p className="text-sm text-gray-400 mt-1">{settings.seoDescription}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === "notifications" && (
          <motion.div
            key="notifications"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "#0a0f1a",
                border: "1px solid rgba(201, 165, 66, 0.2)",
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-[#C9A542]" />
                <h2 className="text-lg font-bold text-white">Notifications</h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "Nouvelles commandes",
                    description: "Recevez une notification pour chaque nouvelle commande",
                    enabled: true,
                  },
                  {
                    label: "Nouveaux abonnes newsletter",
                    description: "Soyez notifie quand quelqu'un s'inscrit",
                    enabled: true,
                  },
                  {
                    label: "Messages de contact",
                    description: "Notification pour chaque message recu",
                    enabled: true,
                  },
                  {
                    label: "Alertes de securite",
                    description: "Tentatives de connexion suspectes",
                    enabled: true,
                  },
                  {
                    label: "Rapports hebdomadaires",
                    description: "Resume des performances chaque lundi",
                    enabled: false,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                  >
                    <div>
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                    <div
                      className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors ${
                        item.enabled ? "bg-[#C9A542]" : "bg-gray-600"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${
                          item.enabled ? "left-[26px]" : "left-[2px]"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === "integrations" && (
          <motion.div
            key="integrations"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "#0a0f1a",
                border: "1px solid rgba(201, 165, 66, 0.2)",
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-5 h-5 text-[#C9A542]" />
                <h2 className="text-lg font-bold text-white">Integrations connectees</h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: "Supabase",
                    description: "Base de donnees et authentification",
                    status: "connected",
                    icon: Database,
                  },
                  {
                    name: "Instagram",
                    description: "Feed Instagram automatique",
                    status: "connected",
                    icon: Instagram,
                  },
                  {
                    name: "Stripe",
                    description: "Paiements en ligne",
                    status: "not_connected",
                    icon: Zap,
                  },
                  {
                    name: "Mailchimp",
                    description: "Gestion de la newsletter",
                    status: "not_connected",
                    icon: Mail,
                  },
                  {
                    name: "Google Analytics",
                    description: "Suivi des visites avance",
                    status: "not_connected",
                    icon: Globe,
                  },
                ].map((integration) => (
                  <div
                    key={integration.name}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#C9A542]/10">
                        <integration.icon className="w-5 h-5 text-[#C9A542]" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{integration.name}</p>
                        <p className="text-sm text-gray-400">{integration.description}</p>
                      </div>
                    </div>
                    {integration.status === "connected" ? (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                        Connecte
                      </span>
                    ) : (
                      <button className="px-4 py-2 rounded-lg text-sm font-medium border border-[#C9A542]/30 text-[#C9A542] hover:bg-[#C9A542]/10 transition-colors">
                        Connecter
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === "advanced" && (
          <motion.div
            key="advanced"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "#0a0f1a",
                border: "1px solid rgba(201, 165, 66, 0.2)",
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Code className="w-5 h-5 text-[#C9A542]" />
                <h2 className="text-lg font-bold text-white">Parametres avances</h2>
              </div>

              <div className="space-y-4">
                {/* Maintenance Mode */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-orange-400" />
                    <div>
                      <p className="text-white font-medium">Mode maintenance</p>
                      <p className="text-sm text-gray-400">Affiche une page de maintenance aux visiteurs</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleChange("maintenanceMode", !settings.maintenanceMode)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.maintenanceMode ? "bg-orange-500" : "bg-gray-600"
                    }`}
                  >
                    <motion.div
                      className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
                      animate={{ left: settings.maintenanceMode ? "26px" : "2px" }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>

                {/* Newsletter */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#C9A542]" />
                    <div>
                      <p className="text-white font-medium">Newsletter</p>
                      <p className="text-sm text-gray-400">Activer les inscriptions newsletter</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleChange("newsletterEnabled", !settings.newsletterEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.newsletterEnabled ? "bg-[#C9A542]" : "bg-gray-600"
                    }`}
                  >
                    <motion.div
                      className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
                      animate={{ left: settings.newsletterEnabled ? "26px" : "2px" }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-[#C9A542]" />
                    <div>
                      <p className="text-white font-medium">Analytics</p>
                      <p className="text-sm text-gray-400">Collecte de donnees de navigation</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleChange("analyticsEnabled", !settings.analyticsEnabled)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.analyticsEnabled ? "bg-[#C9A542]" : "bg-gray-600"
                    }`}
                  >
                    <motion.div
                      className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
                      animate={{ left: settings.analyticsEnabled ? "26px" : "2px" }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>

                {/* Cache */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 text-[#C9A542]" />
                    <div>
                      <p className="text-white font-medium">Vider le cache</p>
                      <p className="text-sm text-gray-400">Regener les pages mises en cache</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-lg text-sm font-medium border border-[#C9A542]/30 text-[#C9A542] hover:bg-[#C9A542]/10 transition-colors">
                    Purger
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-xl"
              style={{
                backgroundColor: "#0a0f1a",
                border: "1px solid rgba(255, 82, 82, 0.2)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-red-400" />
                <h2 className="text-lg font-bold text-red-400">Zone de danger</h2>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Ces actions sont irreversibles. Procedez avec precaution.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 rounded-lg text-sm font-medium border border-red-500/30 text-red-400 hover:bg-red-400/10 transition-colors">
                  Reinitialiser les parametres
                </button>
                <button className="px-4 py-2 rounded-lg text-sm font-medium border border-red-500/30 text-red-400 hover:bg-red-400/10 transition-colors">
                  Exporter les donnees
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
