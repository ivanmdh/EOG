import CommonModal from "@Componentes/Global/CommonModal"
import { Fragment, useEffect, useState } from "react"
import { Button, Card, CardBody, Col, FormGroup, Input, Label, Row } from "reactstrap"
import FormikInput from "@Componentes/Global/Formulario/FormikInput"
import { cargarRol } from "@/src/services/roles"
import Loader from "@Componentes/Global/Loader"
import { useModalContext } from "@Context/ModalContext"
import { Formik, Form } from "formik"
import validationSchema from "@Componentes/Roles/validationSchema"
import { ConnectedFocusError } from "focus-formik-error"

const ModalRol = () => {

    const { toggleModal, modalStates } = useModalContext()

    const tituloFormulario = modalStates?.modalRol?.IDRol ? "Editar Rol" : "Nuevo Rol"

    const [loading, setLoading] = useState(true)
    const [dataForm, setDataForm] = useState<any>({})
    const data = { isOpen: modalStates.modalRol.open, header: true, toggler: () => toggleModal("modalRol"), title: tituloFormulario, size: "lg" }

    const defaultValues = {
        nombre: "",
        apellido: "",
        email: "",
    }

    const initialValues = {
        ...defaultValues,
        ...dataForm
    }

    console.log("initialValues:", initialValues)
    console.log("dataForm:", dataForm)


    useEffect(() => {
        if (modalStates?.modalRol?.IDRol) {
            cargarRol({ "IDRol": modalStates?.modalRol?.IDRol })
                .then((response: any) => {
                    setDataForm(response.data)
                    setLoading(false)
                })
                .catch((error: any) => {
                    console.log("Error:", error)
                    setLoading(false)
                })
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

                                    console.log("Data:", data)

                                    //    let RequestFunction
//
                                    //    if (clienteFolioInt !== 'nuevo') RequestFunction = editarCliente
                                    //    else RequestFunction = agregarCliente
                                    //    await RequestFunction(data)
                                    //        .then((res: any) => {
                                    //            Formik.resetForm()
//
                                    //            //router.push({
                                    //            //              pathname: '/clientes',
                                    //            //              query: { cliente: res.data.FolioInt ?? clienteFolioInt }
                                    //            //            })
//
                                    //        })
                                    //        .catch((err: any) => {
                                    //            console.log(err)
                                    //            Formik.resetForm()
                                    //        })
                                } }
                            >
                                { ({ errors }) => (
                                    <Form>
                                        <ConnectedFocusError/>
                                        <>{
                                            console.log("Errors:", errors)
                                        }</>
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
                                            <Col md="12">
                                                <FormGroup check switch>
                                                    <Input id={`switch-`} type="checkbox" />
                                                    <Label htmlFor={`switch-`} check>
                                                       Agregar Rols
                                                    </Label>
                                                </FormGroup>
                                            </Col>
                                            <Col md="12" style={ { textAlign: "right" } }>
                                                <Button type="submit" color="primary" style={ { marginRight: "10px" } }>Guardar</Button>
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