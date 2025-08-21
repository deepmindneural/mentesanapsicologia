"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  CreditCard, 
  Brain, 
  Settings, 
  BarChart3, 
  AlertTriangle,
  TrendingUp,
  DollarSign,
  UserCheck,
  MessageSquare,
  Calendar,
  Shield,
  Database,
  Activity,
  FileText,
  Zap,
  ChevronRight
} from "lucide-react"

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalPsychologists: 89,
    totalSessions: 15623,
    totalRevenue: 234567,
    activePersonalities: 12,
    pendingPayouts: 15678,
    monthlyGrowth: 23.5,
    systemHealth: 98.2
  })

  useEffect(() => {
    console.log('Admin Dashboard - User check:', { user: user?.email, role: user?.role })
    if (!user) {
      console.log('Admin Dashboard - No user, redirecting to login')
      router.replace('/auth/login')
      return
    }
    if (user.role !== 'ADMIN') {
      console.log('Admin Dashboard - User is not admin, redirecting to dashboard')
      router.replace('/dashboard')
      return
    }
    console.log('Admin Dashboard - User is admin, showing dashboard')
  }, [user, router])

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Verificando permisos...</p>
        </div>
      </div>
    )
  }

  const modules = [
    {
      title: "Personalidades IA",
      description: "Crear y gestionar avatares de psicólogos",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      route: "/admin/personalities",
      stats: `${stats.activePersonalities} activas`
    },
    {
      title: "Gestión de Usuarios",
      description: "Administrar pacientes y psicólogos",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      route: "/admin/users",
      stats: `${stats.totalUsers} usuarios`
    },
    {
      title: "Pagos y Facturación",
      description: "Control financiero y transacciones",
      icon: CreditCard,
      color: "from-green-500 to-emerald-500",
      route: "/admin/payments",
      stats: `€${(stats.totalRevenue / 1000).toFixed(0)}k revenue`
    },
    {
      title: "Analytics y Métricas",
      description: "Estadísticas detalladas del sistema",
      icon: BarChart3,
      color: "from-orange-500 to-red-500",
      route: "/admin/analytics",
      stats: `+${stats.monthlyGrowth}% crecimiento`
    },
    {
      title: "Sesiones y Chat",
      description: "Monitoreo de sesiones activas",
      icon: MessageSquare,
      color: "from-indigo-500 to-purple-500",
      route: "/admin/sessions",
      stats: `${stats.totalSessions} sesiones`
    },
    {
      title: "Configuración",
      description: "Ajustes del sistema y seguridad",
      icon: Settings,
      color: "from-slate-500 to-gray-500",
      route: "/admin/settings",
      stats: `${stats.systemHealth}% salud`
    }
  ]

  const quickStats = [
    {
      title: "Usuarios Total",
      value: stats.totalUsers.toLocaleString(),
      change: "+12.3%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Ingresos Mes",
      value: `€${(stats.totalRevenue / 1000).toFixed(0)}k`,
      change: "+8.7%", 
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Psicólogos",
      value: stats.totalPsychologists,
      change: "+5.2%",
      icon: UserCheck,
      color: "text-purple-600"
    },
    {
      title: "Personalidades IA",
      value: stats.activePersonalities,
      change: "+15.8%",
      icon: Brain,
      color: "text-pink-600"
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
                  Dashboard Principal
                </span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900">
                Panel de <span style={{
                  background: 'linear-gradient(to right, #9333ea, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>Administración</span>
              </h1>
              <p className="text-slate-600 mt-1">
                Gestión completa de la plataforma Mente Sana
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                <Activity className="h-4 w-4" />
                Sistema Operativo
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  onClick={() => router.push('/')}
                  variant="outline"
                  size="sm"
                >
                  Ir a Inicio
                </Button>
                <Button 
                  onClick={() => {
                    console.log('Admin dashboard logout triggered')
                    logout()
                    setTimeout(() => {
                      router.push('/auth/login')
                    }, 100)
                  }}
                  variant="outline"
                >
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-slate-900">
                        {stat.value}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        {stat.change} vs mes anterior
                      </p>
                    </div>
                    <div className={`p-3 rounded-full bg-slate-50 ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Modules */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Módulos del Sistema
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="cursor-pointer"
                onClick={() => router.push(module.route)}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${module.color} text-white`}>
                        <module.icon className="h-6 w-6" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                      {module.description}
                    </p>
                    <div className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-full inline-block">
                      {module.stats}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* System Health & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Estado del Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Servidor Principal</span>
                  <span className="text-sm font-medium text-green-600">Operativo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Base de Datos</span>
                  <span className="text-sm font-medium text-green-600">Operativo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">API de IA</span>
                  <span className="text-sm font-medium text-green-600">Operativo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Pagos</span>
                  <span className="text-sm font-medium text-green-600">Operativo</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Alertas Recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      Pago pendiente de revisión
                    </p>
                    <p className="text-xs text-yellow-600">
                      Hace 2 horas
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      Nueva personalidad IA creada
                    </p>
                    <p className="text-xs text-blue-600">
                      Hace 4 horas
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Backup completado exitosamente
                    </p>
                    <p className="text-xs text-green-600">
                      Hace 6 horas
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}