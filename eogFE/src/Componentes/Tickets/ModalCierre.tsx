import validationSchemaDetalles from "@Componentes/Tickets/validationSchemaDetalles"
import { cerrarTicket } from "@services/tickets"
import { ConnectedFocusError } from "focus-formik-error"
import { Button, Card, CardBody, Col, Row } from "reactstrap"
import { Form, Formik } from "formik"
import { useModalContext } from "@Context/ModalContext"
import ModalDetallesMapa from "./ModalDetallesMapa"
import ImageUploader from "@Componentes/Luminarias/ImageUploader"
import FormikSelect from "@Componentes/Global/Formulario/FormikSelect"
import FormikTextarea from "@Componentes/Global/Formulario/FormikTextarea"

interface Props {
    dataForm: any,
    setLoading: any
    defaultValues: any,
}

const ModalCierre = ({ dataForm, setLoading, defaultValues }: Props) => {

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
                    validationSchema={ validationSchemaDetalles }
                    validateOnChange={ false }
                    validateOnBlur={ false }
                    onSubmit={ async (data) => {
                        setLoading(true)
                        await cerrarTicket(data)
                            .then(() => {
                                setLoading(false)
                                toggleModal("modalTicket")
                                updateData()
                            })
                            .catch((err: any) => {
                                console.log(err)
                                setLoading(false)
                            })
                    } }
                >
                    { ({ errors, handleSubmit }) => (
                        <Form>
                            <ConnectedFocusError/>
                            <Row>
                                <Col md="4" style={ { marginBottom: "10px" } }>
                                    <Col md="12">
                                        <FormikSelect apiURL={ "reparaciones" } name="tipo_reparacion" label="Tipo de reparacion"/>
                                    </Col>
                                    <Col md="12">
                                        <FormikTextarea
                                            title="Observaciones adicionales"
                                            name="observaciones"
                                        />
                                    </Col>
                                    <Col md="12" style={ { marginBottom: "10px" } }>
                                        <ImageUploader
                                            name={ `foto` }
                                            error={ !!errors?.foto }
                                        />
                                    </Col>
                                    <Col md="12" style={ { textAlign: "right" } }>
                                        <Button type="submit" color="primary" style={ { marginRight: "10px" } } onClick={ () => handleSubmit() }>Guardar</Button>
                                        <Button type={ "button" } color="secondary" onClick={ () => toggleModal("modalTicket") }>Cancelar</Button>
                                    </Col>
                                </Col>
                                <Col md="8" style={ { marginBottom: "10px" } }>
                                    <Row>
                                        <Col md="12" style={ { marginBottom: "10px" } }>
                                            <Row>
                                                <Col md="6">
                                                    <ul>
                                                        <li>
                                                            <h6 className="mb-0">Folio</h6>
                                                            <span className="f-light" style={ { fontSize: "0.75rem" } }> { dataForm?.folio }</span>
                                                        </li>
                                                        <li>
                                                            <h6 className="mb-0">Direccion</h6>
                                                            <span className="f-light" style={ { fontSize: "0.75rem" } }> { dataForm?.direccion?.[0]?.direccion }</span>
                                                        </li>
                                                        <li>
                                                            <h6 className="mb-0">Tipo Falla</h6>
                                                            <span className="f-light" style={ { fontSize: "0.75rem" } }>{ dataForm?.falla.toUpperCase() }</span>
                                                        </li>
                                                    </ul>
                                                </Col>
                                                <Col md="6">
                                                    <ul>
                                                        <li>
                                                            <h6 className="mb-0">Fecha</h6>
                                                            <span className="f-light" style={ { fontSize: "0.75rem" } }>{ dataForm?.fecha }</span>
                                                        </li>
                                                        <li>
                                                            <h6 className="mb-0">Lampara</h6>
                                                            <span className="f-light" style={ { fontSize: "0.75rem" } }>{ dataForm?.lampara?.folio } - { dataForm?.lampara?.potencia }</span>
                                                        </li>
                                                        <li>
                                                            <h6 className="mb-0">Descripcion</h6>
                                                            <span className="f-light" style={ { fontSize: "0.75rem" } }>{ dataForm?.descripcion }</span>
                                                        </li>
                                                    </ul>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md="6" style={ { marginBottom: "10px" } }>
                                            <ModalDetallesMapa ubicacion={ dataForm?.luminaria?.ubicacion }/>
                                        </Col>
                                        <Col md="6" className="d-flex justify-content-center align-items-start" style={ { marginBottom: "10px" } }>
                                            <div>
                                                {/* eslint-disable-next-line @next/next/no-img-element */ }
                                                <img
                                                    src={ `${ dataForm?.lampara.foto }/preview` }
                                                    style={ {
                                                        width: "100%"
                                                    } }
                                                    alt="Vista Previa"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    ) }
                </Formik>
            </CardBody>
        </Card>
    )
}

export default ModalCierre