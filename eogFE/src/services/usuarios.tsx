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

const actualizarUsuarioRequest = (data: any) => {
    return new Promise((resolve, reject) => {
        apiService
            .post('/api/usuarios/usuario', data)
            .then((reponse: any) => {
                resolve(reponse)
            })
            .catch((error: any) => {
                reject(error)
            })
    })
}

const actualizarUsuario = (data: any) => {
    return toast.promise(actualizarUsuarioRequest(data), {
        pending: 'Actualizando usuario',
        success: 'Usuario actualizado',
        error: 'Error al actualizar el usuario'
    })
}

const eliminarUsuarioRequest = (data: any) => {
    return new Promise((resolve, reject) => {
        apiService
            .post('/api/usuarios/eliminar', data)
            .then((reponse: any) => {
                resolve(reponse)
            })
            .catch((error: any) => {
                reject(error)
            })
    })
}

const eliminarUsuario = (data: any) => {
    return toast.promise(eliminarUsuarioRequest(data), {
        pending: 'Eliminando usuario',
        success: 'Usuario eliminado',
        error: 'Error al eliminar el usuario'
    })
}

export {
    cargarUsuario,
    actualizarUsuario,
    eliminarUsuario
}