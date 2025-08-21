"use client"

import { useState, useCallback, useRef, useEffect } from 'react'
import { aiService, AIMessage } from '@/services/ai'
import { voiceService, VoiceService, AudioRecording } from '@/services/voice'

export interface ChatMessage {
  id: string
  content: string
  isFromAI: boolean
  timestamp: Date
  isVoice?: boolean
  audioUrl?: string
  emotion?: string
}

export interface UseChatOptions {
  psychologistId?: string
  enableVoice?: boolean
  enableEmotionAnalysis?: boolean
}

export function useChat(options: UseChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const messagesRef = useRef<ChatMessage[]>([])
  const abortControllerRef = useRef<AbortController | null>(null)

  // Mantener sincronizado el ref con el state
  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  // Limpiar recursos al desmontar
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      voiceService.cleanup()
    }
  }, [])

  const sendMessage = useCallback(async (content: string, isVoice = false) => {
    if (!content.trim() || isLoading) return

    setError(null)
    setIsLoading(true)

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      isFromAI: false,
      timestamp: new Date(),
      isVoice
    }

    setMessages(prev => [...prev, userMessage])

    try {
      // Analizar emoción si está habilitado
      let emotion
      if (options.enableEmotionAnalysis) {
        const emotionAnalysis = await aiService.analyzeEmotion(content)
        emotion = emotionAnalysis.emotion
      }

      // Preparar mensajes para la IA
      const aiMessages: AIMessage[] = messagesRef.current.map(msg => ({
        role: msg.isFromAI ? 'assistant' : 'user',
        content: msg.content
      }))

      // Añadir el nuevo mensaje del usuario
      aiMessages.push({
        role: 'user',
        content
      })

      // Crear AbortController para esta petición
      abortControllerRef.current = new AbortController()

      // Obtener respuesta de la IA
      const aiResponse = await aiService.sendMessage(aiMessages)

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isFromAI: true,
        timestamp: new Date(),
        emotion
      }

      setMessages(prev => [...prev, aiMessage])

      // Síntesis de voz si está habilitada
      if (options.enableVoice && aiResponse) {
        await speakMessage(aiResponse)
      }

    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        setError('Error al enviar el mensaje. Intenta de nuevo.')
        console.error('Chat error:', error)
      }
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }, [isLoading, options.enableEmotionAnalysis, options.enableVoice])

  const startRecording = useCallback(async () => {
    if (isRecording) return

    try {
      setError(null)
      await voiceService.startRecording()
      setIsRecording(true)
    } catch (error) {
      setError('Error al iniciar la grabación. Verifica los permisos del micrófono.')
      console.error('Recording error:', error)
    }
  }, [isRecording])

  const stopRecording = useCallback(async () => {
    if (!isRecording) return

    try {
      const recording: AudioRecording = await voiceService.stopRecording()
      setIsRecording(false)

      // Transcribir audio
      const transcript = await voiceService.transcribeAudio(recording.blob)
      
      if (transcript.trim()) {
        await sendMessage(transcript, true)
      }
      
    } catch (error) {
      setError('Error al procesar la grabación.')
      console.error('Recording stop error:', error)
      setIsRecording(false)
    }
  }, [isRecording, sendMessage])

  const speakMessage = useCallback(async (text: string) => {
    if (isSpeaking) {
      voiceService.stopSpeaking()
      setIsSpeaking(false)
      return
    }

    try {
      setIsSpeaking(true)
      await voiceService.speak(text)
    } catch (error) {
      console.error('Speech error:', error)
    } finally {
      setIsSpeaking(false)
    }
  }, [isSpeaking])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  const cancelCurrentRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setIsLoading(false)
    }
  }, [])

  const retryLastMessage = useCallback(() => {
    const lastUserMessage = messages
      .slice()
      .reverse()
      .find(msg => !msg.isFromAI)
    
    if (lastUserMessage) {
      sendMessage(lastUserMessage.content, lastUserMessage.isVoice)
    }
  }, [messages, sendMessage])

  return {
    messages,
    isLoading,
    isRecording,
    isSpeaking,
    error,
    sendMessage,
    startRecording,
    stopRecording,
    speakMessage,
    clearMessages,
    cancelCurrentRequest,
    retryLastMessage,
    capabilities: {
      voice: VoiceService.isSupported(),
      emotionAnalysis: options.enableEmotionAnalysis || false
    }
  }
}