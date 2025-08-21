"use client"

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import { 
  SmartChatIcon, 
  PsychologistNetworkIcon, 
  PsychTestIcon, 
  AIAvatarIcon 
} from "@/components/ui/custom-icons";
import { ArrowRight, Clock, Users, Star, Shield, Heart, Brain } from "lucide-react";

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-slate-900 mb-6">
              Nuestros <span style={{
                background: 'linear-gradient(to right, #2577e7, #3b95f2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Servicios</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Descubre una nueva forma de cuidar tu salud mental con tecnología de vanguardia y profesionales especializados
            </p>
          </motion.div>

          {/* Servicios Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: SmartChatIcon,
                title: "Chat con IA Especializada",
                description: "Conversaciones naturales con avatares que replican la personalidad y metodología de psicólogos reales",
                features: ["Disponible 24/7", "Respuestas personalizadas", "Múltiples especialidades"],
                price: "Desde $29/mes"
              },
              {
                icon: PsychologistNetworkIcon,
                title: "Red de Psicólogos",
                description: "Acceso a más de 60 psicólogos especializados con avatares IA únicos entrenados individualmente",
                features: ["60+ especialistas", "Todas las especialidades", "Perfiles verificados"],
                price: "Desde $49/mes"
              },
              {
                icon: PsychTestIcon,
                title: "Evaluaciones Interactivas",
                description: "Tests psicológicos avanzados con análisis detallados y seguimiento de progreso",
                features: ["Tests validados", "Análisis detallado", "Seguimiento temporal"],
                price: "Incluido en planes"
              },
              {
                icon: AIAvatarIcon,
                title: "Avatares Personalizados",
                description: "Interactúa con avatares 2D que se adaptan a tus preferencias y crean conexión emocional",
                features: ["Personalización completa", "Conexión emocional", "Múltiples estilos"],
                price: "Desde $39/mes"
              },
              {
                icon: Shield,
                title: "Seguridad Avanzada",
                description: "Protección de extremo a extremo para todas tus conversaciones y datos personales",
                features: ["Encriptación E2E", "Datos protegidos", "Cumplimiento HIPAA"],
                price: "Incluido siempre"
              },
              {
                icon: Heart,
                title: "Apoyo Emocional 24/7",
                description: "Soporte inmediato en momentos de crisis con protocolos de emergencia activados",
                features: ["Disponibilidad total", "Protocolos de crisis", "Respuesta inmediata"],
                price: "Incluido en Premium"
              }
            ].map((servicio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-500 overflow-hidden group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                      <servicio.icon size={32} style={{ color: '#3b95f2' }} />
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {servicio.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      {servicio.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {servicio.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">{servicio.price}</span>
                      <Button size="sm" className="text-white" style={{
                        background: 'linear-gradient(to right, #3b95f2, #2577e7)'
                      }}>
                        Conocer más
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">¿Listo para comenzar?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Únete a miles de personas que ya han mejorado su bienestar mental con nuestra plataforma
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Comenzar Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/chat">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Probar Chat IA
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}