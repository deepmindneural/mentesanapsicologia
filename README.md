# Mente Sana Psicología - Plataforma de Psicología con IA

## 📋 Descripción del Proyecto

Plataforma integral de servicios psicológicos que combina inteligencia artificial, avatares personalizables y comunicación por voz/texto para brindar una experiencia terapéutica innovadora. La plataforma permite a 60+ psicólogos crear personalidades de IA únicas que replican su estilo de comunicación, acento y metodología.

## 🏗️ Arquitectura del Sistema

### Frontend
- **Next.js 15** con TypeScript
- **Tailwind CSS** para estilos
- **Radix UI** para componentes
- **Framer Motion** para animaciones
- **Socket.io Client** para tiempo real

### Backend
- **Next.js API Routes**
- **Prisma ORM** con SQLite (desarrollo)
- **NextAuth.js** para autenticación
- **Socket.io** para chat en tiempo real

### IA y Voz
- **OpenAI API** para procesamiento de lenguaje natural
- **ElevenLabs** para síntesis y clonación de voz
- **Fine-tuning personalizado** para cada psicólogo

### Base de Datos
```
- Usuarios (clientes, psicólogos, admins)
- Perfiles de Psicólogos (especialización, experiencia, datos de voz)
- Personalidades IA (modelos entrenados, patrones de conversación)
- Tests Psicológicos (offline)
- Citas y Sesiones
- Mensajes de Chat (texto/voz)
- Suscripciones y Planes
- Avatares Personalizables
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js 15
│   ├── api/               # API Routes
│   ├── auth/              # Páginas de autenticación
│   ├── dashboard/         # Dashboard de usuarios
│   ├── admin/             # Panel de administración
│   ├── chat/              # Interfaz de chat con IA
│   └── tests/             # Tests psicológicos
├── components/            # Componentes React
│   ├── ui/                # Componentes base (Radix UI)
│   ├── chat/              # Componentes de chat
│   ├── avatar/            # Sistema de avatares
│   ├── dashboard/         # Componentes del dashboard
│   ├── tests/             # Componentes de tests
│   └── auth/              # Componentes de autenticación
├── lib/                   # Utilidades y configuración
├── hooks/                 # Custom React hooks
├── services/              # Servicios (API, IA, voz)
├── types/                 # Tipos TypeScript
└── utils/                 # Funciones utilitarias
```

## 🎯 Funcionalidades Principales

### 1. Sistema de Usuarios
- **Registro/Login** con roles (Cliente, Psicólogo, Admin)
- **Perfiles personalizados** para cada tipo de usuario
- **Gestión de suscripciones** (Básico, Premium, Profesional)

### 2. Personalidades IA
- **Creación de personalidades** únicas por psicólogo
- **Entrenamiento personalizado** basado en:
  - Notas de voz del psicólogo
  - Patrones de conversación
  - Metodología terapéutica
  - Acento y forma de hablar
- **Clonación de voz** con ElevenLabs
- **Fine-tuning** de modelos OpenAI

### 3. Avatar Inteligente
- **Personalización visual** completa
- **Interacción natural** por voz y texto
- **Reconocimiento del psicólogo** asignado
- **Respuestas contextuales** basadas en la personalidad

### 4. Chat Inteligente
- **Comunicación por texto y voz**
- **Tiempo real** con Socket.io
- **Historial de conversaciones**
- **Análisis de sentimientos**

### 5. Tests Psicológicos
- **Tests offline** interactivos
- **Resultados automáticos**
- **Seguimiento de progreso**
- **Reportes para psicólogos**

### 6. Dashboard de Psicólogos
- **Monitoreo de pacientes**
- **Análisis de progreso**
- **Gestión de personalidad IA**
- **Programación de citas**

### 7. Panel de Administración
- **Gestión de psicólogos**
- **Configuración de personalidades IA**
- **Monitoreo del sistema**
- **Reportes y analytics**

## 🚀 Cronograma de Desarrollo (2 meses)

### **Entrega 1 (Semana 1-2): Fundación**
- ✅ Configuración del proyecto Next.js
- ✅ Esquema de base de datos con Prisma
- ✅ Sistema de autenticación básico
- 🔄 Estructura de componentes UI
- 🔄 Dashboard básico de usuarios

### **Entrega 2 (Semana 3-4): Core Features**
- 📋 Sistema de chat en tiempo real
- 📋 Integración con OpenAI
- 📋 Tests psicológicos básicos
- 📋 Panel de administración
- 📋 Gestión de perfiles de psicólogos

### **Entrega 3 (Semana 5-6): IA y Personalización**
- 📋 Sistema de personalidades IA
- 📋 Integración con ElevenLabs
- 📋 Clonación y síntesis de voz
- 📋 Fine-tuning de modelos
- 📋 Avatar personalizable

### **Entrega 4 (Semana 7-8): Optimización y Deploy**
- 📋 Optimización de rendimiento
- 📋 Testing completo
- 📋 Despliegue en producción
- 📋 Documentación final
- 📋 Capacitación de usuarios

## 💰 Estimación de Costos

### Desarrollo (2 meses)
- **Desarrollador Full-Stack Senior**: $8,000 - $12,000 USD
- **Especialista en IA/ML**: $6,000 - $10,000 USD
- **UI/UX Designer**: $3,000 - $5,000 USD
- **QA Tester**: $2,000 - $3,000 USD

**Total Desarrollo**: $19,000 - $30,000 USD

### Infraestructura Mensual
- **VPS AWS (t3.large)**: $60-100 USD
- **Base de datos PostgreSQL**: $30-50 USD
- **OpenAI API**: $200-500 USD (según uso)
- **ElevenLabs API**: $100-300 USD (según uso)
- **CDN y almacenamiento**: $20-50 USD

**Total Mensual**: $410-1,000 USD

### Costos de Entrenamiento IA
- **Fine-tuning modelos**: $500-2,000 USD (por lote)
- **Clonación de voces**: $50-100 USD (por psicólogo)
- **Almacenamiento de modelos**: $100-200 USD/mes

## 🔧 Tecnologías Utilizadas

### Core Stack
- **Next.js 15** - Framework React full-stack
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework CSS utility-first
- **Prisma** - ORM para base de datos
- **SQLite** (desarrollo) / **PostgreSQL** (producción)

### UI/UX
- **Radix UI** - Componentes accesibles
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos
- **Class Variance Authority** - Variantes de componentes

### IA y Procesamiento
- **OpenAI API** - GPT-4 para conversación
- **ElevenLabs** - Síntesis y clonación de voz
- **Socket.io** - Comunicación en tiempo real

### Autenticación y Seguridad
- **NextAuth.js** - Autenticación
- **bcryptjs** - Hash de contraseñas
- **JWT** - Tokens de sesión
- **Zod** - Validación de esquemas

## 🎨 Creación de Personalidades IA

### Proceso de Entrenamiento
1. **Recolección de Datos**
   - Grabaciones de voz (10-20 minutos)
   - Conversaciones de ejemplo
   - Metodología terapéutica
   - Casos de estudio típicos

2. **Procesamiento**
   - Extracción de patrones de habla
   - Análisis de personalidad
   - Creación de plantillas de respuesta
   - Fine-tuning del modelo base

3. **Clonación de Voz**
   - Entrenamiento con ElevenLabs
   - Ajuste de tono y acento
   - Validación de calidad
   - Integración con el sistema

### Módulos del Sistema de Personalidades

#### 1. **Recolector de Datos**
```typescript
- Grabación de voz en tiempo real
- Análisis de texto de conversaciones
- Cuestionarios de personalidad
- Casos de estudio típicos
```

#### 2. **Procesador de IA**
```typescript
- Fine-tuning automático
- Generación de patrones de respuesta
- Validación de coherencia
- Optimización continua
```

#### 3. **Gestor de Voces**
```typescript
- Clonación con ElevenLabs
- Ajuste de parámetros de voz
- Síntesis en tiempo real
- Cache de respuestas comunes
```

#### 4. **Monitor de Calidad**
```typescript
- Métricas de satisfacción
- Análisis de coherencia
- Feedback de usuarios
- Mejora continua
```

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔮 Roadmap Futuro

### Fase 2 (Meses 3-4)
- **App móvil** (React Native)
- **Integración con wearables**
- **Análisis biométrico**
- **Gamificación**

### Fase 3 (Meses 5-6)
- **Realidad virtual** para terapia
- **IA predictiva** para crisis
- **Integración con seguros**
- **Certificaciones médicas**

---

**Proyecto iniciado**: Agosto 2025  
**Entrega estimada**: Octubre 2025  
**Versión**: 1.0.0-alpha
