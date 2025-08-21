"use client"

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MenteSanaLogo } from "@/components/ui/custom-icons";
import { ArrowRight } from "lucide-react";

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
          
          <div className="flex gap-3">
            {showBackButton && (
              <Link href={backButtonHref}>
                <Button variant="ghost" className="transition-all duration-200 hover:scale-105">
                  {backButtonText}
                </Button>
              </Link>
            )}
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
          </div>
        </nav>
      </div>
    </motion.header>
  );
}