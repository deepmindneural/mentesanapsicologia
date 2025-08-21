"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Brain, 
  ArrowLeft, 
  Clock, 
  Star,
  CheckCircle,
  Play,
  FileText,
  TrendingUp,
  Heart,
  Shield,
  Lightbulb,
  LucideIcon
} from "lucide-react"

interface Test {
  id: string
  title: string
  description: string
  duration: number
  difficulty: 'Fácil' | 'Intermedio' | 'Avanzado'
  category: string
  icon: LucideIcon
  completed: boolean
  score?: number
  color: string
}

export default function TestsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const [tests] = useState<Test[]>([
    {
      id: '1',
      title: 'Evaluación de Ansiedad (GAD-7)',
      description: 'Evalúa los niveles de ansiedad generalizada mediante preguntas validadas científicamente.',
      duration: 5,
      difficulty: 'Fácil',
      category: 'Ansiedad',
      icon: Shield,
      completed: true,
      score: 72,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: '2',
      title: 'Test de Depresión (PHQ-9)',
      description: 'Herramienta de detección para evaluar la presencia y severidad de síntomas depresivos.',
      duration: 7,
      difficulty: 'Fácil',
      category: 'Depresión',
      icon: Heart,
      completed: false,
      color: 'text-red-600 bg-red-100'
    },
    {
      id: '3',
      title: 'Inventario de Autoestima',
      description: 'Mide tu nivel de autoestima y confianza personal en diferentes áreas de tu vida.',
      duration: 10,
      difficulty: 'Intermedio',
      category: 'Autoestima',
      icon: Star,
      completed: true,
      score: 85,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      id: '4',
      title: 'Escala de Estrés Percibido',
      description: 'Evalúa cómo de estresante percibes diferentes situaciones en tu vida cotidiana.',
      duration: 8,
      difficulty: 'Fácil',
      category: 'Estrés',
      icon: TrendingUp,
      completed: false,
      color: 'text-orange-600 bg-orange-100'
    },
    {
      id: '5',
      title: 'Test de Inteligencia Emocional',
      description: 'Evalúa tu capacidad para reconocer, entender y gestionar emociones propias y ajenas.',
      duration: 15,
      difficulty: 'Avanzado',
      category: 'Inteligencia Emocional',
      icon: Lightbulb,
      completed: false,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      id: '6',
      title: 'Evaluación de Calidad del Sueño',
      description: 'Analiza la calidad de tu sueño y factores que pueden estar afectando tu descanso.',
      duration: 6,
      difficulty: 'Fácil',
      category: 'Sueño',
      icon: Brain,
      completed: true,
      score: 68,
      color: 'text-indigo-600 bg-indigo-100'
    }
  ])

  const categories = ['all', 'Ansiedad', 'Depresión', 'Autoestima', 'Estrés', 'Inteligencia Emocional', 'Sueño']

  const filteredTests = selectedCategory === 'all' 
    ? tests 
    : tests.filter(test => test.category === selectedCategory)

  const completedTests = tests.filter(test => test.completed).length
  const averageScore = tests
    .filter(test => test.score)
    .reduce((acc, test) => acc + (test.score || 0), 0) / tests.filter(test => test.score).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tests Psicológicos</h1>
              <p className="text-gray-600">Evalúa tu bienestar mental con herramientas validadas</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tests Completados</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTests}</div>
              <p className="text-xs text-muted-foreground">
                de {tests.length} disponibles
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Puntuación Promedio</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageScore.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground">
                sobre 100 puntos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tiempo Total</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42m</div>
              <p className="text-xs text-muted-foreground">
                tiempo invertido
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category === 'all' ? 'Todos' : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => {
            const IconComponent = test.icon
            return (
              <Card key={test.id} className="relative hover:shadow-lg transition-shadow">
                {test.completed && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                )}
                
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${test.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{test.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {test.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{test.duration} min</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        test.difficulty === 'Fácil' ? 'bg-green-100 text-green-800' :
                        test.difficulty === 'Intermedio' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {test.difficulty}
                      </span>
                    </div>

                    {test.completed && test.score && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Última puntuación:</span>
                          <span className="text-lg font-bold text-blue-600">{test.score}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${test.score}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {test.completed ? (
                        <>
                          <Button variant="outline" size="sm" className="flex-1">
                            <FileText className="h-4 w-4 mr-2" />
                            Ver Resultado
                          </Button>
                          <Button size="sm" className="flex-1">
                            <Play className="h-4 w-4 mr-2" />
                            Repetir
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" className="w-full">
                          <Play className="h-4 w-4 mr-2" />
                          Comenzar Test
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recommendations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recomendaciones Personalizadas</CardTitle>
            <CardDescription>
              Basado en tus resultados anteriores, te sugerimos estos tests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Test de Inteligencia Emocional</p>
                  <p className="text-sm text-blue-700">
                    Complementaría muy bien tu evaluación de autoestima
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Escala de Estrés Percibido</p>
                  <p className="text-sm text-green-700">
                    Ideal para complementar tu evaluación de ansiedad
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}