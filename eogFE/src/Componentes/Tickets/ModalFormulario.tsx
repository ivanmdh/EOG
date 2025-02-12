import { Button, Card, CardBody, Col, Row } from "reactstrap"
import { Form, Formik } from "formik"
import validationSchema from "@Componentes/Tickets/validationSchema"
import { actualizarTicket } from "@services/tickets"
import { ConnectedFocusError } from "focus-formik-error"
import FormikTypeahead from "@Componentes/Global/Formulario/FormikTypeahead"
import MapaLuminariaTicket from "@Componentes/Tickets/MapaLuminariaTicket"
import ModalLampara from "@Componentes/Tickets/ModalLampara"
import FormikSelect from "@Componentes/Global/Formulario/FormikSelect"
import FormikTextarea from "@Componentes/Global/Formulario/FormikTextarea"
import { useModalContext } from "@Context/ModalContext"

interface Props {
    dataForm: any,
    setLoading: any,
    defaultValues: any,
}

const ModalFormulario = ({ dataForm, setLoading, defaultValues }: Props) => {

    const { toggleModal, updateData } = useModalContext()

    const initialValues = {
        ...defaultValues,
        ...dataForm
    }

    return (
        <Card className="mb-0">
            <CardBody>
                <Formik
                    initialValues={ initialValues }
                    validationSchema={ validationSchema }
                    validateOnChange={ false }
                    validateOnBlur={ false }
                    onSubmit={ async (data) => {
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
                                    <FormikTextarea title={ "Descripción" } name={ "descripcion" }/>
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
    )
}

export default ModalFormulario