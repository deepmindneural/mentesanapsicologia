// Servicio para síntesis y reconocimiento de voz
export interface VoiceConfig {
  voiceId: string
  language: string
  speed: number
  pitch: number
  emotion: string
}

export interface AudioRecording {
  blob: Blob
  duration: number
  url: string
}

interface SpeechRecognitionInterface {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: any) => void) | null;
  onerror: ((event: Event) => void) | null;
  start(): void;
  stop(): void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInterface;
    webkitSpeechRecognition: new () => SpeechRecognitionInterface;
  }
}

export class VoiceService {
  private synthesis: SpeechSynthesis | null = null
  private recognition: SpeechRecognitionInterface | null = null
  private isRecording = false
  private mediaRecorder: MediaRecorder | null = null
  private audioChunks: Blob[] = []

  constructor() {
    if (typeof window !== 'undefined') {
      this.synthesis = window.speechSynthesis
      this.initSpeechRecognition()
    }
  }

  private initSpeechRecognition() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition()
        this.recognition.lang = 'es-ES'
        this.recognition.continuous = false
        this.recognition.interimResults = false
      }
    }
  }

  // Síntesis de voz (Text-to-Speech)
  async speak(text: string, voiceConfig?: Partial<VoiceConfig>): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('Speech synthesis not supported'))
        return
      }

      // Cancelar cualquier síntesis en curso
      this.synthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      
      // Configurar voz
      const voices = this.synthesis.getVoices()
      const spanishVoice = voices.find(voice => 
        voice.lang.startsWith('es') && voice.name.includes('Female')
      ) || voices.find(voice => voice.lang.startsWith('es'))
      
      if (spanishVoice) {
        utterance.voice = spanishVoice
      }

      // Aplicar configuración personalizada
      utterance.rate = voiceConfig?.speed || 0.9
      utterance.pitch = voiceConfig?.pitch || 1.0
      utterance.volume = 0.8
      utterance.lang = voiceConfig?.language || 'es-ES'

      utterance.onend = () => resolve()
      utterance.onerror = (event) => reject(event.error)

      this.synthesis.speak(utterance)
    })
  }

  // Detener síntesis de voz
  stopSpeaking(): void {
    if (this.synthesis) {
      this.synthesis.cancel()
    }
  }

  // Reconocimiento de voz (Speech-to-Text)
  async startListening(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not supported'))
        return
      }

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        resolve(transcript)
      }

      this.recognition.onerror = (event: Event) => {
        reject(new Error(`Speech recognition error: ${event.error}`))
      }

      this.recognition.start()
    })
  }

  // Grabación de audio
  async startRecording(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      this.mediaRecorder = new MediaRecorder(stream)
      this.audioChunks = []

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data)
      }

      this.mediaRecorder.start()
      this.isRecording = true
    } catch (error) {
      throw new Error('Could not start recording: ' + error)
    }
  }

  async stopRecording(): Promise<AudioRecording> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || !this.isRecording) {
        reject(new Error('No recording in progress'))
        return
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' })
        const audioUrl = URL.createObjectURL(audioBlob)
        
        // Calcular duración aproximada (esto es una estimación)
        const duration = this.audioChunks.length * 0.1 // Estimación básica
        
        resolve({
          blob: audioBlob,
          duration,
          url: audioUrl
        })
        
        this.isRecording = false
        
        // Detener todas las pistas de audio
        if (this.mediaRecorder.stream) {
          this.mediaRecorder.stream.getTracks().forEach(track => track.stop())
        }
      }

      this.mediaRecorder.stop()
    })
  }

  // Obtener voces disponibles
  getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.synthesis) return []
    return this.synthesis.getVoices().filter(voice => voice.lang.startsWith('es'))
  }

  // Síntesis con ElevenLabs (para producción)
  async synthesizeWithElevenLabs(
    text: string, 
    voiceId: string,
    apiKey?: string
  ): Promise<ArrayBuffer> {
    if (!apiKey) {
      throw new Error('ElevenLabs API key required')
    }

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8,
          style: 0.5,
          use_speaker_boost: true
        }
      })
    })

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`)
    }

    return response.arrayBuffer()
  }

  // Transcribir audio con Whisper API
  async transcribeAudio(audioBlob: Blob, apiKey?: string): Promise<string> {
    if (!apiKey) {
      // En desarrollo, simular transcripción
      return "Texto transcrito simulado para desarrollo"
    }

    const formData = new FormData()
    formData.append('file', audioBlob, 'audio.webm')
    formData.append('model', 'whisper-1')
    formData.append('language', 'es')

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error(`Whisper API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.text
  }

  // Crear clon de voz con ElevenLabs
  async createVoiceClone(
    name: string,
    audioSamples: Blob[],
    apiKey: string
  ): Promise<string> {
    const formData = new FormData()
    formData.append('name', name)
    
    audioSamples.forEach((sample, index) => {
      formData.append(`files`, sample, `sample_${index}.wav`)
    })

    const response = await fetch('https://api.elevenlabs.io/v1/voices/add', {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey
      },
      body: formData
    })

    if (!response.ok) {
      throw new Error(`Voice cloning error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.voice_id
  }

  // Verificar soporte de audio
  static isSupported(): {
    synthesis: boolean
    recognition: boolean
    recording: boolean
  } {
    return {
      synthesis: typeof window !== 'undefined' && 'speechSynthesis' in window,
      recognition: typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window),
      recording: typeof navigator !== 'undefined' && 'mediaDevices' in navigator
    }
  }

  // Limpiar recursos
  cleanup(): void {
    this.stopSpeaking()
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop()
    }
  }
}

export const voiceService = new VoiceService()