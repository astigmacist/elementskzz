import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// Admin axios instance — reads the same access_token as main site
const adminApi = axios.create({
    baseURL: API_URL,
})

// Attach Bearer token from localStorage (regular auth)
adminApi.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    }
    return config
})

// Auto-refresh on 401
adminApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
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
                return adminApi(originalRequest)
            } catch {
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
            }
        }
        return Promise.reject(error)
    }
)

// Admin API functions
export const adminAPI = {
    // Current user info
    getCurrentUser: async () => {
        const response = await adminApi.get('/auth/users/me/')
        return response.data
    },

    // Dashboard: agregates data from products, orders, users
    getDashboardStats: async () => {
        try {
            const [productsRes, ordersRes, usersRes] = await Promise.all([
                adminApi.get('/products/', { params: { page_size: 1 } }),
                adminApi.get('/orders/', { params: { page_size: 1 } }),
                adminApi.get('/auth/users/', { params: { page_size: 1 } }),
            ])
            const totalRevenue = 0 // будет из orders aggregate позже
            return {
                totalProducts: productsRes.data.count || 0,
                totalOrders: ordersRes.data.count || 0,
                totalRevenue,
                totalUsers: usersRes.data.count || 0,
                salesData: [
                    { name: 'Янв', sales: 0 },
                    { name: 'Фев', sales: 0 },
                    { name: 'Мар', sales: 0 },
                    { name: 'Апр', sales: 0 },
                    { name: 'Май', sales: 0 },
                    { name: 'Июн', sales: 0 },
                ],
            }
        } catch {
            return {
                totalProducts: 0, totalOrders: 0, totalRevenue: 0, totalUsers: 0, salesData: [],
            }
        }
    },

    // Products
    getProducts: async (params?: any) => {
        const response = await adminApi.get('/products/', { params })
        return response.data
    },

    getProduct: async (id: number) => {
        const response = await adminApi.get(`/products/${id}/`)
        return response.data
    },

    createProduct: async (data: FormData | object) => {
        const isFormData = data instanceof FormData
        const response = await adminApi.post('/products/', data, {
            headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
        })
        return response.data
    },

    updateProduct: async (id: number, data: FormData | object) => {
        const isFormData = data instanceof FormData
        const response = await adminApi.patch(`/products/${id}/`, data, {
            headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
        })
        return response.data
    },

    deleteProduct: async (id: number) => {
        const response = await adminApi.delete(`/products/${id}/`)
        return response.data
    },

    // Categories
    getCategories: async () => {
        const response = await adminApi.get('/categories/')
        return response.data
    },

    createCategory: async (data: any) => {
        const isFormData = data instanceof FormData
        const response = await adminApi.post('/categories/', data, {
            headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
        })
        return response.data
    },

    updateCategory: async (id: number, data: any) => {
        const isFormData = data instanceof FormData
        const response = await adminApi.patch(`/categories/${id}/`, data, {
            headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
        })
        return response.data
    },

    deleteCategory: async (id: number) => {
        await adminApi.delete(`/categories/${id}/`)
    },

    // Brands
    getBrands: async () => {
        const response = await adminApi.get('/brands/')
        return response.data
    },

    createBrand: async (data: FormData | object) => {
        const isFormData = data instanceof FormData
        const response = await adminApi.post('/brands/', data, {
            headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
        })
        return response.data
    },

    updateBrand: async (id: number, data: FormData | object) => {
        const isFormData = data instanceof FormData
        const response = await adminApi.patch(`/brands/${id}/`, data, {
            headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
        })
        return response.data
    },

    deleteBrand: async (id: number) => {
        await adminApi.delete(`/brands/${id}/`)
    },

    // Orders
    getOrders: async (params?: any) => {
        const response = await adminApi.get('/orders/', { params })
        return response.data
    },

    getOrder: async (id: number) => {
        const response = await adminApi.get(`/orders/${id}/`)
        return response.data
    },

    updateOrderStatus: async (id: number, orderStatus: string) => {
        const response = await adminApi.patch(`/orders/${id}/`, { status: orderStatus })
        return response.data
    },

    // Users
    getUsers: async (params?: any) => {
        const response = await adminApi.get('/auth/users/', { params })
        return response.data
    },

    getUser: async (id: number) => {
        const response = await adminApi.get(`/auth/users/${id}/`)
        return response.data
    },

    // Reviews
    getReviews: async (params?: any) => {
        const response = await adminApi.get('/reviews/', { params })
        return response.data
    },

    approveReview: async (id: number) => {
        const response = await adminApi.patch(`/reviews/${id}/`, { is_approved: true })
        return response.data
    },

    rejectReview: async (id: number) => {
        await adminApi.delete(`/reviews/${id}/`)
    },
}
