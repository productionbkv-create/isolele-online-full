"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/lib/theme-context"
import { useLanguage } from "@/lib/language-context"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductSlide {
  id: string
  title: string
  subtitle: string
  titleFr: string
  subtitleFr: string
  description: string
  descriptionFr: string
  image: string
  link: string
}

const products: ProductSlide[] = [
  {
    id: "zaiire",
    title: "ZAIIRE - PRINCE OF KONGO",
    titleFr: "ZAIIRE - PRINCE DU KONGO",
    subtitle: "The Destiny Necklace",
    subtitleFr: "Le Collier de la Destinée",
    description: "A thrilling and edifying adventure echoing the spirit of The Lion King and Black Panther, offering young readers a celebration of heritage, courage, and self-discovery.",
    descriptionFr: "Une aventure palpitante et édifiante qui fait écho à l'esprit du Roi Lion et de Black Panther, offrant aux jeunes lecteurs une célébration du patrimoine, du courage et de la découverte de soi.",
    image: "/images/zaiire-hero-cover.jpg",
    link: "/shop/zaiire"
  },
  {
    id: "kimoya",
    title: "KIMOYA - THE RISING KANDAKE",
    titleFr: "KIMOYA - LA KANDAKE RENAISSANTE",
    subtitle: "Power of the Nubian Queen",
    subtitleFr: "Le Pouvoir de la Reine Nubienne",
    description: "An epic tale of sovereignty and wisdom, following Kimoya as she rises to claim her throne and restore the ancient glory of her kingdom through courage and ancestral magic.",
    descriptionFr: "Un conte épique de souveraineté et de sagesse, suivant Kimoya tandis qu'elle s'élève pour revendiquer son trône et restaurer la gloire ancienne de son royaume par le courage et la magie ancestrale.",
    image: "/images/kimoya-cover.jpg",
    link: "/shop/kimoya"
  },
  {
    id: "zattar",
    title: "ZATTAR - THE BLOOD ARCHITECT",
    titleFr: "ZATTAR - L'ARCHITECTE DE SANG",
    subtitle: "Master of Ancient Runes",
    subtitleFr: "Maître des Runes Anciennes",
    description: "A dark and mystical journey through forgotten kingdoms, where Zattar's command over blood magic and ancient blueprints challenges the very fabric of reality itself.",
    descriptionFr: "Un voyage sombre et mystique à travers des royaumes oubliés, où la maîtrise de la magie du sang de Zattar et ses plans anciens défient le tissu même de la réalité.",
    image: "/images/zattar-cover.jpg",
    link: "/shop/zattar"
  },
  {
    id: "njoko",
    title: "THE NJOKO TWINS - BOUND BY DESTINY",
    titleFr: "LES JUMEAUX NJOKO - LIÉS PAR LE DESTIN",
    subtitle: "Duality of Power",
    subtitleFr: "Dualité du Pouvoir",
    description: "Twin souls separated by fate yet forever connected, their intertwined story reveals the balance between light and shadow, unity and division in the African cosmos.",
    descriptionFr: "Deux âmes jumelles séparées par le destin mais éternellement connectées, leur histoire entrelacée révèle l'équilibre entre la lumière et l'ombre, l'unité et la division dans le cosmos africain.",
    image: "/images/njoko-cover.jpg",
    link: "/shop/njoko"
  },
  {
    id: "imvula",
    title: "QUEEN IMVULA - THE STORM MAIDEN",
    titleFr: "REINE IMVULA - LA REINE TEMPÊTE",
    subtitle: "Sovereign of the Elements",
    subtitleFr: "Souveraine des Éléments",
    description: "Command the heavens and the rain. Queen Imvula's reign brings hope and transformation as she harnesses the elements to protect her people from ancient evils.",
    descriptionFr: "Commandez les cieux et la pluie. Le règne de la Reine Imvula apporte l'espoir et la transformation alors qu'elle exploite les éléments pour protéger son peuple des maux anciens.",
    image: "/images/imvula-cover.jpg",
    link: "/shop/imvula"
  },
]

export function ProductsCarousel() {
  const { currentTheme } = useTheme()
  const { t, currentLanguage } = useLanguage()
  const [activeSlide, setActiveSlide] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % products.length)
  }, [])

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + products.length) % products.length)
  }, [])

  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [autoPlay, nextSlide])

  const currentProduct = products[activeSlide]
  const isEnglish = currentLanguage.code === "en"

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url('${currentProduct.image}')`,
        }}
      />
      <div className="absolute inset-0 z-1"
        style={{
          background: `linear-gradient(135deg, ${currentTheme.colors.background}e6 0%, ${currentTheme.colors.backgroundSecondary}cc 50%, ${currentTheme.colors.background}e6 100%)`,
        }}
      />

      {/* Animated patterns overlay */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none z-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-64 w-64 border rotate-45"
            style={{
              borderColor: currentTheme.colors.accentPrimary,
              left: `${i * 20 - 10}%`,
              top: `${(i % 3) * 30}%`,
            }}
            animate={{
              rotate: [45, 90, 45],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              delay: i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            key={`content-${activeSlide}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <motion.p
                className="text-sm tracking-[0.3em] font-bold mb-2"
                style={{ color: currentTheme.colors.accentPrimary }}
              >
                {`${activeSlide + 1} / ${products.length}`}
              </motion.p>
              <h2
                className="text-5xl sm:text-6xl font-black tracking-wider mb-2"
                style={{
                  color: currentTheme.colors.textPrimary,
                  textShadow: `0 0 40px ${currentTheme.colors.accentPrimary}40`,
                }}
              >
                {isEnglish ? currentProduct.title : currentProduct.titleFr}
              </h2>
              <p
                className="text-2xl sm:text-3xl font-bold tracking-widest"
                style={{ color: currentTheme.colors.accentPrimary }}
              >
                {isEnglish ? currentProduct.subtitle : currentProduct.subtitleFr}
              </p>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg leading-relaxed max-w-xl"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              {isEnglish ? currentProduct.description : currentProduct.descriptionFr}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link href={currentProduct.link}>
                <motion.button
                  className="px-8 py-4 rounded-lg text-lg font-bold tracking-wider transition-all"
                  style={{
                    backgroundColor: currentTheme.colors.accentPrimary,
                    color: currentTheme.colors.background,
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 30px ${currentTheme.colors.accentPrimary}80`,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isEnglish ? "DISCOVER" : "DÉCOUVRIR"}
                </motion.button>
              </Link>
              <Link href="/shop">
                <motion.button
                  className="px-8 py-4 rounded-lg text-lg font-bold tracking-wider transition-all border-2"
                  style={{
                    borderColor: currentTheme.colors.accentPrimary,
                    color: currentTheme.colors.accentPrimary,
                    backgroundColor: "transparent",
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: `${currentTheme.colors.accentPrimary}20`,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isEnglish ? "SHOP NOW" : "ACHETER"}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side - Controls and indicators */}
          <div className="flex flex-col items-center justify-center gap-8">
            {/* Slide indicators */}
            <div className="flex flex-wrap gap-3 justify-center">
              {products.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    setActiveSlide(idx)
                    setAutoPlay(false)
                  }}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: activeSlide === idx ? "32px" : "12px",
                    height: "12px",
                    backgroundColor:
                      activeSlide === idx
                        ? currentTheme.colors.accentPrimary
                        : `${currentTheme.colors.textSecondary}50`,
                  }}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="flex gap-4">
              <motion.button
                onClick={() => {
                  prevSlide()
                  setAutoPlay(false)
                }}
                className="p-4 rounded-full transition-all"
                style={{
                  backgroundColor: `${currentTheme.colors.accentPrimary}20`,
                  color: currentTheme.colors.accentPrimary,
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: `${currentTheme.colors.accentPrimary}40`,
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>
              <motion.button
                onClick={() => {
                  nextSlide()
                  setAutoPlay(false)
                }}
                className="p-4 rounded-full transition-all"
                style={{
                  backgroundColor: `${currentTheme.colors.accentPrimary}20`,
                  color: currentTheme.colors.accentPrimary,
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: `${currentTheme.colors.accentPrimary}40`,
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </div>

            {/* Auto-play indicator */}
            <motion.div
              className="text-sm px-4 py-2 rounded-full"
              style={{
                backgroundColor: `${currentTheme.colors.accentPrimary}20`,
                color: currentTheme.colors.accentPrimary,
              }}
              animate={{ opacity: autoPlay ? 1 : 0.5 }}
            >
              {autoPlay ? "Auto-play" : "Paused"}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div
          className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
          style={{ borderColor: currentTheme.colors.textSecondary }}
        >
          <motion.div
            className="w-1.5 h-3 rounded-full"
            style={{ backgroundColor: currentTheme.colors.accentPrimary }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>
    </section>
  )
}
