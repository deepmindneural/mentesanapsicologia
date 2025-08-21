"use client"

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import { 
  Calendar, 
  Clock, 
  User, 
  Brain,
  Video,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Star,
  Heart,
  Shield,
  CreditCard,
  Gift
} from "lucide-react";

export default function AgendarPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    psychologist: "",
    date: "",
    time: "",
    modality: "",
    name: "",
    email: "",
    phone: "",
    reason: ""
  });

  const psychologists = [
    {
      id: "ana-garcia",
      name: "Dra. Ana García",
      specialty: "Ansiedad y Depresión",
      experience: "15 años",
      rating: 4.9,
      sessions: 2840,
      price: 45,
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
      description: "Especialista en terapia cognitivo-conductual con enfoque en trastornos de ansiedad y depresión.",
      nextAvailable: "Hoy 2:00 PM"
    },
    {
      id: "carlos-ruiz", 
      name: "Dr. Carlos Ruiz",
      specialty: "Terapia de Pareja",
      experience: "12 años",
      rating: 4.8,
      sessions: 1950,
      price: 50,
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80",
      description: "Experto en relaciones interpersonales y comunicación efectiva en parejas.",
      nextAvailable: "Mañana 10:00 AM"
    },
    {
      id: "maria-lopez",
      name: "Dra. María López", 
      specialty: "Psicología Infantil",
      experience: "18 años",
      rating: 4.9,
      sessions: 3200,
      price: 40,
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=300&q=80",
      description: "Especializada en desarrollo infantil y trastornos del neurodesarrollo.",
      nextAvailable: "Pasado mañana 9:00 AM"
    }
  ];

  const modalities = [
    {
      id: "avatar",
      name: "Sesión con Avatar IA",
      description: "Interactúa con tu psicólogo a través de un avatar realista con IA avanzada",
      price: 0,
      duration: "60 min",
      icon: Brain,
      features: ["Primera sesión gratis", "Avatar realista", "Análisis emocional", "Disponible 24/7"],
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "video",
      name: "Videollamada",
      description: "Sesión cara a cara con tu psicólogo a través de videollamada segura",
      price: 45,
      duration: "50 min", 
      icon: Video,
      features: ["Interacción directa", "Alta calidad", "Grabación disponible", "Pantalla compartida"],
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "chat",
      name: "Chat de Texto",
      description: "Conversación escrita en tiempo real con tu psicólogo especializado",
      price: 30,
      duration: "45 min",
      icon: MessageSquare, 
      features: ["Más privado", "Reflexión pausada", "Historial completo", "Más económico"],
      color: "from-green-500 to-green-600"
    }
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
  ];

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSelect = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedPsychologist = psychologists.find(p => p.id === formData.psychologist);
  const selectedModality = modalities.find(m => m.id === formData.modality);

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
      <Navbar />

      {/* Progress Header */}
      <section className="py-8 border-b border-purple-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-slate-900">
                Agendar Cita
              </h1>
              <div className="text-sm text-slate-600">
                Paso {step} de 4
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-slate-200 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            {/* Step indicators */}
            <div className="flex justify-between mt-4">
              {["Psicólogo", "Modalidad", "Fecha & Hora", "Confirmación"].map((label, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-2 ${
                    index + 1 <= step ? 'text-purple-600' : 'text-slate-400'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index + 1 <= step 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-slate-200 text-slate-400'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Step 1: Select Psychologist */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Elige tu psicólogo especializado
                  </h2>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Selecciona al profesional que mejor se adapte a tus necesidades
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {psychologists.map((psychologist) => (
                    <motion.div
                      key={psychologist.id}
                      whileHover={{ y: -5 }}
                      className={`cursor-pointer ${
                        formData.psychologist === psychologist.id 
                          ? 'ring-2 ring-purple-500' 
                          : ''
                      }`}
                      onClick={() => handleSelect('psychologist', psychologist.id)}
                    >
                      <Card className="h-full hover:shadow-xl transition-all duration-300">
                        <CardHeader className="text-center">
                          <div className="relative mx-auto mb-4">
                            <img 
                              src={psychologist.avatar} 
                              alt={psychologist.name}
                              className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-purple-100"
                            />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                              <Brain className="h-4 w-4 text-white" />
                            </div>
                          </div>
                          
                          <CardTitle className="text-xl">{psychologist.name}</CardTitle>
                          <CardDescription className="text-purple-600 font-semibold">
                            {psychologist.specialty}
                          </CardDescription>
                          
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{psychologist.rating}</span>
                            <span className="text-slate-500">• {psychologist.sessions} sesiones</span>
                          </div>
                        </CardHeader>
                        
                        <CardContent>
                          <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                            {psychologist.description}
                          </p>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-600">Experiencia:</span>
                              <span className="font-medium">{psychologist.experience}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-slate-600">Precio sesión:</span>
                              <span className="font-bold text-purple-600">{psychologist.price}€</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-slate-600">Disponible:</span>
                              <span className="text-green-600 font-medium">{psychologist.nextAvailable}</span>
                            </div>
                          </div>
                          
                          <Button 
                            className={`w-full mt-4 ${
                              formData.psychologist === psychologist.id
                                ? 'bg-purple-600 hover:bg-purple-700'
                                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                            }`}
                          >
                            {formData.psychologist === psychologist.id ? (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Seleccionado
                              </>
                            ) : (
                              'Seleccionar'
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Select Modality */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Elige la modalidad de tu sesión
                  </h2>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Selecciona cómo prefieres tener tu sesión de terapia
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {modalities.map((modality) => (
                    <motion.div
                      key={modality.id}
                      whileHover={{ y: -5 }}
                      className={`cursor-pointer ${
                        formData.modality === modality.id 
                          ? 'ring-2 ring-purple-500' 
                          : ''
                      }`}
                      onClick={() => handleSelect('modality', modality.id)}
                    >
                      <Card className="h-full hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                        {modality.id === 'avatar' && (
                          <div className="absolute top-4 right-4">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                              <Gift className="h-3 w-3" />
                              GRATIS
                            </div>
                          </div>
                        )}
                        
                        <CardHeader className="text-center">
                          <div className={`w-16 h-16 bg-gradient-to-r ${modality.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                            <modality.icon className="h-8 w-8 text-white" />
                          </div>
                          
                          <CardTitle className="text-xl">{modality.name}</CardTitle>
                          <CardDescription className="text-slate-600">
                            {modality.description}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent>
                          <div className="text-center mb-6">
                            <div className="text-3xl font-bold text-slate-900">
                              {modality.price === 0 ? 'Gratis' : `${modality.price}€`}
                            </div>
                            <div className="text-slate-500">{modality.duration}</div>
                          </div>
                          
                          <div className="space-y-2 mb-6">
                            {modality.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span className="text-sm text-slate-600">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          <Button 
                            className={`w-full ${
                              formData.modality === modality.id
                                ? 'bg-purple-600 hover:bg-purple-700'
                                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                            }`}
                          >
                            {formData.modality === modality.id ? (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Seleccionado
                              </>
                            ) : (
                              'Seleccionar'
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Select Date & Time */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Selecciona fecha y hora
                  </h2>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Elige el momento que mejor se adapte a tu agenda
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Calendar */}
                  <Card className="p-6">
                    <CardHeader className="text-center">
                      <CardTitle className="flex items-center justify-center gap-2">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        Agosto 2025
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
                        {["L", "M", "M", "J", "V", "S", "D"].map(day => (
                          <div key={day} className="font-medium text-slate-600 p-2">{day}</div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-7 gap-2 text-center">
                        {Array.from({length: 31}, (_, i) => (
                          <button 
                            key={i}
                            onClick={() => handleSelect('date', `2025-08-${String(i + 1).padStart(2, '0')}`)}
                            className={`p-3 rounded-lg transition-colors ${
                              formData.date === `2025-08-${String(i + 1).padStart(2, '0')}`
                                ? 'bg-purple-600 text-white'
                                : i + 1 > 20 
                                  ? 'hover:bg-purple-50 text-slate-700 border border-purple-100'
                                  : 'text-slate-300 cursor-not-allowed'
                            }`}
                            disabled={i + 1 <= 20}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                      
                      {formData.date && (
                        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                          <div className="text-center">
                            <div className="font-semibold text-purple-800">Fecha seleccionada</div>
                            <div className="text-purple-600">
                              {new Date(formData.date).toLocaleDateString('es-ES', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Time Slots */}
                  <Card className="p-6">
                    <CardHeader className="text-center">
                      <CardTitle className="flex items-center justify-center gap-2">
                        <Clock className="h-5 w-5 text-purple-600" />
                        Horarios Disponibles
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      {!formData.date ? (
                        <div className="text-center py-12 text-slate-500">
                          <Calendar className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                          <p>Primero selecciona una fecha</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => handleSelect('time', time)}
                              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                formData.time === time
                                  ? 'border-purple-600 bg-purple-50 text-purple-700'
                                  : 'border-slate-200 hover:border-purple-300 hover:bg-purple-50'
                              }`}
                            >
                              <div className="font-medium">{time}</div>
                              <div className="text-sm text-slate-500">Disponible</div>
                            </button>
                          ))}
                        </div>
                      )}
                      
                      {formData.time && (
                        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                          <div className="text-center">
                            <div className="font-semibold text-purple-800">Hora seleccionada</div>
                            <div className="text-purple-600 text-lg">{formData.time}</div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4">
                    Confirma tu cita
                  </h2>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Revisa los detalles y completa tu información personal
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Appointment Summary */}
                  <Card className="p-6">
                    <CardHeader>
                      <CardTitle className="text-xl">Resumen de tu cita</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {/* Psychologist */}
                      <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
                        <img 
                          src={selectedPsychologist?.avatar} 
                          alt={selectedPsychologist?.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-slate-800">{selectedPsychologist?.name}</h3>
                          <p className="text-purple-600">{selectedPsychologist?.specialty}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-slate-600">{selectedPsychologist?.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Modality */}
                      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                        <div className={`w-12 h-12 bg-gradient-to-r ${selectedModality?.color} rounded-lg flex items-center justify-center`}>
                          {selectedModality?.icon && <selectedModality.icon className="h-6 w-6 text-white" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">{selectedModality?.name}</h3>
                          <p className="text-slate-600">{selectedModality?.duration}</p>
                        </div>
                      </div>
                      
                      {/* Date & Time */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-600">Fecha:</span>
                          <span className="font-medium">
                            {formData.date && new Date(formData.date).toLocaleDateString('es-ES')}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-slate-600">Hora:</span>
                          <span className="font-medium">{formData.time}</span>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-medium text-slate-800">Total:</span>
                          <span className="text-2xl font-bold text-purple-600">
                            {selectedModality?.price === 0 ? 'Gratis' : `${selectedModality?.price}€`}
                          </span>
                        </div>
                        {selectedModality?.price === 0 && (
                          <p className="text-sm text-green-600 mt-1">¡Primera sesión sin costo!</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Personal Information Form */}
                  <Card className="p-6">
                    <CardHeader>
                      <CardTitle className="text-xl">Información personal</CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Nombre completo *
                          </label>
                          <Input
                            placeholder="Tu nombre completo"
                            value={formData.name}
                            onChange={(e) => handleSelect('name', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email *
                          </label>
                          <Input
                            type="email"
                            placeholder="tu@email.com"
                            value={formData.email}
                            onChange={(e) => handleSelect('email', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Teléfono
                          </label>
                          <Input
                            type="tel"
                            placeholder="+34 600 000 000"
                            value={formData.phone}
                            onChange={(e) => handleSelect('phone', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Motivo de consulta
                          </label>
                          <textarea
                            className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                            rows={3}
                            placeholder="Cuéntanos brevemente qué te gustaría trabajar..."
                            value={formData.reason}
                            onChange={(e) => handleSelect('reason', e.target.value)}
                          />
                        </div>
                        
                        <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
                          <Shield className="h-5 w-5 text-blue-600 flex-shrink-0" />
                          <p className="text-sm text-blue-800">
                            Tu información está protegida y será tratada con total confidencialidad.
                          </p>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Final Confirmation */}
                <div className="mt-8 text-center">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg"
                    disabled={!formData.name || !formData.email}
                  >
                    {selectedModality?.price === 0 ? (
                      <>
                        <Gift className="mr-2 h-5 w-5" />
                        Confirmar Cita Gratuita
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Confirmar y Pagar {selectedModality?.price}€
                      </>
                    )}
                  </Button>
                  
                  <p className="text-sm text-slate-500 mt-4">
                    Al confirmar aceptas nuestros términos y condiciones
                  </p>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-200">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={step === 1}
                className="px-6 py-3"
              >
                Anterior
              </Button>
              
              <Button 
                onClick={nextStep}
                disabled={
                  (step === 1 && !formData.psychologist) ||
                  (step === 2 && !formData.modality) ||
                  (step === 3 && (!formData.date || !formData.time)) ||
                  step === 4
                }
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3"
              >
                {step === 4 ? 'Confirmar' : 'Siguiente'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}