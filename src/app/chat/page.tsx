"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import PsychologistSelector from '@/components/chat/PsychologistSelector'
import IntelligentChat from '@/components/chat/IntelligentChat'
import { PsychologistPersonality } from '@/services/personality'

export default function ChatPage() {
  const [selectedPsychologist, setSelectedPsychologist] = useState<PsychologistPersonality | null>(null)
  const [userId] = useState('user_' + Math.random().toString(36).substr(2, 9)) // En producción vendría de auth

  const handleSelectPsychologist = (psychologist: PsychologistPersonality) => {
    setSelectedPsychologist(psychologist)
  }

  const handleBackToSelection = () => {
    setSelectedPsychologist(null)
  }

  return (
    <div 
      className="min-h-screen"
      style={{
        background: selectedPsychologist 
          ? 'linear-gradient(135deg, #f8fafc 0%, #eff8ff 100%)'
          : `
            radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, #f8fafc 0%, #fdf2f8 100%)
          `
      }}
    >
      {!selectedPsychologist && <Navbar />}
      
      <AnimatePresence mode="wait">
        {!selectedPsychologist ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
          >
            {/* Hero Section */}
            <section className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-3 mb-8">
                  <span className="text-purple-600 font-semibold">🤖 Chat con IA</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  Chat inteligente con{" "}
                  <span style={{
                    background: 'linear-gradient(to right, #9333ea, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    psicólogos IA
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Conversa con avatares IA entrenados con la personalidad y metodología de psicólogos profesionales. 
                  Cada conversación se adapta a tu estado emocional y necesidades específicas.
                </p>
                
                {/* Features */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  {[
                    {
                      icon: "🧠",
                      title: "IA Empática",
                      description: "Reconoce y responde a tus emociones en tiempo real"
                    },
                    {
                      icon: "🔒",
                      title: "100% Privado",
                      description: "Conversaciones confidenciales y seguras"
                    },
                    {
                      icon: "⚡",
                      title: "Disponible 24/7",
                      description: "Apoyo inmediato cuando lo necesites"
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="text-3xl mb-3">{feature.icon}</div>
                      <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                      <p className="text-slate-600 text-sm">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>

            {/* Psychologist Selector */}
            <PsychologistSelector onSelect={handleSelectPsychologist} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            className="h-screen"
          >
            <IntelligentChat
              psychologist={selectedPsychologist}
              onBack={handleBackToSelection}
              userId={userId}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}