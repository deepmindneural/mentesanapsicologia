import { User, PsychologistProfile, AiPersonality, Session, Subscription, Test, TestResult, Appointment, ChatMessage, Avatar, Role, SubscriptionPlan, SubscriptionStatus, AppointmentStatus, MessageType } from '@prisma/client'

export type {
  User,
  PsychologistProfile,
  AiPersonality,
  Session,
  Subscription,
  Test,
  TestResult,
  Appointment,
  ChatMessage,
  Avatar,
  Role,
  SubscriptionPlan,
  SubscriptionStatus,
  AppointmentStatus,
  MessageType
}

export interface UserWithProfile extends User {
  psychologistProfile?: PsychologistProfile
}

export interface PsychologistWithAI extends PsychologistProfile {
  user: User
  aiPersonality?: AiPersonality
}

export interface ChatMessageWithUser extends ChatMessage {
  user: User
}

export interface TestWithResults extends Test {
  results: TestResult[]
}

export interface AppointmentWithDetails extends Appointment {
  user: User
  psychologist: PsychologistProfile & {
    user: User
  }
}

export interface AvatarConfig {
  appearance: {
    model: string
    clothing: string
    accessories: string[]
    colors: {
      skin: string
      hair: string
      eyes: string
    }
  }
  personality: {
    traits: string[]
    voiceType: string
    responseStyle: string
  }
}

export interface VoiceCloneData {
  voiceId: string
  sampleAudios: string[]
  characteristics: {
    pitch: number
    speed: number
    accent: string
    emotion: string
  }
}

export interface AIPersonalityData {
  conversationPatterns: string[]
  responseTemplates: Record<string, string>
  expertise: string[]
  communicationStyle: {
    formality: 'formal' | 'casual' | 'mixed'
    empathy: number
    directness: number
  }
}