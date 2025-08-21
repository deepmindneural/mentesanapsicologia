"use client"

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import { 
  Play, 
  ArrowRight, 
  Calendar, 
  MessageSquare, 
  User, 
  Clock, 
  Brain,
  Heart,
  Star,
  CheckCircle,
  Camera,
  Mic,
  Video,
  Shield,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  Pause,
  RotateCcw,
  Settings
} from "lucide-react";

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoProgress, setAutoProgress] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(8); // 8 seconds per step
  const [stepDuration] = useState(8); // 8 seconds per step
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const demoSteps = [
    {
      id: 1,
      title: "Registro y Test Inicial",
      description: "Crea tu cuenta y completa una breve evaluación psicológica",
      content: {
        type: "registration",
        data: {
          step: "Cuéntanos sobre ti",
          questions: [
            "¿Cuál es tu principal motivo de consulta?",
            "¿Has tenido terapia psicológica antes?",
            "¿Qué horarios prefieres para tus sesiones?"
          ]
        }
      }
    },
    {
      id: 2,
      title: "Selección de Psicólogo IA",
      description: "Basado en tu perfil, te recomendamos psicólogos especializados",
      content: {
        type: "psychologist-selection",
        data: {
          recommended: [
            {
              name: "Dra. Ana García",
              specialty: "Ansiedad y Depresión", 
              match: "95%",
              avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80"
            },
            {
              name: "Dr. Carlos Ruiz", 
              specialty: "Terapia de Pareja",
              match: "87%",
              avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80"
            }
          ]
        }
      }
    },
    {
      id: 3,
      title: "Agendamiento de Cita",
      description: "Selecciona fecha, hora y modalidad de tu primera sesión",
      content: {
        type: "appointment",
        data: {
          selectedDate: "25 de Agosto",
          availableSlots: ["10:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"],
          modalities: [
            { type: "avatar", name: "Sesión con Avatar IA", price: "Gratis" },
            { type: "video", name: "Videollamada", price: "45€" },
            { type: "chat", name: "Chat de Texto", price: "30€" }
          ]
        }
      }
    },
    {
      id: 4,
      title: "Sesión con Avatar IA",
      description: "Tu psicólogo te atiende a través de un avatar realista con IA",
      content: {
        type: "avatar-session",
        data: {
          psychologist: "Dra. Ana García",
          avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
          sessionStatus: "En sesión",
          features: ["Conversación natural", "Análisis emocional", "Herramientas terapéuticas"]
        }
      }
    },
    {
      id: 5,
      title: "Seguimiento y Progreso",
      description: "Recibe un plan personalizado y seguimiento continuo",
      content: {
        type: "progress",
        data: {
          nextSession: "1 de Septiembre",
          progress: 75,
          goals: ["Reducir ansiedad", "Mejorar sueño", "Técnicas de relajación"]
        }
      }
    }
  ];

  // Auto-progression logic
  useEffect(() => {
    if (!isPlaying || !autoProgress || isPaused) return;

    // Reset timer when step changes
    setTimeRemaining(stepDuration);

    // Start countdown
    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Move to next step or finish demo
          if (currentStep < demoSteps.length - 1) {
            setCurrentStep(currentStep + 1);
          } else {
            setIsPlaying(false);
            setAutoProgress(false);
          }
          return stepDuration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, autoProgress, isPaused, currentStep, stepDuration, demoSteps.length]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setAutoProgress(true);
    setIsPaused(false);
    setTimeRemaining(stepDuration);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const restartDemo = () => {
    setCurrentStep(0);
    setTimeRemaining(stepDuration);
    setIsPaused(false);
    setAutoProgress(true);
  };

  const toggleAutoProgress = () => {
    setAutoProgress(!autoProgress);
    if (autoProgress) {
      setIsPaused(false);
    }
  };

  const renderStepContent = (step: typeof demoSteps[0]) => {
    switch (step.content.type) {
      case "registration":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                {step.content.data.step}
              </h3>
              <p className="text-slate-600">Completa tu perfil psicológico inicial</p>
            </div>
            
            <div className="space-y-4">
              {step.content.data.questions.map((question, index) => (
                <div key={index} className="border border-slate-200 rounded-xl p-4">
                  <p className="font-medium text-slate-700 mb-3">{question}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <input type="radio" className="text-purple-600" />
                      <span className="text-slate-600">Ansiedad general</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="radio" className="text-purple-600" />
                      <span className="text-slate-600">Problemas de pareja</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="radio" className="text-purple-600" />
                      <span className="text-slate-600">Estrés laboral</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "psychologist-selection":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Psicólogos recomendados para ti
              </h3>
              <p className="text-slate-600">Seleccionados según tu perfil y necesidades</p>
            </div>
            
            <div className="grid gap-4">
              {step.content.data.recommended.map((psychologist, index) => (
                <motion.div 
                  key={index}
                  className="border-2 border-purple-200 rounded-xl p-4 hover:border-purple-400 transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src={psychologist.avatar} 
                        alt={psychologist.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <Brain className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800">{psychologist.name}</h4>
                      <p className="text-purple-600 font-medium">{psychologist.specialty}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-slate-600">4.9/5 • 2,840 sesiones</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{psychologist.match}</div>
                      <div className="text-sm text-slate-500">compatibilidad</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case "appointment":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Agenda tu primera sesión
              </h3>
              <p className="text-slate-600">Elige fecha, hora y modalidad</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calendar */}
              <div>
                <h4 className="font-semibold text-slate-700 mb-4">Fecha disponible</h4>
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="text-center mb-4">
                    <div className="text-lg font-bold text-purple-800">Agosto 2025</div>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center text-sm">
                    {["L", "M", "X", "J", "V", "S", "D"].map((day, index) => (
                      <div key={`day-${index}`} className="font-medium text-slate-600 p-2">{day}</div>
                    ))}
                    {Array.from({length: 31}, (_, i) => (
                      <button 
                        key={i} 
                        className={`p-2 rounded-lg ${
                          i + 1 === 25 
                            ? 'bg-purple-600 text-white' 
                            : i + 1 > 20 
                              ? 'hover:bg-purple-100 text-slate-700' 
                              : 'text-slate-300 cursor-not-allowed'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold text-slate-700 mb-3">Horarios disponibles</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {step.content.data.availableSlots.map((slot, index) => (
                      <button 
                        key={index}
                        className={`p-3 rounded-lg border transition-colors ${
                          index === 1 
                            ? 'border-purple-600 bg-purple-50 text-purple-700' 
                            : 'border-slate-200 hover:border-purple-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Modalities */}
              <div>
                <h4 className="font-semibold text-slate-700 mb-4">Modalidad de sesión</h4>
                <div className="space-y-3">
                  {step.content.data.modalities.map((modality, index) => (
                    <div 
                      key={index}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-colors ${
                        index === 0 
                          ? 'border-purple-600 bg-purple-50' 
                          : 'border-slate-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            {modality.type === 'avatar' && <Brain className="h-5 w-5 text-purple-600" />}
                            {modality.type === 'video' && <Video className="h-5 w-5 text-purple-600" />}
                            {modality.type === 'chat' && <MessageSquare className="h-5 w-5 text-purple-600" />}
                          </div>
                          <div>
                            <div className="font-medium text-slate-800">{modality.name}</div>
                            {index === 0 && (
                              <div className="text-sm text-purple-600 font-medium">¡Primera sesión gratis!</div>
                            )}
                          </div>
                        </div>
                        <div className="text-lg font-bold text-slate-800">{modality.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "avatar-session":
        return (
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 shadow-xl text-white">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Avatar Display */}
              <div className="lg:col-span-2">
                <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img 
                        src={step.content.data.avatar} 
                        alt={step.content.data.psychologist}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white/20"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold">{step.content.data.psychologist}</h3>
                      <p className="text-purple-100">Especialista en Ansiedad y Depresión</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-purple-100">{step.content.data.sessionStatus}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Simulated conversation */}
                  <div className="space-y-4 mb-6">
                    <motion.div 
                      className="bg-white/20 rounded-2xl p-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <p className="text-sm">
                        "Hola, soy la Dra. Ana. Es un placer conocerte. ¿Cómo te sientes hoy y qué te gustaría trabajar en nuestra sesión?"
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-purple-800/50 rounded-2xl p-4 ml-8"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2 }}
                    >
                      <p className="text-sm">
                        "Hola doctora. He estado sintiendo mucha ansiedad últimamente, especialmente en el trabajo..."
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Session controls */}
                  <div className="flex items-center justify-center gap-4">
                    <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                      <Mic className="h-5 w-5" />
                    </button>
                    <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                      <Camera className="h-5 w-5" />
                    </button>
                    <button className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Session Info */}
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="font-semibold mb-3">Características IA</h4>
                  <div className="space-y-2">
                    {step.content.data.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-purple-100">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <h4 className="font-semibold mb-3">Análisis en Tiempo Real</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Nivel de Ansiedad</span>
                        <span>70%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <motion.div 
                          className="bg-yellow-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '70%' }}
                          transition={{ delay: 1, duration: 1 }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progreso de Sesión</span>
                        <span>35%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <motion.div 
                          className="bg-green-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: '35%' }}
                          transition={{ delay: 1.5, duration: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "progress":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-purple-100">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Progress Overview */}
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Tu Progreso</h3>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-slate-800">Progreso General</h4>
                    <span className="text-2xl font-bold text-purple-600">{step.content.data.progress}%</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-3">
                    <motion.div 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${step.content.data.progress}%` }}
                      transition={{ delay: 0.5, duration: 1.5 }}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-800">Objetivos Trabajados</h4>
                  {step.content.data.goals.map((goal, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-slate-700">{goal}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Next Session */}
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Próxima Sesión</h3>
                
                <div className="border-2 border-purple-200 rounded-xl p-6 mb-6">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {step.content.data.nextSession}
                    </div>
                    <div className="text-slate-600">2:00 PM - 3:00 PM</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Brain className="h-5 w-5 text-purple-600" />
                      <span className="text-slate-700">Sesión con Avatar IA</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-pink-600" />
                      <span className="text-slate-700">Técnicas de relajación</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="text-slate-700">Dra. Ana García</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  <Calendar className="mr-2 h-4 w-4" />
                  Confirmar Asistencia
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
      {!isPlaying && (
        <section className="py-20 relative">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-3 mb-8">
                <Play className="h-5 w-5 text-purple-600" />
                <span className="text-purple-600 font-semibold">Demo Interactivo</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Descubre cómo funciona{" "}
                <span style={{
                  background: 'linear-gradient(to right, #9333ea, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Mente Sana
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                Explora paso a paso cómo puedes agendar citas con psicólogos especializados, 
                interactuar con avatares IA y recibir atención personalizada para tu bienestar mental.
              </p>

              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full px-4 py-2 mb-6">
                <Settings className="h-4 w-4 text-green-600" />
                <span className="text-green-600 font-medium text-sm">Demo automático e interactivo</span>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  onClick={startDemo}
                  className="text-white font-bold px-8 py-6 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #a855f7 100%)',
                  }}
                >
                  <Play className="mr-3 h-6 w-6" />
                  Iniciar Demo Automático
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </motion.div>
              
              {/* Features Preview */}
              <div className="grid md:grid-cols-3 gap-6 mt-16">
                {[
                  { icon: Calendar, title: "Agendamiento Fácil", desc: "Reserva citas en segundos" },
                  { icon: Brain, title: "Avatares IA", desc: "Psicólogos virtuales realistas" },
                  { icon: Heart, title: "Atención Personalizada", desc: "Tratamiento adaptado a ti" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-300"
                  >
                    <feature.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 text-sm">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Demo Content */}
      <AnimatePresence>
        {isPlaying && (
          <motion.section 
            className="py-10 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="container mx-auto px-4">
              {/* Progress Bar */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-slate-800">
                    Paso {currentStep + 1} de {demoSteps.length}
                  </h2>
                  <button 
                    onClick={() => setIsPlaying(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-slate-600" />
                  </button>
                </div>
                
                <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                  <motion.div 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="text-sm text-slate-600">
                  {Math.round(((currentStep + 1) / demoSteps.length) * 100)}% completado
                </div>

                {/* Auto-progress Controls */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mt-6 border border-purple-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={togglePause}
                          disabled={!autoProgress}
                          className="flex items-center gap-2"
                        >
                          {isPaused ? (
                            <>
                              <Play className="h-4 w-4" />
                              Continuar
                            </>
                          ) : (
                            <>
                              <Pause className="h-4 w-4" />
                              Pausar
                            </>
                          )}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={restartDemo}
                          className="flex items-center gap-2"
                        >
                          <RotateCcw className="h-4 w-4" />
                          Reiniciar
                        </Button>

                        <Button
                          variant={autoProgress ? "default" : "outline"}
                          size="sm"
                          onClick={toggleAutoProgress}
                          className="flex items-center gap-2"
                        >
                          <Settings className="h-4 w-4" />
                          {autoProgress ? "Automático" : "Manual"}
                        </Button>
                      </div>
                    </div>

                    {/* Timer Display */}
                    {autoProgress && !isPaused && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-600">
                          Siguiente paso en {timeRemaining}s
                        </span>
                        <div className="w-16 bg-purple-200 rounded-full h-2">
                          <motion.div 
                            className="bg-purple-600 h-2 rounded-full"
                            initial={{ width: "100%" }}
                            animate={{ width: `${(timeRemaining / stepDuration) * 100}%` }}
                            transition={{ duration: 0.1 }}
                          />
                        </div>
                      </div>
                    )}

                    {isPaused && autoProgress && (
                      <div className="flex items-center gap-2 text-yellow-600">
                        <Pause className="h-4 w-4" />
                        <span className="text-sm font-medium">Demo pausado</span>
                      </div>
                    )}

                    {!autoProgress && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <Settings className="h-4 w-4" />
                        <span className="text-sm font-medium">Modo manual activado</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="max-w-6xl mx-auto">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      {demoSteps[currentStep].title}
                    </h3>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                      {demoSteps[currentStep].description}
                    </p>
                  </div>
                  
                  {renderStepContent(demoSteps[currentStep])}
                </motion.div>

                {/* Navigation */}
                <div className="flex items-center justify-between max-w-4xl mx-auto">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="px-6 py-3"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Anterior
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {demoSteps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentStep(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentStep 
                            ? 'bg-purple-600' 
                            : index < currentStep 
                              ? 'bg-purple-300' 
                              : 'bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {currentStep < demoSteps.length - 1 ? (
                    <Button
                      onClick={nextStep}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3"
                    >
                      Siguiente
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setIsPlaying(false)}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Finalizar Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}