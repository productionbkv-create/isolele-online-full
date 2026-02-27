"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, ShoppingCart, DollarSign, Users, AlertTriangle, Plus, Minus, Download } from "lucide-react"

const METRICS = [
  { title:"Ventes du jour",      value:"48",     change:"+23%", icon:ShoppingCart, color:"#C9A542" },
  { title:"Chiffre d'affaires",  value:"2 847 $", change:"+18%", icon:DollarSign,   color:"#D4AF37" },
  { title:"Taux de conversion",  value:"8.4%",   change:"+2.3%",icon:TrendingUp,   color:"#4ade80" },
  { title:"Visiteurs uniques",   value:"5 234",  change:"+12%", icon:Users,        color:"#60a5fa" },
]

const WEEK = [
  { day:"Lun", sales:45 }, { day:"Mar", sales:52 }, { day:"Mer", sales:38 },
  { day:"Jeu", sales:71 }, { day:"Ven", sales:68 }, { day:"Sam", sales:89 }, { day:"Dim", sales:56 },
]

const MAX = Math.max(...WEEK.map(d => d.sales))

interface Book { title:string; sales:number; views:number; conv:string; stock:number }

const INITIAL_BOOKS: Book[] = [
  { title:"ZAIIRE – Prince of Kongo", sales:156, views:4234, conv:"12.5%", stock:45 },
  { title:"KIMOYA",                   sales:124, views:3156, conv:"10.2%", stock:32 },
  { title:"ZATTAR",                   sales:98,  views:2847, conv:"8.7%",  stock:18 },
  { title:"LES JUMEAUX NJOKO",        sales:67,  views:1923, conv:"6.5%",  stock:3  },
  { title:"REINE IMVULA",             sales:54,  views:1567, conv:"5.3%",  stock:8  },
]

export default function ReboardPage() {
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS)

  const adjust = (index: number, delta: number) =>
    setBooks(p => p.map((b, i) => i === index ? { ...b, stock: Math.max(0, b.stock + delta) } : b))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Reboard</h1>
          <p className="text-gray-400 mt-1">Tableau de bord des ventes et de la popularité en temps réel</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm border transition"
          style={{ borderColor:"rgba(201,165,66,0.3)", color:"#C9A542" }}>
          <Download size={15}/> Exporter CSV
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((m, i) => {
          const Icon = m.icon
          return (
            <motion.div key={m.title}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.08 }}
              className="rounded-xl border p-5"
              style={{ backgroundColor:"rgba(201,165,66,0.04)", borderColor:`${m.color}28` }}>
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor:`${m.color}18` }}>
                  <Icon size={18} style={{ color:m.color }}/>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor:"rgba(74,222,128,0.1)", color:"#4ade80" }}>
                  {m.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white">{m.value}</p>
              <p className="text-gray-400 text-sm mt-0.5">{m.title}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Bar chart */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
        className="rounded-xl border p-6"
        style={{ backgroundColor:"rgba(201,165,66,0.04)", borderColor:"rgba(201,165,66,0.15)" }}>
        <h2 className="text-lg font-bold text-white mb-6">Ventes sur 7 jours</h2>
        <div className="flex items-end gap-3 h-40">
          {WEEK.map((d, i) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-gray-500">{d.sales}</span>
              <motion.div
                initial={{ height:0 }} animate={{ height:`${(d.sales/MAX)*100}%` }}
                transition={{ delay:0.3 + i*0.07, duration:0.5 }}
                className="w-full rounded-t-lg min-h-[4px]"
                style={{ backgroundColor: d.sales === MAX ? "#C9A542" : "rgba(201,165,66,0.35)" }}
              />
              <span className="text-xs text-gray-500">{d.day}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stock table */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
        className="rounded-xl border p-6"
        style={{ backgroundColor:"rgba(201,165,66,0.04)", borderColor:"rgba(201,165,66,0.15)" }}>
        <h2 className="text-lg font-bold text-white mb-6">Livres les plus vendus &amp; Gestion des stocks</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor:"rgba(201,165,66,0.15)" }}>
                {["Titre","Ventes","Vues","Conversion","Stock"].map(h => (
                  <th key={h} className="text-left text-gray-500 py-3 px-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {books.map((b, i) => (
                <motion.tr key={b.title}
                  initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4+i*0.06 }}
                  className="border-b transition hover:bg-[#C9A54208]"
                  style={{ borderColor:"rgba(201,165,66,0.08)" }}>
                  <td className="py-3 px-3 text-white font-medium">{b.title}</td>
                  <td className="py-3 px-3 text-gray-300">{b.sales}</td>
                  <td className="py-3 px-3 text-gray-300">{b.views.toLocaleString()}</td>
                  <td className="py-3 px-3" style={{ color:"#C9A542" }}>{b.conv}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => adjust(i,-1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white transition"
                        style={{ backgroundColor:"rgba(201,165,66,0.12)" }}>
                        <Minus size={10}/>
                      </button>
                      <span className={`w-8 text-center font-bold text-sm ${b.stock < 5 ? "text-red-400" : "text-white"}`}>
                        {b.stock}
                      </span>
                      <button onClick={() => adjust(i,1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-gray-400 hover:text-white transition"
                        style={{ backgroundColor:"rgba(201,165,66,0.12)" }}>
                        <Plus size={10}/>
                      </button>
                      {b.stock < 5 && <AlertTriangle size={14} className="text-red-400"/>}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Low stock alert */}
      {books.some(b => b.stock < 5) && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
          className="flex items-start gap-3 p-4 rounded-xl border"
          style={{ backgroundColor:"rgba(248,113,113,0.08)", borderColor:"rgba(248,113,113,0.3)" }}>
          <AlertTriangle size={20} className="text-red-400 shrink-0 mt-0.5"/>
          <div>
            <p className="text-white font-semibold text-sm">Alerte stock faible</p>
            <p className="text-gray-400 text-sm mt-0.5">
              {books.filter(b => b.stock < 5).map(b => b.title).join(", ")} — réimpression recommandée.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
