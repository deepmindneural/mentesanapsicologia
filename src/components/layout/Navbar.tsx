"use client"

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MenteSanaLogo } from "@/components/ui/custom-icons";
import { ArrowRight, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
}

export default function Navbar({ 
  showBackButton = false, 
  backButtonText = "Volver al Inicio",
  backButtonHref = "/"
}: NavbarProps) {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    console.log('Navbar logout triggered')
    logout()
    // Small delay to ensure logout completes
    setTimeout(() => {
      router.push('/auth/login')
    }, 100)
  }

  const getDashboardLink = () => {
    if (!user) return '/auth/login'
    switch (user.role) {
      case 'ADMIN':
        return '/admin'
      case 'PSYCHOLOGIST':
        return '/dashboard/psicologo'
      case 'CLIENT':
        return '/dashboard/paciente'
      default:
        return '/auth/login'
    }
  }
  return (
    <motion.header 
      className="glass-effect border-b sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <Link href="/" className="flex items-center gap-3">
              <MenteSanaLogo size={40} />
              <div>
                <h1 className="text-2xl font-bold" style={{
                  background: 'linear-gradient(to right, #9333ea, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Mente Sana
                </h1>
                <p className="text-xs text-muted-foreground">Psicología con IA</p>
              </div>
            </Link>
          </motion.div>
          
          {/* Navigation Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/demo" className="text-slate-700 hover:text-purple-600 transition-colors font-medium">
              Demo
            </Link>
            <Link href="/servicios" className="text-slate-700 hover:text-purple-600 transition-colors font-medium">
              Servicios
            </Link>
            <Link href="/psicologos" className="text-slate-700 hover:text-purple-600 transition-colors font-medium">
              Psicólogos
            </Link>
            <Link href="/chat" className="text-slate-700 hover:text-purple-600 transition-colors font-medium">
              Chat IA
            </Link>
            <Link href="/sobre-nosotros" className="text-slate-700 hover:text-purple-600 transition-colors font-medium">
              Nosotros
            </Link>
            <Link href="/contacto" className="text-slate-700 hover:text-purple-600 transition-colors font-medium">
              Contacto
            </Link>
          </div>
          
          <div className="flex gap-3 items-center">
            {showBackButton && (
              <Link href={backButtonHref}>
                <Button variant="ghost" className="transition-all duration-200 hover:scale-105">
                  {backButtonText}
                </Button>
              </Link>
            )}
            
            {isAuthenticated && user ? (
              <>
                {/* User Info */}
                <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
                  <User className="h-4 w-4" />
                  <span>
                    {user.profile?.firstName || user.email}
                    {user.role === 'ADMIN' && ' (Admin)'}
                    {user.role === 'PSYCHOLOGIST' && ' (Psicólogo)'}
                  </span>
                </div>
                
                {/* Dashboard Link */}
                <Link href={getDashboardLink()}>
                  <Button variant="ghost" className="transition-all duration-200 hover:scale-105">
                    Mi Dashboard
                  </Button>
                </Link>
                
                {/* Logout Button */}
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  className="transition-all duration-200 hover:scale-105 text-red-600 border-red-300 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Salir
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="transition-all duration-200 hover:scale-105">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button 
                    className="transition-all duration-200 hover:shadow-lg text-white"
                    style={{
                      background: 'linear-gradient(to right, #9333ea, #ec4899)',
                    }}
                  >
                    Comenzar Gratis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </motion.header>
  );
}