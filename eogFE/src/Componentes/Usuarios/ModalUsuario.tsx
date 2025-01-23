import CommonModal from "@Componentes/Global/CommonModal"
import { Fragment, useEffect, useState } from "react"
import { Card, CardBody, Col, Row } from "reactstrap"
import FormikInput from "@Componentes/Global/Formulario/FormikInput"
import { cargarUsuario } from "@/src/services/usuarios"
import Loader from "@Componentes/Global/Loader"
import { useModalContext } from "@Context/ModalContext"
import { Formik, Form } from 'formik'
import validationSchema from "@Componentes/Usuarios/validationSchema"
import { ConnectedFocusError } from "focus-formik-error"

const ModalUsuario = () => {

    const { toggleModal, modalStates } = useModalContext()

    const tituloFormulario = modalStates?.modalUsuario?.IDUsuario ? "Editar Usuario" : "Nuevo Usuario"

    const [loading, setLoading] = useState(true)
    const [dataForm, setDataForm] = useState<any>({})
    const data = { isOpen: modalStates.modalUsuario.open, header: true, toggler: () => toggleModal('modalUsuario'), title: tituloFormulario, size: "lg" }

    const defaultValues = {
        nombre: '',
        apellido: '',
        email: '',
    }

    const initialValues = {
        ...defaultValues,
        ...dataForm
    }

    console.log("initialValues:", initialValues)
    console.log("dataForm:", dataForm)


    useEffect(() => {
        if (modalStates?.modalUsuario?.IDUsuario) {
            cargarUsuario(modalStates?.modalUsuario?.IDUsuario)
                .then((response: any) => {
                    setDataForm(response)
                    setLoading(false)
                })
                .catch((error: any) => {
                    console.log("Error:", error)
                    setLoading(false)
                })
        }
    }, [modalStates?.modalUsuario?.IDUsuario])

    return (
        <CommonModal modalData={ data }>
            {
                loading
                ? <Loader />
                : <Fragment>
                    <Card>
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
                                { () => (
                                    <Form>
                                        <ConnectedFocusError />
                                            <Row>
                                                <Col md="12">
                                                    <FormikInput
                                                        type="text"
                                                        name={'nombre'}
                                                        title={'Nombre'}
                                                        placeholder={'Ingresa el nombre'}
                                                        autoFocus={true}
                                                    />
                                                </Col>
                                                <Col md="12">
                                                    <FormikInput
                                                        type="text"
                                                        name={'apellido'}
                                                        title={'Apellido'}
                                                        placeholder={'Ingresa el apellido'}
                                                    />
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