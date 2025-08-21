"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import { AIAvatarIcon } from "@/components/ui/custom-icons";
import { ArrowRight, Star, MessageSquare, Calendar, Award, Heart, Brain, Users } from "lucide-react";

export default function PsicologosPage() {
  const psicologos = [
    {
      nombre: "Dra. Ana García",
      especialidad: "Ansiedad y Depresión",
      experiencia: "15 años",
      rating: 4.9,
      consultas: 2840,
      imagen: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
      descripcion: "Especialista en terapia cognitivo-conductual con enfoque en trastornos de ansiedad y depresión.",
      enfoque: ["CBT", "Mindfulness", "Terapia de Exposición"]
    },
    {
      nombre: "Dr. Carlos Ruiz",
      especialidad: "Terapia de Pareja",
      experiencia: "12 años",
      rating: 4.8,
      consultas: 1950,
      imagen: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80",
      descripcion: "Experto en relaciones interpersonales y comunicación efectiva en parejas.",
      enfoque: ["Terapia Sistémica", "Comunicación", "Resolución de Conflictos"]
    },
    {
      nombre: "Dra. María López",
      especialidad: "Psicología Infantil",
      experiencia: "18 años",
      rating: 4.9,
      consultas: 3200,
      imagen: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=300&q=80",
      descripcion: "Especializada en desarrollo infantil y trastornos del neurodesarrollo.",
      enfoque: ["Terapia Lúdica", "ABA", "Desarrollo Cognitivo"]
    },
    {
      nombre: "Dr. Roberto Silva",
      especialidad: "Adicciones",
      experiencia: "20 años",
      rating: 4.7,
      consultas: 2650,
      imagen: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80",
      descripcion: "Especialista en tratamiento de adicciones y rehabilitación integral.",
      enfoque: ["Terapia Motivacional", "Prevención de Recaídas", "Grupos de Apoyo"]
    },
    {
      nombre: "Dra. Carmen Vega",
      especialidad: "Trauma y PTSD",
      experiencia: "14 años",
      rating: 4.8,
      consultas: 1800,
      imagen: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=300&q=80",
      descripcion: "Experta en trauma complejo y trastorno de estrés postraumático.",
      enfoque: ["EMDR", "Terapia Narrativa", "Somática"]
    },
    {
      nombre: "Dr. Luis Morales",
      especialidad: "Psicología Laboral",
      experiencia: "16 años",
      rating: 4.6,
      consultas: 2100,
      imagen: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=300&q=80",
      descripcion: "Especializado en burnout, estrés laboral y desarrollo profesional.",
      enfoque: ["Coaching", "Gestión del Estrés", "Balance Vida-Trabajo"]
    }
  ];

  return (
    <div 
      className="min-h-screen relative"
      style={{
        background: `
          linear-gradient(135deg, #667eea 0%, #764ba2 100%),
          radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 70% 70%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)
        `
      }}
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl animate-bounce-gentle"></div>
      </div>

      <Navbar />

      {/* Hero Section with cards layout */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          {/* Header content */}
          <div className="text-center mb-16">
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Users className="h-4 w-4" />
              Expertos verificados
            </motion.div>
            
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Nuestros{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Psicólogos IA
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/90 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Cada avatar IA está entrenado con la personalidad y metodología única de psicólogos profesionales
            </motion.p>
            
            <motion.div
              className="flex justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3">
                <MessageSquare className="mr-2 h-4 w-4" />
                Hablar ahora
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-3">
                Ver especialidades
              </Button>
            </motion.div>
          </div>

          {/* Stats with glass effect */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Users, number: "60+", text: "Psicólogos Certificados" },
              { icon: Star, number: "4.8/5", text: "Rating Promedio" },
              { icon: MessageSquare, number: "50,000+", text: "Consultas Realizadas" },
              { icon: Award, number: "98%", text: "Satisfacción del Cliente" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="text-center bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30 hover:bg-white/30 transition-all duration-300"
              >
                <motion.div 
                  className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">{stat.number}</h3>
                <p className="text-white/80">{stat.text}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Specialists Grid Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Conoce a nuestros{" "}
              <span style={{
                background: 'linear-gradient(to right, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>especialistas</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Cada psicólogo ha sido cuidadosamente seleccionado y verificado
            </p>
          </motion.div>

          {/* Psicólogos Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {psicologos.map((psicologo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-500 overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={psicologo.imagen}
                      alt={psicologo.nombre}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                      <AIAvatarIcon size={20} style={{ color: '#3b95f2' }} />
                    </div>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{psicologo.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {psicologo.nombre}
                    </CardTitle>
                    <CardDescription className="text-blue-600 font-semibold">
                      {psicologo.especialidad}
                    </CardDescription>
                    <p className="text-sm text-slate-600">{psicologo.descripcion}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between mb-4 text-sm text-slate-600">
                      <span>{psicologo.experiencia} de experiencia</span>
                      <span>{psicologo.consultas} consultas</span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-slate-700 mb-2">Enfoques:</p>
                      <div className="flex flex-wrap gap-2">
                        {psicologo.enfoque.map((enfoque, i) => (
                          <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs">
                            {enfoque}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 text-white hover:shadow-lg transition-all duration-300" style={{
                        background: 'linear-gradient(to right, #9333ea, #ec4899)'
                      }}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat IA
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 hover:border-purple-300 hover:text-purple-600 transition-all duration-300">
                        <Calendar className="mr-2 h-4 w-4" />
                        Agendar
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
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">¿No encuentras tu especialista?</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Contamos con más de 60 psicólogos especializados en diferentes áreas. Contáctanos para encontrar el profesional ideal para ti.
            </p>
            <Link href="/contacto">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 hover:shadow-xl transition-all duration-300">
                Contactar Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}