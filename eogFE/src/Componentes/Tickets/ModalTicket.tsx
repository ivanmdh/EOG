import CommonModal from "@Componentes/Global/CommonModal"
import { useEffect, useState } from "react"
import { cargarTicket } from "@/src/services/tickets"
import Loader from "@Componentes/Global/Loader"
import { useModalContext } from "@Context/ModalContext"
import ModalFormulario from "@Componentes/Tickets/ModalFormulario"
import ModalDetalles from "@Componentes/Tickets/ModalDetalles"

const ModalTicket = () => {

    const { toggleModal, modalStates } = useModalContext()

    const tituloFormulario = modalStates?.modalTicket?.IDTicket ? "Procesar Ticket" : "Nuevo Ticket"

    const [loading, setLoading] = useState(true)
    const [dataForm, setDataForm] = useState<any>({})
    const data = { isOpen: modalStates.modalTicket.open, header: true, toggler: () => toggleModal("modalTicket"), title: tituloFormulario, size: "lg" }

    const defaultValues = {
        IDTicket: null,
        direccion: "",
        luminaria: null,
        lampara: null,
        tipo_falla: null,
        descripcion: "",
        tipo_reparacion: null,
        observaciones: "",
        foto: null,
    }

    useEffect(() => {
        if (modalStates?.modalTicket?.IDTicket) {
            setLoading(true)
            cargarTicket({ "IDTicket": modalStates?.modalTicket?.IDTicket })
                .then((response: any) => {
                    setDataForm(response.data)
                })
                .catch((error: any) => {
                    console.log("Error:", error)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setDataForm({})
            setLoading(false)
        }
    }, [modalStates?.modalTicket?.IDTicket])

    return (
        <CommonModal modalData={ data }>
            {
                loading
                ? <Loader/>
                : <>
                    {
                        modalStates?.modalTicket?.IDTicket
                        ? <ModalDetalles defaultValues={ defaultValues } dataForm={ dataForm } setLoading={ setLoading }/>
                        : <ModalFormulario defaultValues={ defaultValues } dataForm={ dataForm } setLoading={ setLoading }/>
                    }
                </>
            }
        </CommonModal>
    )
}

export default ModalTicket