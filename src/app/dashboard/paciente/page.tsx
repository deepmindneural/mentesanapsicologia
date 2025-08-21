"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MenteSanaLogo } from "@/components/ui/custom-icons"
import { 
  Calendar, 
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
  Plus,
  CheckCircle,
  Target,
  TrendingUp
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

export default function PatientDashboard() {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'CLIENT') {
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

  if (!user || user.role !== 'CLIENT') {
    return null
  }

  const stats = [
    { label: "Sesiones Completadas", value: "12", icon: CheckCircle, color: "text-green-600" },
    { label: "Próxima Cita", value: "2 días", icon: Calendar, color: "text-blue-600" },
    { label: "Progreso General", value: "78%", icon: TrendingUp, color: "text-purple-600" },
    { label: "Objetivos Logrados", value: "5/7", icon: Target, color: "text-orange-600" }
  ]

  const upcomingAppointments = [
    { 
      date: "23 Ago", 
      time: "14:00", 
      psychologist: "Dra. Ana García", 
      type: "Avatar IA", 
      status: "confirmed",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80"
    },
    { 
      date: "25 Ago", 
      time: "10:30", 
      psychologist: "Dr. Carlos Ruiz", 
      type: "Videollamada", 
      status: "confirmed",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80"
    },
    { 
      date: "28 Ago", 
      time: "16:00", 
      psychologist: "Dra. María López", 
      type: "Chat", 
      status: "pending",
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=300&q=80"
    }
  ]

  const progressGoals = [
    { goal: "Reducir ansiedad", progress: 85, color: "bg-green-500" },
    { goal: "Mejorar sueño", progress: 70, color: "bg-blue-500" },
    { goal: "Técnicas de relajación", progress: 90, color: "bg-purple-500" },
    { goal: "Autoestima", progress: 60, color: "bg-orange-500" }
  ]

  const recentActivities = [
    { type: "session", text: "Sesión completada con Dra. Ana García", time: "Hace 2 días" },
    { type: "exercise", text: "Ejercicio de respiración completado", time: "Hace 3 días" },
    { type: "goal", text: "Objetivo 'Reducir ansiedad' actualizado", time: "Hace 4 días" },
    { type: "message", text: "Nuevo mensaje de tu psicólogo", time: "Hace 5 días" }
  ]

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
                  Mi Panel Personal
                </h1>
                <p className="text-slate-600">Tu espacio de bienestar mental</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-semibold text-slate-800">{user.profile.firstName} {user.profile.lastName}</div>
                <div className="text-sm text-slate-600">Paciente</div>
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
                  ¡Hola, {user.profile.firstName}!
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
                <p className="text-purple-100 mt-2">
                  ¿Cómo te sientes hoy? Tu bienestar es nuestra prioridad.
                </p>
              </div>
              <Heart className="h-16 w-16 text-purple-200" />
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      Próximas Citas
                    </CardTitle>
                    <CardDescription>
                      {upcomingAppointments.length} citas programadas
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Nueva Cita
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div className="font-semibold text-slate-800">{appointment.date}</div>
                          <div className="text-sm text-slate-600">{appointment.time}</div>
                        </div>
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      </div>
                      
                      <img 
                        src={appointment.avatar} 
                        alt={appointment.psychologist}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800">{appointment.psychologist}</div>
                        <div className="flex items-center gap-2">
                          {appointment.type === "Avatar IA" && <Brain className="h-4 w-4 text-purple-600" />}
                          {appointment.type === "Videollamada" && <Video className="h-4 w-4 text-green-600" />}
                          {appointment.type === "Chat" && <MessageSquare className="h-4 w-4 text-blue-600" />}
                          <span className="text-sm text-slate-600">{appointment.type}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {appointment.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                        </span>
                        <Button size="sm" variant="outline">
                          Ver
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progress Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  Mi Progreso
                </CardTitle>
                <CardDescription>
                  Objetivos terapéuticos y avances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressGoals.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-slate-700">{item.goal}</span>
                        <span className="text-slate-600">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <motion.div 
                          className={`${item.color} h-2 rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ delay: index * 0.1, duration: 1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-600" />
                  Acciones Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Calendar className="mr-2 h-4 w-4" />
                  Agendar Cita
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat con Psicólogo
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Brain className="mr-2 h-4 w-4" />
                  Sesión Avatar IA
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Heart className="mr-2 h-4 w-4" />
                  Ejercicios de Bienestar
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  Actividad Reciente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs ${
                        activity.type === 'session' ? 'bg-green-500' :
                        activity.type === 'exercise' ? 'bg-blue-500' :
                        activity.type === 'goal' ? 'bg-purple-500' : 'bg-orange-500'
                      }`}>
                        {activity.type === 'session' && <CheckCircle className="h-4 w-4" />}
                        {activity.type === 'exercise' && <Activity className="h-4 w-4" />}
                        {activity.type === 'goal' && <Target className="h-4 w-4" />}
                        {activity.type === 'message' && <MessageSquare className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-800">{activity.text}</p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}