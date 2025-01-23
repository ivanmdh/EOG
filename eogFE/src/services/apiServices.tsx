import axios from 'axios'

import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const isBrowser = typeof window !== 'undefined'
const url = isBrowser ? new URL(window.location.href) : new URL('https://eog.local')

const apiServiceUrl: string =
    process.env.NODE_ENV === 'production' && !['local'].includes(url.hostname.split('.')[2])
    ? 'https://api.construccioneseog.com'
    : 'http://api.eog.local:8000'

const apiService: AxiosInstance = axios.create({ baseURL: apiServiceUrl })

apiService.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        if (isBrowser) {
            const accessToken = window.localStorage.getItem('accessToken')!

            if (accessToken) config.headers.Authorization = `Bearer ${ accessToken }`

        } else {
            try {
                const { auth } = await import('@/app/auth')
                const session: any = await auth()

                const accessToken = session?.user?.Authorization?.accessToken

                if (accessToken) {
                    config.headers.Authorization = `Bearer ${ accessToken }`
                }
            } catch (error) {
                console.error('Error loading auth module:', error)
            }
        }

        return config
    },
    (error: any) => Promise.reject(error)
)

apiService.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
        const { response } = error

        if (response?.status === 401) {
            if (isBrowser) {
                window.localStorage.removeItem('accessToken')
                window.location.href = '/login'
            }
        }

        return Promise.reject(error)
    }
)

export default apiService