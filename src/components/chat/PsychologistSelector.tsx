"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { 
  Star, 
  MessageCircle, 
  Users, 
  Clock, 
  Heart, 
  Brain,
  Shield,
  Award,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react'
import { personalityService, PsychologistPersonality } from '@/services/personality'

interface PsychologistSelectorProps {
  onSelect: (psychologist: PsychologistPersonality) => void
  selectedSpecialization?: string
  className?: string
}

export default function PsychologistSelector({ 
  onSelect, 
  selectedSpecialization,
  className = ""
}: PsychologistSelectorProps) {
  const [psychologists, setPsychologists] = useState<PsychologistPersonality[]>([])
  const [filteredPsychologists, setFilteredPsychologists] = useState<PsychologistPersonality[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPsychologists()
  }, [])

  useEffect(() => {
    filterPsychologists()
  }, [psychologists, searchTerm, selectedFilter, selectedSpecialization])

  const loadPsychologists = async () => {
    try {
      const allPsychologists = personalityService.getAllPersonalities()
      setPsychologists(allPsychologists)
      setLoading(false)
    } catch (error) {
      console.error('Error loading psychologists:', error)
      setLoading(false)
    }
  }

  const filterPsychologists = () => {
    let filtered = [...psychologists]

    // Filtro por especialización preseleccionada
    if (selectedSpecialization) {
      filtered = personalityService.getPersonalitiesBySpecialization(selectedSpecialization)
    }

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(psych => 
        psych.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        psych.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        psych.bio.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtros adicionales
    switch (selectedFilter) {
      case 'high-rating':
        filtered = filtered.filter(p => p.rating >= 4.8)
        break
      case 'experienced':
        filtered = filtered.filter(p => p.experience >= 15)
        break
      case 'available':
        filtered = filtered.filter(p => p.isActive)
        break
      default:
        break
    }

    // Ordenar por rating
    filtered.sort((a, b) => b.rating - a.rating)

    setFilteredPsychologists(filtered)
  }

  const getSpecializationColor = (specialization: string) => {
    const colors: Record<string, string> = {
      'Ansiedad y Depresión': 'from-blue-500 to-purple-500',
      'Terapia de Pareja': 'from-pink-500 to-red-500',
      'Psicología Infantil': 'from-green-500 to-teal-500',
      'Adicciones': 'from-orange-500 to-red-500',
      'Trauma y PTSD': 'from-purple-500 to-indigo-500',
      'Psicología Laboral': 'from-gray-500 to-slate-500'
    }
    return colors[specialization] || 'from-purple-500 to-pink-500'
  }

  const getCommunicationStyleIcon = (style: PsychologistPersonality['communicationStyle']) => {
    if (style.empathy >= 9) return <Heart className="h-4 w-4 text-red-500" />
    if (style.analyticalLevel >= 8) return <Brain className="h-4 w-4 text-blue-500" />
    if (style.warmth >= 9) return <Users className="h-4 w-4 text-green-500" />
    return <Shield className="h-4 w-4 text-purple-500" />
  }

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Elige tu{" "}
          <span style={{
            background: 'linear-gradient(to right, #9333ea, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Psicólogo IA
          </span>
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Cada avatar IA está entrenado con la personalidad y metodología única de psicólogos profesionales
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o especialidad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('all')}
            className={selectedFilter === 'all' ? 'bg-purple-600 hover:bg-purple-700' : ''}
          >
            Todos
          </Button>
          <Button
            variant={selectedFilter === 'high-rating' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('high-rating')}
            className={selectedFilter === 'high-rating' ? 'bg-purple-600 hover:bg-purple-700' : ''}
          >
            <Star className="h-4 w-4 mr-1" />
            Top Rated
          </Button>
          <Button
            variant={selectedFilter === 'experienced' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedFilter('experienced')}
            className={selectedFilter === 'experienced' ? 'bg-purple-600 hover:bg-purple-700' : ''}
          >
            <Award className="h-4 w-4 mr-1" />
            Expertos
          </Button>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-slate-600">
        {filteredPsychologists.length} psicólogo{filteredPsychologists.length !== 1 ? 's' : ''} disponible{filteredPsychologists.length !== 1 ? 's' : ''}
      </div>

      {/* Psychologists Grid */}
      <AnimatePresence mode="wait">
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {filteredPsychologists.map((psychologist, index) => (
            <motion.div
              key={psychologist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-0 hover:border hover:border-purple-200 group">
                <div className="relative">
                  <div className="h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={psychologist.avatar}
                      alt={psychologist.name}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Rating badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{psychologist.rating}</span>
                    </div>
                  </div>

                  {/* Communication style indicator */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                    {getCommunicationStyleIcon(psychologist.communicationStyle)}
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                        {psychologist.name}
                      </CardTitle>
                      <CardDescription className="text-purple-600 font-semibold">
                        {psychologist.specialization}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className={`h-1 bg-gradient-to-r ${getSpecializationColor(psychologist.specialization)} rounded-full mt-2`} />
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600 line-clamp-3">
                    {psychologist.bio}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-600">{psychologist.experience} años</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-600">{psychologist.totalSessions} sesiones</span>
                    </div>
                  </div>

                  {/* Therapy approaches */}
                  <div className="flex flex-wrap gap-1">
                    {psychologist.therapyApproaches.slice(0, 3).map((approach) => (
                      <Badge key={approach} variant="secondary" className="text-xs">
                        {approach}
                      </Badge>
                    ))}
                    {psychologist.therapyApproaches.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{psychologist.therapyApproaches.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Communication style bars */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Empatía</span>
                      <div className="flex-1 mx-2 bg-slate-200 rounded-full h-1">
                        <div 
                          className="bg-purple-500 h-1 rounded-full transition-all duration-500"
                          style={{ width: `${psychologist.communicationStyle.empathy * 10}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{psychologist.communicationStyle.empathy}/10</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Directividad</span>
                      <div className="flex-1 mx-2 bg-slate-200 rounded-full h-1">
                        <div 
                          className="bg-pink-500 h-1 rounded-full transition-all duration-500"
                          style={{ width: `${psychologist.communicationStyle.directness * 10}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{psychologist.communicationStyle.directness}/10</span>
                    </div>
                  </div>

                  {/* Action button */}
                  <Button 
                    onClick={() => onSelect(psychologist)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 group-hover:shadow-lg"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Comenzar Chat
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty state */}
      {filteredPsychologists.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No se encontraron psicólogos
          </h3>
          <p className="text-slate-600 mb-4">
            Intenta ajustar tus filtros de búsqueda
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('')
              setSelectedFilter('all')
            }}
          >
            Limpiar filtros
          </Button>
        </motion.div>
      )}
    </div>
  )
}