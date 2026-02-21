"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Edit,
  Eye,
  Globe,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Search,
  Layout,
  Home,
  Info,
  HelpCircle,
  Users,
  ShieldCheck,
  Mail,
  Newspaper,
  BookOpen,
  Star,
} from "lucide-react"
import Link from "next/link"

interface SitePage {
  id: string
  name: string
  path: string
  icon: typeof FileText
  status: "published" | "draft" | "needs_update"
  lastModified: string
  description: string
  seoScore: number
}

const sitePages: SitePage[] = [
  {
    id: "home",
    name: "Accueil",
    path: "/",
    icon: Home,
    status: "published",
    lastModified: "2026-02-10",
    description: "Page d'accueil principale avec hero, sections et CTA",
    seoScore: 92,
  },
  {
    id: "about",
    name: "A Propos",
    path: "/about",
    icon: Info,
    status: "published",
    lastModified: "2026-02-08",
    description: "Histoire et mission du projet Isolele",
    seoScore: 85,
  },
  {
    id: "characters",
    name: "Personnages",
    path: "/characters",
    icon: Users,
    status: "published",
    lastModified: "2026-02-09",
    description: "Galerie des personnages de l'univers",
    seoScore: 78,
  },
  {
    id: "news",
    name: "Actualites",
    path: "/news",
    icon: Newspaper,
    status: "published",
    lastModified: "2026-02-10",
    description: "Articles et nouvelles de l'univers BD",
    seoScore: 88,
  },
  {
    id: "shop",
    name: "Boutique",
    path: "/shop",
    icon: Star,
    status: "published",
    lastModified: "2026-02-07",
    description: "Catalogue produits et achats",
    seoScore: 80,
  },
  {
    id: "founder",
    name: "Fondateur",
    path: "/founder",
    icon: BookOpen,
    status: "published",
    lastModified: "2026-02-05",
    description: "Page dediee au fondateur Joshua",
    seoScore: 75,
  },
  {
    id: "supporters",
    name: "Supporters",
    path: "/supporters",
    icon: Users,
    status: "published",
    lastModified: "2026-02-06",
    description: "Communaute de soutien et devenir supporter",
    seoScore: 72,
  },
  {
    id: "faq",
    name: "FAQ",
    path: "/faq",
    icon: HelpCircle,
    status: "published",
    lastModified: "2026-02-04",
    description: "Questions frequemment posees",
    seoScore: 90,
  },
  {
    id: "contact",
    name: "Contact",
    path: "/contact",
    icon: Mail,
    status: "published",
    lastModified: "2026-02-03",
    description: "Formulaire de contact et informations",
    seoScore: 82,
  },
  {
    id: "press",
    name: "Presse",
    path: "/press",
    icon: Layout,
    status: "published",
    lastModified: "2026-02-02",
    description: "Kit media et communiques de presse",
    seoScore: 68,
  },
  {
    id: "careers",
    name: "Carrieres",
    path: "/careers",
    icon: Globe,
    status: "published",
    lastModified: "2026-02-01",
    description: "Offres d'emploi et opportunites",
    seoScore: 70,
  },
  {
    id: "privacy",
    name: "Confidentialite",
    path: "/privacy",
    icon: ShieldCheck,
    status: "published",
    lastModified: "2026-01-25",
    description: "Politique de confidentialite",
    seoScore: 60,
  },
  {
    id: "terms",
    name: "Conditions",
    path: "/terms",
    icon: FileText,
    status: "published",
    lastModified: "2026-01-25",
    description: "Conditions generales d'utilisation",
    seoScore: 58,
  },
]

const statusConfig = {
  published: { icon: CheckCircle, color: "#4CAF50", label: "Publiee" },
  draft: { icon: Clock, color: "#FF9800", label: "Brouillon" },
  needs_update: { icon: AlertCircle, color: "#FF5252", label: "Mise a jour requise" },
}

export default function PagesManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string | null>(null)

  const filteredPages = sitePages.filter((page) => {
    const matchesSearch =
      page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      page.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = !filterStatus || page.status === filterStatus
    return matchesSearch && matchesFilter
  })

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
          <h1 className="text-2xl font-bold text-white">Pages du Site</h1>
          <p className="text-gray-400">Gerez et surveillez toutes les pages publiques</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 text-green-400">
            <CheckCircle className="w-4 h-4" />
            <span>{sitePages.filter((p) => p.status === "published").length} publiees</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/20 text-orange-400">
            <Clock className="w-4 h-4" />
            <span>{sitePages.filter((p) => p.status === "draft").length} brouillons</span>
          </div>
        </div>
      </div>

      {/* SEO Overview */}
      <div
        className="p-5 rounded-xl"
        style={{
          backgroundColor: "#0a0f1a",
          border: "1px solid rgba(201, 165, 66, 0.2)",
        }}
      >
        <h2 className="text-lg font-bold text-white mb-4">Score SEO Global</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#C9A542]">
              {Math.round(sitePages.reduce((sum, p) => sum + p.seoScore, 0) / sitePages.length)}
            </div>
            <p className="text-sm text-gray-400 mt-1">Score moyen</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">
              {sitePages.filter((p) => p.seoScore >= 80).length}
            </div>
            <p className="text-sm text-gray-400 mt-1">Excellent</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {sitePages.filter((p) => p.seoScore >= 60 && p.seoScore < 80).length}
            </div>
            <p className="text-sm text-gray-400 mt-1">A ameliorer</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400">
              {sitePages.filter((p) => p.seoScore < 60).length}
            </div>
            <p className="text-sm text-gray-400 mt-1">Critique</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une page..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#0a0f1a] text-white rounded-lg border border-[#C9A542]/20 outline-none focus:border-[#C9A542] transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {Object.entries(statusConfig).map(([status, config]) => (
            <button
              key={status}
              onClick={() => setFilterStatus(filterStatus === status ? null : status)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${
                filterStatus === status
                  ? "bg-[#C9A542]/20 text-[#C9A542] border border-[#C9A542]"
                  : "border border-[#C9A542]/20 text-gray-400 hover:text-white"
              }`}
            >
              <config.icon className="w-4 h-4" />
              {config.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pages List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {filteredPages.map((page) => {
          const status = statusConfig[page.status]
          const PageIcon = page.icon
          return (
            <motion.div
              key={page.id}
              variants={itemVariants}
              className="group p-4 rounded-xl flex flex-col sm:flex-row sm:items-center gap-4 hover:border-[#C9A542]/40 transition-all"
              style={{
                backgroundColor: "#0a0f1a",
                border: "1px solid rgba(201, 165, 66, 0.2)",
              }}
            >
              {/* Icon */}
              <div className="p-3 rounded-xl bg-[#C9A542]/10 self-start">
                <PageIcon className="w-5 h-5 text-[#C9A542]" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-white">{page.name}</h3>
                  <span className="text-xs text-gray-500 font-mono">{page.path}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1`}
                    style={{ backgroundColor: `${status.color}20`, color: status.color }}
                  >
                    <status.icon className="w-3 h-3" />
                    {status.label}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{page.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Derniere modification: {new Date(page.lastModified).toLocaleDateString("fr-FR")}
                </p>
              </div>

              {/* SEO Score */}
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div
                    className={`text-lg font-bold ${
                      page.seoScore >= 80
                        ? "text-green-400"
                        : page.seoScore >= 60
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {page.seoScore}
                  </div>
                  <p className="text-xs text-gray-500">SEO</p>
                </div>

                {/* Actions */}
                <div className="flex gap-1">
                  <Link href={page.path} target="_blank">
                    <motion.button
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      title="Voir la page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  </Link>
                  <motion.button
                    className="p-2 rounded-lg text-gray-400 hover:text-[#C9A542] hover:bg-[#C9A542]/10 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    title="Modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  <Link href={page.path} target="_blank">
                    <motion.button
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      title="Apercu"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
