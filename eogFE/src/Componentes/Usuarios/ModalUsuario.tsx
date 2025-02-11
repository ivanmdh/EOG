import CommonModal from "@Componentes/Global/CommonModal"
import { Fragment, useEffect, useState } from "react"
import { Button, Card, CardBody, Col, Row } from "reactstrap"
import FormikInput from "@Componentes/Global/Formulario/FormikInput"
import { actualizarUsuario, cargarUsuario } from "@/src/services/usuarios"
import Loader from "@Componentes/Global/Loader"
import { useModalContext } from "@Context/ModalContext"
import { Formik, Form } from "formik"
import validationSchema from "@Componentes/Usuarios/validationSchema"
import { ConnectedFocusError } from "focus-formik-error"
import FormikSelect from "@Componentes/Global/Formulario/FormikSelect"

const ModalUsuario = () => {

    const { toggleModal, modalStates, updateData } = useModalContext()

    const tituloFormulario = modalStates?.modalUsuario?.IDUsuario ? "Editar Usuario" : "Nuevo Usuario"

    const [loading, setLoading] = useState(true)
    const [dataForm, setDataForm] = useState<any>({})
    const data = { isOpen: modalStates.modalUsuario.open, header: true, toggler: () => toggleModal("modalUsuario"), title: tituloFormulario, size: "lg" }

    const defaultValues = {
        nombre: "",
        apellido: "",
        usuario: "",
        password: "",
        email: "",
        rol: null,
    }

    const initialValues = {
        ...defaultValues,
        ...dataForm
    }

    useEffect(() => {
        if (modalStates?.modalUsuario?.IDUsuario) {
            setLoading(true)
            cargarUsuario({ "IDUsuario": modalStates?.modalUsuario?.IDUsuario })
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
    }, [modalStates?.modalUsuario?.IDUsuario])

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
                                    await actualizarUsuario(data)
                                        .then(() => {
                                            setLoading(false)
                                            toggleModal("modalUsuario")
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
                                            <Col md="12">
                                                <FormikInput
                                                    type="text"
                                                    name={ "apellido" }
                                                    title={ "Apellido" }
                                                    placeholder={ "Ingresa el apellido" }
                                                />
                                            </Col>
                                            <Col md="12">
                                                <FormikInput
                                                    type="text"
                                                    name={ "usuario" }
                                                    title={ "Usuario" }
                                                    placeholder={ "Ingresa el usuario" }
                                                    noMayus={ true }
                                                />
                                            </Col>
                                            <Col md="12">
                                                <FormikInput
                                                    type="password"
                                                    name={ "password" }
                                                    title={ "Contraseña" }
                                                    placeholder={ "Ingresa la contraseña" }
                                                    noMayus={ true }
                                                />
                                            </Col>
                                            <Col md="12">
                                                <FormikInput
                                                    type="email"
                                                    name={ "email" }
                                                    title={ "Email" }
                                                    placeholder={ "Ingresa el email" }
                                                    noMayus={ true }
                                                />
                                            </Col>
                                            <Col md="12">
                                                <FormikSelect
                                                    apiURL="roles"
                                                    name="rol"
                                                    label="Rol"
                                                />
                                            </Col>
                                            <Col md="12" style={ { textAlign: "right" } }>
                                                <Button type="submit" color="primary" style={ { marginRight: "10px" } } onClick={ () => handleSubmit() }>Guardar</Button>
                                                <Button type={ "button" } color="secondary" onClick={ () => toggleModal("modalUsuario") }>Cancelar</Button>
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

export default ModalUsuario