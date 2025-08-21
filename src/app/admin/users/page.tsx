"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

export default function UsersAdminPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => router.push('/admin')}
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              ← Volver al Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Gestión de{" "}
                <span style={{
                  background: 'linear-gradient(to right, #9333ea, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Usuarios
                </span>
              </h1>
              <p className="text-slate-600 mt-2">
                Administra pacientes y psicólogos de la plataforma
              </p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Módulo en Desarrollo
              </h3>
              <p className="text-slate-600 mb-4">
                El módulo de gestión de usuarios estará disponible próximamente.
              </p>
              <Button onClick={() => router.push('/admin')} variant="outline">
                Volver al Dashboard
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}