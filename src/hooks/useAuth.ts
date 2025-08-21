"use client"

import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { User, Role } from '@/types'

export interface AuthUser {
  id: string
  email: string
  name: string
  role: Role
  isActive: boolean
  subscription?: {
    plan: string
    status: string
    endDate?: Date
  }
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  role: Role
  licenseNumber?: string // Para psicólogos
}

export interface AuthContextType {
  user: AuthUser | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<AuthUser>) => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function useAuthProvider() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isAuthenticated = user !== null

  // Verificar sesión al cargar
  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = useCallback(async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        setIsLoading(false)
        return
      }

      // En desarrollo, simular usuario
      if (process.env.NODE_ENV === 'development') {
        const mockUser: AuthUser = {
          id: '1',
          email: 'usuario@ejemplo.com',
          name: 'Usuario Demo',
          role: 'CLIENT',
          isActive: true,
          subscription: {
            plan: 'PREMIUM',
            status: 'ACTIVE',
            endDate: new Date('2025-12-31')
          }
        }
        setUser(mockUser)
        setIsLoading(false)
        return
      }

      // Verificar token con el servidor
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        localStorage.removeItem('auth_token')
      }
    } catch (error) {
      console.error('Session check error:', error)
      localStorage.removeItem('auth_token')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true)
    setError(null)

    try {
      // En desarrollo, simular login
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockUser: AuthUser = {
          id: '1',
          email: credentials.email,
          name: credentials.email.split('@')[0],
          role: credentials.email.includes('psicologo') ? 'PSYCHOLOGIST' : 'CLIENT',
          isActive: true,
          subscription: {
            plan: 'PREMIUM',
            status: 'ACTIVE'
          }
        }
        
        setUser(mockUser)
        localStorage.setItem('auth_token', 'mock_token_123')
        return
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al iniciar sesión')
      }

      const { user: userData, token } = await response.json()
      
      setUser(userData)
      localStorage.setItem('auth_token', token)
      
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al iniciar sesión'
      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true)
    setError(null)

    try {
      // En desarrollo, simular registro
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        const mockUser: AuthUser = {
          id: '1',
          email: data.email,
          name: data.name,
          role: data.role,
          isActive: true,
          subscription: {
            plan: 'BASIC',
            status: 'ACTIVE'
          }
        }
        
        setUser(mockUser)
        localStorage.setItem('auth_token', 'mock_token_123')
        return
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al registrarse')
      }

      const { user: userData, token } = await response.json()
      
      setUser(userData)
      localStorage.setItem('auth_token', token)
      
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al registrarse'
      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setIsLoading(true)
    
    try {
      const token = localStorage.getItem('auth_token')
      
      if (token && process.env.NODE_ENV !== 'development') {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      }
      
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      localStorage.removeItem('auth_token')
      setIsLoading(false)
    }
  }, [])

  const updateProfile = useCallback(async (data: Partial<AuthUser>) => {
    if (!user) return

    setIsLoading(true)
    
    try {
      const token = localStorage.getItem('auth_token')
      
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 500))
        setUser({ ...user, ...data })
        return
      }
      
      const response = await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Error al actualizar el perfil')
      }

      const updatedUser = await response.json()
      setUser(updatedUser)
      
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al actualizar perfil'
      setError(message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [user])

  const refreshUser = useCallback(async () => {
    if (!isAuthenticated) return
    await checkSession()
  }, [isAuthenticated, checkSession])

  // Utilidades de autorización
  const hasRole = useCallback((role: Role) => {
    return user?.role === role
  }, [user])

  const hasPermission = useCallback((permission: string) => {
    if (!user) return false
    
    // Definir permisos por rol
    const rolePermissions: Record<Role, string[]> = {
      'CLIENT': ['chat', 'tests', 'appointments'],
      'PSYCHOLOGIST': ['chat', 'tests', 'appointments', 'manage_patients', 'create_ai_personality'],
      'ADMIN': ['*'] // Todos los permisos
    }
    
    const userPermissions = rolePermissions[user.role] || []
    return userPermissions.includes('*') || userPermissions.includes(permission)
  }, [user])

  return {
    user,
    isLoading,
    isAuthenticated,
    error,
    login,
    register,
    logout,
    updateProfile,
    refreshUser,
    hasRole,
    hasPermission
  }
}

export { AuthContext }