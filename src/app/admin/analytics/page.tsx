"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3 } from "lucide-react"

export default function AnalyticsAdminPage() {
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
                <span style={{
                  background: 'linear-gradient(to right, #9333ea, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Analytics y Métricas
                </span>
              </h1>
              <p className="text-slate-600 mt-2">
                Estadísticas detalladas del sistema y usuarios
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
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Módulo en Desarrollo
              </h3>
              <p className="text-slate-600 mb-4">
                El módulo de analytics y métricas estará disponible próximamente.
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