"use client"

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  Mic, 
  MicOff, 
  Play, 
  Pause,
  Brain,
  User,
  FileText,
  MessageSquare,
  Settings,
  Zap,
  Save,
  Volume2,
  Waveform,
  Camera,
  Download,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Sparkles
} from 'lucide-react'

interface PersonalityData {
  // Basic Info
  name: string
  specialization: string
  experience: number
  bio: string
  avatar: string
  
  // Voice & Personality
  voiceRecordings: File[]
  voiceStyle: 'warm' | 'professional' | 'energetic' | 'calm'
  speakingPace: 'slow' | 'normal' | 'fast'
  accent: 'neutral' | 'madrid' | 'barcelona' | 'andaluz'
  
  // Psychology Profile
  therapeuticApproach: string[]
  credentials: string[]
  languages: string[]
  
  // AI Behavior
  communicationStyle: {
    formality: 'formal' | 'casual' | 'mixed'
    empathy: number
    directness: number
    warmth: number
    analyticalLevel: number
  }
  
  // Training Data
  sessionTranscripts: File[]
  knowledgeBase: string
  specializedResponses: Record<string, string>
  
  // Advanced Settings
  responseLength: 'concise' | 'moderate' | 'detailed'
  emotionalRange: number
  adaptability: number
  memoryDepth: number
}

interface AIPersonalityWizardProps {
  onClose: () => void
  onSave: (data: PersonalityData) => void
}

export default function AIPersonalityWizard({ onClose, onSave }: AIPersonalityWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  
  const [personalityData, setPersonalityData] = useState<PersonalityData>({
    name: '',
    specialization: '',
    experience: 1,
    bio: '',
    avatar: '',
    voiceRecordings: [],
    voiceStyle: 'professional',
    speakingPace: 'normal',
    accent: 'neutral',
    therapeuticApproach: [],
    credentials: [],
    languages: ['Español'],
    communicationStyle: {
      formality: 'mixed',
      empathy: 8,
      directness: 7,
      warmth: 8,
      analyticalLevel: 7
    },
    sessionTranscripts: [],
    knowledgeBase: '',
    specializedResponses: {},
    responseLength: 'moderate',
    emotionalRange: 8,
    adaptability: 7,
    memoryDepth: 8
  })

  const steps = [
    {
      title: "Información Básica",
      description: "Datos fundamentales del psicólogo",
      icon: User,
      component: "basic"
    },
    {
      title: "Grabación de Voz",
      description: "Capturar muestra vocal para clonación",
      icon: Mic,
      component: "voice"
    },
    {
      title: "Perfil Psicológico",
      description: "Especialización y credenciales",
      icon: Brain,
      component: "psychology"
    },
    {
      title: "Entrenamiento IA",
      description: "Datos de entrenamiento y comportamiento",
      icon: Zap,
      component: "training"
    },
    {
      title: "Configuración Avanzada",
      description: "Parámetros de personalidad IA",
      icon: Settings,
      component: "advanced"
    }
  ]

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      
      const chunks: BlobPart[] = []
      
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' })
        setAudioBlob(blob)
        
        // Create audio file
        const file = new File([blob], `voice-sample-${Date.now()}.wav`, { type: 'audio/wav' })
        setPersonalityData(prev => ({
          ...prev,
          voiceRecordings: [...prev.voiceRecordings, file]
        }))
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop())
      }
      
      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1)
      }, 1000)
      
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const analyzeVoice = async () => {
    if (!audioBlob) return
    
    setIsAnalyzing(true)
    
    // Simulate AI voice analysis
    setTimeout(() => {
      setAnalysisResults({
        pitch: 'Medium-Low (Calming)',
        tone: 'Warm and Professional',
        pace: 'Moderate',
        clarity: 95,
        emotionalRange: 'High Empathy',
        confidence: 92,
        recommendations: [
          'Voice shows high empathy levels - excellent for therapy',
          'Clear articulation suitable for AI synthesis',
          'Professional tone with warmth - ideal for patient comfort'
        ]
      })
      setIsAnalyzing(false)
    }, 3000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = () => {
    onSave(personalityData)
  }

  const renderStepContent = () => {
    const step = steps[currentStep]
    
    switch (step.component) {
      case 'basic':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  value={personalityData.name}
                  onChange={(e) => setPersonalityData(prev => ({...prev, name: e.target.value}))}
                  placeholder="Dr./Dra. [Nombre] [Apellido]"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Especialización *
                </label>
                <select
                  value={personalityData.specialization}
                  onChange={(e) => setPersonalityData(prev => ({...prev, specialization: e.target.value}))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Seleccionar especialización</option>
                  <option value="Ansiedad y Depresión">Ansiedad y Depresión</option>
                  <option value="Terapia de Pareja">Terapia de Pareja</option>
                  <option value="Psicología Infantil">Psicología Infantil</option>
                  <option value="Adicciones">Adicciones</option>
                  <option value="Trauma y PTSD">Trauma y PTSD</option>
                  <option value="Trastornos Alimentarios">Trastornos Alimentarios</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Biografía Profesional *
              </label>
              <textarea
                value={personalityData.bio}
                onChange={(e) => setPersonalityData(prev => ({...prev, bio: e.target.value}))}
                rows={4}
                placeholder="Describe la experiencia, enfoque terapéutico, filosofía de trabajo y especialidades del psicólogo..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Foto de Perfil
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center">
                <Camera className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600 mb-2">Sube una foto profesional</p>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Seleccionar Imagen
                </Button>
              </div>
            </div>
          </div>
        )

      case 'voice':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Brain className="h-16 w-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Clonación de Voz con IA
              </h3>
              <p className="text-slate-600">
                Graba muestras de voz para crear un avatar que hable como el psicólogo real
              </p>
            </div>

            <Card className="p-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
                    isRecording ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {isRecording ? (
                      <div className="relative">
                        <Mic className="h-8 w-8" />
                        <div className="absolute -inset-2 rounded-full border-2 border-red-400 animate-ping"></div>
                      </div>
                    ) : (
                      <Mic className="h-8 w-8" />
                    )}
                  </div>
                </div>

                {isRecording && (
                  <div className="space-y-2">
                    <div className="text-2xl font-mono text-red-600">
                      {formatTime(recordingTime)}
                    </div>
                    <div className="flex justify-center">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-red-500 animate-pulse"
                            style={{
                              height: `${Math.random() * 20 + 10}px`,
                              animationDelay: `${i * 0.1}s`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {!isRecording ? (
                    <Button
                      onClick={startRecording}
                      className="bg-red-600 hover:bg-red-700 text-white"
                      size="lg"
                    >
                      <Mic className="h-4 w-4 mr-2" />
                      Comenzar Grabación
                    </Button>
                  ) : (
                    <Button
                      onClick={stopRecording}
                      className="bg-slate-600 hover:bg-slate-700 text-white"
                      size="lg"
                    >
                      <MicOff className="h-4 w-4 mr-2" />
                      Detener Grabación
                    </Button>
                  )}
                  
                  <p className="text-xs text-slate-500">
                    Recomendamos grabar al menos 2-3 minutos de habla natural
                  </p>
                </div>
              </div>
            </Card>

            {audioBlob && (
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Volume2 className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">Grabación de voz</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={analyzeVoice}
                      disabled={isAnalyzing}
                      size="sm"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Analizando...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Analizar con IA
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {analysisResults && (
              <Card className="p-6 bg-green-50 border-green-200">
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">Análisis Completado</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm font-medium text-green-700">Tono:</span>
                    <p className="text-green-800">{analysisResults.tone}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-green-700">Claridad:</span>
                    <p className="text-green-800">{analysisResults.clarity}%</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-green-700">Rango Emocional:</span>
                    <p className="text-green-800">{analysisResults.emotionalRange}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-green-700">Confianza IA:</span>
                    <p className="text-green-800">{analysisResults.confidence}%</p>
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-green-700">Recomendaciones:</span>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    {analysisResults.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="text-sm text-green-800">{rec}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            )}
          </div>
        )

      case 'psychology':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">Perfil Psicológico</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Enfoques Terapéuticos
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'Terapia Cognitivo-Conductual',
                  'Mindfulness',
                  'EMDR',
                  'Terapia Gestalt',
                  'Psicoanálisis',
                  'Terapia Sistémica',
                  'Terapia Humanista',
                  'ACT (Acceptance and Commitment)',
                  'Terapia Breve'
                ].map((approach) => (
                  <label key={approach} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={personalityData.therapeuticApproach.includes(approach)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPersonalityData(prev => ({
                            ...prev,
                            therapeuticApproach: [...prev.therapeuticApproach, approach]
                          }))
                        } else {
                          setPersonalityData(prev => ({
                            ...prev,
                            therapeuticApproach: prev.therapeuticApproach.filter(a => a !== approach)
                          }))
                        }
                      }}
                      className="rounded border-slate-300"
                    />
                    <span className="text-sm text-slate-700">{approach}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Credenciales y Certificaciones
              </label>
              <textarea
                value={personalityData.credentials.join('\n')}
                onChange={(e) => setPersonalityData(prev => ({
                  ...prev,
                  credentials: e.target.value.split('\n').filter(c => c.trim())
                }))}
                rows={4}
                placeholder="Colegio Oficial de Psicólogos de Madrid&#10;Máster en Psicología Clínica&#10;Certificación en EMDR Nivel II&#10;Especialización en Trastornos de Ansiedad"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        )

      case 'training':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">Entrenamiento de IA</h3>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Subir Transcripciones de Sesiones
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6">
                <FileText className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                <p className="text-center text-slate-600 mb-4">
                  Sube transcripciones anónimas de sesiones para entrenar la IA
                </p>
                <div className="text-center">
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Subir Archivos (.txt, .docx)
                  </Button>
                </div>
                <p className="text-xs text-slate-500 text-center mt-2">
                  Los datos serán procesados y anonimizados automáticamente
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Base de Conocimientos Especializada
              </label>
              <textarea
                value={personalityData.knowledgeBase}
                onChange={(e) => setPersonalityData(prev => ({...prev, knowledgeBase: e.target.value}))}
                rows={6}
                placeholder="Información específica, estudios, metodologías, casos de éxito, protocolos de tratamiento que debe conocer la IA..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        )

      case 'advanced':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">Configuración Avanzada</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Nivel de Empatía: {personalityData.communicationStyle.empathy}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={personalityData.communicationStyle.empathy}
                  onChange={(e) => setPersonalityData(prev => ({
                    ...prev,
                    communicationStyle: {
                      ...prev.communicationStyle,
                      empathy: parseInt(e.target.value)
                    }
                  }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Directividad: {personalityData.communicationStyle.directness}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={personalityData.communicationStyle.directness}
                  onChange={(e) => setPersonalityData(prev => ({
                    ...prev,
                    communicationStyle: {
                      ...prev.communicationStyle,
                      directness: parseInt(e.target.value)
                    }
                  }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Rango Emocional: {personalityData.emotionalRange}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={personalityData.emotionalRange}
                  onChange={(e) => setPersonalityData(prev => ({
                    ...prev,
                    emotionalRange: parseInt(e.target.value)
                  }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Adaptabilidad: {personalityData.adaptability}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={personalityData.adaptability}
                  onChange={(e) => setPersonalityData(prev => ({
                    ...prev,
                    adaptability: parseInt(e.target.value)
                  }))}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Longitud de Respuestas
              </label>
              <select
                value={personalityData.responseLength}
                onChange={(e) => setPersonalityData(prev => ({
                  ...prev,
                  responseLength: e.target.value as 'concise' | 'moderate' | 'detailed'
                }))}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="concise">Concisas (1-2 oraciones)</option>
                <option value="moderate">Moderadas (1 párrafo)</option>
                <option value="detailed">Detalladas (múltiples párrafos)</option>
              </select>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <Card className="bg-white shadow-2xl border border-slate-200 rounded-2xl overflow-hidden">
          {/* Header */}
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold flex items-center">
                  <Brain className="h-7 w-7 mr-3" />
                  Crear Personalidad IA
                </CardTitle>
                <p className="text-purple-100 mt-1">
                  {steps[currentStep].description}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                ✕
              </Button>
            </div>
            
            {/* Progress */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-purple-100 mb-2">
                <span>Paso {currentStep + 1} de {steps.length}</span>
                <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <Progress 
                value={((currentStep + 1) / steps.length) * 100} 
                className="h-2 bg-purple-400/30"
              />
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="p-6 max-h-[60vh] overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </CardContent>

          {/* Footer */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>
              
              <div className="flex space-x-3">
                {currentStep === steps.length - 1 ? (
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Crear Personalidad
                  </Button>
                ) : (
                  <Button
                    onClick={nextStep}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}