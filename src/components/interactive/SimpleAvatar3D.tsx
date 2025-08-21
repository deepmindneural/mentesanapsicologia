"use client"

import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import * as THREE from 'three'

interface SimpleAvatar3DProps {
  talking?: boolean
  emotion?: 'neutral' | 'happy' | 'concerned' | 'thoughtful'
  className?: string
}

function HumanLikeAvatar({ talking = false, emotion = 'neutral' }: { talking?: boolean, emotion?: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Mesh>(null)
  const eyeLeftRef = useRef<THREE.Mesh>(null)
  const eyeRightRef = useRef<THREE.Mesh>(null)
  const mouthRef = useRef<THREE.Mesh>(null)
  const noseRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
    
    // Blinking animation
    if (eyeLeftRef.current && eyeRightRef.current) {
      const blink = Math.sin(state.clock.elapsedTime * 3) > 0.98 ? 0.1 : 1
      eyeLeftRef.current.scale.y = blink
      eyeRightRef.current.scale.y = blink
    }
    
    // Talking animation - more subtle mouth movement
    if (mouthRef.current && talking) {
      const talkScale = 1 + Math.sin(state.clock.elapsedTime * 6) * 0.2
      mouthRef.current.scale.y = talkScale
    }
  })

  // More realistic skin tone
  const skinColor = "#ffdbac"
  const eyeColor = "#4a90e2"
  const lipColor = emotion === 'happy' ? "#ff6b8a" : "#d4685a"

  return (
    <group ref={groupRef}>
      {/* Head - more oval shape */}
      <mesh ref={headRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial 
          color={skinColor} 
          roughness={0.8} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.4, 16]} />
        <meshStandardMaterial color={skinColor} roughness={0.8} />
      </mesh>
      
      {/* Hair */}
      <mesh position={[0, 0.3, -0.1]}>
        <sphereGeometry args={[0.85, 16, 16]} />
        <meshStandardMaterial 
          color="#4a3c28" 
          roughness={0.9}
        />
      </mesh>
      
      {/* Eyes - white part */}
      <mesh position={[-0.2, 0.1, 0.65]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.2, 0.1, 0.65]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Iris */}
      <mesh ref={eyeLeftRef} position={[-0.2, 0.1, 0.72]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial color={eyeColor} />
      </mesh>
      <mesh ref={eyeRightRef} position={[0.2, 0.1, 0.72]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial color={eyeColor} />
      </mesh>
      
      {/* Pupils */}
      <mesh position={[-0.2, 0.1, 0.75]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.2, 0.1, 0.75]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Eyebrows */}
      <mesh position={[-0.2, 0.25, 0.6]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.15, 0.03, 0.02]} />
        <meshStandardMaterial color="#3a2f1f" />
      </mesh>
      <mesh position={[0.2, 0.25, 0.6]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.15, 0.03, 0.02]} />
        <meshStandardMaterial color="#3a2f1f" />
      </mesh>
      
      {/* Nose */}
      <mesh ref={noseRef} position={[0, 0, 0.75]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color={skinColor} roughness={0.8} />
      </mesh>
      
      {/* Mouth */}
      <mesh ref={mouthRef} position={[0, -0.15, 0.7]}>
        <sphereGeometry args={[0.12, 12, 6]} />
        <meshStandardMaterial color={lipColor} roughness={0.6} />
      </mesh>
      
      {/* Cheeks - subtle */}
      <mesh position={[-0.35, -0.05, 0.5]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial 
          color="#ffb3a3" 
          transparent={true} 
          opacity={0.3}
          roughness={1}
        />
      </mesh>
      <mesh position={[0.35, -0.05, 0.5]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial 
          color="#ffb3a3" 
          transparent={true} 
          opacity={0.3}
          roughness={1}
        />
      </mesh>
    </group>
  )
}

export default function SimpleAvatar3D({ 
  talking = false, 
  emotion = 'neutral',
  className = "w-20 h-20"
}: SimpleAvatar3DProps) {
  const [hasError] = useState(true) // Force 2D fallback

  if (hasError) {
    // 2D Professional Psychologist Avatar - Simple and Clean
    return (
      <div className={`${className} relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center border border-blue-100 shadow-lg`}>
        {/* Simple doctor with subtle animation */}
        <motion.div
          animate={{ 
            scale: talking ? [1, 1.05, 1] : [1, 1.02, 1],
            y: [0, -2, 0]
          }}
          transition={{ 
            duration: talking ? 1 : 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-6xl mb-2"
        >
          👨‍⚕️
        </motion.div>
        
        <div className="text-center px-4">
          <h3 className="font-bold text-slate-800 text-lg">Dr. IA</h3>
          <p className="text-sm text-slate-600">Psicólogo Especialista</p>
        </div>
        
        {/* Status indicator */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/90 to-transparent p-2">
          <div className="flex items-center justify-center gap-2">
            <div className={`w-2 h-2 rounded-full ${talking ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
            <span className="text-xs text-slate-500">
              {talking ? 'Hablando...' : 'Disponible'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className} relative rounded-full overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50`}>
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 60 }}
        style={{ background: 'transparent' }}
        onError={handle3DError}
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl"
            >
              👨‍⚕️
            </motion.div>
          </div>
        }
      >
        {/* Enhanced Lighting for human features */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[2, 2, 2]} 
          intensity={1.2}
          castShadow
        />
        <pointLight 
          position={[-1, 1, 1]} 
          intensity={0.4}
          color="#ffeaa7"
        />
        <spotLight
          position={[0, 2, 2]}
          angle={0.3}
          intensity={0.5}
          penumbra={0.2}
        />
        
        {/* Human-like Avatar */}
        <HumanLikeAvatar talking={talking} emotion={emotion} />
      </Canvas>
      
      {/* Status indicator */}
      {talking && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
        />
      )}
    </div>
  )
}