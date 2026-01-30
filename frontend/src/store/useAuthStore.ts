import { create } from 'zustand'
import { User } from '@/types'
import { authApi } from '@/lib/api'
import toast from 'react-hot-toast'

interface AuthState {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => void
  fetchProfile: () => Promise<void>
  updateProfile: (data: any) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      set({ loading: true })
      const response = await authApi.login(email, password)
      const { access, refresh } = response.data
      
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      
      // Получаем профиль пользователя
      const profileResponse = await authApi.getProfile()
      set({ 
        user: profileResponse.data, 
        isAuthenticated: true, 
        loading: false 
      })
      
      toast.success('Вы успешно вошли')
    } catch (error: any) {
      console.error('Login error:', error)
      set({ loading: false })
      if (error.response?.status === 401) {
        toast.error('Неверный email или пароль')
      } else {
        toast.error('Ошибка при входе')
      }
      throw error
    }
  },

  register: async (data: any) => {
    try {
      set({ loading: true })
      await authApi.register(data)
      
      // Автоматический вход после регистрации
      await authApi.login(data.email, data.password).then(async (response) => {
        const { access, refresh } = response.data
        localStorage.setItem('access_token', access)
        localStorage.setItem('refresh_token', refresh)
        
        const profileResponse = await authApi.getProfile()
        set({ 
          user: profileResponse.data, 
          isAuthenticated: true, 
          loading: false 
        })
      })
      
      toast.success('Регистрация прошла успешно')
    } catch (error: any) {
      console.error('Registration error:', error)
      set({ loading: false })
      
      if (error.response?.data) {
        const errors = error.response.data
        Object.keys(errors).forEach((key) => {
          toast.error(`${key}: ${errors[key][0]}`)
        })
      } else {
        toast.error('Ошибка при регистрации')
      }
      throw error
    }
  },

  logout: () => {
    authApi.logout()
    set({ user: null, isAuthenticated: false })
    toast.success('Вы вышли из аккаунта')
  },

  fetchProfile: async () => {
    try {
      const token = localStorage.getItem('access_token')
      if (!token) {
        set({ isAuthenticated: false })
        return
      }

      set({ loading: true })
      const response = await authApi.getProfile()
      set({ 
        user: response.data, 
        isAuthenticated: true, 
        loading: false 
      })
    } catch (error) {
      console.error('Error fetching profile:', error)
      set({ user: null, isAuthenticated: false, loading: false })
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  },

  updateProfile: async (data: any) => {
    try {
      set({ loading: true })
      const response = await authApi.updateProfile(data)
      set({ user: response.data, loading: false })
      toast.success('Профиль обновлен')
    } catch (error) {
      console.error('Error updating profile:', error)
      set({ loading: false })
      toast.error('Ошибка при обновлении профиля')
      throw error
    }
  },
}))

