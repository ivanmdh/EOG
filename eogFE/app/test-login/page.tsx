"use client"

import { useState } from 'react'
import axios from 'axios'

export default function TestLoginPage() {
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setResult(null)
        
        try {
            // Prueba directa a la API, sin pasar por NextAuth
            const response = await axios.post('https://api.construccioneseog.com/api/auth/login', {
                usuario,
                password
            }, {
                timeout: 10000
            })
            
            setResult(response.data)
            console.log('Respuesta directa de API:', response.data)
        } catch (err: any) {
            console.error('Error de prueba directa:', err)
            setError(err.message || 'Error desconocido')
            
            if (axios.isAxiosError(err)) {
                setResult({
                    error: true,
                    message: err.message,
                    response: err.response?.data,
                    status: err.response?.status
                })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mt-5">
            <h1>Prueba de Conexión Directa a API</h1>
            <p>Esta página hace una solicitud directa a la API sin pasar por NextAuth</p>
            
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Usuario</label>
                    <input 
                        type="text"
                        className="form-control"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input 
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? 'Probando...' : 'Probar Conexión Directa'}
                </button>
            </form>
            
            {error && (
                <div className="alert alert-danger">
                    <h4>Error</h4>
                    <p>{error}</p>
                </div>
            )}
            
            {result && (
                <div className="alert alert-info">
                    <h4>Resultado</h4>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}
