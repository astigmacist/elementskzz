import { create } from 'zustand'
import { Wishlist } from '@/types'
import { wishlistApi } from '@/lib/api'
import toast from 'react-hot-toast'

interface WishlistState {
  wishlist: Wishlist | null
  loading: boolean
  fetchWishlist: () => Promise<void>
  addToWishlist: (productId: number) => Promise<void>
  removeFromWishlist: (productId: number) => Promise<void>
  isInWishlist: (productId: number) => boolean
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: null,
  loading: false,

  fetchWishlist: async () => {
    try {
      set({ loading: true })
      const response = await wishlistApi.get()
      set({ wishlist: response.data, loading: false })
    } catch (error) {
      console.error('Error fetching wishlist:', error)
      set({ loading: false })
    }
  },

  addToWishlist: async (productId: number) => {
    try {
      const response = await wishlistApi.addProduct(productId)
      set({ wishlist: response.data })
      toast.success('Товар добавлен в избранное')
    } catch (error: any) {
      console.error('Error adding to wishlist:', error)
      if (error.response?.status === 401) {
        toast.error('Войдите в аккаунт для добавления в избранное')
      } else {
        toast.error('Ошибка при добавлении в избранное')
      }
    }
  },

  removeFromWishlist: async (productId: number) => {
    try {
      const response = await wishlistApi.removeProduct(productId)
      set({ wishlist: response.data })
      toast.success('Товар удален из избранного')
    } catch (error) {
      console.error('Error removing from wishlist:', error)
      toast.error('Ошибка при удалении из избранного')
    }
  },

  isInWishlist: (productId: number) => {
    const { wishlist } = get()
    if (!wishlist) return false
    return wishlist.products.some((p) => p.id === productId)
  },
}))

