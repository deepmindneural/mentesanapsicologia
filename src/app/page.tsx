"use client"

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import { 
  MenteSanaLogo, 
  SmartChatIcon, 
  AIAvatarIcon 
} from "@/components/ui/custom-icons";
import SimpleAvatar3D from "@/components/interactive/SimpleAvatar3D";
import { 
  ArrowRight, 
  MessageSquare, 
  X, 
  Minimize2, 
  Send, 
  Star,
  CheckCircle,
  Heart,
  Shield,
  Clock,
  Users,
  Brain,
  Sparkles,
  Phone,
  Mail,
  Calendar,
  Play,
  Zap,
  Cloud,
  Coffee,
  Smile,
  Target,
  TrendingUp,
  Briefcase,
  User,
  Crown
} from "lucide-react";

export default function Home() {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatbotMinimized, setChatbotMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [avatarTalking, setAvatarTalking] = useState(false);
  const [avatarEmotion, setAvatarEmotion] = useState<'neutral' | 'happy' | 'concerned' | 'thoughtful'>('neutral');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente virtual de Mente Sana. ¿En qué puedo ayudarte hoy?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    setTimeout(() => {
      setAvatarTalking(true);
      setAvatarEmotion('happy');
      const botResponse = {
        id: messages.length + 2,
        text: "Gracias por tu mensaje. Un psicólogo especializado te contactará pronto. Mientras tanto, ¿te gustaría acceder a nuestro chat con IA?",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      
      // Stop talking after 3 seconds and return to neutral
      setTimeout(() => {
        setAvatarTalking(false);
        setAvatarEmotion('neutral');
      }, 3000);
    }, 1000);
  };

  const tratamientos = [
    {
      titulo: "Ansiedad",
      descripcion: "Cuando la ansiedad llama a tu puerta sientes preocupaciones constantes o ataques de pánico y vives con un nudo en el estómago, inquietud y temor.",
      link: "Tratamiento para la ansiedad",
      color: "from-purple-500 to-pink-500",
      icon: Zap
    },
    {
      titulo: "Depresión",
      descripcion: "La depresión provoca una profunda tristeza, causando pérdida de interés en actividades, cambios en apetito y sueño, fatiga y dificultades para concentrarse.",
      link: "Tratamiento para la depresión",
      color: "from-indigo-500 to-purple-500",
      icon: Cloud
    },
    {
      titulo: "Estrés laboral",
      descripcion: "La presión en el trabajo provoca agotamiento físico y emocional, dificultando desconectar y afectando la calidad del sueño y las relaciones personales.",
      link: "Iniciar tratamiento gratis",
      color: "from-pink-500 to-fuchsia-500",
      icon: Briefcase
    },
    {
      titulo: "Relaciones personales",
      descripcion: "El estrés y el conflicto emocional que se sienten cuando tienes problemas para relacionarte dificultan la comunicación y establecer límites saludables.",
      link: "Iniciar tratamiento gratis",
      color: "from-violet-500 to-purple-500",
      icon: User
    },
    {
      titulo: "Autoestima y seguridad",
      descripcion: "La falta de amor propio hace que te cuestiones constantemente y genera miedo al rechazo, afectando el bienestar emocional y las relaciones con los demás.",
      link: "Ver todos los tratamientos",
      color: "from-fuchsia-500 to-pink-500",
      icon: Crown
    },
    {
      titulo: "Crisis de Pareja",
      descripcion: "Los problemas de pareja llevan a la desconexión, conflictos constantes y dificultades de comunicación, causando dolor emocional.",
      link: "Ver todos los tratamientos",
      color: "from-purple-500 to-violet-500",
      icon: Heart
    },
    {
      titulo: "Duelo",
      descripcion: "Perder a un ser querido implica atravesar emociones intensas como tristeza y confusión, afectando todas las áreas de la vida y dificultando la aceptación.",
      link: "Ver todos los tratamientos",
      color: "from-indigo-500 to-purple-500",
      icon: Coffee
    },
    {
      titulo: "Drogodependencias",
      descripcion: "Cualquier tipo de adicción afecta gravemente a la salud física y mental, causando cambios de comportamiento y problemas legales, financieros y sociales.",
      link: "Ver todos los tratamientos",
      color: "from-pink-500 to-purple-500",
      icon: Target
    }
  ];

  const planes = [
    {
      nombre: "Sesión Individual",
      precio: "45€",
      tipo: "/Sesión",
      descripcion: "Única Sesión",
      destacado: false,
      icon: Users,
      beneficios: ["Sesión de 50 minutos", "Psicólogo especializado", "Sin compromiso"],
      color: "from-slate-600 to-slate-700"
    },
    {
      nombre: "Bono Compañía",
      precio: "29,99€",
      tipo: "/Sesión",
      descripcion: "4 sesiones por 120€",
      destacado: false,
      icon: Coffee,
      beneficios: ["4 sesiones completas", "Ahorro de 60€", "Seguimiento continuo"],
      color: "from-purple-600 to-indigo-600"
    },
    {
      nombre: "Bono Felicidad",
      precio: "23€",
      tipo: "/Sesión",
      descripcion: "8 sesiones por 185€",
      destacado: true,
      icon: Smile,
      beneficios: ["8 sesiones completas", "Máximo ahorro: 175€", "Tratamiento completo", "Psicólogo IA 24/7"],
      color: "from-purple-500 to-pink-500"
    },
    {
      nombre: "Bono Amor para Parejas",
      precio: "45€",
      tipo: "/Sesión",
      descripcion: "4 sesiones para 2 personas",
      destacado: false,
      icon: Heart,
      beneficios: ["Terapia de pareja", "Dos personas incluidas", "Sesiones especializadas"],
      color: "from-pink-600 to-fuchsia-600"
    }
  ];

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(249, 168, 212, 0.8) 0%, transparent 50%),
          linear-gradient(135deg, #f8fafc 0%, #fdf2f8 100%)
        `
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-fuchsia-200/20 to-purple-200/20 rounded-full blur-lg animate-bounce-gentle"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-violet-200/15 to-pink-200/15 rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-purple-300/25 to-fuchsia-300/25 rounded-full blur-md animate-pulse-soft"></div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Main Content - Centered Layout */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative max-w-5xl mx-auto"
              >
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-8 -left-4 w-20 h-20 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div 
                className="absolute top-20 -right-8 w-16 h-16 bg-gradient-to-br from-fuchsia-200/40 to-violet-200/40 rounded-full blur-lg"
                animate={{ 
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />

              {/* Revolutionary badge */}
              <motion.div 
                className="relative mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              >
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 backdrop-blur-sm border border-purple-200/50 rounded-2xl px-6 py-4 shadow-lg">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="relative"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-ping opacity-20"></div>
                  </motion.div>
                  
                  <div className="text-left">
                    <div className="font-bold text-purple-800 text-sm uppercase tracking-wider">
                      🎁 Oferta de Lanzamiento
                    </div>
                    <div className="text-purple-600 font-semibold">
                      Primera sesión completamente GRATIS
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Revolutionary title */}
              <motion.div className="mb-8">
                <motion.h1 
                  className="text-4xl lg:text-7xl font-black leading-[0.9] mb-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <span className="block text-slate-900">Revolución en</span>
                  <span 
                    className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-violet-600"
                    style={{
                      backgroundSize: '200% 200%',
                      animation: 'gradient 3s ease infinite'
                    }}
                  >
                    salud mental
                  </span>
                  <span className="block text-slate-700 text-3xl lg:text-5xl font-semibold mt-2">
                    con inteligencia artificial
                  </span>
                </motion.h1>
                
                <motion.div
                  className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-violet-500 rounded-full mb-6"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
                />
              </motion.div>

              {/* Revolutionary description */}
              <motion.div 
                className="space-y-6 mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                  <div className="pl-8">
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">
                      🚀 El futuro de la terapia es hoy
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      Conversaciones profundas con IA entrenada por psicólogos profesionales. 
                      <span className="inline-block ml-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                        Sin esperas
                      </span>
                      <span className="inline-block ml-2 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-semibold">
                        Sin juicios  
                      </span>
                      <span className="inline-block ml-2 px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold">
                        Sin límites
                      </span>
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-violet-50 rounded-2xl p-6 border border-purple-100">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Tu momento es ahora</h4>
                      <p className="text-slate-600">Comienza tu transformación personal hoy mismo</p>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500 italic">
                    &ldquo;Dar el primer paso hacia el bienestar mental nunca había sido tan fácil&rdquo;
                  </div>
                </div>
              </motion.div>
              
              {/* Revolutionary action buttons */}
              <motion.div 
                className="space-y-4 mb-10"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/agendar" className="flex-1">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-violet-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <Button 
                        size="lg" 
                        className="relative w-full text-white font-bold px-8 py-6 text-xl rounded-2xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
                        style={{
                          background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #a855f7 100%)',
                        }}
                      >
                        <div className="flex items-center justify-center gap-3">
                          <Sparkles className="h-6 w-6" />
                          <span>Comenzar GRATIS ahora</span>
                          <motion.div
                            animate={{ x: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <ArrowRight className="h-6 w-6" />
                          </motion.div>
                        </div>
                        <div className="text-sm opacity-90 mt-1">
                          Primera sesión sin costo • Sin tarjeta
                        </div>
                      </Button>
                    </motion.div>
                  </Link>
                  
                  <Link href="/demo">
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="sm:w-auto"
                    >
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full sm:w-auto px-8 py-6 text-lg border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-500 rounded-2xl transition-all duration-300 group"
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                          <Play className="mr-3 h-5 w-5" />
                        </motion.div>
                        Ver cómo funciona
                      </Button>
                    </motion.div>
                  </Link>
                </div>
                
                {/* Trust indicators */}
                <motion.div 
                  className="flex items-center justify-center gap-6 text-sm text-slate-500 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Más de 50,000 usuarios activos</span>
                  </div>
                  <div className="h-4 w-px bg-slate-300"></div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>100% Confidencial</span>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Revolutionary features */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                {[
                  { 
                    icon: "🎁", 
                    title: "Sesión gratuita", 
                    desc: "60 minutos sin costo",
                    color: "from-green-500 to-emerald-500"
                  },
                  { 
                    icon: "🚫", 
                    title: "Cero compromisos", 
                    desc: "Cancela cuando quieras",
                    color: "from-blue-500 to-cyan-500"
                  },
                  { 
                    icon: "💳", 
                    title: "Sin tarjeta", 
                    desc: "No pedimos datos financieros",
                    color: "from-purple-500 to-violet-500"
                  },
                  { 
                    icon: "👨‍⚕️", 
                    title: "IA + Psicólogos", 
                    desc: "Lo mejor de ambos mundos",
                    color: "from-pink-500 to-rose-500"
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 + index * 0.15 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 hover:border-purple-300/50 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-xl shadow-lg`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900 group-hover:text-purple-700 transition-colors">
                            {feature.title}
                          </div>
                          <div className="text-sm text-slate-600">
                            {feature.desc}
                          </div>
                        </div>
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              </motion.div>
            </div>

            {/* Professional Dashboard Preview */}
            <motion.div 
              className="max-w-6xl mx-auto mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative">
                {/* Main Dashboard Interface */}
                <div className="bg-white rounded-2xl shadow-2xl border border-purple-100 overflow-hidden">
                  {/* Header Bar */}
                  <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          <Brain className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">Plataforma Mente Sana</h3>
                          <p className="text-purple-100 text-sm">Inteligencia Artificial Avanzada</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white text-sm">En línea</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="p-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                      {/* Left Panel - Chat Interface */}
                      <div className="lg:col-span-2">
                        <div className="mb-6">
                          <h4 className="text-xl font-semibold text-slate-800 mb-2">
                            Sesión con Dr. Ana García
                          </h4>
                          <p className="text-slate-600">Especialista en Ansiedad y Depresión</p>
                        </div>

                        {/* Chat Messages */}
                        <div className="space-y-4 mb-6">
                          <motion.div 
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 }}
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <Heart className="h-5 w-5 text-white" />
                            </div>
                            <div className="bg-purple-50 rounded-2xl p-4 max-w-sm">
                              <p className="text-slate-700 text-sm">
                                Hola, soy la Dra. Ana. Me complace acompañarte en este proceso. 
                                ¿Cómo te sientes hoy?
                              </p>
                              <span className="text-xs text-slate-500 mt-2 block">Hace 2 min</span>
                            </div>
                          </motion.div>

                          <motion.div 
                            className="flex items-start gap-3 justify-end"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.5 }}
                          >
                            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-4 max-w-sm">
                              <p className="text-white text-sm">
                                Gracias doctora. He estado sintiendo algo de ansiedad últimamente...
                              </p>
                              <span className="text-xs text-purple-200 mt-2 block">Hace 1 min</span>
                            </div>
                            <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="h-5 w-5 text-slate-600" />
                            </div>
                          </motion.div>

                          <motion.div 
                            className="flex items-center gap-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <Heart className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex items-center gap-2 text-purple-600">
                              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              <span className="text-sm ml-2">Escribiendo...</span>
                            </div>
                          </motion.div>
                        </div>

                        {/* Input Area */}
                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                          <input 
                            type="text" 
                            placeholder="Escribe tu mensaje..."
                            className="flex-1 bg-transparent outline-none text-slate-700"
                            disabled
                          />
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Right Panel - Analytics */}
                      <div className="space-y-6">
                        {/* Emotion Analysis */}
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5">
                          <h5 className="font-semibold text-purple-800 mb-4 flex items-center gap-2">
                            <Brain className="h-4 w-4" />
                            Análisis Emocional
                          </h5>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-600">Ansiedad</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-purple-200 rounded-full h-2">
                                  <motion.div 
                                    className="bg-purple-600 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: '70%' }}
                                    transition={{ delay: 2.5, duration: 1 }}
                                  />
                                </div>
                                <span className="text-xs text-slate-500">70%</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-600">Esperanza</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-green-200 rounded-full h-2">
                                  <motion.div 
                                    className="bg-green-500 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: '45%' }}
                                    transition={{ delay: 3, duration: 1 }}
                                  />
                                </div>
                                <span className="text-xs text-slate-500">45%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Session Stats */}
                        <div className="bg-white border border-purple-100 rounded-xl p-5">
                          <h5 className="font-semibold text-slate-800 mb-4">Estadísticas de Sesión</h5>
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Duración</span>
                              <span className="text-sm font-semibold text-purple-600">12:34</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Mensajes</span>
                              <span className="text-sm font-semibold text-purple-600">18</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-slate-600">Técnicas aplicadas</span>
                              <span className="text-sm font-semibold text-purple-600">3</span>
                            </div>
                          </div>
                        </div>

                        {/* Risk Assessment */}
                        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                          <h5 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Evaluación de Riesgo
                          </h5>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-green-700 font-medium">Nivel Bajo</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Professional Badges */}
                <motion.div 
                  className="absolute -top-8 -left-8 bg-white rounded-xl p-4 shadow-lg border border-purple-100"
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">50,000+</div>
                      <div className="text-xs text-slate-600">Usuarios activos</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute -top-8 -right-8 bg-white rounded-xl p-4 shadow-lg border border-purple-100"
                  animate={{ y: [2, -2, 2] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">4.9/5</div>
                      <div className="text-xs text-slate-600">Valoración</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-xl p-4 shadow-lg border border-purple-100"
                  animate={{ x: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      <Heart className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">98%</div>
                      <div className="text-xs text-slate-600">Satisfacción</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
                Únete a miles de personas que ya están transformando su bienestar mental con nuestra tecnología revolucionaria
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/chat">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      className="text-white font-bold px-8 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #a855f7 100%)',
                      }}
                    >
                      <MessageSquare className="mr-3 h-5 w-5" />
                      Probar Chat IA Gratis
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
                
                <Link href="/demo">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="px-8 py-4 text-lg border-2 border-purple-300 text-purple-700 hover:bg-purple-50 rounded-2xl"
                    >
                      <Play className="mr-3 h-5 w-5" />
                      Ver Demo
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Equipo de Psicólogos Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Nuestro equipo de{" "}
              <span style={{
                background: 'linear-gradient(to right, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>psicólogos especializados</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Profesionales con experiencia que combinan terapia tradicional con tecnología de IA
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Dra. Ana García",
                specialty: "Ansiedad y Depresión",
                experience: "15 años de experiencia",
                description: "Especialista en terapia cognitivo-conductual con enfoque en trastornos de ansiedad.",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
                rating: 4.9,
                sessions: 2840,
                certifications: ["TCC", "Mindfulness", "EMDR"]
              },
              {
                name: "Dr. Carlos Ruiz",
                specialty: "Terapia de Pareja",
                experience: "12 años de experiencia",
                description: "Experto en relaciones interpersonales y comunicación efectiva en parejas.",
                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
                rating: 4.8,
                sessions: 1950,
                certifications: ["Terapia Sistémica", "Mediación", "Comunicación"]
              },
              {
                name: "Dra. María López",
                specialty: "Psicología Infantil",
                experience: "18 años de experiencia",
                description: "Especializada en desarrollo infantil y trastornos del neurodesarrollo.",
                image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80",
                rating: 4.9,
                sessions: 3200,
                certifications: ["Terapia Lúdica", "ABA", "Neurodesarrollo"]
              }
            ].map((psychologist, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 group overflow-hidden border-0 bg-white/90 backdrop-blur-sm">
                  {/* Header with image */}
                  <div className="relative">
                    <div className="h-64 overflow-hidden">
                      <img
                        src={psychologist.image}
                        alt={psychologist.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    
                    {/* Floating avatar */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <div className="w-16 h-16 rounded-full border-4 border-white shadow-xl overflow-hidden">
                        <img
                          src={psychologist.image}
                          alt={psychologist.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    {/* Rating badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold text-slate-800">{psychologist.rating}</span>
                    </div>
                    
                    {/* AI Badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-3 py-1 flex items-center gap-1">
                      <Brain className="h-4 w-4" />
                      <span className="text-xs font-semibold">Con IA</span>
                    </div>
                  </div>
                  
                  <CardContent className="pt-12 pb-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-slate-900 mb-1">
                        {psychologist.name}
                      </h3>
                      <p className="text-purple-600 font-semibold mb-2">
                        {psychologist.specialty}
                      </p>
                      <p className="text-sm text-slate-500">
                        {psychologist.experience}
                      </p>
                    </div>
                    
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                      {psychologist.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-purple-600">
                          {psychologist.sessions.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-600">Sesiones</div>
                      </div>
                      <div className="bg-pink-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-pink-600">
                          {psychologist.rating}/5
                        </div>
                        <div className="text-xs text-slate-600">Rating</div>
                      </div>
                    </div>
                    
                    {/* Certifications */}
                    <div className="mb-4">
                      <div className="text-xs text-slate-500 mb-2">Especializaciones:</div>
                      <div className="flex flex-wrap gap-1">
                        {psychologist.certifications.map((cert, certIndex) => (
                          <span
                            key={certIndex}
                            className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-2 py-1 rounded-full"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Agendar con {psychologist.name.split(' ')[1]}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Call to Action */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-slate-600 mb-6">
              ¿No encuentras el especialista que buscas?
            </p>
            <Link href="/psicologos">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-500 px-8 py-4 text-lg"
                >
                  Ver todos los psicólogos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Tratamientos Section */}
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
              Contamos con especialistas en{" "}
              <span style={{
                background: 'linear-gradient(to right, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>cada una de estas áreas</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Descubre cuál es el tratamiento que mejor se adapta a ti.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="mt-6 text-purple-600 border-purple-300 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300" variant="outline">
                Ver todos los tratamientos
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="ml-2"
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tratamientos.map((tratamiento, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-500 group relative overflow-hidden border-0 hover:border hover:border-purple-200">
                  <motion.div 
                    className={`h-2 bg-gradient-to-r ${tratamiento.color} rounded-t-lg`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  ></motion.div>
                  
                  {/* Background icon with animation */}
                  <motion.div 
                    className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    <tratamiento.icon className="h-16 w-16 text-purple-600" />
                  </motion.div>
                  
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div 
                        className={`w-12 h-12 bg-gradient-to-r ${tratamiento.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <tratamiento.icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                        {tratamiento.titulo}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed group-hover:text-slate-700 transition-colors">
                      {tratamiento.descripcion}
                    </p>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Button 
                        variant="ghost" 
                        className="text-purple-600 hover:text-purple-700 p-0 h-auto font-semibold hover:bg-purple-50 rounded-lg px-2 py-1 transition-all duration-300"
                      >
                        {tratamiento.link} 
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="ml-1"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Lo que dicen nuestros{" "}
              <span style={{
                background: 'linear-gradient(to right, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>pacientes</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Miles de personas han transformado su bienestar mental con nosotros
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "María González",
                age: "28 años",
                issue: "Ansiedad",
                testimonial: "El sistema de IA me ayudó a entender mis patrones de ansiedad. La Dra. Ana García me guió perfectamente y ahora me siento mucho mejor.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b39c5a11?auto=format&fit=crop&w=150&q=80",
                sessions: 8,
                improvement: "90%"
              },
              {
                name: "Carlos Martín",
                age: "35 años", 
                issue: "Problemas de pareja",
                testimonial: "Las sesiones con el Dr. Ruiz salvaron mi matrimonio. La tecnología IA nos ayudó a comunicarnos mejor.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
                sessions: 12,
                improvement: "85%"
              },
              {
                name: "Ana Pérez",
                age: "42 años",
                issue: "Estrés laboral",
                testimonial: "Increíble cómo la IA puede detectar mis emociones. Me siento escuchada y comprendida en cada sesión.",
                rating: 5,
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
                sessions: 6,
                improvement: "95%"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-500 bg-white border border-slate-100">
                  <CardContent className="p-6">
                    {/* Rating */}
                    <div className="flex justify-center mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    
                    {/* Testimonial text */}
                    <blockquote className="text-slate-700 text-center mb-6 italic leading-relaxed">
                      &ldquo;{testimonial.testimonial}&rdquo;
                    </blockquote>
                    
                    {/* User info */}
                    <div className="flex items-center justify-center mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-purple-100"
                      />
                    </div>
                    
                    <div className="text-center mb-4">
                      <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                      <p className="text-sm text-slate-500">{testimonial.age} • {testimonial.issue}</p>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-purple-600">{testimonial.sessions}</div>
                        <div className="text-xs text-slate-600">Sesiones</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-green-600">{testimonial.improvement}</div>
                        <div className="text-xs text-slate-600">Mejora</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Los precios más{" "}
              <span style={{
                background: 'linear-gradient(to right, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>económicos en España</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Disponemos de 4 planes, según cada necesidad y tratamiento
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {planes.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className={`h-full hover:shadow-xl transition-all duration-500 relative overflow-hidden group ${
                  plan.destacado ? 'ring-2 ring-purple-500 transform scale-105' : ''
                }`}>
                  {plan.destacado && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                        Plan recomendado
                      </span>
                    </div>
                  )}
                  
                  {/* Background gradient with icon */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                  
                  {/* Background icon */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <plan.icon className="h-20 w-20 text-purple-600" />
                  </div>
                  
                  <CardHeader className="text-center relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                        <plan.icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">{plan.nombre}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-slate-900">{plan.precio}</span>
                      <span className="text-slate-500 ml-1">{plan.tipo}</span>
                    </div>
                    <p className="text-slate-600 text-sm mt-2">{plan.descripcion}</p>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    {/* Benefits list */}
                    <ul className="space-y-2 mb-6">
                      {plan.beneficios.map((beneficio, i) => (
                        <li key={i} className="flex items-center text-sm text-slate-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{beneficio}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full h-12 text-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                        plan.destacado 
                          ? 'text-white' 
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                      style={plan.destacado ? {
                        background: 'linear-gradient(to right, #9333ea, #ec4899)'
                      } : {}}
                    >
                      Elegir Plan
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
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
            <h2 className="text-4xl font-bold mb-6">¡Es el mejor momento para volver a ser tú!</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Reserva tu primera sesión, sin costo. Sólo tienes que elegir el día y la hora que más te convenga para comenzar.
            </p>
            <Link href="/agendar">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 hover:shadow-xl px-8 py-4 text-lg font-semibold transition-all duration-300">
                  Reservar sesión gratis
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="ml-2"
                  >
                    <Calendar className="h-5 w-5" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Full Body Psychologist Avatar */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.div
          initial={{ opacity: 0, scale: 0, x: -100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 100 }}
          className="relative cursor-pointer"
          onClick={() => setChatbotOpen(!chatbotOpen)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative">
            <SimpleAvatar3D 
              talking={avatarTalking}
              emotion={avatarEmotion}
              className="w-48 h-64 lg:w-56 lg:h-72"
            />
            
            {/* Hover ring effect */}
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 border-2 border-blue-400/30 rounded-xl pointer-events-none"
            />
            
            {/* Speaking indicator */}
            {avatarTalking && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </motion.div>
            )}
            
            {/* Chat connection line */}
            {chatbotOpen && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "calc(100vw - 400px)" }}
                transition={{ duration: 0.5 }}
                className="absolute top-1/2 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 opacity-50"
              />
            )}
          </div>
          
          {/* Interactive tooltip */}
          {!chatbotOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3, duration: 0.5 }}
              className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-3 shadow-lg border border-blue-100 min-w-[200px]"
            >
              <div className="text-sm text-slate-700 font-medium text-center">
                👋 ¡Hola! Soy el Dr. IA
              </div>
              <div className="text-xs text-blue-600 mt-1 text-center">
                Haz click aquí para hablar conmigo
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-3 h-3 bg-white border-b border-r border-blue-100 rotate-45"></div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        {/* Chatbot Window */}
        {chatbotOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: chatbotMinimized ? 0.9 : 1, 
              y: 0,
              height: chatbotMinimized ? "60px" : "400px"
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <AIAvatarIcon size={32} />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h4 className="font-semibold">Asistente Virtual</h4>
                  <p className="text-xs text-purple-100">En línea</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setChatbotMinimized(!chatbotMinimized)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setChatbotOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!chatbotMinimized && (
              <>
                {/* Messages */}
                <div className="h-72 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-2xl ${
                          msg.sender === "user"
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-sm"
                            : "bg-slate-100 text-slate-800 rounded-bl-sm"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === "user" ? "text-purple-100" : "text-slate-500"
                        }`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-slate-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-2 rounded-lg transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}


        {/* Chatbot Toggle Button */}
        <motion.button
          onClick={() => setChatbotOpen(!chatbotOpen)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            <MessageSquare className="h-6 w-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </motion.button>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <MenteSanaLogo size={48} />
                <div>
                  <h3 className="text-2xl font-bold">Mente Sana</h3>
                  <p className="text-slate-400">Psicología con IA</p>
                </div>
              </div>
              <p className="text-slate-300 mb-6 max-w-md">
                Revolucionando la salud mental con tecnología de inteligencia artificial 
                y el expertise de psicólogos profesionales.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="h-4 w-4" />
                  <span>hola@mentesanapsicologia.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Tratamientos</h4>
              <ul className="space-y-2 text-slate-300">
                <li><Link href="/ansiedad" className="hover:text-white transition-colors">Ansiedad y Depresión</Link></li>
                <li><Link href="/alimentacion" className="hover:text-white transition-colors">Trastornos de alimentación</Link></li>
                <li><Link href="/adicciones" className="hover:text-white transition-colors">Adicciones</Link></li>
                <li><Link href="/autoestima" className="hover:text-white transition-colors">Autoestima</Link></li>
                <li><Link href="/pareja" className="hover:text-white transition-colors">Terapia de pareja</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+34 613 12 80 41</span>
                </li>
                <li><Link href="/contacto" className="hover:text-white transition-colors">Centro de Ayuda</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacidad</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Términos</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>© 2025 Mente Sana Psicología. Todos los derechos reservados.</p>
            <p className="mt-2">Transformando vidas a través de la tecnología y la psicología</p>
          </div>
        </div>
      </footer>
    </div>
  );
}