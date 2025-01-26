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

export {
    cargarRol
}