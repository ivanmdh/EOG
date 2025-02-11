import apiService from "@services/apiServices"
import { toast } from "react-toastify"

const cargarResumenRequest = (data: any) => {
    return new Promise((resolve, reject) => {
        apiService
            .post('/api/resumen', data)
            .then((reponse: any) => {
                resolve(reponse)
            })
            .catch((error: any) => {
                reject(error)
            })
    })
}

const cargarResumen = (data: any) => {
    return toast.promise(cargarResumenRequest(data), {
        pending: 'Cargando resumen',
        success: 'Resumen cargado',
        error: 'Error al cargar el resumen'
    })
}

export {
    cargarResumen
}