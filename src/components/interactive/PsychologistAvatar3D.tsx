"use client"

import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import * as THREE from 'three'

interface PsychologistAvatar3DProps {
  talking?: boolean
  emotion?: 'neutral' | 'happy' | 'concerned' | 'thoughtful'
  className?: string
}

function FullBodyPsychologist({ talking = false, emotion = 'neutral' }: { talking?: boolean, emotion?: string }) {
  const groupRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const eyeLeftRef = useRef<THREE.Mesh>(null)
  const eyeRightRef = useRef<THREE.Mesh>(null)
  const mouthRef = useRef<THREE.Mesh>(null)
  const leftArmRef = useRef<THREE.Group>(null)
  const rightArmRef = useRef<THREE.Group>(null)
  const glassesRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle breathing/floating
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.05
    }
    
    if (headRef.current) {
      // Head gentle movement
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
      headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.05
    }
    
    // Blinking animation
    if (eyeLeftRef.current && eyeRightRef.current) {
      const blink = Math.sin(state.clock.elapsedTime * 3) > 0.95 ? 0.1 : 1
      eyeLeftRef.current.scale.y = blink
      eyeRightRef.current.scale.y = blink
    }
    
    // Talking animation
    if (mouthRef.current && talking) {
      const talkScale = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.3
      mouthRef.current.scale.y = talkScale
    }
    
    // Arm movements for natural gestures
    if (leftArmRef.current && rightArmRef.current) {
      if (talking) {
        // Gesturing while talking
        leftArmRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.2
        rightArmRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2.5) * 0.2 - 0.2
      } else {
        // Subtle resting position movement
        leftArmRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.1 + 0.1
        rightArmRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.9) * 0.1 - 0.1
      }
    }
    
    // Glasses slight movement with head
    if (glassesRef.current && headRef.current) {
      glassesRef.current.rotation.copy(headRef.current.rotation)
    }
  })

  const skinColor = "#ffdbac"
  const hairColor = "#5d4e37"
  const eyeColor = emotion === 'happy' ? "#2d8659" : emotion === 'concerned' ? "#d97706" : "#2563eb"
  const lipColor = emotion === 'happy' ? "#ef4444" : "#dc2626"
  const shirtColor = "#1e40af" // Professional blue shirt
  const pantsColor = "#374151" // Dark grey pants
  const glassesColor = "#1f2937"

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Head */}
      <group ref={headRef} position={[0, 1.6, 0]}>
        {/* Face */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color={skinColor} roughness={0.8} />
        </mesh>
        
        {/* Hair */}
        <mesh position={[0, 0.15, -0.05]}>
          <sphereGeometry args={[0.38, 16, 16]} />
          <meshStandardMaterial color={hairColor} roughness={0.9} />
        </mesh>
        
        {/* Eyes - white part */}
        <mesh position={[-0.12, 0.05, 0.3]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.12, 0.05, 0.3]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        
        {/* Iris */}
        <mesh ref={eyeLeftRef} position={[-0.12, 0.05, 0.33]}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshStandardMaterial color={eyeColor} />
        </mesh>
        <mesh ref={eyeRightRef} position={[0.12, 0.05, 0.33]}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshStandardMaterial color={eyeColor} />
        </mesh>
        
        {/* Pupils */}
        <mesh position={[-0.12, 0.05, 0.35]}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0.12, 0.05, 0.35]}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Eyebrows */}
        <mesh position={[-0.12, 0.15, 0.28]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.08, 0.02, 0.01]} />
          <meshStandardMaterial color={hairColor} />
        </mesh>
        <mesh position={[0.12, 0.15, 0.28]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.08, 0.02, 0.01]} />
          <meshStandardMaterial color={hairColor} />
        </mesh>
        
        {/* Nose */}
        <mesh position={[0, -0.02, 0.32]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
        
        {/* Mouth */}
        <mesh ref={mouthRef} position={[0, -0.12, 0.3]}>
          <sphereGeometry args={[0.06, 12, 6]} />
          <meshStandardMaterial color={lipColor} />
        </mesh>
        
        {/* Professional Glasses */}
        <group ref={glassesRef} position={[0, 0.02, 0.25]}>
          {/* Lens frames */}
          <mesh position={[-0.12, 0, 0]}>
            <torusGeometry args={[0.08, 0.008, 8, 16]} />
            <meshStandardMaterial color={glassesColor} metalness={0.3} />
          </mesh>
          <mesh position={[0.12, 0, 0]}>
            <torusGeometry args={[0.08, 0.008, 8, 16]} />
            <meshStandardMaterial color={glassesColor} metalness={0.3} />
          </mesh>
          
          {/* Lenses */}
          <mesh position={[-0.12, 0, 0.01]}>
            <circleGeometry args={[0.07, 16]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent={true} 
              opacity={0.1}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          <mesh position={[0.12, 0, 0.01]}>
            <circleGeometry args={[0.07, 16]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent={true} 
              opacity={0.1}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          
          {/* Bridge */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.04, 8]} />
            <meshStandardMaterial color={glassesColor} />
          </mesh>
          
          {/* Temples */}
          <mesh position={[-0.18, 0, -0.05]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.006, 0.006, 0.15, 8]} />
            <meshStandardMaterial color={glassesColor} />
          </mesh>
          <mesh position={[0.18, 0, -0.05]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.006, 0.006, 0.15, 8]} />
            <meshStandardMaterial color={glassesColor} />
          </mesh>
        </group>
      </group>

      {/* Neck */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.15, 16]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>

      {/* Torso - more organic shape */}
      <mesh position={[0, 0.7, 0]} scale={[1, 1, 0.8]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>
      
      {/* Shirt front panel */}
      <mesh position={[0, 0.7, 0.25]} scale={[0.8, 1, 1]}>
        <sphereGeometry args={[0.32, 12, 12]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>
      
      {/* Shirt collar - V-neck style */}
      <mesh position={[0, 1.05, 0.22]}>
        <sphereGeometry args={[0.18, 12, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Professional tie with pattern */}
      <mesh position={[0, 0.85, 0.28]}>
        <sphereGeometry args={[0.05, 8, 12]} />
        <meshStandardMaterial color="#1e40af" />
      </mesh>
      <mesh position={[0, 0.65, 0.28]}>
        <sphereGeometry args={[0.06, 8, 12]} />
        <meshStandardMaterial color="#1e40af" />
      </mesh>
      
      {/* Suit jacket */}
      <mesh position={[0, 0.75, 0.15]} scale={[1.1, 1.1, 0.9]}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      {/* Arms - natural cylindrical shape with rounded joints */}
      <group ref={leftArmRef} position={[-0.42, 0.9, 0]}>
        {/* Shoulder joint */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        {/* Upper arm */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.25, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        {/* Elbow joint */}
        <mesh position={[0, -0.35, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        {/* Forearm */}
        <mesh position={[0, -0.55, 0]}>
          <cylinderGeometry args={[0.07, 0.08, 0.25, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        {/* Shirt cuff */}
        <mesh position={[0, -0.72, 0]}>
          <cylinderGeometry args={[0.085, 0.085, 0.05, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Wrist */}
        <mesh position={[0, -0.78, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.87, 0]}>
          <boxGeometry args={[0.08, 0.12, 0.04]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
        {/* Fingers */}
        <mesh position={[0, -0.95, 0.02]}>
          <boxGeometry args={[0.06, 0.08, 0.02]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
      </group>
      
      <group ref={rightArmRef} position={[0.42, 0.9, 0]}>
        {/* Shoulder joint */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        {/* Upper arm */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.25, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        {/* Elbow joint */}
        <mesh position={[0, -0.35, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        {/* Forearm */}
        <mesh position={[0, -0.55, 0]}>
          <cylinderGeometry args={[0.07, 0.08, 0.25, 16]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
        {/* Shirt cuff */}
        <mesh position={[0, -0.72, 0]}>
          <cylinderGeometry args={[0.085, 0.085, 0.05, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Wrist */}
        <mesh position={[0, -0.78, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.87, 0]}>
          <boxGeometry args={[0.08, 0.12, 0.04]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
        {/* Fingers */}
        <mesh position={[0, -0.95, 0.02]}>
          <boxGeometry args={[0.06, 0.08, 0.02]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
      </group>

      {/* Legs - natural cylindrical shape with rounded joints */}
      <group position={[0, 0, 0]}>
        {/* Left leg - upper thigh */}
        <mesh position={[-0.15, -0.2, 0]}>
          <cylinderGeometry args={[0.11, 0.13, 0.35, 16]} />
          <meshStandardMaterial color={pantsColor} />
        </mesh>
        {/* Left knee joint - rounded */}
        <mesh position={[-0.15, -0.4, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshStandardMaterial color={pantsColor} />
        </mesh>
        {/* Left leg - lower shin */}
        <mesh position={[-0.15, -0.7, 0]}>
          <cylinderGeometry args={[0.09, 0.11, 0.35, 16]} />
          <meshStandardMaterial color={pantsColor} />
        </mesh>
        
        {/* Right leg - upper thigh */}
        <mesh position={[0.15, -0.2, 0]}>
          <cylinderGeometry args={[0.11, 0.13, 0.35, 16]} />
          <meshStandardMaterial color={pantsColor} />
        </mesh>
        {/* Right knee joint - rounded */}
        <mesh position={[0.15, -0.4, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshStandardMaterial color={pantsColor} />
        </mesh>
        {/* Right leg - lower shin */}
        <mesh position={[0.15, -0.7, 0]}>
          <cylinderGeometry args={[0.09, 0.11, 0.35, 16]} />
          <meshStandardMaterial color={pantsColor} />
        </mesh>
        
        {/* Professional dress shoes */}
        <mesh position={[-0.15, -0.95, 0.08]}>
          <boxGeometry args={[0.16, 0.1, 0.28]} />
          <meshStandardMaterial color="#1f2937" roughness={0.3} metalness={0.1} />
        </mesh>
        <mesh position={[0.15, -0.95, 0.08]}>
          <boxGeometry args={[0.16, 0.1, 0.28]} />
          <meshStandardMaterial color="#1f2937" roughness={0.3} metalness={0.1} />
        </mesh>
        
        {/* Shoe toe caps - rounded front */}
        <mesh position={[-0.15, -0.95, 0.2]}>
          <sphereGeometry args={[0.08, 12, 8]} />
          <meshStandardMaterial color="#1f2937" roughness={0.3} metalness={0.1} />
        </mesh>
        <mesh position={[0.15, -0.95, 0.2]}>
          <sphereGeometry args={[0.08, 12, 8]} />
          <meshStandardMaterial color="#1f2937" roughness={0.3} metalness={0.1} />
        </mesh>
      </group>
      
      {/* Clipboard/Notepad (professional touch) */}
      <mesh position={[-0.3, 0.4, 0.2]} rotation={[0.3, 0.5, 0]}>
        <boxGeometry args={[0.15, 0.2, 0.01]} />
        <meshStandardMaterial color="#f9fafb" roughness={0.8} />
      </mesh>
      {/* Clipboard clip */}
      <mesh position={[-0.3, 0.52, 0.22]} rotation={[0.3, 0.5, 0]}>
        <boxGeometry args={[0.08, 0.02, 0.005]} />
        <meshStandardMaterial color="#6b7280" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}

export default function PsychologistAvatar3D({ 
  talking = false, 
  emotion = 'neutral',
  className = "w-64 h-80"
}: PsychologistAvatar3DProps) {
  const [hasError, setHasError] = useState(false)

  const handle3DError = () => {
    console.log('3D Psychologist Avatar error, falling back to 2D')
    setHasError(true)
  }

  if (hasError) {
    return (
      <div className={`${className} relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4`}>
        <motion.div
          animate={{ 
            scale: talking ? [1, 1.1, 1] : [1, 1.02, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: talking ? 0.5 : 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-6xl mb-2"
        >
          👨‍⚕️
        </motion.div>
        <div className="text-center">
          <h3 className="font-bold text-slate-800">Dr. IA Psicólogo</h3>
          <p className="text-sm text-slate-600">Tu asistente virtual</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className} relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ background: 'transparent' }}
        onError={handle3DError}
      >
        {/* Professional lighting setup */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[3, 5, 3]} 
          intensity={1.0}
          castShadow
        />
        <pointLight 
          position={[-2, 2, 2]} 
          intensity={0.3}
          color="#fbbf24"
        />
        <spotLight
          position={[0, 4, 3]}
          angle={0.4}
          intensity={0.6}
          penumbra={0.3}
          castShadow
        />
        
        {/* Full Body Psychologist */}
        <FullBodyPsychologist talking={talking} emotion={emotion} />
      </Canvas>
      
      {/* Professional overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/90 to-transparent p-4">
        <div className="text-center">
          <h3 className="font-bold text-slate-800 text-lg">Dr. IA</h3>
          <p className="text-sm text-slate-600">Psicólogo Especialista</p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <div className={`w-2 h-2 rounded-full ${talking ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
            <span className="text-xs text-slate-500">
              {talking ? 'Hablando...' : 'Disponible'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}