import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AdminUser {
    id: number
    email: string
    username: string
    isStaff: boolean
    isSuperuser: boolean
}

interface AdminState {
    // Authentication
    isAuthenticated: boolean
    user: AdminUser | null
    accessToken: string | null
    refreshToken: string | null

    // UI State
    sidebarCollapsed: boolean
    darkMode: boolean

    // Actions
    login: (tokens: { access: string; refresh: string }, user: AdminUser) => void
    logout: () => void
    toggleSidebar: () => void
    toggleDarkMode: () => void
    setUser: (user: AdminUser) => void
}

export const useAdminStore = create<AdminState>()(
    persist(
        (set) => ({
            // Initial state
            isAuthenticated: false,
            user: null,
            accessToken: null,
            refreshToken: null,
            sidebarCollapsed: false,
            darkMode: false,

            // Actions
            login: (tokens, user) =>
                set({
                    isAuthenticated: true,
                    accessToken: tokens.access,
                    refreshToken: tokens.refresh,
                    user,
                }),

            logout: () =>
                set({
                    isAuthenticated: false,
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                }),

            toggleSidebar: () =>
                set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

            toggleDarkMode: () =>
                set((state) => ({ darkMode: !state.darkMode })),

            setUser: (user) => set({ user }),
        }),
        {
            name: 'admin-store',
        }
    )
)
