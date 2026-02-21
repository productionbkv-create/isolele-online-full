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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "#0A0A0A" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Starfield universe background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Stars layer */}
            {Array.from({ length: 60 }).map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${1 + (i % 3)}px`,
                  height: `${1 + (i % 3)}px`,
                  backgroundColor: i % 5 === 0 ? "#D4AF37" : "#FFFFFF",
                  left: `${(i * 17.3) % 100}%`,
                  top: `${(i * 13.7) % 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + (i % 3),
                  delay: (i * 0.1) % 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* Cosmic nebula glow */}
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full blur-[120px]"
              style={{
                background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Main logo emerging from universe */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            animate={progress >= 100 ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 1, repeat: progress >= 100 ? 1 : 0 }}
          >
            {/* Masks logo image with portal emergence effect */}
            <motion.div
              className="relative mb-6"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Outer golden ring glow */}
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

              {/* Slow rotation of the masks circle */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Image
                  src="/images/isolele-masks-logo.png"
                  alt="ISOLELE - African Mythology. Reawakened."
                  width={320}
                  height={320}
                  className="w-56 h-56 sm:w-72 sm:h-72 object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                  priority
                />
              </motion.div>

              {/* Particle ring effect */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: "#D4AF37",
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    x: [0, Math.cos((i * Math.PI * 2) / 8) * 160],
                    y: [0, Math.sin((i * Math.PI * 2) / 8) * 160],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: 0.5 + i * 0.15,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1,
                  }}
                />
              ))}
            </motion.div>

            {/* Progress bar */}
            <div className="relative h-0.5 w-48 sm:w-64 overflow-hidden rounded-full bg-white/10">
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
              style={{ color: "#D3D3C7" }}
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
