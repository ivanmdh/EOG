import validationSchema from "@Componentes/Tickets/validationSchema"
import { actualizarTicket } from "@services/tickets"
import { ConnectedFocusError } from "focus-formik-error"
import { Card, CardBody, Col, Row } from "reactstrap"
import { Form, Formik } from "formik"
import { useModalContext } from "@Context/ModalContext"
import FormikTextarea from "@Componentes/Global/Formulario/FormikTextarea"
import ModalDetallesMapa from "./ModalDetallesMapa"

interface Props {
    dataForm: any,
    setLoading: any
    defaultValues: any,
}

const ModalDetalles = ({ dataForm, setLoading, defaultValues }: Props) => {

    const { toggleModal, updateData } = useModalContext()

    const initialValues = {
        ...defaultValues,
        IDTicket: dataForm.IDTicket,
    }

    return (
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
                    { ({ }) => (
                        <Form>
                            <ConnectedFocusError/>
                            <Row>
                                <Col md="6">
                                    <Row>
                                        <Col md="12">
                                            <FormikTextarea
                                                name={ "descripcion" }
                                                title={ "Descripción" }
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md="6">
                                    <ModalDetallesMapa/>
                                </Col>
                            </Row>
                        </Form>
                    ) }
                </Formik>
            </CardBody>
        </Card>
    )
}

export default ModalDetalles