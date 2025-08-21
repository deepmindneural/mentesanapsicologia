"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { 
  Send, 
  Mic, 
  MicOff, 
  MoreVertical, 
  AlertTriangle,
  Heart,
  Brain,
  Clock,
  Star,
  ArrowLeft,
  Phone,
  Video,
  Settings,
  Download,
  Share
} from 'lucide-react'
import { PsychologistPersonality } from '@/services/personality'
import { sessionService, TherapySession } from '@/services/session'

interface IntelligentChatProps {
  psychologist: PsychologistPersonality
  onBack: () => void
  userId: string
  className?: string
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  emotion?: string
  suggestions?: string[]
  isTyping?: boolean
}

export default function IntelligentChat({ 
  psychologist, 
  onBack, 
  userId,
  className = ""
}: IntelligentChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [session, setSession] = useState<TherapySession | null>(null)
  const [currentEmotion, setCurrentEmotion] = useState<string>('')
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('low')
  const [alerts, setAlerts] = useState<string[]>([])
  const [showEmotionInsight, setShowEmotionInsight] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    initializeSession()
  }, [psychologist.id, userId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const initializeSession = async () => {
    try {
      const newSession = await sessionService.createSession(userId, psychologist.id, 'chat')
      setSession(newSession)
      
      // Agregar mensaje de bienvenida
      const welcomeMessage = newSession.messages[0]
      if (welcomeMessage) {
        setMessages([{
          id: welcomeMessage.id,
          role: welcomeMessage.role as 'user' | 'assistant',
          content: welcomeMessage.content,
          timestamp: welcomeMessage.timestamp
        }])
      }
    } catch (error) {
      console.error('Error initializing session:', error)
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || !session || isLoading) return

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Mostrar indicador de escritura
    const typingMessage: Message = {
      id: 'typing',
      role: 'assistant',
      content: `${psychologist.name} está escribiendo...`,
      timestamp: new Date(),
      isTyping: true
    }
    setMessages(prev => [...prev, typingMessage])

    try {
      const response = await sessionService.sendMessage(session.id, inputMessage, userId)
      
      // Remover indicador de escritura
      setMessages(prev => prev.filter(m => m.id !== 'typing'))
      
      // Agregar respuesta del asistente
      const assistantMessage: Message = {
        id: `msg_${Date.now()}_response`,
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
        emotion: response.session.metrics.emotionalState.progression.slice(-1)[0]?.emotion,
        suggestions: response.session.metrics.techniquesUsed.slice(-3)
      }

      setMessages(prev => [...prev, assistantMessage])
      setSession(response.session)
      setRiskLevel(response.session.riskLevel)
      
      if (response.alerts && response.alerts.length > 0) {
        setAlerts(response.alerts)
      }

      // Actualizar emoción actual
      const lastEmotion = response.session.metrics.emotionalState.progression.slice(-1)[0]
      if (lastEmotion) {
        setCurrentEmotion(lastEmotion.emotion)
        setShowEmotionInsight(true)
        setTimeout(() => setShowEmotionInsight(false), 5000)
      }

    } catch (error) {
      console.error('Error sending message:', error)
      setMessages(prev => prev.filter(m => m.id !== 'typing'))
      
      const errorMessage: Message = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: 'Lo siento, ha ocurrido un error. Por favor, intenta nuevamente.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const endSession = async () => {
    if (!session) return
    
    try {
      await sessionService.endSession(session.id, userId)
      onBack()
    } catch (error) {
      console.error('Error ending session:', error)
    }
  }

  const toggleVoiceRecording = () => {
    if (isListening) {
      // Detener grabación (implementar con Web Speech API o similar)
      setIsListening(false)
    } else {
      // Iniciar grabación
      setIsListening(true)
      // Implementar grabación de voz
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const getEmotionColor = (emotion: string) => {
    const colors: Record<string, string> = {
      'ansiedad': 'text-yellow-600 bg-yellow-100',
      'tristeza': 'text-blue-600 bg-blue-100',
      'ira': 'text-red-600 bg-red-100',
      'miedo': 'text-purple-600 bg-purple-100',
      'alegría': 'text-green-600 bg-green-100',
      'neutral': 'text-gray-600 bg-gray-100'
    }
    return colors[emotion] || colors.neutral
  }

  const getRiskLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      'low': 'text-green-600 bg-green-100',
      'medium': 'text-yellow-600 bg-yellow-100',
      'high': 'text-red-600 bg-red-100'
    }
    return colors[level] || colors.low
  }

  return (
    <div className={`h-screen flex flex-col ${className}`}>
      {/* Header */}
      <Card className="rounded-none border-x-0 border-t-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src={psychologist.avatar}
                  alt={psychologist.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-900">{psychologist.name}</h3>
                <p className="text-sm text-slate-500 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {psychologist.rating} • {psychologist.specialization}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Risk level indicator */}
            {riskLevel !== 'low' && (
              <Badge className={getRiskLevelColor(riskLevel)}>
                <AlertTriangle className="h-3 w-3 mr-1" />
                {riskLevel === 'high' ? 'Alto Riesgo' : 'Riesgo Moderado'}
              </Badge>
            )}
            
            {/* Session info */}
            {session && (
              <div className="flex items-center text-sm text-slate-500">
                <Clock className="h-3 w-3 mr-1" />
                {Math.floor((Date.now() - session.startTime.getTime()) / 60000)} min
              </div>
            )}
            
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Alerts */}
      <AnimatePresence>
        {alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-red-50 border-l-4 border-red-500 p-4 m-4 rounded-r-lg"
          >
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <div>
                <h4 className="font-semibold text-red-800">Alerta Importante</h4>
                <ul className="text-sm text-red-700 mt-1">
                  {alerts.map((alert, index) => (
                    <li key={index}>• {alert}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setAlerts([])}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              Entendido
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emotion insight */}
      <AnimatePresence>
        {showEmotionInsight && currentEmotion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mx-4 mb-4"
          >
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800">
                      Emoción detectada:
                    </span>
                    <Badge className={getEmotionColor(currentEmotion)}>
                      {currentEmotion}
                    </Badge>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowEmotionInsight(false)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-sm'
                  : message.isTyping
                  ? 'bg-slate-100 text-slate-600 animate-pulse'
                  : 'bg-slate-100 text-slate-800 rounded-bl-sm'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                
                {/* Message metadata */}
                <div className={`flex items-center justify-between mt-2 text-xs ${
                  message.role === 'user' ? 'text-purple-100' : 'text-slate-500'
                }`}>
                  <span>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                  
                  {message.emotion && (
                    <Badge className={`${getEmotionColor(message.emotion)} text-xs`}>
                      {message.emotion}
                    </Badge>
                  )}
                </div>

                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-slate-500">Técnicas sugeridas:</p>
                    {message.suggestions.slice(0, 2).map((suggestion, index) => (
                      <Badge key={index} variant="secondary" className="text-xs mr-1">
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <Card className="rounded-none border-x-0 border-b-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Escribe tu mensaje..."
                disabled={isLoading}
                className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
              />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleVoiceRecording}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                  isListening ? 'text-red-500' : 'text-slate-400'
                }`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            
            <Button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl px-6 disabled:opacity-50"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {/* Quick actions */}
          <div className="flex items-center justify-between mt-3 text-sm">
            <div className="flex space-x-4">
              <button className="text-slate-500 hover:text-purple-600 transition-colors">
                📊 Progreso
              </button>
              <button className="text-slate-500 hover:text-purple-600 transition-colors">
                🎯 Objetivos
              </button>
              <button className="text-slate-500 hover:text-purple-600 transition-colors">
                📝 Ejercicios
              </button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={endSession}
              className="text-slate-500 hover:text-red-600"
            >
              Finalizar sesión
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}