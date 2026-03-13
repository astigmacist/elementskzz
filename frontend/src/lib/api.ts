import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// Создаем экземпляр axios
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Интерцептор для добавления токена
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Если 401 и это не повторный запрос
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refresh_token')
        const response = await axios.post(`${API_URL}/auth/jwt/refresh/`, {
          refresh: refreshToken,
        })

        const { access } = response.data
        localStorage.setItem('access_token', access)

        originalRequest.headers.Authorization = `Bearer ${access}`
        return api(originalRequest)
      } catch (err) {
        // Если refresh token тоже невалидный, выходим
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

// API методы для продуктов
export const productsApi = {
  getAll: (params?: any) => api.get('/products/', { params }),
  getBySlug: (slug: string) => api.get(`/products/${slug}/`),
  getFeatured: () => api.get('/products/featured/'),
  getNewArrivals: () => api.get('/products/new_arrivals/'),
  getDeals: () => api.get('/products/deals/'),
}

// API методы для категорий
export const categoriesApi = {
  getAll: () => api.get('/categories/'),
  getBySlug: (slug: string) => api.get(`/categories/${slug}/`),
}

// API методы для брендов
export const brandsApi = {
  getAll: () => api.get('/brands/'),
  getBySlug: (slug: string) => api.get(`/brands/${slug}/`),
}

// API методы для корзины
export const cartApi = {
  get: () => api.get('/cart/'),
  addItem: (product_id: number, quantity: number = 1) =>
    api.post('/cart/add_item/', { product_id, quantity }),
  updateItem: (item_id: number, quantity: number) =>
    api.patch('/cart/update_item/', { item_id, quantity }),
  removeItem: (item_id: number) =>
    api.delete('/cart/remove_item/', { data: { item_id } }),
  clear: () => api.delete('/cart/clear/'),
}

// API методы для заказов
export const ordersApi = {
  getAll: () => api.get('/orders/'),
  getById: (id: number) => api.get(`/orders/${id}/`),
  create: (data: any) => api.post('/orders/', data),
}

// API методы для избранного
export const wishlistApi = {
  get: () => api.get('/wishlist/'),
  addProduct: (product_id: number) =>
    api.post('/wishlist/add_product/', { product_id }),
  removeProduct: (product_id: number) =>
    api.delete('/wishlist/remove_product/', { data: { product_id } }),
}

// API методы для аутентификации
export const authApi = {
  register: (data: any) => api.post('/auth/users/', data),
  login: (email: string, password: string) =>
    api.post('/auth/jwt/create/', { email, password }),
  getProfile: () => api.get('/auth/users/me/'),
  updateProfile: (data: any) => api.patch('/auth/users/me/', data),
  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  },
}

// API методы для отзывов
export const reviewsApi = {
  getAll: (params?: any) => api.get('/reviews/', { params }),
  create: (data: any) => api.post('/reviews/', data),
}

