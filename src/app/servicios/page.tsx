"use client"

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import { 
  ArrowRight, 
  Clock, 
  Users, 
  Star, 
  Shield, 
  Heart, 
  Brain,
  MessageSquare,
  Video,
  Calendar,
  Zap,
  Settings,
  Sparkles,
  UserPlus,
  Mic,
  CheckCircle,
  Award,
  Lock
} from "lucide-react";

export default function ServiciosPage() {
  const serviciosPacientes = [
    {
      icon: Brain,
      title: "Sesiones con Avatar IA",
      description: "Interactúa con avatares que replican la personalidad y metodología de psicólogos reales",
      features: ["Disponible 24/7", "Respuestas personalizadas", "Múltiples especialidades", "Primera sesión gratis"],
      price: "Desde €35/sesión",
      popular: true
    },
    {
      icon: Video,
      title: "Videollamadas con Psicólogos",
      description: "Sesiones cara a cara con psicólogos colegiados especializados en diferentes áreas",
      features: ["Profesionales colegiados", "Todas las especialidades", "Flexibilidad horaria", "Informes clínicos"],
      price: "Desde €60/sesión"
    },
    {
      icon: MessageSquare,
      title: "Chat de Texto",
      description: "Comunicación asíncrona con tu psicólogo a través de mensajes de texto",
      features: ["Respuestas en 24h", "Más económico", "Ideal para seguimiento", "Historial completo"],
      price: "Desde €30/sesión"
    },
    {
      icon: Calendar,
      title: "Planes de Terapia",
      description: "Programas estructurados de múltiples sesiones con descuentos especiales",
      features: ["Descuentos por pack", "Seguimiento continuo", "Objetivos específicos", "Flexibilidad de cambio"],
      price: "Desde €150/mes"
    },
    {
      icon: Zap,
      title: "Sesiones de Emergencia",
      description: "Atención inmediata en situaciones de crisis emocional o psicológica",
      features: ["Disponible 24/7", "Respuesta inmediata", "Profesionales especializados", "Sin cita previa"],
      price: "€80/sesión"
    },
    {
      icon: Award,
      title: "Evaluaciones Psicológicas",
      description: "Tests y evaluaciones completas para diagnóstico y seguimiento de progreso",
      features: ["Tests validados", "Análisis detallado", "Informes profesionales", "Seguimiento temporal"],
      price: "€45/evaluación"
    }
  ];

  const serviciosPsicologos = [
    {
      icon: Settings,
      title: "Panel de Control Profesional",
      description: "Dashboard avanzado para gestionar pacientes, citas e ingresos de manera eficiente",
      features: [
        "Gestión completa de pacientes",
        "Calendario inteligente con recordatorios", 
        "Análisis detallado de ingresos",
        "Reportes de progreso automáticos",
        "Comunicación integrada con pacientes",
        "Estadísticas profesionales"
      ],
      price: "€50/mes",
      popular: true
    },
    {
      icon: UserPlus,
      title: "Atracción de Pacientes",
      description: "Herramientas de marketing para aumentar tu base de pacientes en la plataforma",
      features: [
        "Perfil optimizado en la plataforma",
        "Posicionamiento en búsquedas",
        "Sistema de reseñas verificadas",
        "Marketing dirigido a tu especialidad",
        "Análisis de conversión detallado",
        "Promoción destacada"
      ],
      price: "€100/mes"
    },
    {
      icon: Award,
      title: "Certificación Digital",
      description: "Validación y certificación de tu perfil profesional en la plataforma",
      features: [
        "Verificación de credenciales",
        "Sello de calidad profesional",
        "Mayor confianza de pacientes",
        "Prioridad en búsquedas",
        "Acceso a funciones premium",
        "Soporte especializado"
      ],
      price: "€150/año"
    }
  ];

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
          linear-gradient(135deg, #f8fafc 0%, #fdf2f8 100%)
        `
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-fuchsia-200/20 to-purple-200/20 rounded-full blur-lg animate-bounce-gentle"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-violet-200/15 to-pink-200/15 rounded-full blur-2xl animate-float"></div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="py-12 sm:py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-3 mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Heart className="h-5 w-5 text-purple-600" />
              Servicios innovadores
            </motion.div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Nuestros <span style={{
                background: 'linear-gradient(to right, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Servicios</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Descubre una nueva forma de cuidar tu salud mental con tecnología de vanguardia y profesionales especializados
            </p>
          </motion.div>

        </div>
      </section>

      {/* Servicios para Pacientes */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-6">
              Para <span style={{
                background: 'linear-gradient(to right, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Pacientes</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Servicios diseñados para cuidar tu bienestar mental con la mejor tecnología
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviciosPacientes.map((servicio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="relative"
              >
                {servicio.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Más Popular
                    </div>
                  </div>
                )}
                <Card className="h-full hover:shadow-xl transition-all duration-500 overflow-hidden group border border-purple-100">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-4 group-hover:from-purple-200 group-hover:to-pink-200 transition-colors">
                      <servicio.icon className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
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
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <span className="text-lg font-bold text-purple-600">{servicio.price}</span>
                      <Button size="sm" className="text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-full sm:w-auto">
                        Reservar
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

      {/* Servicios para Psicólogos */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-6">
              Para <span style={{
                background: 'linear-gradient(to right, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Psicólogos</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              Herramientas profesionales para expandir tu práctica y crear tu avatar IA personalizado
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {serviciosPsicologos.map((servicio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="relative"
              >
                {servicio.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Más Popular
                    </div>
                  </div>
                )}
                <Card className="h-full hover:shadow-xl transition-all duration-500 overflow-hidden group border border-purple-100">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-4 group-hover:from-purple-200 group-hover:to-pink-200 transition-colors">
                      <servicio.icon className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
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
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <span className="text-lg font-bold text-purple-600">
                        {servicio.price}
                      </span>
                      <Button size="sm" className="text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-full sm:w-auto">
                        Contratar
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
      <section className="py-12 sm:py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-4xl font-bold mb-6">¿Listo para comenzar?</h2>
            <p className="text-lg sm:text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Únete a miles de personas que ya han mejorado su bienestar mental con nuestra plataforma
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 hover:shadow-xl transition-all duration-300">
                  Comenzar como Paciente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  Unirse como Psicólogo
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  Ver Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}