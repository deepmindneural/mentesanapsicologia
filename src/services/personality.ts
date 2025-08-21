// Servicio para gestión de personalidades de psicólogos IA
import { aiService, AIPersonalityConfig } from './ai'

export interface PsychologistPersonality {
  id: string
  name: string
  avatar: string
  specialization: string
  experience: number
  bio: string
  credentials: string[]
  languages: string[]
  communicationStyle: {
    formality: 'formal' | 'casual' | 'mixed'
    empathy: number // 1-10
    directness: number // 1-10
    warmth: number // 1-10
    analyticalLevel: number // 1-10
  }
  therapyApproaches: string[]
  systemPrompt: string
  avatar3d?: {
    model: string
    animations: string[]
    voiceProfile: string
  }
  isActive: boolean
  rating: number
  totalSessions: number
  lastUpdated: Date
}

export interface ConversationContext {
  sessionId: string
  userId: string
  psychologistId: string
  messages: Array<{
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
    metadata?: {
      emotion?: string
      confidence?: number
      techniques?: string[]
    }
  }>
  sessionNotes: string
  currentEmotion?: string
  goalsSummary: string
  nextSessionTopics: string[]
  riskAssessment?: {
    level: 'low' | 'medium' | 'high'
    indicators: string[]
    recommendations: string[]
  }
}

export class PersonalityService {
  private personalities: Map<string, PsychologistPersonality> = new Map()

  constructor() {
    this.initializeDefaultPersonalities()
  }

  private initializeDefaultPersonalities() {
    const defaultPersonalities: PsychologistPersonality[] = [
      {
        id: 'dr-ana-garcia',
        name: 'Dra. Ana García',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
        specialization: 'Ansiedad y Depresión',
        experience: 15,
        bio: 'Especialista en terapia cognitivo-conductual con enfoque en trastornos de ansiedad y depresión. Mi objetivo es ayudarte a desarrollar herramientas prácticas para manejar tus emociones.',
        credentials: ['Psicóloga Clínica', 'Magíster en TCC', 'Certificación en Mindfulness'],
        languages: ['Español', 'Inglés'],
        communicationStyle: {
          formality: 'mixed',
          empathy: 9,
          directness: 7,
          warmth: 8,
          analyticalLevel: 8
        },
        therapyApproaches: ['TCC', 'Mindfulness', 'Terapia de Exposición', 'EMDR'],
        systemPrompt: '',
        isActive: true,
        rating: 4.9,
        totalSessions: 2840,
        lastUpdated: new Date()
      },
      {
        id: 'dr-carlos-ruiz',
        name: 'Dr. Carlos Ruiz',
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80',
        specialization: 'Terapia de Pareja',
        experience: 12,
        bio: 'Experto en relaciones interpersonales y comunicación efectiva en parejas. Te ayudo a fortalecer vínculos y resolver conflictos de manera constructiva.',
        credentials: ['Psicólogo Clínico', 'Especialista en Terapia de Pareja', 'Mediador Familiar'],
        languages: ['Español'],
        communicationStyle: {
          formality: 'casual',
          empathy: 8,
          directness: 8,
          warmth: 9,
          analyticalLevel: 7
        },
        therapyApproaches: ['Terapia Sistémica', 'Comunicación Asertiva', 'Resolución de Conflictos'],
        systemPrompt: '',
        isActive: true,
        rating: 4.8,
        totalSessions: 1950,
        lastUpdated: new Date()
      },
      {
        id: 'dra-maria-lopez',
        name: 'Dra. María López',
        avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=300&q=80',
        specialization: 'Psicología Infantil',
        experience: 18,
        bio: 'Especializada en desarrollo infantil y trastornos del neurodesarrollo. Trabajo con niños y familias para crear ambientes de crecimiento saludable.',
        credentials: ['Psicóloga Infantil', 'Especialista en Neurodesarrollo', 'Terapia Lúdica'],
        languages: ['Español', 'Catalán'],
        communicationStyle: {
          formality: 'casual',
          empathy: 10,
          directness: 6,
          warmth: 10,
          analyticalLevel: 8
        },
        therapyApproaches: ['Terapia Lúdica', 'ABA', 'Desarrollo Cognitivo', 'Psicoeducación'],
        systemPrompt: '',
        isActive: true,
        rating: 4.9,
        totalSessions: 3200,
        lastUpdated: new Date()
      }
    ]

    // Generar prompts personalizados para cada personalidad
    defaultPersonalities.forEach(async (personality) => {
      personality.systemPrompt = await this.generatePersonalityPrompt(personality)
      this.personalities.set(personality.id, personality)
    })
  }

  async generatePersonalityPrompt(personality: PsychologistPersonality): Promise<string> {
    const basePrompt = `Eres ${personality.name}, un/a psicólogo/a especializado/a en ${personality.specialization} con ${personality.experience} años de experiencia.

PERSONALIDAD Y ESTILO:
- Biografía: ${personality.bio}
- Credenciales: ${personality.credentials.join(', ')}
- Enfoques terapéuticos: ${personality.therapyApproaches.join(', ')}

COMUNICACIÓN:
- Formalidad: ${personality.communicationStyle.formality}
- Nivel de empatía: ${personality.communicationStyle.empathy}/10
- Directividad: ${personality.communicationStyle.directness}/10
- Calidez: ${personality.communicationStyle.warmth}/10
- Nivel analítico: ${personality.communicationStyle.analyticalLevel}/10

DIRECTRICES ESPECÍFICAS:
${this.getStyleDirectives(personality.communicationStyle)}

RESPONSABILIDADES:
- Proporcionar apoyo emocional profesional
- Usar técnicas validadas de tu especialización
- Mantener límites profesionales apropiados
- Referir a atención presencial cuando sea necesario
- Detectar señales de riesgo y actuar apropiadamente

IMPORTANTE:
- Nunca diagnostiques ni prescribas medicamentos
- Siempre fomenta la búsqueda de ayuda adicional cuando sea apropiado
- Mantén la confidencialidad en todo momento
- Adapta tu lenguaje al nivel del usuario
- Proporciona herramientas prácticas y ejercicios específicos

Responde siempre en español, mantén tu personalidad consistente y limita tus respuestas a 100-200 palabras por mensaje.`

    return basePrompt
  }

  private getStyleDirectives(style: PsychologistPersonality['communicationStyle']): string {
    const directives = []

    // Formalidad
    if (style.formality === 'formal') {
      directives.push('- Usa un lenguaje formal y profesional, tutea moderadamente')
    } else if (style.formality === 'casual') {
      directives.push('- Usa un lenguaje cercano y empático, tutea naturalmente')
    } else {
      directives.push('- Adapta tu formalidad según la situación y preferencias del usuario')
    }

    // Empatía
    if (style.empathy >= 8) {
      directives.push('- Muestra alta empatía, valida emociones frecuentemente')
      directives.push('- Usa frases como "entiendo cómo te sientes", "es comprensible que..."')
    } else if (style.empathy >= 6) {
      directives.push('- Mantén un nivel moderado de empatía, equilibra comprensión con objetividad')
    } else {
      directives.push('- Enfócate más en soluciones prácticas que en validación emocional')
    }

    // Directividad
    if (style.directness >= 8) {
      directives.push('- Sé directo/a en tus recomendaciones y feedback')
      directives.push('- Proporciona pasos claros y específicos')
    } else if (style.directness >= 6) {
      directives.push('- Equilibra sugerencias directas con exploración guiada')
    } else {
      directives.push('- Usa preguntas abiertas y permite que el usuario llegue a sus propias conclusiones')
    }

    // Calidez
    if (style.warmth >= 8) {
      directives.push('- Mantén un tono cálido y acogedor en todas las interacciones')
      directives.push('- Usa lenguaje que transmita seguridad y confort')
    }

    // Nivel analítico
    if (style.analyticalLevel >= 8) {
      directives.push('- Proporciona explicaciones detalladas sobre técnicas y procesos')
      directives.push('- Conecta síntomas con posibles causas subyacentes')
    } else {
      directives.push('- Mantén explicaciones simples y enfócate en aplicación práctica')
    }

    return directives.join('\n')
  }

  getPersonality(id: string): PsychologistPersonality | undefined {
    return this.personalities.get(id)
  }

  getAllPersonalities(): PsychologistPersonality[] {
    return Array.from(this.personalities.values()).filter(p => p.isActive)
  }

  getPersonalitiesBySpecialization(specialization: string): PsychologistPersonality[] {
    return this.getAllPersonalities().filter(p => 
      p.specialization.toLowerCase().includes(specialization.toLowerCase())
    )
  }

  async createAIConfig(personalityId: string): Promise<AIPersonalityConfig | null> {
    const personality = this.getPersonality(personalityId)
    if (!personality) return null

    return {
      psychologistId: personality.id,
      name: personality.name,
      specialization: personality.specialization,
      personalityTraits: [
        `Empathy: ${personality.communicationStyle.empathy}/10`,
        `Directness: ${personality.communicationStyle.directness}/10`,
        `Warmth: ${personality.communicationStyle.warmth}/10`,
        `Analytical: ${personality.communicationStyle.analyticalLevel}/10`,
        `Formality: ${personality.communicationStyle.formality}`
      ],
      communicationStyle: {
        formality: personality.communicationStyle.formality,
        empathy: personality.communicationStyle.empathy,
        directness: personality.communicationStyle.directness
      },
      systemPrompt: personality.systemPrompt
    }
  }

  async processMessage(
    message: string, 
    personalityId: string, 
    context?: Partial<ConversationContext>
  ): Promise<{
    response: string
    emotion?: string
    suggestions?: string[]
    riskAssessment?: ConversationContext['riskAssessment']
  }> {
    const personality = this.getPersonality(personalityId)
    if (!personality) {
      throw new Error('Personality not found')
    }

    // Análisis emocional
    const emotionAnalysis = await aiService.analyzeEmotion(message)
    
    // Crear configuración de IA
    const aiConfig = await this.createAIConfig(personalityId)
    if (!aiConfig) {
      throw new Error('Could not create AI configuration')
    }

    // Construir historial de mensajes
    const messages = [
      ...(context?.messages?.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content
      })) || []),
      {
        role: 'user' as const,
        content: message
      }
    ]

    // Obtener respuesta de IA
    const response = await aiService.sendMessage(messages, aiConfig)

    // Evaluación de riesgo básica
    const riskAssessment = this.assessRisk(message, emotionAnalysis.emotion)

    return {
      response,
      emotion: emotionAnalysis.emotion,
      suggestions: emotionAnalysis.suggestions,
      riskAssessment
    }
  }

  private assessRisk(message: string, emotion: string): ConversationContext['riskAssessment'] {
    const highRiskKeywords = [
      'suicidio', 'matarme', 'acabar con todo', 'no vale la pena vivir',
      'hacerme daño', 'autolesión', 'lastimar', 'violencia'
    ]
    
    const mediumRiskKeywords = [
      'muy deprimido', 'sin esperanza', 'no puedo más', 'todo está mal',
      'nadie me entiende', 'estoy solo', 'no sirvo para nada'
    ]

    const messageLower = message.toLowerCase()
    
    if (highRiskKeywords.some(keyword => messageLower.includes(keyword))) {
      return {
        level: 'high',
        indicators: ['Ideación suicida o de autolesión detectada'],
        recommendations: [
          'Contactar inmediatamente con profesional de la salud',
          'Línea de crisis: 717 003 717',
          'Emergencias: 112'
        ]
      }
    }
    
    if (mediumRiskKeywords.some(keyword => messageLower.includes(keyword)) || 
        emotion === 'tristeza' || emotion === 'ansiedad') {
      return {
        level: 'medium',
        indicators: ['Síntomas de depresión/ansiedad moderados'],
        recommendations: [
          'Considerar consulta con psicólogo presencial',
          'Monitorear síntomas',
          'Aplicar técnicas de autocuidado'
        ]
      }
    }

    return {
      level: 'low',
      indicators: [],
      recommendations: ['Continuar con apoyo regular']
    }
  }

  updatePersonality(id: string, updates: Partial<PsychologistPersonality>): boolean {
    const personality = this.personalities.get(id)
    if (!personality) return false

    const updated = { ...personality, ...updates, lastUpdated: new Date() }
    this.personalities.set(id, updated)
    return true
  }

  addPersonality(personality: PsychologistPersonality): void {
    this.personalities.set(personality.id, personality)
  }

  removePersonality(id: string): boolean {
    return this.personalities.delete(id)
  }
}

export const personalityService = new PersonalityService()