import apiService from "@services/apiServices"
import { toast } from "react-toastify"

const cargarRolRequest = (data: any) => {
    return new Promise((resolve, reject) => {
        apiService
            .post('/api/usuarios/roles/detalles', data)
            .then((reponse: any) => {
                resolve(reponse)
            })
            .catch((error: any) => {
                reject(error)
            })
    })
}

const cargarRol = (data: any) => {
    return toast.promise(cargarRolRequest(data), {
        //pending: 'Cargando rol',
        //success: 'Rol cargado',
        error: 'Error al cargar el rol'
    })
}

const actualizarRolRequest = (data: any) => {
    return new Promise((resolve, reject) => {
        apiService
            .post('/api/usuarios/roles/rol', data)
            .then((reponse: any) => {
                resolve(reponse)
            })
            .catch((error: any) => {
                reject(error)
            })
    })
}

const actualizarRol = (data: any) => {
    return toast.promise(actualizarRolRequest(data), {
        pending: 'Actualizando rol',
        success: 'Rol actualizado',
        error: 'Error al actualizar el rol'
    })
}

const eliminarRolRequest = (data: any) => {
    return new Promise((resolve, reject) => {
        apiService
            .post('/api/usuarios/roles/eliminar', data)
            .then((reponse: any) => {
                resolve(reponse)
            })
            .catch((error: any) => {
                reject(error)
            })
    })
}

const eliminarRol = (data: any) => {
    return toast.promise(eliminarRolRequest(data), {
        pending: 'Eliminando rol',
        success: 'Rol eliminado',
        error: 'Error al eliminar el rol'
    })
}

export {
    cargarRol,
    actualizarRol,
    eliminarRol
}