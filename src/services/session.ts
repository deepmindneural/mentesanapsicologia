// Servicio para gestión de sesiones de terapia con IA
import { personalityService, ConversationContext, PsychologistPersonality } from './personality'

export interface TherapySession {
  id: string
  userId: string
  psychologistId: string
  startTime: Date
  endTime?: Date
  status: 'active' | 'completed' | 'paused' | 'cancelled'
  type: 'chat' | 'video' | 'voice'
  duration?: number // en minutos
  messages: ConversationContext['messages']
  sessionNotes: string
  goals: string[]
  homework?: {
    assigned: string[]
    completed: string[]
    nextSession: string[]
  }
  metrics: {
    messagesCount: number
    userSatisfaction?: number
    emotionalState: {
      start?: string
      end?: string
      progression: Array<{
        timestamp: Date
        emotion: string
        intensity: number
      }>
    }
    techniquesUsed: string[]
    milestones: string[]
  }
  nextSessionDate?: Date
  isEmergency: boolean
  riskLevel: 'low' | 'medium' | 'high'
}

export interface SessionAnalytics {
  totalSessions: number
  averageDuration: number
  completionRate: number
  userSatisfactionAverage: number
  mostUsedTechniques: string[]
  commonEmotions: string[]
  riskDistribution: Record<string, number>
  improvementTrends: {
    date: Date
    metric: string
    value: number
  }[]
}

export class SessionService {
  private activeSessions: Map<string, TherapySession> = new Map()
  private sessionHistory: Map<string, TherapySession[]> = new Map()

  async createSession(
    userId: string, 
    psychologistId: string, 
    type: TherapySession['type'] = 'chat'
  ): Promise<TherapySession> {
    const personality = personalityService.getPersonality(psychologistId)
    if (!personality) {
      throw new Error('Psychologist personality not found')
    }

    const sessionId = this.generateSessionId()
    const session: TherapySession = {
      id: sessionId,
      userId,
      psychologistId,
      startTime: new Date(),
      status: 'active',
      type,
      messages: [],
      sessionNotes: '',
      goals: [],
      metrics: {
        messagesCount: 0,
        emotionalState: {
          progression: []
        },
        techniquesUsed: [],
        milestones: []
      },
      isEmergency: false,
      riskLevel: 'low'
    }

    // Mensaje de bienvenida personalizado
    const welcomeMessage = await this.generateWelcomeMessage(personality, userId)
    session.messages.push({
      id: this.generateMessageId(),
      role: 'assistant',
      content: welcomeMessage,
      timestamp: new Date()
    })

    this.activeSessions.set(sessionId, session)
    return session
  }

  async sendMessage(
    sessionId: string,
    message: string,
    userId: string
  ): Promise<{
    response: string
    session: TherapySession
    alerts?: string[]
  }> {
    const session = this.activeSessions.get(sessionId)
    if (!session) {
      throw new Error('Session not found')
    }

    if (session.userId !== userId) {
      throw new Error('Unauthorized access to session')
    }

    // Agregar mensaje del usuario
    const userMessage = {
      id: this.generateMessageId(),
      role: 'user' as const,
      content: message,
      timestamp: new Date()
    }
    session.messages.push(userMessage)

    // Procesar mensaje con IA
    const context: Partial<ConversationContext> = {
      sessionId: session.id,
      userId: session.userId,
      psychologistId: session.psychologistId,
      messages: session.messages,
      sessionNotes: session.sessionNotes
    }

    const aiResponse = await personalityService.processMessage(
      message,
      session.psychologistId,
      context
    )

    // Agregar respuesta del asistente
    const assistantMessage = {
      id: this.generateMessageId(),
      role: 'assistant' as const,
      content: aiResponse.response,
      timestamp: new Date(),
      metadata: {
        emotion: aiResponse.emotion,
        confidence: 0.8,
        techniques: aiResponse.suggestions
      }
    }
    session.messages.push(assistantMessage)

    // Actualizar métricas de sesión
    session.metrics.messagesCount++
    
    if (aiResponse.emotion) {
      session.metrics.emotionalState.progression.push({
        timestamp: new Date(),
        emotion: aiResponse.emotion,
        intensity: Math.random() * 10 // En producción esto vendría del análisis de IA
      })
    }

    if (aiResponse.suggestions) {
      session.metrics.techniquesUsed.push(...aiResponse.suggestions)
    }

    // Actualizar nivel de riesgo
    if (aiResponse.riskAssessment) {
      session.riskLevel = aiResponse.riskAssessment.level
      if (aiResponse.riskAssessment.level === 'high') {
        session.isEmergency = true
      }
    }

    // Generar alertas si es necesario
    const alerts = this.generateAlerts(session, aiResponse.riskAssessment)

    this.activeSessions.set(sessionId, session)

    return {
      response: aiResponse.response,
      session,
      alerts
    }
  }

  async endSession(sessionId: string, userId: string): Promise<TherapySession> {
    const session = this.activeSessions.get(sessionId)
    if (!session) {
      throw new Error('Session not found')
    }

    if (session.userId !== userId) {
      throw new Error('Unauthorized access to session')
    }

    session.endTime = new Date()
    session.status = 'completed'
    session.duration = Math.floor(
      (session.endTime.getTime() - session.startTime.getTime()) / (1000 * 60)
    )

    // Generar resumen de sesión
    session.sessionNotes = await this.generateSessionSummary(session)

    // Mover a historial
    const userHistory = this.sessionHistory.get(userId) || []
    userHistory.push(session)
    this.sessionHistory.set(userId, userHistory)

    // Remover de sesiones activas
    this.activeSessions.delete(sessionId)

    return session
  }

  async pauseSession(sessionId: string, userId: string): Promise<TherapySession> {
    const session = this.activeSessions.get(sessionId)
    if (!session) {
      throw new Error('Session not found')
    }

    if (session.userId !== userId) {
      throw new Error('Unauthorized access to session')
    }

    session.status = 'paused'
    this.activeSessions.set(sessionId, session)

    return session
  }

  async resumeSession(sessionId: string, userId: string): Promise<TherapySession> {
    const session = this.activeSessions.get(sessionId)
    if (!session) {
      throw new Error('Session not found')
    }

    if (session.userId !== userId) {
      throw new Error('Unauthorized access to session')
    }

    session.status = 'active'
    this.activeSessions.set(sessionId, session)

    return session
  }

  getActiveSession(userId: string): TherapySession | undefined {
    return Array.from(this.activeSessions.values())
      .find(session => session.userId === userId && session.status === 'active')
  }

  getUserSessions(userId: string): TherapySession[] {
    return this.sessionHistory.get(userId) || []
  }

  async getSessionAnalytics(
    userId?: string, 
    psychologistId?: string,
    dateRange?: { start: Date; end: Date }
  ): Promise<SessionAnalytics> {
    let sessions: TherapySession[] = []

    if (userId) {
      sessions = this.getUserSessions(userId)
    } else {
      // Obtener todas las sesiones
      for (const userSessions of this.sessionHistory.values()) {
        sessions.push(...userSessions)
      }
    }

    if (psychologistId) {
      sessions = sessions.filter(s => s.psychologistId === psychologistId)
    }

    if (dateRange) {
      sessions = sessions.filter(s => 
        s.startTime >= dateRange.start && s.startTime <= dateRange.end
      )
    }

    return this.calculateAnalytics(sessions)
  }

  private calculateAnalytics(sessions: TherapySession[]): SessionAnalytics {
    const completedSessions = sessions.filter(s => s.status === 'completed')
    
    const totalDuration = completedSessions.reduce((sum, s) => sum + (s.duration || 0), 0)
    const avgDuration = completedSessions.length > 0 ? totalDuration / completedSessions.length : 0

    const completionRate = sessions.length > 0 ? completedSessions.length / sessions.length : 0

    const satisfactionScores = completedSessions
      .map(s => s.metrics.userSatisfaction)
      .filter(score => score !== undefined) as number[]
    
    const avgSatisfaction = satisfactionScores.length > 0 
      ? satisfactionScores.reduce((sum, score) => sum + score, 0) / satisfactionScores.length 
      : 0

    // Técnicas más utilizadas
    const allTechniques = completedSessions.flatMap(s => s.metrics.techniquesUsed)
    const techniqueCount = allTechniques.reduce((acc, technique) => {
      acc[technique] = (acc[technique] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const mostUsedTechniques = Object.entries(techniqueCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([technique]) => technique)

    // Emociones comunes
    const allEmotions = completedSessions.flatMap(s => 
      s.metrics.emotionalState.progression.map(p => p.emotion)
    )
    const emotionCount = allEmotions.reduce((acc, emotion) => {
      acc[emotion] = (acc[emotion] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const commonEmotions = Object.entries(emotionCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([emotion]) => emotion)

    // Distribución de riesgo
    const riskDistribution = sessions.reduce((acc, session) => {
      acc[session.riskLevel] = (acc[session.riskLevel] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      totalSessions: sessions.length,
      averageDuration: avgDuration,
      completionRate,
      userSatisfactionAverage: avgSatisfaction,
      mostUsedTechniques,
      commonEmotions,
      riskDistribution,
      improvementTrends: [] // Implementar según necesidades específicas
    }
  }

  private async generateWelcomeMessage(
    personality: PsychologistPersonality, 
    userId: string
  ): Promise<string> {
    const welcomeMessages = {
      formal: `Buenos días. Soy ${personality.name}, especialista en ${personality.specialization}. Me complace poder acompañarle en este espacio de reflexión y crecimiento personal. ¿En qué puedo ayudarle hoy?`,
      casual: `¡Hola! Soy ${personality.name}, tu psicóloga especializada en ${personality.specialization}. Estoy aquí para escucharte y acompañarte. ¿Qué te trae por aquí hoy?`,
      mixed: `Hola, soy ${personality.name}. Como especialista en ${personality.specialization}, estoy aquí para brindarte un espacio seguro donde puedas expresarte libremente. ¿Me cuentas cómo te sientes hoy?`
    }

    return welcomeMessages[personality.communicationStyle.formality] || welcomeMessages.mixed
  }

  private async generateSessionSummary(session: TherapySession): Promise<string> {
    const emotions = session.metrics.emotionalState.progression
    const techniques = [...new Set(session.metrics.techniquesUsed)]
    
    let summary = `Resumen de sesión del ${session.startTime.toLocaleDateString()}:\n\n`
    summary += `Duración: ${session.duration} minutos\n`
    summary += `Mensajes intercambiados: ${session.metrics.messagesCount}\n`
    
    if (emotions.length > 0) {
      const dominantEmotion = emotions.reduce((prev, current) => 
        prev.intensity > current.intensity ? prev : current
      )
      summary += `Emoción predominante: ${dominantEmotion.emotion}\n`
    }
    
    if (techniques.length > 0) {
      summary += `Técnicas aplicadas: ${techniques.join(', ')}\n`
    }
    
    summary += `Nivel de riesgo: ${session.riskLevel}\n`
    
    if (session.goals.length > 0) {
      summary += `Objetivos trabajados: ${session.goals.join(', ')}\n`
    }

    return summary
  }

  private generateAlerts(
    session: TherapySession, 
    riskAssessment?: any
  ): string[] {
    const alerts: string[] = []

    if (session.isEmergency) {
      alerts.push('ALERTA: Sesión marcada como emergencia - Supervisión requerida')
    }

    if (session.riskLevel === 'high') {
      alerts.push('RIESGO ALTO: Se recomienda contacto inmediato con profesional')
    }

    if (session.duration && session.duration > 120) {
      alerts.push('Sesión extensa detectada - Considerar pausa')
    }

    if (riskAssessment?.recommendations) {
      alerts.push(...riskAssessment.recommendations)
    }

    return alerts
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Métodos para administración
  getAllActiveSessions(): TherapySession[] {
    return Array.from(this.activeSessions.values())
  }

  getEmergencySessions(): TherapySession[] {
    return Array.from(this.activeSessions.values()).filter(s => s.isEmergency)
  }

  getHighRiskSessions(): TherapySession[] {
    return Array.from(this.activeSessions.values()).filter(s => s.riskLevel === 'high')
  }
}

export const sessionService = new SessionService()