"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  MenteSanaLogo, 
  SmartChatIcon, 
  PsychologistNetworkIcon, 
  PsychTestIcon,
  AIAvatarIcon,
  AdvancedSecurityIcon 
} from "@/components/ui/custom-icons"
import { 
  Bell, 
  Calendar, 
  MessageCircle, 
  TrendingUp, 
  Users, 
  BarChart3,
  Search,
  Settings,
  LogOut,
  Play,
  Clock,
  Star,
  Video,
  FileText,
  Brain,
  Heart,
  Target,
  Zap,
  ChevronRight,
  Plus
} from "lucide-react"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Advanced background with animated elements */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 15% 20%, rgba(59, 149, 242, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 85% 80%, rgba(37, 119, 231, 0.06) 0%, transparent 50%),
            radial-gradient(circle at 50% 0%, rgba(30, 98, 212, 0.04) 0%, transparent 50%),
            linear-gradient(135deg, #f8fafc 0%, #eff8ff 30%, #e0f0fe 70%, #dbeffe 100%)
          `
        }}
      />
      
      {/* Floating background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-blue-200/15 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-1/4 right-16 w-12 h-12 bg-indigo-200/20 rounded-full blur-lg animate-pulse-soft"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-purple-200/10 rounded-full blur-xl animate-bounce-gentle"></div>
        <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-cyan-200/25 rounded-full blur-md animate-float"></div>
        <div className="absolute bottom-16 right-20 w-14 h-14 bg-blue-300/12 rounded-full blur-lg animate-pulse-soft"></div>
      </div>

      <div className="relative z-10">
        {/* Top Navigation */}
        <nav className="glass-effect border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="flex items-center">
                  <MenteSanaLogo size={40} />
                  <h1 className="ml-3 text-xl font-bold" style={{
                    background: 'linear-gradient(to right, #2577e7, #3b95f2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    Mente Sana
                  </h1>
                </div>
                
                {/* Search bar */}
                <div className="hidden md:flex relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Buscar psicólogos, tests, sesiones..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80 bg-white/80 border-slate-200/50 focus:bg-white focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5 text-slate-600" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">3</span>
                </Button>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">M</span>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-slate-700">María González</p>
                    <p className="text-xs text-slate-500">Paciente Premium</p>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm">
                  <Settings className="h-5 w-5 text-slate-600" />
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-soft">
                <CardContent className="p-6">
                  <nav className="space-y-2">
                    {[
                      { id: 'overview', icon: BarChart3, label: 'Resumen', active: true },
                      { id: 'sessions', icon: Video, label: 'Mis Sesiones' },
                      { id: 'tests', icon: Brain, label: 'Tests Psicológicos' },
                      { id: 'psychologists', icon: Users, label: 'Psicólogos' },
                      { id: 'progress', icon: TrendingUp, label: 'Mi Progreso' },
                      { id: 'ai-chat', icon: MessageCircle, label: 'Chat IA' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                          activeTab === item.id 
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                            : 'text-slate-600 hover:bg-slate-100/80'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="mt-6 bg-white/80 backdrop-blur-sm border-white/50 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Tu Progreso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Sesiones completadas</span>
                    <span className="font-bold text-blue-600">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Tests realizados</span>
                    <span className="font-bold text-green-600">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Bienestar general</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-bold text-yellow-600">4.8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Welcome Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="relative overflow-hidden rounded-2xl" style={{
                  background: 'linear-gradient(135deg, #3b95f2 0%, #2577e7 100%)'
                }}>
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-8 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-4 left-8 w-24 h-24 bg-white rounded-full blur-2xl"></div>
                  </div>
                  
                  <div className="relative p-8 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-bold mb-2">¡Bienvenida de vuelta, María!</h2>
                        <p className="text-blue-100 text-lg">Tu próxima sesión es hoy a las 3:00 PM con Dr. Carlos Ruiz</p>
                        <Button 
                          className="mt-4 bg-white text-blue-600 hover:bg-blue-50"
                          style={{ color: '#2577e7' }}
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Unirse a la sesión
                        </Button>
                      </div>
                      <div className="hidden md:block">
                        <AIAvatarIcon size={80} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    icon: SmartChatIcon,
                    title: "Chat con IA",
                    description: "Habla con tu asistente personal",
                    color: "from-blue-500 to-blue-600",
                    action: "Iniciar Chat"
                  },
                  {
                    icon: PsychTestIcon,
                    title: "Test Rápido",
                    description: "Evalúa tu estado emocional",
                    color: "from-purple-500 to-purple-600",
                    action: "Comenzar Test"
                  },
                  {
                    icon: Calendar,
                    title: "Agendar Sesión",
                    description: "Reserva tu próxima cita",
                    color: "from-green-500 to-green-600",
                    action: "Ver Horarios"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="group bg-white/80 backdrop-blur-sm border-white/50 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-102 cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} shadow-lg`}>
                            <item.icon size={24} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-800 mb-1">{item.title}</h3>
                            <p className="text-sm text-slate-600 mb-3">{item.description}</p>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="group-hover:bg-slate-50 transition-colors"
                            >
                              {item.action}
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Recent Activity & Upcoming */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Recent Sessions */}
                <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span>Sesiones Recientes</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        psychologist: "Dr. Carlos Ruiz",
                        specialty: "Terapia Cognitiva",
                        date: "15 Ago 2024",
                        duration: "50 min",
                        rating: 5,
                        avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=100&q=80"
                      },
                      {
                        psychologist: "Dra. Ana López",
                        specialty: "Mindfulness",
                        date: "12 Ago 2024", 
                        duration: "45 min",
                        rating: 5,
                        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=80"
                      },
                      {
                        psychologist: "Dr. Miguel Torres",
                        specialty: "Ansiedad",
                        date: "08 Ago 2024",
                        duration: "60 min", 
                        rating: 4,
                        avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=100&q=80"
                      }
                    ].map((session, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-slate-50/80 hover:bg-slate-100/80 transition-colors">
                        <Image
                          src={session.avatar}
                          alt={session.psychologist}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-800">{session.psychologist}</h4>
                          <p className="text-sm text-slate-600">{session.specialty}</p>
                          <p className="text-xs text-slate-500">{session.date} • {session.duration}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(session.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Progress Insights */}
                <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span>Insights de Progreso</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      {
                        icon: Heart,
                        title: "Bienestar Emocional",
                        progress: 85,
                        change: "+12%",
                        color: "bg-red-500",
                        description: "Mejora significativa en las últimas 2 semanas"
                      },
                      {
                        icon: Brain,
                        title: "Claridad Mental",
                        progress: 78,
                        change: "+8%",
                        color: "bg-blue-500",
                        description: "Técnicas de mindfulness funcionando bien"
                      },
                      {
                        icon: Target,
                        title: "Objetivos Logrados",
                        progress: 92,
                        change: "+15%",
                        color: "bg-green-500",
                        description: "Excelente progreso en metas semanales"
                      }
                    ].map((insight, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${insight.color}/20`}>
                              <insight.icon className={`h-4 w-4 ${insight.color.replace('bg-', 'text-')}`} />
                            </div>
                            <span className="font-medium text-slate-800">{insight.title}</span>
                          </div>
                          <span className="text-sm font-semibold text-green-600">{insight.change}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">{insight.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${insight.color} transition-all duration-1000`}
                              style={{ width: `${insight.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-slate-500">{insight.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}