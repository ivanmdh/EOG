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
                        subdominio: { label: 'Subdominio', type: 'text' },
                        recordarme: { label: 'Recordar', type: 'checkbox' }
                    },
                    authorize: async (credentials) => {
                        try {
                            const response = await apiService.post(
                                '/api/auth/login',
                                {
                                    usuario: credentials.usuario,
                                    password: credentials.password,
                                    subdominio: credentials.subdominio,
                                    recordarme: credentials.recordarme
                                }
                            )

                            const data = response?.data

                            if (response.status === 200 && data.success) {
                                return {
                                    ...data.userData,
                                    Authorization: data.Authorization
                                }
                            } else {
                                throw new InvalidLoginError()
                            }
                        } catch (e: unknown) {
                            throw new InvalidLoginError(e as Error)
                        }
                    }
                }),
            Credentials(
                {
                    id: 'token',
                    name: 'token',
                    credentials: {
                        token: { label: 'Token', type: 'text' }
                    },
                    authorize: async (credentials) => {
                        try {
                            const response = await apiService.post(
                                '/api/auth/bypasstoken',
                                {
                                    token: credentials.token
                                }
                            )

                            const data = response?.data

                            if (response.status === 200 && data.success) {
                                return {
                                    ...data.userData,
                                    Authorization: data.Authorization
                                }
                            } else {
                                throw new InvalidLoginError()
                            }
                        } catch (e: unknown) {
                            throw new InvalidLoginError(e as Error)
                        }
                    }
                })
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
                if (user && user?.Authorization) {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('accessToken', user?.Authorization?.token)
                    }
                }

                return true
            },
            async jwt({ token, user }) {
                if (user) {
                    token.user = user
                }

                return token
            },
            async session({ session, token }: { session: any; token: any }) {
                if (token.user) {
                    session.user = token.user
                }

                return session
            }
        },
        secret: process.env.NEXTAUTH_SECRET,
        debug: false
    })