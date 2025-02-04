import CommonModal from "@Componentes/Global/CommonModal"
import { Fragment, useEffect, useState } from "react"
import { Button, Card, CardBody, Col, Row } from "reactstrap"
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

const ModalTicket = () => {

    const { toggleModal, modalStates, updateData } = useModalContext()

    const tituloFormulario = modalStates?.modalTicket?.IDTicket ? "Editar Ticket" : "Nuevo Ticket"

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
    }

    const initialValues = {
        ...defaultValues,
        ...dataForm
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
                : <Fragment>
                    <Card className="mb-0">
                        <CardBody>
                            <Formik
                                initialValues={ initialValues }
                                validationSchema={ validationSchema }
                                validateOnChange={ false }
                                validateOnBlur={ true }
                                onSubmit={ async (data, Formik) => {
                                    setLoading(true)
                                    await actualizarTicket(data)
                                        .then(() => {
                                            setLoading(false)
                                            toggleModal("modalTicket")
                                            updateData()
                                        })
                                        .catch((err: any) => {
                                            console.log(err)
                                            setLoading(false)
                                            Formik.resetForm()
                                        })
                                } }
                            >
                                { ({ values, errors, setFieldValue, handleSubmit }) => (
                                    <Form>
                                        <ConnectedFocusError/>
                                        <Row>
                                            <Col md="12">
                                                <FormikTypeahead
                                                    apiURL={ `/api/direcciones` }
                                                    name={ "direccion" }
                                                    title={ "Dirección" }
                                                    placeholder={ "Selecciona la dirección" }
                                                />
                                            </Col>
                                            {
                                                values.direccion && (
                                                    <>
                                                        <Col md="6">
                                                            <MapaLuminariaTicket IDDireccion={ values?.direccion?.[0]?.IDDireccion ?? null } setFieldValue={ setFieldValue }/>
                                                        </Col>
                                                            {
                                                                values?.luminaria && (
                                                                    <Col md="6" className="border-style" style={ { height: "250px", overflowY: "auto" } }>
                                                                        <h3>Poste { values?.luminaria?.folio }</h3>
                                                                        <h3>Lamparas</h3>
                                                                        <Row className="flex-column">
                                                                            {
                                                                                values?.luminaria?.luminarias?.map((lampara: any, index: number) => (
                                                                                    <ModalLampara key={ index } values={ values } lampara={ lampara } setFieldValue={ setFieldValue }/>
                                                                                ))
                                                                            }
                                                                        </Row>
                                                                    </Col>
                                                                )
                                                            }
                                                    </>
                                                )
                                            }
                                            { errors.luminaria && <Col md="12" className="text-danger">Debes seleccionar una ubicación</Col> }
                                            { errors.lampara && <Col md="12" className="text-danger">Debes seleccionar una lampara</Col> }
                                            <Col md="12">
                                                <FormikSelect apiURL={ 'fallas' } name='tipo_falla' label='Tipo de falla'/>
                                            </Col>
                                            <Col md="12">
                                                <FormikTextarea title={ "Descripción" } name={ "descripcion" } placeholder={ "Escribe una descripción" }/>
                                            </Col>
                                            <Col md="12" style={ { textAlign: "right" } }>
                                                <Button type="submit" color="primary" style={ { marginRight: "10px" } } onClick={ () => handleSubmit() }>Guardar</Button>
                                                <Button type={ "button" } color="secondary" onClick={ () => toggleModal("modalTicket") }>Cancelar</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                ) }
                            </Formik>
                        </CardBody>
                    </Card>
                </Fragment>
            }
        </CommonModal>
    )
}

export default ModalTicket