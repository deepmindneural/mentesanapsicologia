"use client"

import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { Html, OrbitControls, Text, Sphere, Box, useTexture } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

interface Avatar3DProps {
  talking?: boolean
  emotion?: 'neutral' | 'happy' | 'concerned' | 'thoughtful'
  scale?: number
  interactive?: boolean
}

function AvatarHead({ talking = false, emotion = 'neutral' }: { talking?: boolean, emotion?: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const eyeLeftRef = useRef<THREE.Mesh>(null)
  const eyeRightRef = useRef<THREE.Mesh>(null)
  const mouthRef = useRef<THREE.Mesh>(null)
  
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
    
    // Blinking animation
    if (eyeLeftRef.current && eyeRightRef.current) {
      const blink = Math.sin(state.clock.elapsedTime * 3) > 0.98 ? 0.1 : 1
      eyeLeftRef.current.scale.y = blink
      eyeRightRef.current.scale.y = blink
    }
    
    // Talking animation
    if (mouthRef.current && talking) {
      const talkScale = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.3
      mouthRef.current.scale.setScalar(talkScale)
    }
  })

  const headColor = hovered ? "#ec4899" : "#9333ea"
  const eyeColor = emotion === 'happy' ? "#10b981" : emotion === 'concerned' ? "#f59e0b" : "#3b82f6"

  return (
    <group ref={meshRef}>
      {/* Head */}
      <Sphere
        args={[1.2, 32, 32]}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={headColor}
          roughness={0.3}
          metalness={0.1}
        />
      </Sphere>
      
      {/* Eyes */}
      <Sphere
        ref={eyeLeftRef}
        args={[0.15, 16, 16]}
        position={[-0.3, 0.2, 0.8]}
      >
        <meshStandardMaterial color={eyeColor} />
      </Sphere>
      <Sphere
        ref={eyeRightRef}
        args={[0.15, 16, 16]}
        position={[0.3, 0.2, 0.8]}
      >
        <meshStandardMaterial color={eyeColor} />
      </Sphere>
      
      {/* Pupils */}
      <Sphere
        args={[0.08, 16, 16]}
        position={[-0.3, 0.2, 0.9]}
      >
        <meshStandardMaterial color="#1a1a1a" />
      </Sphere>
      <Sphere
        args={[0.08, 16, 16]}
        position={[0.3, 0.2, 0.9]}
      >
        <meshStandardMaterial color="#1a1a1a" />
      </Sphere>
      
      {/* Mouth */}
      <Box
        ref={mouthRef}
        args={[0.4, 0.1, 0.1]}
        position={[0, -0.3, 0.8]}
      >
        <meshStandardMaterial 
          color={emotion === 'happy' ? "#10b981" : "#ef4444"} 
        />
      </Box>
      
      {/* Hair/Brain representation */}
      <Sphere
        args={[1.3, 8, 8]}
        position={[0, 0.3, 0]}
      >
        <meshStandardMaterial 
          color="#6366f1"
          wireframe={true}
          opacity={0.6}
          transparent={true}
        />
      </Sphere>
    </group>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Group>(null)
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 50; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
        ],
        speed: Math.random() * 0.02 + 0.01,
      })
    }
    return temp
  }, [])

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002
      particlesRef.current.children.forEach((child, index) => {
        const particle = particles[index]
        child.position.y += particle.speed
        if (child.position.y > 5) {
          child.position.y = -5
        }
      })
    }
  })

  return (
    <group ref={particlesRef}>
      {particles.map((particle, index) => (
        <Sphere key={index} args={[0.02]} position={particle.position as [number, number, number]}>
          <meshStandardMaterial 
            color="#a855f7" 
            emissive="#a855f7"
            emissiveIntensity={0.2}
          />
        </Sphere>
      ))}
    </group>
  )
}

export default function Avatar3D({ 
  talking = false, 
  emotion = 'neutral', 
  scale = 1, 
  interactive = true 
}: Avatar3DProps) {
  const [currentEmotion, setCurrentEmotion] = useState(emotion)
  
  const emotions = ['neutral', 'happy', 'concerned', 'thoughtful']
  
  const cycleEmotion = () => {
    const currentIndex = emotions.indexOf(currentEmotion)
    const nextIndex = (currentIndex + 1) % emotions.length
    setCurrentEmotion(emotions[nextIndex] as any)
  }

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.8}
          castShadow
        />
        <pointLight 
          position={[-5, -5, -5]} 
          intensity={0.5}
          color="#ec4899"
        />
        
        {/* 3D Avatar */}
        <group scale={scale}>
          <AvatarHead talking={talking} emotion={currentEmotion} />
          <FloatingParticles />
        </group>
        
        {/* Floating Text */}
        <Text
          position={[0, -2.5, 0]}
          fontSize={0.3}
          color="#9333ea"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          Asistente IA
        </Text>
        
        {/* Interactive Controls */}
        {interactive && <OrbitControls enableZoom={false} enablePan={false} />}
      </Canvas>
      
      {/* Emotion Controls */}
      {interactive && (
        <div className="absolute bottom-4 left-4 right-4">
          <motion.div 
            className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Estado emocional:</span>
              <span className="text-xs text-slate-500 capitalize">{currentEmotion}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={cycleEmotion}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-colors"
              >
                Cambiar Emoción
              </button>
              <button
                onClick={() => {}}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  talking 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {talking ? 'Silenciar' : 'Hablar'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Status Indicators */}
      <div className="absolute top-4 right-4">
        <div className="flex space-x-2">
          {talking && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-3 h-3 bg-red-500 rounded-full"
            />
          )}
          <div className="w-3 h-3 bg-green-500 rounded-full opacity-60" />
        </div>
      </div>
    </div>
  )
}