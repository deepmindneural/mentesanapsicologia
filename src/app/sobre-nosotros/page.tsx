"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import { ArrowRight, Heart, Brain, Shield, Users, Target, Award, Calendar } from "lucide-react";

export default function SobreNosotrosPage() {
  const valores = [
    {
      icon: Heart,
      titulo: "Empatía",
      descripcion: "Entendemos que cada persona es única y merece un cuidado personalizado y comprensivo."
    },
    {
      icon: Brain,
      titulo: "Innovación",
      descripcion: "Combinamos la sabiduría de la psicología tradicional con tecnología de vanguardia."
    },
    {
      icon: Shield,
      titulo: "Confidencialidad",
      descripcion: "Cumplimos con el RGPD y normativas españolas de protección de datos sanitarios."
    },
    {
      icon: Users,
      titulo: "Accesibilidad",
      descripcion: "Hacemos que el cuidado mental sea accesible en toda España, sin barreras geográficas."
    }
  ];

  const equipo = [
    {
      nombre: "Dr. Miguel Hernández",
      cargo: "CEO & Fundador",
      imagen: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
      descripcion: "Psicólogo clínico colegiado en Madrid con 20 años de experiencia y pionero en terapia digital en España."
    },
    {
      nombre: "Ing. Sofia Chen",
      cargo: "CTO",
      imagen: "https://images.unsplash.com/photo-1494790108755-2616b39c5a11?auto=format&fit=crop&w=300&q=80",
      descripcion: "Experta en IA y machine learning, especializada en procesamiento de lenguaje natural."
    },
    {
      nombre: "Dra. Laura Martínez",
      cargo: "Directora Clínica",
      imagen: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
      descripcion: "Psicóloga colegiada que supervisa la calidad clínica y el entrenamiento de nuestros avatares IA."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Parallax Hero Section with full-width design */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `
            linear-gradient(45deg, 
              rgba(147, 51, 234, 0.9) 0%, 
              rgba(236, 72, 153, 0.8) 50%, 
              rgba(168, 85, 247, 0.9) 100%
            ),
            url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay pattern */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-300/20 rounded-full blur-2xl animate-bounce-gentle"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-pink-300/30 rounded-full blur-xl animate-pulse-soft"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Heart className="h-5 w-5" />
              Revolucionando la salud mental
            </motion.div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Transformando{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                vidas
              </span>
              {" "}con tecnología
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              Pioneros en España en democratizar la salud mental a través de la inteligencia artificial, 
              haciendo que el cuidado psicológico de calidad sea accesible para todos los españoles.
            </p>
            
            {/* Animated stats */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { number: "2019", text: "Fundada en Madrid", icon: Calendar },
                { number: "25,000+", text: "Españoles atendidos", icon: Users },
                { number: "98%", text: "Satisfacción", icon: Heart }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                  className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                >
                  <stat.icon className="h-8 w-8 text-yellow-300 mx-auto mb-3" />
                  <h3 className="text-3xl font-bold text-white mb-2">{stat.number}</h3>
                  <p className="text-white/80">{stat.text}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold hover:shadow-xl transition-all duration-300">
                Conocer el equipo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                Nuestra historia
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </section>

      {/* Valores Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Nuestros <span style={{
                background: 'linear-gradient(to right, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Valores</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Los principios que guían cada decisión y nos mantienen enfocados en nuestro propósito
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full text-center hover:shadow-xl transition-all duration-500">
                  <CardHeader>
                    <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <valor.icon className="h-8 w-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">{valor.titulo}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{valor.descripcion}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Nuestro <span style={{
                background: 'linear-gradient(to right, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Equipo</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Profesionales apasionados que trabajan día a día para revolucionar el cuidado de la salud mental
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {equipo.map((miembro, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-500 overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={miembro.imagen}
                      alt={miembro.nombre}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{miembro.nombre}</CardTitle>
                    <CardDescription className="text-purple-600 font-semibold">
                      {miembro.cargo}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-center">{miembro.descripcion}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Logros Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Nuestros Logros</h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Reconocimientos que validan nuestro compromiso con la excelencia en salud mental
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                titulo: "Premio Innovación Madrid 2023",
                descripcion: "Reconocimiento del Ayuntamiento de Madrid a la mejor startup de salud mental digital"
              },
              {
                icon: Target,
                titulo: "98% Satisfacción",
                descripcion: "Índice de satisfacción más alto del sector de e-salud en España"
              },
              {
                icon: Users,
                titulo: "25,000+ Usuarios",
                descripcion: "Comunidad creciente de españoles transformando sus vidas"
              }
            ].map((logro, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <logro.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{logro.titulo}</h3>
                <p className="text-purple-100">{logro.descripcion}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">¿Quieres ser parte del cambio?</h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Únete a nuestra misión de democratizar la salud mental y ayudar a millones de personas a vivir mejor.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="text-white hover:shadow-xl transition-all duration-300" style={{
                  background: 'linear-gradient(to right, #9333ea, #ec4899)'
                }}>
                  Comenzar Ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contacto">
                <Button size="lg" variant="outline">
                  Contáctanos
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}