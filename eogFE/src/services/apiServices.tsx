import axios from 'axios'

import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const isBrowser = typeof window !== 'undefined'
const url = isBrowser ? new URL(window.location.href) : new URL('https://construccioneseog.local')

const apiServiceUrl: string =
    process.env.NODE_ENV === 'production' && !['local'].includes(url.hostname.split('.')[2])
    ? 'https://api.construccioneseog.com'
    : 'http://localhost:8000'

console.log('API Service URL:', apiServiceUrl, 'Environment:', process.env.NODE_ENV, 'Hostname:', url.hostname)
const apiService: AxiosInstance = axios.create({ baseURL: apiServiceUrl })

apiService.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        console.log('Request Config:', { 
            url: config.url, 
            method: config.method,
            baseURL: config.baseURL,
            environment: process.env.NODE_ENV
        })
        
        if (isBrowser) {
            const accessToken = window.localStorage.getItem('accessToken')!
            console.log('Browser Auth Token Available:', !!accessToken)

            if (accessToken) config.headers.Authorization = `Bearer ${ accessToken }`

        } else {
            try {
                console.log('Server-side request, attempting to load auth')
                const { auth } = await import('@/app/auth')
                const session: any = await auth()
                console.log('Server Auth Session Available:', !!session)

                const accessToken = session?.user?.Authorization?.accessToken
                console.log('Server Auth Token Available:', !!accessToken)

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
    async (error: any) => {
        const { response } = error

        if (response?.status === 401) {
            if (isBrowser) {
                try {
                    const { signOut } = await import('@/app/auth')
                    await signOut()
                    window.localStorage.removeItem('accessToken')
                    window.location.href = '/login'
                } catch (error) {
                    console.error('Error loading auth module:', error)
                }
            }
        }

        return Promise.reject(error)
    }
)

export default apiService