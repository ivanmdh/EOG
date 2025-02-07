import validationSchema from "@Componentes/Tickets/validationSchema"
import { actualizarTicket } from "@services/tickets"
import { ConnectedFocusError } from "focus-formik-error"
import { Card, CardBody, Col, Row } from "reactstrap"
import { Form, Formik } from "formik"
import { useModalContext } from "@Context/ModalContext"
import ModalDetallesMapa from "./ModalDetallesMapa"
import ImageUploader from "@Componentes/Luminarias/ImageUploader"

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

    console.log("dataForm", dataForm)

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
                    { ({ errors }) => (
                        <Form>
                            <ConnectedFocusError/>
                            <Row>
                                <Col md="4">
                                    <div style={ { display: "flex", alignItems: "center", marginTop: "3px", marginBottom: "3px" } }>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            //imagen del api de rick and morty
                                            src={ "https://rickandmortyapi.com/api/character/avatar/1.jpeg" }
                                            alt={ 'fotito' }
                                            style={ {
                                                height: "100px",
                                                marginRight: "10px",
                                            } }
                                        />
                                    </div>
                                </Col>
                                <Col md="4">
                                    <ModalDetallesMapa/>
                                </Col>
                                <Col md="4">
                                    <Col md="6">
                                        <ImageUploader
                                            name={ `foto` }
                                            error={ !!errors?.foto }
                                        />
                                    </Col>
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