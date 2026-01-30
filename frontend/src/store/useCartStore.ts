import { create } from 'zustand'
import { Cart } from '@/types'
import { cartApi } from '@/lib/api'
import toast from 'react-hot-toast'

interface CartState {
  cart: Cart | null
  loading: boolean
  fetchCart: () => Promise<void>
  addToCart: (productId: number, quantity?: number) => Promise<void>
  updateQuantity: (itemId: number, quantity: number) => Promise<void>
  removeFromCart: (itemId: number) => Promise<void>
  clearCart: () => Promise<void>
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  loading: false,

  fetchCart: async () => {
    try {
      set({ loading: true })
      const response = await cartApi.get()
      set({ cart: response.data, loading: false })
    } catch (error) {
      console.error('Error fetching cart:', error)
      set({ loading: false })
    }
  },

  addToCart: async (productId: number, quantity: number = 1) => {
    try {
      const response = await cartApi.addItem(productId, quantity)
      set({ cart: response.data })
      toast.success('Товар добавлен в корзину')
    } catch (error: any) {
      console.error('Error adding to cart:', error)
      if (error.response?.status === 401) {
        toast.error('Войдите в аккаунт для добавления в корзину')
      } else {
        toast.error('Ошибка при добавлении в корзину')
      }
    }
  },

  updateQuantity: async (itemId: number, quantity: number) => {
    try {
      const response = await cartApi.updateItem(itemId, quantity)
      set({ cart: response.data })
      toast.success('Количество обновлено')
    } catch (error) {
      console.error('Error updating quantity:', error)
      toast.error('Ошибка при обновлении количества')
    }
  },

  removeFromCart: async (itemId: number) => {
    try {
      const response = await cartApi.removeItem(itemId)
      set({ cart: response.data })
      toast.success('Товар удален из корзины')
    } catch (error) {
      console.error('Error removing from cart:', error)
      toast.error('Ошибка при удалении из корзины')
    }
  },

  clearCart: async () => {
    try {
      const response = await cartApi.clear()
      set({ cart: response.data })
      toast.success('Корзина очищена')
    } catch (error) {
      console.error('Error clearing cart:', error)
      toast.error('Ошибка при очистке корзины')
    }
  },
}))

