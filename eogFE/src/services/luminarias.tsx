import apiService from "@services/apiServices"
import { toast } from "react-toastify"

const cargarLuminariaRequest = (data: any) => {
    return new Promise((resolve, reject) => {
        apiService
            .post('/api/luminarias/detalles', data)
            .then((reponse: any) => {
                resolve(reponse)
            })
            .catch((error: any) => {
                reject(error)
            })
    })
}

const cargarLuminaria = (data: any) => {
    return toast.promise(cargarLuminariaRequest(data), {
        //pending: 'Cargando luminaria',
        //success: 'Luminaria cargado',
        error: 'Error al cargar el luminaria'
    })
}

const actualizarLuminariaRequest = (data: any) => {
    return new Promise((resolve, reject) => {
        apiService
            .post('/api/luminarias/luminaria', data)
            .then((reponse: any) => {
                resolve(reponse)
            })
            .catch((error: any) => {
                reject(error)
            })
    })
}

const actualizarLuminaria = (data: any) => {
    return toast.promise(actualizarLuminariaRequest(data), {
        pending: 'Actualizando luminaria',
        success: 'Luminaria actualizada',
        error: 'Error al actualizar el luminaria'
    })
}

const eliminarLuminariaRequest = (data: any) => {
    return new Promise((resolve, reject) => {
        apiService
            .post('/api/luminarias/eliminar', data)
            .then((reponse: any) => {
                resolve(reponse)
            })
            .catch((error: any) => {
                reject(error)
            })
    })
}

const eliminarLuminaria = (data: any) => {
    return toast.promise(eliminarLuminariaRequest(data), {
        pending: 'Eliminando luminaria',
        success: 'Luminaria eliminada',
        error: 'Error al eliminar la luminaria'
    })
}

export {
    cargarLuminaria,
    actualizarLuminaria,
    eliminarLuminaria
}