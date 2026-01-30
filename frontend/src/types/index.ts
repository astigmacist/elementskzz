// Типы для API

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  image?: string
  parent?: number
  children?: Category[]
  is_active: boolean
  order: number
}

export interface Brand {
  id: number
  name: string
  slug: string
  logo?: string
  description: string
}

export interface Product {
  id: number
  name: string
  slug: string
  category: number
  category_name?: string
  brand: number
  brand_name?: string
  description: string
  short_description: string
  price: number
  old_price?: number
  discount_percentage: number
  sku: string
  stock: number
  is_available: boolean
  main_image: string
  rating: number
  reviews_count: number
  is_new: boolean
  is_featured: boolean
  views_count: number
  created_at: string
  updated_at: string
}

export interface ProductDetail extends Product {
  images: ProductImage[]
  specifications: ProductSpecification[]
  reviews: Review[]
}

export interface ProductImage {
  id: number
  image: string
  order: number
}

export interface ProductSpecification {
  id: number
  name: string
  value: string
  order: number
}

export interface Review {
  id: number
  user: number
  user_name: string
  user_email: string
  rating: number
  comment: string
  advantages: string
  disadvantages: string
  is_approved: boolean
  created_at: string
}

export interface CartItem {
  id: number
  product: Product
  quantity: number
  total_price: number
  created_at: string
}

export interface Cart {
  id: number
  items: CartItem[]
  total_price: number
  total_items: number
  created_at: string
  updated_at: string
}

export interface Order {
  id: number
  order_number: string
  user: number
  user_email: string
  status: string
  status_display: string
  first_name: string
  last_name: string
  email: string
  phone: string
  city: string
  address: string
  postal_code: string
  payment_method: string
  is_paid: boolean
  subtotal: number
  delivery_cost: number
  total: number
  notes: string
  items: OrderItem[]
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: number
  product_name: string
  product_sku: string
  price: number
  quantity: number
  total_price: number
}

export interface User {
  id: number
  email: string
  username: string
  first_name: string
  last_name: string
  phone: string
  avatar?: string
  address: string
  city: string
  postal_code: string
  created_at: string
}

export interface Wishlist {
  id: number
  products: Product[]
  created_at: string
  updated_at: string
}

// API Response типы
export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

