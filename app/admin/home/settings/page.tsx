"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, Globe, Search, Palette, Users, Plug, Wrench, Plus, Trash2, CheckCircle } from "lucide-react"

type Tab = "general"|"seo"|"appearance"|"users"|"integrations"|"maintenance"

const TABS: { id:Tab; label:string; icon:React.ElementType }[] = [
  { id:"general",      label:"Général",       icon:Globe    },
  { id:"seo",          label:"SEO Global",    icon:Search   },
  { id:"appearance",   label:"Apparence",     icon:Palette  },
  { id:"users",        label:"Utilisateurs",  icon:Users    },
  { id:"integrations", label:"Intégrations",  icon:Plug     },
  { id:"maintenance",  label:"Maintenance",   icon:Wrench   },
]

const INPUT = "w-full bg-transparent border rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none transition"
const BORDER = { borderColor:"rgba(201,165,66,0.25)" }
const CARD   = { backgroundColor:"rgba(201,165,66,0.04)", borderColor:"rgba(201,165,66,0.15)" }

export default function SettingsPage() {
  const [tab, setTab]           = useState<Tab>("general")
  const [saved, setSaved]       = useState(false)
  const [maintenance, setMaint] = useState(false)

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 3000) }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Configuration globale du site et de l'administration</p>
      </div>

      {/* Tab nav */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(t => {
          const Icon = t.icon
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                backgroundColor: tab===t.id ? "#C9A542" : "rgba(201,165,66,0.08)",
                color: tab===t.id ? "#0A0E1A" : "#9CA3AF",
              }}>
              <Icon size={15}/> {t.label}
            </button>
          )
        })}
      </div>

      {/* ── GENERAL ── */}
      {tab === "general" && (
        <motion.div key="general" initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
          className="rounded-xl border p-6 space-y-5" style={CARD}>
          <h2 className="font-bold text-white text-lg mb-1">Paramètres Généraux</h2>
          {[
            { label:"Nom du site",  def:"ISOLELE – African Mythology Reawakened" },
            { label:"Slogan",       def:"Un univers visionnaire où les super-héros sont choisis par le destin" },
            { label:"Email de contact", def:"contact@isolele.com" },
            { label:"Téléphone",    def:"+1 (514) 000-0000" },
          ].map(f => (
            <div key={f.label}>
              <label className="text-sm text-gray-400 mb-1.5 block">{f.label}</label>
              <input defaultValue={f.def} className={INPUT} style={BORDER}/>
            </div>
          ))}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Langues activées</label>
            <div className="flex flex-wrap gap-3">
              {["Français","English","Español"].map(l => (
                <label key={l} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#C9A542]"/> {l}
                </label>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── SEO ── */}
      {tab === "seo" && (
        <motion.div key="seo" initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
          className="rounded-xl border p-6 space-y-5" style={CARD}>
          <h2 className="font-bold text-white text-lg mb-1">SEO Global</h2>
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Titre SEO par défaut</label>
            <input defaultValue="ISOLELE – Mythologie Africaine Réveillée | Comics & Produits" className={INPUT} style={BORDER}/>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Méta-description par défaut</label>
            <textarea defaultValue="Découvrez ISOLELE : un univers de comics africains, personnages mythologiques et produits exclusifs." rows={3}
              className={INPUT} style={BORDER}/>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Mots-clés globaux (séparés par virgule)</label>
            <input defaultValue="comics africains, mythologie, ZAIIRE, KIMOYA, ZATTAR, patrimoine congolais" className={INPUT} style={BORDER}/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Google Analytics ID</label>
              <input placeholder="G-XXXXXXXXXX" className={INPUT} style={BORDER}/>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Search Console</label>
              <input placeholder="Code de vérification" className={INPUT} style={BORDER}/>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── APPEARANCE ── */}
      {tab === "appearance" && (
        <motion.div key="appearance" initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
          className="rounded-xl border p-6 space-y-5" style={CARD}>
          <h2 className="font-bold text-white text-lg mb-1">Apparence</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { label:"Couleur primaire",   val:"#C9A542" },
              { label:"Couleur secondaire", val:"#B3541E" },
            ].map(c => (
              <div key={c.label}>
                <label className="text-sm text-gray-400 mb-2 block">{c.label}</label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg border-2 shrink-0"
                    style={{ backgroundColor:c.val, borderColor:"rgba(201,165,66,0.4)" }}/>
                  <input defaultValue={c.val} className={`${INPUT} font-mono`} style={BORDER}/>
                </div>
              </div>
            ))}
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Thème</label>
            <div className="flex gap-4">
              {["Mode sombre","Mode clair"].map(t => (
                <label key={t} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input type="radio" name="theme" defaultChecked={t==="Mode sombre"} className="accent-[#C9A542]"/> {t}
                </label>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── USERS ── */}
      {tab === "users" && (
        <motion.div key="users" initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
          className="rounded-xl border p-6 space-y-5" style={CARD}>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-white text-lg">Utilisateurs & Rôles</h2>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
              style={{ backgroundColor:"#C9A542", color:"#0A0E1A" }}>
              <Plus size={15}/> Ajouter
            </button>
          </div>
          <div className="space-y-3">
            {[
              { email:"isoleleuniverse@gmail.com", role:"Super Admin", active:true  },
              { email:"admin@isolele.com",          role:"Admin",       active:true  },
            ].map(u => (
              <div key={u.email} className="flex items-center justify-between p-4 rounded-xl border"
                style={{ backgroundColor:"rgba(201,165,66,0.07)", borderColor:"rgba(201,165,66,0.15)" }}>
                <div>
                  <p className="text-white text-sm font-medium">{u.email}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{u.role}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-green-400">{u.active ? "Actif" : "Inactif"}</span>
                  <button className="text-gray-500 hover:text-red-400 transition"><Trash2 size={15}/></button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── INTEGRATIONS ── */}
      {tab === "integrations" && (
        <motion.div key="integrations" initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
          className="rounded-xl border p-6 space-y-5" style={CARD}>
          <h2 className="font-bold text-white text-lg mb-1">Intégrations & API</h2>
          {[
            { label:"Clé API Stripe",       placeholder:"sk_live_..." },
            { label:"Clé API Cloudinary",   placeholder:"cloudinary_key_..." },
            { label:"Clé Mailchimp",        placeholder:"mailchimp_key_..." },
            { label:"Token Instagram API",  placeholder:"instagram_token_..." },
          ].map(f => (
            <div key={f.label}>
              <label className="text-sm text-gray-400 mb-1.5 block">{f.label}</label>
              <input type="password" placeholder={f.placeholder} className={INPUT} style={BORDER}/>
            </div>
          ))}
        </motion.div>
      )}

      {/* ── MAINTENANCE ── */}
      {tab === "maintenance" && (
        <motion.div key="maintenance" initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
          className="rounded-xl border p-6 space-y-5" style={CARD}>
          <h2 className="font-bold text-white text-lg mb-1">Maintenance</h2>
          <div className="flex items-center justify-between p-4 rounded-xl border"
            style={{ backgroundColor:"rgba(201,165,66,0.07)", borderColor:"rgba(201,165,66,0.15)" }}>
            <div>
              <p className="text-white font-medium text-sm">Mode maintenance</p>
              <p className="text-gray-500 text-xs mt-0.5">Le site sera inaccessible aux visiteurs</p>
            </div>
            <button onClick={() => setMaint(!maintenance)}
              className="w-12 h-6 rounded-full transition-all relative"
              style={{ backgroundColor: maintenance ? "#C9A542" : "rgba(201,165,66,0.2)" }}>
              <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                style={{ left: maintenance ? "calc(100% - 20px)" : "4px" }}/>
            </button>
          </div>
          {[
            "Sauvegarder la base de données manuellement",
            "Générer le Sitemap XML",
            "Vider le cache",
            "Voir les logs système",
          ].map(action => (
            <button key={action}
              className="w-full py-3 px-4 rounded-xl border text-sm text-left text-gray-300 hover:text-white hover:bg-[#C9A54210] transition"
              style={{ borderColor:"rgba(201,165,66,0.2)" }}>
              {action}
            </button>
          ))}
        </motion.div>
      )}

      {/* Save */}
      <motion.button onClick={save} whileHover={{ scale:1.01 }} whileTap={{ scale:0.99 }}
        className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition"
        style={{ backgroundColor: saved ? "#4ade80" : "#C9A542", color:"#0A0E1A" }}>
        {saved ? <CheckCircle size={18}/> : <Save size={18}/>}
        {saved ? "Modifications enregistrées !" : "Enregistrer les modifications"}
      </motion.button>
    </div>
  )
}


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
