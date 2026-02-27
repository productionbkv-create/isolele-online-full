"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const duration = 3500
    const interval = 30
    const increment = 100 / (duration / interval)

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return Math.min(prev + increment, 100)
      })
    }, interval)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setIsComplete(true)
        setTimeout(onComplete, 800)
      }, 1000)
    }
  }, [progress, onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#FFFFFF" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Leopard pattern background at 15% opacity */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/images/leopard-pattern.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.15,
              pointerEvents: "none"
            }}
          />

          {/* Main logo with vibration animation */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            animate={{ y: [0, 2, -2, 0] }}
            transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY }}
          >
            {/* Golden ring glow around logo */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: "0 0 60px rgba(212,175,55,0.3), 0 0 120px rgba(212,175,55,0.1)",
              }}
              animate={{
                boxShadow: [
                  "0 0 60px rgba(212,175,55,0.2), 0 0 120px rgba(212,175,55,0.05)",
                  "0 0 80px rgba(212,175,55,0.4), 0 0 160px rgba(212,175,55,0.15)",
                  "0 0 60px rgba(212,175,55,0.2), 0 0 120px rgba(212,175,55,0.05)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />

            {/* Isolele logo - stays still but vibrates */}
            <motion.div
              className="relative mb-6"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/images/isolele-logo.png"
                alt="ISOLELE"
                width={320}
                height={320}
                className="w-56 h-56 sm:w-72 sm:h-72 object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                priority
              />
            </motion.div>

            {/* Progress bar */}
            <div className="relative h-0.5 w-48 sm:w-64 overflow-hidden rounded-full bg-gray-300">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #D4AF37, #B3541E)",
                }}
              />
              <motion.div
                className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: [-80, 260] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              className="mt-4 font-mono text-xs sm:text-sm tracking-[0.3em] text-center"
              style={{ color: "#333333" }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {progress < 100 ? "AFRICAN MYTHOLOGY. REAWAKENED." : "WELCOME TO ISOLELE"}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
