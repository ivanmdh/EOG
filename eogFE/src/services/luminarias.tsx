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

export {
    cargarLuminaria
}