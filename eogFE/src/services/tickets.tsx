import apiService from "@services/apiServices"
import { toast } from "react-toastify"

const cargarTicketRequest = (data: any) => {
    return new Promise((resolve, reject) => {
        apiService
            .post('/api/tickets/detalles', data)
            .then((reponse: any) => {
                resolve(reponse)
            })
            .catch((error: any) => {
                reject(error)
            })
    })
}

const cargarTicket = (data: any) => {
    return toast.promise(cargarTicketRequest(data), {
        //pending: 'Cargando ticket',
        //success: 'Ticket cargado',
        error: 'Error al cargar el ticket'
    })
}

const actualizarTicketRequest = (data: any) => {
    return new Promise((resolve, reject) => {
        apiService
            .post('/api/tickets/ticket', data)
            .then((reponse: any) => {
                resolve(reponse)
            })
            .catch((error: any) => {
                reject(error)
            })
    })
}

const actualizarTicket = (data: any) => {
    return toast.promise(actualizarTicketRequest(data), {
        pending: 'Actualizando ticket',
        success: 'Ticket actualizado',
        error: 'Error al actualizar el ticket'
    })
}

const cerrarTicketRequest = (data: any) => {
    return new Promise((resolve, reject) => {
        apiService
            .post('/api/tickets/cerrar', data)
            .then((reponse: any) => {
                resolve(reponse)
            })
            .catch((error: any) => {
                reject(error)
            })
    })
}

const cerrarTicket = (data: any) => {
    return toast.promise(cerrarTicketRequest(data), {
        pending: 'Cerrando ticket',
        success: 'Ticket cerrado',
        error: 'Error al cerrar el ticket'
    })
}

const eliminarTicketRequest = (data: any) => {
    return new Promise((resolve, reject) => {
        apiService
            .post('/api/tickets/eliminar', data)
            .then((reponse: any) => {
                resolve(reponse)
            })
            .catch((error: any) => {
                reject(error)
            })
    })
}

const eliminarTicket = (data: any) => {
    return toast.promise(eliminarTicketRequest(data), {
        pending: 'Eliminando ticket',
        success: 'Ticket eliminado',
        error: 'Error al eliminar el ticket'
    })
}

export {
    cargarTicket,
    actualizarTicket,
    cerrarTicket,
    eliminarTicket
}