"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { motion } from 'framer-motion'

// Dynamically import the 3D component to avoid SSR issues
const Avatar3D = dynamic(() => import('./Avatar3D'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
        />
        <p className="text-slate-600 font-medium">Cargando Avatar 3D...</p>
      </div>
    </div>
  )
})

interface Avatar3DWrapperProps {
  talking?: boolean
  emotion?: 'neutral' | 'happy' | 'concerned' | 'thoughtful'
  scale?: number
  interactive?: boolean
  className?: string
}

export default function Avatar3DWrapper({ 
  talking = false,
  emotion = 'neutral',
  scale = 1,
  interactive = true,
  className = "w-80 h-80"
}: Avatar3DWrapperProps) {
  return (
    <div className={`${className} relative rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50`}>
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-2"
            />
            <p className="text-slate-500 text-sm">Inicializando 3D...</p>
          </div>
        </div>
      }>
        <Avatar3D 
          talking={talking}
          emotion={emotion}
          scale={scale}
          interactive={interactive}
        />
      </Suspense>
    </div>
  )
}