"use client"

import React, { useRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  glowEffect?: boolean
  rippleEffect?: boolean
  disabled?: boolean
}

const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
  ghost: 'text-primary hover:bg-primary/10',
  gradient: 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg hover:shadow-xl'
}

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
  xl: 'h-14 px-8 text-lg'
}

export function AnimatedButton({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  glowEffect = false,
  rippleEffect = true,
  disabled = false,
  className,
  ...props
}: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (rippleEffect && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const ripple = document.createElement('span')
      ripple.className = 'absolute rounded-full bg-white/30 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-ping'
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`
      ripple.style.width = '20px'
      ripple.style.height = '20px'
      
      buttonRef.current.appendChild(ripple)
      
      setTimeout(() => {
        ripple.remove()
      }, 600)
    }
    
    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        'relative overflow-hidden rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none inline-flex items-center justify-center gap-2',
        variants[variant],
        sizes[size],
        glowEffect && 'hover:shadow-glow',
        className
      )}
      disabled={disabled || loading}
      onClick={handleClick}
      whileHover={{ 
        scale: disabled ? 1 : 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: disabled ? 1 : 0.98,
        transition: { duration: 0.1 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {loading && (
        <motion.div
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <motion.span
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {icon}
        </motion.span>
      )}
      
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {children}
      </motion.span>
      
      {!loading && icon && iconPosition === 'right' && (
        <motion.span
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {icon}
        </motion.span>
      )}
      
      {/* Gradient overlay for hover effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  )
}