import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { CredentialsSignin } from '@auth/core/errors'

import apiService from '@services/apiServices'

class InvalidLoginError extends CredentialsSignin {
    code = 'InvalidLoginError'
}

export const { handlers, signIn, signOut, auth } = NextAuth(
    {
        providers: [
            Credentials(
                {
                    id: 'credentials',
                    name: 'credentials',
                    credentials: {
                        usuario: { label: 'Usuario', type: 'text' },
                        password: { label: 'Contraseña', type: 'password' },
                    },
                    authorize: async (credentials) => {
                        console.log('NextAuth authorize llamado con usuario:', credentials?.usuario)
                        
                        try {
                            console.log('Enviando solicitud a API:', '/api/auth/login')
                            console.log('API URL base:', apiService.defaults.baseURL)
                            
                            const response = await apiService.post(
                                '/api/auth/login',
                                {
                                    usuario: credentials.usuario,
                                    password: credentials.password,
                                }
                            )
                            
                            console.log('Respuesta de API recibida:', {
                                status: response.status,
                                dataStatus: response?.data?.status,
                                userPresent: !!response?.data?.user,
                                authPresent: !!response?.data?.Authorization,
                            })

                            const data = response?.data

                            if (response.status === 200 && data.status === 'success') {
                                console.log('Autenticación exitosa, devolviendo datos de usuario')
                                return {
                                    ...data.user,
                                    Authorization: data.Authorization
                                }
                            } else {
                                console.error('Error de autenticación:', data)
                                throw new InvalidLoginError()
                            }
                        } catch (e: unknown) {
                            console.error('Excepción durante autorización:', e)
                            throw new InvalidLoginError(e as Error)
                        }
                    }
                }
            )
        ],
        session: {
            strategy: 'jwt',
            maxAge: 30 * 24 * 60 * 60
        },
        pages: {
            signIn: '/login'
        },
        callbacks: {
            async signIn({ user }: any) {
                console.log('Callback signIn ejecutado, usuario presente:', !!user)
                if (user && user?.Authorization) {
                    console.log('Token de autorización presente, guardando en localStorage')
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('accessToken', user?.Authorization?.accessToken)
                        console.log('Token guardado en localStorage')
                    }
                } else {
                    console.warn('No se encontró token de autorización en el usuario')
                }

                return true
            },
            async jwt({ token, user }) {
                console.log('Callback JWT ejecutado')
                console.log('Usuario presente en JWT callback:', !!user)
                console.log('Token presente en JWT callback:', !!token)
                
                if (user) {
                    console.log('Actualizando token con datos de usuario')
                    token.user = user
                }

                return token
            },
            async session({ session, token }: { session: any; token: any }) {
                console.log('Callback session ejecutado')
                console.log('Token presente en session callback:', !!token)
                console.log('Usuario en token presente:', !!token?.user)
                
                if (token.user) {
                    console.log('Actualizando sesión con datos de usuario desde token')
                    session.user = token.user
                }

                return session
            }
        },
        secret: process.env.NEXTAUTH_SECRET,
        debug: true
    })