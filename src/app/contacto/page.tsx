"use client"

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import { ArrowRight, Mail, Phone, MapPin, Clock, MessageSquare, Send, Shield } from "lucide-react";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado:", formData);
    alert("¡Mensaje enviado! Te contactaremos pronto.");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
          linear-gradient(135deg, #fdf2f8 0%, #f8fafc 100%)
        `
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-xl animate-bounce-gentle"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-fuchsia-200/20 rounded-full blur-lg animate-float"></div>
      </div>

      <Navbar />

      {/* Hero Section with different design */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-4 py-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <MessageSquare className="h-4 w-4 text-purple-600" />
                Contacto directo
              </motion.div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Hablemos sobre tu{" "}
                <span style={{
                  background: 'linear-gradient(to right, #9333ea, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>bienestar mental</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Nuestro equipo está listo para escucharte. Te respondemos en menos de 2 horas.
              </p>
              
              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Respuesta rápida</h3>
                    <p className="text-sm text-slate-600">Menos de 2 horas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">100% Privado</h3>
                    <p className="text-sm text-slate-600">Confidencial</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right side - Visual */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="h-20 w-20 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">¿Tienes dudas?</h3>
                    <p className="text-slate-600">Estamos aquí para ti</p>
                  </div>
                </div>
                
                {/* Floating cards */}
                <motion.div 
                  className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-semibold">Email</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl"
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                >
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-pink-600" />
                    <span className="text-sm font-semibold">Teléfono</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulario de Contacto */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="shadow-2xl border-0 hover:shadow-3xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl">Envíanos un mensaje</CardTitle>
                  <CardDescription>
                    Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">
                          Nombre completo
                        </label>
                        <Input
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          placeholder="Tu nombre"
                          required
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">
                          Email
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="tu@email.com"
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">
                          Teléfono (opcional)
                        </label>
                        <Input
                          name="telefono"
                          type="tel"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          placeholder="+34 XXX XXX XXX"
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">
                          Asunto
                        </label>
                        <select
                          name="asunto"
                          value={formData.asunto}
                          onChange={(e) => setFormData({...formData, asunto: e.target.value})}
                          required
                          className="w-full h-12 px-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Selecciona un asunto</option>
                          <option value="informacion">Información general</option>
                          <option value="soporte">Soporte técnico</option>
                          <option value="ventas">Consulta de ventas</option>
                          <option value="partnership">Alianzas comerciales</option>
                          <option value="prensa">Prensa y medios</option>
                          <option value="otro">Otro</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">
                        Mensaje
                      </label>
                      <textarea
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        placeholder="Cuéntanos cómo podemos ayudarte..."
                        required
                        rows={5}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full h-12 text-white hover:shadow-lg transition-all duration-300"
                      style={{
                        background: 'linear-gradient(to right, #9333ea, #ec4899)',
                      }}
                    >
                      Enviar mensaje
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Información de Contacto */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Información rápida */}
              <div className="grid gap-6">
                <Card className="hover:shadow-lg transition-all duration-300 hover:border-purple-200 border">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Email</h3>
                      <p className="text-slate-600">contacto@mentesana.es</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 hover:border-purple-200 border">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Phone className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Teléfono</h3>
                      <p className="text-slate-600">+34 900 123 456</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 hover:border-purple-200 border">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Oficina Central</h3>
                      <p className="text-slate-600">Calle de Alcalá, 42</p>
                      <p className="text-slate-600">28014 Madrid, España</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 hover:border-purple-200 border">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Horarios</h3>
                      <p className="text-slate-600">Lun - Vie: 9:00 - 18:00 CET</p>
                      <p className="text-slate-600">Sábados: 10:00 - 14:00 CET</p>
                      <p className="text-slate-600">Chat IA: 24/7</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chat directo */}
              <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">¿Necesitas ayuda inmediata?</h3>
                  <p className="text-purple-100 mb-4">
                    Nuestro chat con IA está disponible 24/7 para responder tus preguntas.
                  </p>
                  <Link href="/chat">
                    <Button className="bg-white text-purple-600 hover:bg-gray-100 hover:shadow-lg transition-all duration-300">
                      Iniciar Chat
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Preguntas <span style={{
                background: 'linear-gradient(to right, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Frecuentes</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                pregunta: "¿Cómo funciona el chat con IA?",
                respuesta: "Nuestros avatares IA están entrenados con las metodologías específicas de cada psicólogo, permitiendo conversaciones naturales y personalizadas."
              },
              {
                pregunta: "¿Es seguro compartir información personal?",
                respuesta: "Sí, cumplimos con el RGPD (Reglamento General de Protección de Datos) y la normativa española de protección de datos sanitarios. Toda la información está encriptada."
              },
              {
                pregunta: "¿Puedo cambiar de psicólogo?",
                respuesta: "Por supuesto. Puedes explorar diferentes especialistas y encontrar el que mejor se adapte a tus necesidades."
              },
              {
                pregunta: "¿Qué pasa en una crisis?",
                respuesta: "Tenemos protocolos de emergencia 24/7 que conectan inmediatamente con profesionales colegiados en España y con servicios de emergencia si es necesario."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg hover:border-purple-200 transition-all duration-300 border">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-slate-800 mb-3 hover:text-purple-600 transition-colors">{faq.pregunta}</h3>
                    <p className="text-slate-600">{faq.respuesta}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}