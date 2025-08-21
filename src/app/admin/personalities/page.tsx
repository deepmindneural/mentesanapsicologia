"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import AIPersonalityWizard from '@/components/admin/AIPersonalityWizard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users,
  MessageCircle,
  TrendingUp,
  AlertTriangle,
  Settings,
  Save,
  X
} from 'lucide-react'
import { personalityService, PsychologistPersonality } from '@/services/personality'
import { sessionService } from '@/services/session'

export default function PersonalitiesAdminPage() {
  const [personalities, setPersonalities] = useState<PsychologistPersonality[]>([])
  const [editingPersonality, setEditingPersonality] = useState<PsychologistPersonality | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [analytics, setAnalytics] = useState<{
    totalSessions: number;
    userSatisfactionAverage: number;
    riskDistribution?: Record<string, number>;
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [newPersonality, setNewPersonality] = useState<Partial<PsychologistPersonality>>({
    name: '',
    specialization: '',
    experience: 1,
    bio: '',
    credentials: [],
    languages: ['Español'],
    communicationStyle: {
      formality: 'mixed',
      empathy: 8,
      directness: 7,
      warmth: 8,
      analyticalLevel: 7
    },
    therapyApproaches: [],
    avatar: '',
    isActive: true,
    rating: 0,
    totalSessions: 0
  })
  const { user } = useAuth()
  const router = useRouter()

  // Check admin authentication
  useEffect(() => {
    if (!user) {
      router.replace('/auth/login')
      return
    }
    if (user.role !== 'ADMIN') {
      router.replace('/dashboard')
      return
    }
  }, [user, router])

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      loadData()
    }
  }, [user])

  const loadData = async () => {
    try {
      const allPersonalities = personalityService.getAllPersonalities()
      setPersonalities(allPersonalities)
      
      const analyticsData = await sessionService.getSessionAnalytics()
      setAnalytics(analyticsData)
      
      setLoading(false)
    } catch (error) {
      console.error('Error loading data:', error)
      setLoading(false)
    }
  }

  const handleEdit = (personality: PsychologistPersonality) => {
    setEditingPersonality(personality)
  }

  const handleSave = async (updatedPersonality: PsychologistPersonality) => {
    personalityService.updatePersonality(updatedPersonality.id, updatedPersonality)
    setPersonalities(prev => 
      prev.map(p => p.id === updatedPersonality.id ? updatedPersonality : p)
    )
    setEditingPersonality(null)
  }

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta personalidad?')) {
      personalityService.removePersonality(id)
      setPersonalities(prev => prev.filter(p => p.id !== id))
    }
  }

  const handleToggleActive = (id: string) => {
    const personality = personalities.find(p => p.id === id)
    if (personality) {
      personalityService.updatePersonality(id, { isActive: !personality.isActive })
      setPersonalities(prev =>
        prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p)
      )
    }
  }

  const handleCreatePersonality = async () => {
    if (!newPersonality.name || !newPersonality.specialization || !newPersonality.bio) {
      alert('Por favor completa todos los campos obligatorios')
      return
    }

    const personalityToCreate: PsychologistPersonality = {
      id: `personality_${Date.now()}`,
      name: newPersonality.name || '',
      avatar: newPersonality.avatar || `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80`,
      specialization: newPersonality.specialization || '',
      experience: newPersonality.experience || 1,
      bio: newPersonality.bio || '',
      credentials: newPersonality.credentials || [],
      languages: newPersonality.languages || ['Español'],
      communicationStyle: newPersonality.communicationStyle || {
        formality: 'mixed',
        empathy: 8,
        directness: 7,
        warmth: 8,
        analyticalLevel: 7
      },
      therapyApproaches: newPersonality.therapyApproaches || [],
      systemPrompt: '',
      isActive: newPersonality.isActive ?? true,
      rating: 0,
      totalSessions: 0,
      lastUpdated: new Date()
    }

    // Generate system prompt
    personalityToCreate.systemPrompt = await personalityService.generatePersonalityPrompt(personalityToCreate)
    
    // Add to service
    personalityService.addPersonality(personalityToCreate)
    
    // Update local state
    setPersonalities(prev => [...prev, personalityToCreate])
    
    // Reset form
    setNewPersonality({
      name: '',
      specialization: '',
      experience: 1,
      bio: '',
      credentials: [],
      languages: ['Español'],
      communicationStyle: {
        formality: 'mixed',
        empathy: 8,
        directness: 7,
        warmth: 8,
        analyticalLevel: 7
      },
      therapyApproaches: [],
      avatar: '',
      isActive: true,
      rating: 0,
      totalSessions: 0
    })
    
    setShowCreateForm(false)
  }

  if (!user || user.role !== 'ADMIN' || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-slate-600">
            {!user ? 'Verificando autenticación...' : 
             user.role !== 'ADMIN' ? 'Acceso denegado...' : 
             'Cargando...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
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
                  Personalidades IA
                </span>
              </h1>
              <p className="text-slate-600 mt-2">
                Administra las personalidades de psicólogos virtuales
              </p>
            </div>
          </div>
          
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nueva Personalidad
          </Button>
        </div>

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total Personalidades</p>
                    <p className="text-2xl font-bold text-slate-900">{personalities.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Sesiones Totales</p>
                    <p className="text-2xl font-bold text-slate-900">{analytics.totalSessions}</p>
                  </div>
                  <MessageCircle className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Satisfacción Promedio</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {(analytics.userSatisfactionAverage * 100).toFixed(1)}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Riesgo Alto</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {analytics.riskDistribution?.['high'] || 0}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Personalities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalities.map((personality) => (
            <motion.div
              key={personality.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <div className="h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={personality.avatar}
                      alt={personality.name}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Status badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className={personality.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {personality.isActive ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(personality)}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(personality.id)}
                      className="bg-white/90 hover:bg-white text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{personality.name}</CardTitle>
                      <CardDescription className="text-purple-600 font-semibold">
                        {personality.specialization}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500">Rating</div>
                      <div className="text-lg font-bold text-slate-900">{personality.rating}</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {personality.bio}
                  </p>

                  {/* Communication Style */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Empatía</span>
                      <div className="flex-1 mx-2 bg-slate-200 rounded-full h-1">
                        <div 
                          className="bg-purple-500 h-1 rounded-full"
                          style={{ width: `${personality.communicationStyle.empathy * 10}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{personality.communicationStyle.empathy}/10</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Directividad</span>
                      <div className="flex-1 mx-2 bg-slate-200 rounded-full h-1">
                        <div 
                          className="bg-pink-500 h-1 rounded-full"
                          style={{ width: `${personality.communicationStyle.directness * 10}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{personality.communicationStyle.directness}/10</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-500">Sesiones</div>
                      <div className="font-semibold text-slate-900">{personality.totalSessions}</div>
                    </div>
                    <div>
                      <div className="text-slate-500">Experiencia</div>
                      <div className="font-semibold text-slate-900">{personality.experience} años</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleActive(personality.id)}
                      className="flex-1"
                    >
                      {personality.isActive ? 'Desactivar' : 'Activar'}
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      onClick={() => handleEdit(personality)}
                    >
                      <Settings className="mr-1 h-3 w-3" />
                      Editar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {personalities.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No hay personalidades creadas
            </h3>
            <p className="text-slate-600 mb-4">
              Crea tu primera personalidad de psicólogo IA
            </p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Crear Personalidad
            </Button>
          </div>
        )}
      </div>

      {/* Edit Modal - Placeholder */}
      {editingPersonality && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Editar Personalidad</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setEditingPersonality(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={editingPersonality.name}
                    onChange={(e) => setEditingPersonality({
                      ...editingPersonality,
                      name: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Especialización
                  </label>
                  <input
                    type="text"
                    value={editingPersonality.specialization}
                    onChange={(e) => setEditingPersonality({
                      ...editingPersonality,
                      specialization: e.target.value
                    })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Empatía (1-10)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={editingPersonality.communicationStyle.empathy}
                      onChange={(e) => setEditingPersonality({
                        ...editingPersonality,
                        communicationStyle: {
                          ...editingPersonality.communicationStyle,
                          empathy: parseInt(e.target.value)
                        }
                      })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Directividad (1-10)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={editingPersonality.communicationStyle.directness}
                      onChange={(e) => setEditingPersonality({
                        ...editingPersonality,
                        communicationStyle: {
                          ...editingPersonality.communicationStyle,
                          directness: parseInt(e.target.value)
                        }
                      })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setEditingPersonality(null)}>
                    Cancelar
                  </Button>
                  <Button 
                    onClick={() => handleSave(editingPersonality)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Guardar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Professional AI Personality Wizard */}
      {showCreateForm && (
        <AIPersonalityWizard
          onClose={() => setShowCreateForm(false)}
          onSave={(data) => {
            // Convert wizard data to our personality format
            const personalityToCreate = {
              id: `personality_${Date.now()}`,
              name: data.name,
              avatar: data.avatar || `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80`,
              specialization: data.specialization,
              experience: data.experience,
              bio: data.bio,
              credentials: data.credentials,
              languages: data.languages,
              communicationStyle: data.communicationStyle,
              therapyApproaches: data.therapeuticApproach,
              systemPrompt: '',
              isActive: true,
              rating: 0,
              totalSessions: 0,
              lastUpdated: new Date()
            }

            // Add to service
            personalityService.addPersonality(personalityToCreate)
            
            // Update local state
            setPersonalities(prev => [...prev, personalityToCreate])
            
            setShowCreateForm(false)
          }}
        />
      )}
    </div>
  )
}