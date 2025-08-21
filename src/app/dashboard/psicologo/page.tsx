"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MenteSanaLogo } from "@/components/ui/custom-icons"
import { 
  Calendar, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Clock, 
  Star,
  Brain,
  Video,
  Settings,
  LogOut,
  ChevronRight,
  User,
  Heart,
  Activity,
  Euro,
  TrendingUp,
  Eye,
  Filter,
  Search,
  Plus,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  Target,
  Award
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

export default function PsychologistDashboard() {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'PSYCHOLOGIST') {
      router.push('/auth/login')
      return
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [isAuthenticated, user, router])

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  if (!user || user.role !== 'PSYCHOLOGIST') {
    return null
  }

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: BarChart3 },
    { id: 'appointments', label: 'Citas', icon: Calendar },
    { id: 'patients', label: 'Pacientes', icon: Users },
    { id: 'income', label: 'Ingresos', icon: Euro },
    { id: 'reports', label: 'Reportes', icon: FileText }
  ]

  const stats = [
    { label: "Pacientes Activos", value: "127", icon: Users, color: "text-blue-600", change: "+12%" },
    { label: "Ingresos Mes", value: "€8,450", icon: Euro, color: "text-green-600", change: "+18%" },
    { label: "Citas Completadas", value: "156", icon: CheckCircle, color: "text-purple-600", change: "+8%" },
    { label: "Rating Promedio", value: "4.9", icon: Star, color: "text-yellow-600", change: "+0.2" }
  ]

  const patients = [
    { 
      id: 1, 
      name: "María González", 
      email: "maria.g@email.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b550?auto=format&fit=crop&w=300&q=80",
      lastSession: "2 días", 
      progress: 85, 
      sessions: 12,
      condition: "Ansiedad",
      status: "active",
      nextAppointment: "23 Ago, 14:00"
    },
    { 
      id: 2, 
      name: "Carlos Ruiz", 
      email: "carlos.r@email.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      lastSession: "1 día", 
      progress: 70, 
      sessions: 8,
      condition: "Depresión",
      status: "active",
      nextAppointment: "24 Ago, 10:30"
    },
    { 
      id: 3, 
      name: "Ana López", 
      email: "ana.l@email.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
      lastSession: "5 días", 
      progress: 45, 
      sessions: 15,
      condition: "Estrés",
      status: "needs_attention",
      nextAppointment: "25 Ago, 16:00"
    },
    { 
      id: 4, 
      name: "Pedro Martín", 
      email: "pedro.m@email.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
      lastSession: "1 semana", 
      progress: 92, 
      sessions: 20,
      condition: "Fobias",
      status: "improving",
      nextAppointment: "26 Ago, 12:00"
    },
    { 
      id: 5, 
      name: "Laura Silva", 
      email: "laura.s@email.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
      lastSession: "3 días", 
      progress: 60, 
      sessions: 6,
      condition: "Autoestima",
      status: "active",
      nextAppointment: "27 Ago, 15:30"
    }
  ]

  const appointments = [
    { 
      id: 1,
      time: "09:00", 
      date: "23 Ago",
      patient: "María González", 
      type: "Avatar IA", 
      status: "confirmed",
      duration: "50 min",
      fee: "€45",
      notes: "Sesión de seguimiento ansiedad"
    },
    { 
      id: 2,
      time: "10:30", 
      date: "23 Ago",
      patient: "Carlos Ruiz", 
      type: "Videollamada", 
      status: "confirmed",
      duration: "50 min",
      fee: "€60",
      notes: "Evaluación depresión"
    },
    { 
      id: 3,
      time: "12:00", 
      date: "23 Ago",
      patient: "Ana López", 
      type: "Chat", 
      status: "pending",
      duration: "30 min",
      fee: "€30",
      notes: "Consulta rápida estrés"
    },
    { 
      id: 4,
      time: "14:00", 
      date: "23 Ago",
      patient: "Pedro Martín", 
      type: "Avatar IA", 
      status: "confirmed",
      duration: "50 min",
      fee: "€45",
      notes: "Terapia exposición fobias"
    },
    { 
      id: 5,
      time: "15:30", 
      date: "23 Ago",
      patient: "Laura Silva", 
      type: "Videollamada", 
      status: "confirmed",
      duration: "50 min",
      fee: "€60",
      notes: "Trabajo autoestima"
    }
  ]

  const incomeData = {
    thisMonth: 8450,
    lastMonth: 7150,
    thisWeek: 1980,
    lastWeek: 1650,
    daily: [
      { day: "Lun", amount: 320 },
      { day: "Mar", amount: 450 },
      { day: "Mié", amount: 380 },
      { day: "Jue", amount: 520 },
      { day: "Vie", amount: 310 },
      { day: "Sáb", amount: 0 },
      { day: "Dom", amount: 0 }
    ],
    byType: [
      { type: "Avatar IA", sessions: 45, amount: 2025 },
      { type: "Videollamada", sessions: 38, amount: 2280 },
      { type: "Chat", sessions: 25, amount: 750 },
      { type: "Presencial", sessions: 15, amount: 1200 }
    ]
  }

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon className={`h-8 w-8 ${stat.color}`} />
                        <span className="text-sm font-medium text-green-600">{stat.change}</span>
                      </div>
                      <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                      <p className="text-sm text-slate-600">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  Agenda de Hoy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.slice(0, 3).map((appointment, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                      <div className="text-center min-w-[60px]">
                        <div className="font-semibold text-slate-800">{appointment.time}</div>
                        <div className="text-xs text-slate-600">{appointment.duration}</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800">{appointment.patient}</div>
                        <div className="flex items-center gap-2">
                          {appointment.type === "Avatar IA" && <Brain className="h-4 w-4 text-purple-600" />}
                          {appointment.type === "Videollamada" && <Video className="h-4 w-4 text-green-600" />}
                          {appointment.type === "Chat" && <MessageSquare className="h-4 w-4 text-blue-600" />}
                          <span className="text-sm text-slate-600">{appointment.type}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">{appointment.fee}</div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {appointment.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'appointments':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Gestión de Citas</h2>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                <Plus className="mr-2 h-4 w-4" />
                Nueva Cita
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Todas las Citas</CardTitle>
                <CardDescription>Gestiona y programa las citas con tus pacientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="text-center min-w-[80px]">
                        <div className="font-semibold text-slate-800">{appointment.date}</div>
                        <div className="text-sm text-slate-600">{appointment.time}</div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800">{appointment.patient}</div>
                        <div className="text-sm text-slate-600">{appointment.notes}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {appointment.type === "Avatar IA" && <Brain className="h-4 w-4 text-purple-600" />}
                          {appointment.type === "Videollamada" && <Video className="h-4 w-4 text-green-600" />}
                          {appointment.type === "Chat" && <MessageSquare className="h-4 w-4 text-blue-600" />}
                          <span className="text-sm text-slate-600">{appointment.type} • {appointment.duration}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold text-green-600 text-lg">{appointment.fee}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            appointment.status === 'confirmed' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {appointment.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                          </span>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'patients':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Mis Pacientes</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Buscar pacientes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrar
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {filteredPatients.map((patient, index) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <img 
                          src={patient.avatar} 
                          alt={patient.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-semibold text-slate-800">{patient.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              patient.status === 'active' ? 'bg-green-100 text-green-700' :
                              patient.status === 'improving' ? 'bg-blue-100 text-blue-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {patient.status === 'active' ? 'Activo' :
                               patient.status === 'improving' ? 'Mejorando' : 'Requiere Atención'}
                            </span>
                          </div>
                          <p className="text-slate-600 mb-2">{patient.email}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-slate-500">Condición:</span>
                              <div className="font-medium">{patient.condition}</div>
                            </div>
                            <div>
                              <span className="text-slate-500">Sesiones:</span>
                              <div className="font-medium">{patient.sessions}</div>
                            </div>
                            <div>
                              <span className="text-slate-500">Última sesión:</span>
                              <div className="font-medium">{patient.lastSession}</div>
                            </div>
                            <div>
                              <span className="text-slate-500">Próxima cita:</span>
                              <div className="font-medium">{patient.nextAppointment}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="mb-4">
                            <span className="text-sm text-slate-500">Progreso</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-slate-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                                  style={{ width: `${patient.progress}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">{patient.progress}%</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Ver
                            </Button>
                            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Chat
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'income':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Análisis de Ingresos</h2>
            
            {/* Income Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Este Mes</p>
                      <p className="text-3xl font-bold text-green-600">€{incomeData.thisMonth.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-sm text-green-600 mt-2">
                    +€{(incomeData.thisMonth - incomeData.lastMonth).toLocaleString()} vs mes anterior
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Esta Semana</p>
                      <p className="text-3xl font-bold text-blue-600">€{incomeData.thisWeek.toLocaleString()}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-sm text-blue-600 mt-2">
                    +€{(incomeData.thisWeek - incomeData.lastWeek).toLocaleString()} vs semana anterior
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Sesiones Mes</p>
                      <p className="text-3xl font-bold text-purple-600">123</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-sm text-purple-600 mt-2">+15% vs mes anterior</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">Tarifa Promedio</p>
                      <p className="text-3xl font-bold text-orange-600">€52</p>
                    </div>
                    <Euro className="h-8 w-8 text-orange-600" />
                  </div>
                  <p className="text-sm text-orange-600 mt-2">+€3 vs mes anterior</p>
                </CardContent>
              </Card>
            </div>

            {/* Income by Session Type */}
            <Card>
              <CardHeader>
                <CardTitle>Ingresos por Tipo de Sesión</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incomeData.byType.map((type, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {type.type === "Avatar IA" && <Brain className="h-5 w-5 text-purple-600" />}
                        {type.type === "Videollamada" && <Video className="h-5 w-5 text-green-600" />}
                        {type.type === "Chat" && <MessageSquare className="h-5 w-5 text-blue-600" />}
                        {type.type === "Presencial" && <User className="h-5 w-5 text-orange-600" />}
                        <span className="font-medium">{type.type}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-lg">€{type.amount.toLocaleString()}</div>
                        <div className="text-sm text-slate-600">{type.sessions} sesiones</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'reports':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Reportes y Análisis</h2>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    Progreso de Pacientes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patients.slice(0, 4).map((patient, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <img src={patient.avatar} alt={patient.name} className="w-10 h-10 rounded-full" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{patient.name}</div>
                          <div className="w-full bg-slate-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                              style={{ width: `${patient.progress}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm font-medium">{patient.progress}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600" />
                    Logros del Mes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <div className="font-medium">95% Asistencia</div>
                        <div className="text-sm text-slate-600">Excelente puntualidad de pacientes</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Star className="h-6 w-6 text-blue-600" />
                      <div>
                        <div className="font-medium">Rating 4.9/5</div>
                        <div className="text-sm text-slate-600">Valoraciones de pacientes</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <Target className="h-6 w-6 text-purple-600" />
                      <div>
                        <div className="font-medium">85% Objetivos</div>
                        <div className="text-sm text-slate-600">Cumplimiento de metas terapéuticas</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MenteSanaLogo size={40} />
              <div>
                <h1 className="text-2xl font-bold" style={{
                  background: 'linear-gradient(to right, #9333ea, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Dashboard Profesional
                </h1>
                <p className="text-slate-600">Panel de control avanzado</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-semibold text-slate-800">{user.profile.firstName} {user.profile.lastName}</div>
                <div className="text-sm text-slate-600">{user.profile.specialty}</div>
              </div>
              <img 
                src={user.profile.avatar} 
                alt={`${user.profile.firstName} ${user.profile.lastName}`}
                className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
              />
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-purple-100">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  ¡Bienvenido, Dr. {user.profile.firstName}!
                </h2>
                <p className="text-purple-100">
                  {currentTime.toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} - {currentTime.toLocaleTimeString('es-ES', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
                <p className="text-purple-100 text-sm mt-1">
                  Tienes {appointments.filter(a => a.status === 'confirmed').length} citas confirmadas hoy
                </p>
              </div>
              <Brain className="h-16 w-16 text-purple-200" />
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  )
}