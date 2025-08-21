// Servicio para interacciones con IA (OpenAI)
export interface AIMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface AIPersonalityConfig {
  psychologistId: string
  name: string
  specialization: string
  personalityTraits: string[]
  communicationStyle: {
    formality: 'formal' | 'casual' | 'mixed'
    empathy: number // 1-10
    directness: number // 1-10
  }
  systemPrompt: string
}

export class AIService {
  private apiKey: string
  private baseURL: string

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || ''
    this.baseURL = 'https://api.openai.com/v1'
  }

  async sendMessage(
    messages: AIMessage[],
    personalityConfig?: AIPersonalityConfig
  ): Promise<string> {
    try {
      // En desarrollo, retorna respuesta simulada
      if (process.env.NODE_ENV === 'development') {
        return this.simulateAIResponse(messages, personalityConfig)
      }

      const systemMessage: AIMessage = {
        role: 'system',
        content: personalityConfig?.systemPrompt || this.getDefaultSystemPrompt()
      }

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [systemMessage, ...messages],
          max_tokens: 500,
          temperature: 0.7,
          presence_penalty: 0.6,
          frequency_penalty: 0.3
        })
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || 'Lo siento, no pude procesar tu mensaje.'
    } catch (error) {
      console.error('Error in AI service:', error)
      return 'Lo siento, hay un problema técnico. Por favor intenta de nuevo.'
    }
  }

  private simulateAIResponse(messages: AIMessage[], personalityConfig?: AIPersonalityConfig): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = [
          'Entiendo tu preocupación. Es completamente normal sentirse así en estas situaciones.',
          '¿Podrías contarme un poco más sobre cómo te sientes en este momento?',
          'Me parece muy valiente de tu parte compartir esto conmigo. ¿Desde cuándo experimentas estas emociones?',
          'Es importante que sepas que no estás solo en esto. Muchas personas pasan por experiencias similares.',
          'Te sugiero que probemos algunas técnicas de respiración. ¿Te gustaría que te guíe a través de un ejercicio?'
        ]
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        
        if (personalityConfig) {
          const personalizedResponse = this.personalizeResponse(randomResponse, personalityConfig)
          resolve(personalizedResponse)
        } else {
          resolve(randomResponse)
        }
      }, 1000 + Math.random() * 2000) // Simula tiempo de respuesta variable
    })
  }

  private personalizeResponse(response: string, config: AIPersonalityConfig): string {
    // Ajustar respuesta según la personalidad del psicólogo
    let personalizedResponse = response

    if (config.communicationStyle.formality === 'formal') {
      personalizedResponse = personalizedResponse.replace(/te sientes/g, 'se siente')
      personalizedResponse = personalizedResponse.replace(/tu /g, 'su ')
    }

    if (config.communicationStyle.empathy > 8) {
      personalizedResponse = `${personalizedResponse} Estoy aquí para apoyarte en este proceso.`
    }

    return personalizedResponse
  }

  private getDefaultSystemPrompt(): string {
    return `Eres un asistente de inteligencia artificial especializado en psicología y bienestar mental. 
    Tu objetivo es proporcionar apoyo emocional y orientación psicológica de manera empática y profesional.
    
    Directrices importantes:
    - Siempre mantén un tono comprensivo y empático
    - Nunca diagnostiques ni prescribas tratamientos
    - Fomenta la búsqueda de ayuda profesional cuando sea necesario
    - Usa técnicas validadas de psicología cognitivo-conductual
    - Haz preguntas abiertas para ayudar a la reflexión
    - Valida las emociones del usuario
    - Proporciona técnicas prácticas de manejo emocional
    
    Responde en español y mantén las respuestas entre 50-150 palabras.`
  }

  async generatePersonalityPrompt(psychologistData: {
    name: string
    specialization: string
    experience: number
    bio: string
    communicationStyle: {
      formality: 'formal' | 'casual' | 'mixed'
      empathy: number
      directness: number
    }
  }): Promise<string> {
    const basePrompt = this.getDefaultSystemPrompt()
    
    const personalityPrompt = `${basePrompt}
    
    Personalidad específica:
    - Nombre: ${psychologistData.name}
    - Especialización: ${psychologistData.specialization}
    - Años de experiencia: ${psychologistData.experience}
    - Biografía: ${psychologistData.bio}
    - Estilo de comunicación: ${JSON.stringify(psychologistData.communicationStyle)}
    
    Adopta esta personalidad y estilo en todas tus respuestas, manteniendo la profesionalidad y ética.`
    
    return personalityPrompt
  }

  async analyzeEmotion(text: string): Promise<{
    emotion: string
    confidence: number
    suggestions: string[]
  }> {
    // Análisis básico de emociones (en producción usaría un modelo especializado)
    const emotions = {
      ansiedad: ['ansioso', 'nervioso', 'preocupado', 'inquieto', 'estrés'],
      tristeza: ['triste', 'deprimido', 'melancólico', 'desanimado', 'dolor'],
      ira: ['enojado', 'furioso', 'molesto', 'irritado', 'frustrado'],
      miedo: ['miedo', 'temor', 'pánico', 'terror', 'asustado'],
      alegría: ['feliz', 'alegre', 'contento', 'eufórico', 'satisfecho']
    }

    const textLower = text.toLowerCase()
    let detectedEmotion = 'neutral'
    let maxMatches = 0

    for (const [emotion, keywords] of Object.entries(emotions)) {
      const matches = keywords.filter(keyword => textLower.includes(keyword)).length
      if (matches > maxMatches) {
        maxMatches = matches
        detectedEmotion = emotion
      }
    }

    const confidence = Math.min(maxMatches * 0.3, 0.9)

    const suggestions = this.getEmotionSuggestions(detectedEmotion)

    return {
      emotion: detectedEmotion,
      confidence,
      suggestions
    }
  }

  private getEmotionSuggestions(emotion: string): string[] {
    const suggestionMap: Record<string, string[]> = {
      ansiedad: [
        'Prueba técnicas de respiración profunda',
        'Realiza ejercicio físico moderado',
        'Practica mindfulness o meditación'
      ],
      tristeza: [
        'Conecta con amigos o familiares',
        'Realiza actividades que disfrutes',
        'Considera escribir un diario'
      ],
      ira: [
        'Cuenta hasta 10 antes de reaccionar',
        'Practica ejercicio físico intenso',
        'Usa técnicas de relajación muscular'
      ],
      miedo: [
        'Identifica pensamientos irracionales',
        'Practica exposición gradual',
        'Usa técnicas de grounding'
      ],
      neutral: [
        'Mantén rutinas saludables',
        'Practica la gratitud diaria',
        'Cuida tu bienestar físico'
      ]
    }

    return suggestionMap[emotion] || suggestionMap.neutral
  }
}

export const aiService = new AIService()