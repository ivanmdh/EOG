import apiService from "@services/apiServices"
import { toast } from "react-toastify"

const cargarUsuarioRequest = (data: any) => {
    return new Promise((resolve, reject) => {
        apiService
            .post('/api/usuarios/detalles', data)
            .then((reponse: any) => {
                resolve(reponse)
            })
            .catch((error: any) => {
                reject(error)
            })
    })
}

const cargarUsuario = (data: any) => {
    return toast.promise(cargarUsuarioRequest(data), {
        //pending: 'Cargando usuario',
        //success: 'Usuario cargado',
        error: 'Error al cargar el usuario'
    })
}

export {
    cargarUsuario
}