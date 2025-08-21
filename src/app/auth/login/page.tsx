"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MenteSanaLogo } from "@/components/ui/custom-icons"
import { ArrowRight, Eye, EyeOff, Mail, Lock, Chrome, Smartphone, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import Navbar from "@/components/layout/Navbar"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      const success = await login(email, password)
      if (success) {
        // Redirect based on user role
        const user = JSON.parse(localStorage.getItem('mentesana_user') || '{}')
        console.log('Login successful, user role:', user.role)
        
        if (user.role === 'ADMIN') {
          console.log('Redirecting admin user to /admin')
          router.push('/admin')
        } else if (user.role === 'PSYCHOLOGIST') {
          console.log('Redirecting psychologist to /dashboard/psicologo')
          router.push('/dashboard/psicologo')
        } else {
          console.log('Redirecting patient to /dashboard/paciente')
          router.push('/dashboard/paciente')
        }
      } else {
        setError("Credenciales incorrectas. Verifica tu email y contraseña.")
      }
    } catch (err) {
      setError("Error al iniciar sesión. Intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen relative overflow-hidden">
      {/* Advanced background with purple theme */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, #f8fafc 0%, #fdf2f8 100%)
          `
        }}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/4 right-20 w-16 h-16 bg-fuchsia-200/20 rounded-full blur-lg animate-bounce-gentle"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-violet-200/15 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-pink-200/25 rounded-full blur-md animate-pulse-soft"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left side - Hero Image */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 z-10"></div>
          <Image
            src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80"
            alt="Terapia psicológica profesional"
            width={800}
            height={1200}
            className="object-cover w-full h-full"
          />
          
          {/* Overlay content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h2 className="text-3xl font-bold mb-3">
                Bienvenido a{" "}
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Mente Sana
                </span>
              </h2>
              <p className="text-lg text-blue-100 leading-relaxed">
                Continúa tu camino hacia el bienestar mental.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">60+</div>
                  <div className="text-blue-200 text-xs">Psicólogos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">10k+</div>
                  <div className="text-blue-200 text-xs">Pacientes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-blue-200 text-xs">Satisfacción</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            {/* Logo */}
            <div className="flex items-center justify-center mb-6">
              <MenteSanaLogo size={40} />
              <h1 className="ml-3 text-2xl font-bold" style={{
                background: 'linear-gradient(to right, #9333ea, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Mente Sana
              </h1>
            </div>

            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold text-slate-800">
                  Iniciar Sesión
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Accede a tu cuenta
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-700">{error}</span>
                    </div>
                  )}

                  {/* Email Input */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <Input
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-9 h-10 border-slate-200 focus:border-purple-400 focus:ring-purple-400/20"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-9 pr-9 h-10 border-slate-200 focus:border-purple-400 focus:ring-purple-400/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember & Forgot */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-slate-300" />
                      <span className="text-sm text-slate-600">Recordarme</span>
                    </label>
                    <Link href="/auth/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-10 text-white font-medium"
                    style={{
                      background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #a855f7 100%)',
                    }}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Iniciando...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Iniciar Sesión
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-4 text-slate-500">O continúa con</span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-9 border-slate-200 hover:bg-slate-50 text-sm"
                    >
                      <Chrome className="h-4 w-4 mr-1" />
                      Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-9 border-slate-200 hover:bg-slate-50 text-sm"
                    >
                      <Smartphone className="h-4 w-4 mr-1" />
                      Apple
                    </Button>
                  </div>
                </form>

                {/* Test Credentials */}
                <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                  <h4 className="font-semibold text-slate-800 mb-2 text-center text-sm">🧪 Credenciales de Prueba</h4>
                  
                  {/* Admin Credentials - Highlighted */}
                  <div className="mb-3 p-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-center mb-1">
                      <span className="font-bold text-orange-800 text-sm">🔐 ADMIN</span>
                    </div>
                    <div className="text-center space-y-1 text-xs">
                      <div className="font-mono bg-white px-2 py-1 rounded border">
                        admin@admin.com
                      </div>
                      <div className="font-mono bg-white px-2 py-1 rounded border">
                        admin
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="font-medium text-purple-700">👨‍⚕️ Psicólogos:</div>
                      <div className="space-y-0.5 text-slate-600">
                        <div>ana.garcia@mentesana.com</div>
                        <div>carlos.ruiz@mentesana.com</div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium text-pink-700">👤 Pacientes:</div>
                      <div className="space-y-0.5 text-slate-600">
                        <div>juan.perez@email.com</div>
                        <div>laura.gonzalez@email.com</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-xs text-slate-500">Contraseña: <code className="bg-slate-200 px-1 rounded">123456</code></span>
                  </div>
                </div>

                {/* Register Link */}
                <div className="mt-4 text-center">
                  <p className="text-slate-600 text-sm">
                    ¿No tienes cuenta?{" "}
                    <Link href="/auth/register" className="text-purple-600 hover:text-purple-700 font-medium">
                      Regístrate gratis
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      </div>
    </>
  )
}