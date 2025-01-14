import axios from 'axios'

import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const isBrowser = typeof window !== 'undefined'
const url = isBrowser ? new URL(window.location.href) : new URL('https://localhost.sifac.local')

const apiServiceUrl: string =
    process.env.NODE_ENV === 'production' && !['local'].includes(url.hostname.split('.')[2])
    ? 'https://x.sifac.mx'
    : 'http://x.sifac.local:8000'

const apiService: AxiosInstance = axios.create({ baseURL: apiServiceUrl })

apiService.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        if (isBrowser) {
            const accessToken = window.localStorage.getItem('accessToken')!

            if (accessToken) config.headers.Authorization = `Bearer ${ accessToken }`

            config.headers['X-Subdomain'] = url.hostname.split('.')[0]
        } else {
            try {
                const { auth } = await import('@/src/auth')
                const session: any = await auth()

                const accessToken = session?.user?.Authorization?.accessToken || ''
                const subdominio = session?.user?.Empresa?.subdominio || ''

                if (accessToken && subdominio) {
                    config.headers
                    config.headers.Authorization = `Bearer ${ accessToken }`
                    config.headers['X-Subdomain'] = subdominio
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