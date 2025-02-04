import CommonModal from "@Componentes/Global/CommonModal"
import { Fragment, useEffect, useState } from "react"
import { Button, Card, CardBody, Col, ModalFooter, Row } from "reactstrap"
import FormikInput from "@Componentes/Global/Formulario/FormikInput"
import { actualizarTicket, cargarTicket } from "@/src/services/tickets"
import Loader from "@Componentes/Global/Loader"
import { useModalContext } from "@Context/ModalContext"
import { Formik, Form } from "formik"
import validationSchema from "@Componentes/Tickets/validationSchema"
import { ConnectedFocusError } from "focus-formik-error"
import FormikTypeahead from "@Componentes/Global/Formulario/FormikTypeahead"
import MapaLuminariaTicket from "./MapaLuminariaTicket"
import ModalLampara from "@Componentes/Tickets/ModalLampara"
import FormikSelect from "@Componentes/Global/Formulario/FormikSelect"
import FormikTextarea from "@Componentes/Global/Formulario/FormikTextarea"
import ModalFormulario from "@Componentes/Tickets/ModalFormulario"
import ModalDetalles from "@Componentes/Tickets/ModalDetalles"

const ModalTicket = () => {

    const { toggleModal, modalStates, updateData } = useModalContext()

    const tituloFormulario = modalStates?.modalTicket?.IDTicket ? "Editar Ticket" : "Nuevo Ticket"

    const [loading, setLoading] = useState(true)
    const [dataForm, setDataForm] = useState<any>({})
    const data = { isOpen: modalStates.modalTicket.open, header: true, toggler: () => toggleModal("modalTicket"), title: tituloFormulario, size: "lg" }



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
                        dataForm
                        ? <ModalFormulario dataForm={ dataForm } setLoading={ setLoading }/>
                        : <ModalDetalles dataForm={ dataForm }/>
                    }
                </>
            }
        </CommonModal>
    )
}

export default ModalTicket