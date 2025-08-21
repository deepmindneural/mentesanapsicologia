"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MenteSanaLogo } from "@/components/ui/custom-icons"
import { Eye, EyeOff, User, UserCog, Shield, Heart, CheckCircle, Sparkles } from "lucide-react"
import Navbar from "@/components/layout/Navbar"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState<'CLIENT' | 'PSYCHOLOGIST'>('CLIENT')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simular llamada a API
    setTimeout(() => {
      setIsLoading(false)
      // Aquí iría la lógica de registro
    }, 2000)
  }

  return (
    <>
      <Navbar />
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

      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="w-full max-w-lg">
          {/* Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-flex items-center justify-center gap-3 mb-6 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <MenteSanaLogo size={60} />
              </motion.div>
              <div className="text-left">
                <h1 className="text-3xl font-bold" style={{
                  background: 'linear-gradient(to right, #9333ea, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Mente Sana
                </h1>
                <p className="text-sm text-slate-600">Psicología con IA</p>
              </div>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Únete a nuestra comunidad
              </h2>
              <p className="text-slate-600 max-w-md mx-auto">
                Crea tu cuenta y comienza tu viaje hacia el bienestar mental
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="backdrop-blur-sm bg-white/95 border border-purple-100 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-slate-900">
                  Crear Cuenta
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Completa la información para unirte a nuestra plataforma
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* User Type Selection */}
                <div>
                  <label className="text-sm font-semibold mb-4 block text-slate-700">
                    ¿Cómo quieres usar Mente Sana?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.button
                      type="button"
                      onClick={() => setUserType('CLIENT')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 border-2 rounded-xl flex flex-col items-center gap-3 transition-all duration-200 ${
                        userType === 'CLIENT'
                          ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700'
                          : 'border-slate-200 hover:border-purple-300 hover:bg-purple-50/50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        userType === 'CLIENT' 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        <User className="h-6 w-6" />
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">Busco ayuda</div>
                        <div className="text-sm text-slate-500">Quiero conectar con psicólogos</div>
                      </div>
                      {userType === 'CLIENT' && (
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                      )}
                    </motion.button>
                    
                    <motion.button
                      type="button"
                      onClick={() => setUserType('PSYCHOLOGIST')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 border-2 rounded-xl flex flex-col items-center gap-3 transition-all duration-200 ${
                        userType === 'PSYCHOLOGIST'
                          ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700'
                          : 'border-slate-200 hover:border-purple-300 hover:bg-purple-50/50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        userType === 'PSYCHOLOGIST' 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        <UserCog className="h-6 w-6" />
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">Soy psicólogo</div>
                        <div className="text-sm text-slate-500">Quiero ofrecer mis servicios</div>
                      </div>
                      {userType === 'PSYCHOLOGIST' && (
                        <CheckCircle className="h-5 w-5 text-purple-600" />
                      )}
                    </motion.button>
                  </div>
                </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    Nombre
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Apellido
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Tu apellido"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              {userType === 'PSYCHOLOGIST' && (
                <div className="space-y-2">
                  <label htmlFor="license" className="text-sm font-medium">
                    Número de Licencia
                  </label>
                  <Input
                    id="license"
                    type="text"
                    placeholder="Ej: PSI-12345"
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 8 caracteres"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirma tu contraseña"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" required className="rounded" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Acepto los{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    política de privacidad
                  </Link>
                </label>
              </div>

              {userType === 'PSYCHOLOGIST' && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Verificación requerida</p>
                      <p>
                        Las cuentas de psicólogos requieren verificación de credenciales. 
                        Recibirás un email con los pasos a seguir.
                      </p>
                    </div>
                  </div>
                </div>
              )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #a855f7 100%)',
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                        Creando tu cuenta...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Crear mi cuenta gratis
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Benefits highlight */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-slate-700">Primera sesión gratis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-600" />
                    <span className="text-slate-700">100% seguro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-pink-600" />
                    <span className="text-slate-700">Profesional</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-slate-600">
                  ¿Ya tienes una cuenta?{" "}
                  <Link 
                    href="/auth/login" 
                    className="font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    Inicia sesión aquí
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      </div>
    </>
  )
}