import CommonModal from "@Componentes/Global/CommonModal"
import { Fragment, useEffect, useState } from "react"
import { Button, Card, CardBody, Col, Row } from "reactstrap"
import FormikInput from "@Componentes/Global/Formulario/FormikInput"
import { actualizarRol, cargarRol } from "@/src/services/roles"
import Loader from "@Componentes/Global/Loader"
import { useModalContext } from "@Context/ModalContext"
import { Formik, Form } from "formik"
import validationSchema from "@Componentes/Roles/validationSchema"
import { ConnectedFocusError } from "focus-formik-error"

const ModalRol = () => {

    const { toggleModal, modalStates, updateData } = useModalContext()

    const tituloFormulario = modalStates?.modalRol?.IDRol ? "Editar Rol" : "Nuevo Rol"

    const [loading, setLoading] = useState(true)
    const [dataForm, setDataForm] = useState<any>({})
    const data = { isOpen: modalStates.modalRol.open, header: true, toggler: () => toggleModal("modalRol"), title: tituloFormulario, size: "lg" }

    const defaultValues = {
        IDRol: null,
        nombre: "",
    }

    const initialValues = {
        ...defaultValues,
        ...dataForm
    }

    useEffect(() => {
        if (modalStates?.modalRol?.IDRol) {
            setLoading(true)
            cargarRol({ "IDRol": modalStates?.modalRol?.IDRol })
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
    }, [modalStates?.modalRol?.IDRol])

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
                                validateOnBlur={ false }
                                onSubmit={ async (data, Formik) => {
                                    setLoading(true)
                                    await actualizarRol(data)
                                        .then(() => {
                                            setLoading(false)
                                            toggleModal("modalRol")
                                            updateData()
                                        })
                                        .catch((err: any) => {
                                            console.log(err)
                                            setLoading(false)
                                            Formik.resetForm()
                                        })
                                } }
                            >
                                { ({ handleSubmit }) => (
                                    <Form>
                                        <ConnectedFocusError/>
                                        <Row>
                                            <Col md="12">
                                                <FormikInput
                                                    type="text"
                                                    name={ "nombre" }
                                                    title={ "Nombre" }
                                                    placeholder={ "Ingresa el nombre" }
                                                    autoFocus={ true }
                                                />
                                            </Col>
                                            <Col md="12" style={ { textAlign: "right" } }>
                                                <Button type="submit" color="primary" style={ { marginRight: "10px" } } onClick={ () => handleSubmit() }>Guardar</Button>
                                                <Button type={ "button" } color="secondary" onClick={ () => toggleModal("modalRol") }>Cancelar</Button>
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

export default ModalRol