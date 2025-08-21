"use client"

import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

// Logo mejorado y profesional para psicología
export function MenteSanaLogo({ size = 40, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Círculo exterior con gradiente morado/rosa */}
      <circle
        cx="120"
        cy="120"
        r="115"
        fill="url(#mainGradient)"
        stroke="url(#borderGradient)"
        strokeWidth="3"
      />
      
      {/* Círculo interior suave */}
      <circle
        cx="120"
        cy="120"
        r="100"
        fill="url(#innerGradient)"
        opacity="0.9"
      />
      
      {/* Cerebro principal más detallado */}
      <g transform="translate(120,120)">
        {/* Hemisferio izquierdo */}
        <path
          d="M-35 -25c-12 0-20 8-20 18 0 5 2 9 6 12-3 4-5 9-5 14 0 14 11 24 25 24h20c8 0 15-4 19-10"
          fill="url(#brainLeft)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
        
        {/* Hemisferio derecho */}
        <path
          d="M35 -25c12 0 20 8 20 18 0 5-2 9-6 12 3 4 5 9 5 14 0 14-11 24-25 24h-20c-8 0-15-4-19-10"
          fill="url(#brainRight)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
        
        {/* Conexión central */}
        <ellipse cx="0" cy="5" rx="8" ry="25" fill="url(#centerConnection)" opacity="0.8" />
      </g>
      
      {/* Conexiones neuronales más elegantes */}
      <g opacity="0.6">
        {/* Nodos principales */}
        <circle cx="90" cy="100" r="3" fill="url(#nodeGradient)" />
        <circle cx="150" cy="100" r="3" fill="url(#nodeGradient)" />
        <circle cx="120" cy="140" r="3" fill="url(#nodeGradient)" />
        <circle cx="105" cy="85" r="2" fill="url(#nodeGradient)" />
        <circle cx="135" cy="85" r="2" fill="url(#nodeGradient)" />
        
        {/* Conexiones principales */}
        <path
          d="M90 100 Q 120 90 150 100"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M90 100 Q 105 120 120 140"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M150 100 Q 135 120 120 140"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        
        {/* Conexiones secundarias */}
        <line x1="105" y1="85" x2="135" y2="85" stroke="url(#connectionGradient)" strokeWidth="1.5" opacity="0.5" />
        <line x1="105" y1="85" x2="90" y2="100" stroke="url(#connectionGradient)" strokeWidth="1" opacity="0.5" />
        <line x1="135" y1="85" x2="150" y2="100" stroke="url(#connectionGradient)" strokeWidth="1" opacity="0.5" />
      </g>
      
      {/* Ondas de energía mental más sofisticadas */}
      <g opacity="0.4">
        <path
          d="M50 70 Q 85 50 120 70 Q 155 50 190 70"
          stroke="url(#waveGradient)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M60 85 Q 90 70 120 85 Q 150 70 180 85"
          stroke="url(#waveGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M60 155 Q 90 170 120 155 Q 150 170 180 155"
          stroke="url(#waveGradient)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M50 170 Q 85 190 120 170 Q 155 190 190 170"
          stroke="url(#waveGradient)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      
      {/* Puntos de luz decorativos */}
      <g opacity="0.3">
        <circle cx="70" cy="60" r="2" fill="#fbbf24" />
        <circle cx="170" cy="60" r="1.5" fill="#f59e0b" />
        <circle cx="60" cy="180" r="1.5" fill="#ec4899" />
        <circle cx="180" cy="180" r="2" fill="#a855f7" />
      </g>
      
      <defs>
        {/* Gradiente principal del círculo */}
        <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f3e8ff" />
          <stop offset="30%" stopColor="#e879f9" />
          <stop offset="70%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        
        {/* Gradiente del borde */}
        <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        
        {/* Gradiente interior */}
        <radialGradient id="innerGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="70%" stopColor="rgba(248,250,252,0.7)" />
          <stop offset="100%" stopColor="rgba(241,245,249,0.5)" />
        </radialGradient>
        
        {/* Gradientes del cerebro */}
        <linearGradient id="brainLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ddd6fe" />
          <stop offset="100%" stopColor="#c4b5fd" />
        </linearGradient>
        
        <linearGradient id="brainRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fce7f3" />
          <stop offset="100%" stopColor="#f9a8d4" />
        </linearGradient>
        
        <linearGradient id="centerConnection" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e879f9" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        
        {/* Gradientes para conexiones */}
        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        
        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="50%" stopColor="#e879f9" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Icono de chat inteligente
export function SmartChatIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.36L2 22l5.64-1.05C9.96 21.64 11.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"
        fill="url(#chatGradient)"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <circle cx="8" cy="12" r="1.5" fill="white" />
      <circle cx="12" cy="12" r="1.5" fill="white" />
      <circle cx="16" cy="12" r="1.5" fill="white" />
      <path
        d="M9 8.5c0-.83.67-1.5 1.5-1.5h3c.83 0 1.5.67 1.5 1.5"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b95f2" />
          <stop offset="100%" stopColor="#2577e7" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Icono de psicólogos especializados
export function PsychologistNetworkIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="8" r="3" fill="url(#peopleGradient)" />
      <path
        d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z"
        fill="url(#peopleGradient)"
      />
      <circle cx="6" cy="6" r="2" fill="url(#people2Gradient)" opacity="0.8" />
      <circle cx="18" cy="6" r="2" fill="url(#people2Gradient)" opacity="0.8" />
      <path
        d="M6 12c-2 0-4 1-4 2v1h3v-1c0-.5.5-1.2 1-1.5z"
        fill="url(#people2Gradient)"
        opacity="0.8"
      />
      <path
        d="M18 12c2 0 4 1 4 2v1h-3v-1c0-.5-.5-1.2-1-1.5z"
        fill="url(#people2Gradient)"
        opacity="0.8"
      />
      <defs>
        <linearGradient id="peopleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="people2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Icono de tests psicológicos
export function PsychTestIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        fill="url(#testGradient)"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path
        d="M7 8h10M7 12h8M7 16h6"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="17" cy="7" r="2" fill="#fbbf24" />
      <path
        d="M16 7l.5.5L18 6"
        stroke="white"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="testGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Icono de avatar IA
export function AIAvatarIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="9" r="7" fill="url(#avatarGradient)" />
      <circle cx="12" cy="7" r="3" fill="white" opacity="0.9" />
      <circle cx="10" cy="6.5" r="0.5" fill="#0ea5e9" />
      <circle cx="14" cy="6.5" r="0.5" fill="#0ea5e9" />
      <path
        d="M10.5 8.5c.5.3 1 .3 1.5 0s1-.3 1.5 0"
        stroke="#0ea5e9"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M7 14c1-1 2.5-1.5 5-1.5s4 .5 5 1.5"
        fill="white"
        opacity="0.7"
      />
      {/* Efectos de IA */}
      <g opacity="0.6">
        <circle cx="5" cy="5" r="1" fill="#f59e0b" />
        <circle cx="19" cy="5" r="1" fill="#f59e0b" />
        <circle cx="5" cy="19" r="1" fill="#f59e0b" />
        <circle cx="19" cy="19" r="1" fill="#f59e0b" />
      </g>
      <defs>
        <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Icono de seguridad avanzada
export function AdvancedSecurityIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
        fill="url(#securityGradient)"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="1" fill="white" opacity="0.7" />
      <defs>
        <linearGradient id="securityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Icono 24/7 con animación
export function Always24Icon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="10" fill="url(#timeGradient)" />
      <circle cx="12" cy="12" r="2" fill="white" />
      <path
        d="M12 6v6l4 2"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g opacity="0.7">
        <text x="12" y="4" textAnchor="middle" fill="white" fontSize="3" fontWeight="bold">24</text>
        <text x="20" y="13" textAnchor="middle" fill="white" fontSize="2" fontWeight="bold">7</text>
      </g>
      <defs>
        <linearGradient id="timeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
    </svg>
  )
}