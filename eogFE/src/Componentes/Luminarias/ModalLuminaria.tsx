import CommonModal from "@Componentes/Global/CommonModal"
import { Fragment, useEffect, useState } from "react"
import { Button, Card, CardBody, Col, Row } from "reactstrap"
import Loader from "@Componentes/Global/Loader"
import { useModalContext } from "@Context/ModalContext"
import { Formik, Field } from "formik"
import validationSchema from "@Componentes/Luminarias/validationSchema"
import { ConnectedFocusError } from "focus-formik-error"
import MapaLuminaria from "@Componentes/Luminarias/MapaLuminaria"
import FormikTypeahead from "@Componentes/Global/Formulario/FormikTypeahead"
import { actualizarLuminaria, cargarLuminaria } from "@/src/services/luminarias"
import ImageUploader from "./ImageUploader"

const ModalLuminaria = () => {

    const { toggleModal, modalStates, updateData } = useModalContext()

    const tituloFormulario = modalStates?.modalLuminaria?.IDLuminaria ? "Editar Luminaria" : "Nueva Luminaria"

    const [loading, setLoading] = useState(false)
    const [dataForm, setDataForm] = useState<any>({})
    const data = { isOpen: modalStates.modalLuminaria.open, header: true, toggler: () => toggleModal("modalLuminaria"), title: tituloFormulario, size: "lg" }

    const defaultValues = {
        ubicacion:{
            latitud: null,
            longitud: null
        },
        direccion: null,
        luminarias: [
            {
                indice: 0,
                potencia: null,
                foto: null,
            }
        ]
    }

    const initialValues = {
        ...defaultValues,
        ...dataForm
    }

    const potenciaList = [
        { value: 1, label: "50 W" },
        { value: 2, label: "75 W" },
        { value: 3, label: "100 W" },
        { value: 4, label: "150 W" },
        { value: 5, label: "200 W" },
        { value: 6, label: "250 W" },
        { value: 7, label: "300 W" },
    ]
    useEffect(() => {
        setLoading(true)
        if (modalStates?.modalLuminaria?.IDLuminaria) {
            cargarLuminaria({ IDLuminaria: modalStates?.modalLuminaria?.IDLuminaria })
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
    }, [modalStates?.modalLuminaria?.IDLuminaria])

    return (
        <CommonModal modalData={ data }>
            <>
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
                                    onSubmit={ async (data) => {
                                        setLoading(true)
                                        await actualizarLuminaria(data)
                                            .then(() => {
                                                setLoading(false)
                                                toggleModal("modalLuminaria")
                                                updateData()
                                            })
                                            .catch((err: any) => {
                                                console.log(err)
                                                setLoading(false)
                                            })
                                    } }
                                >
                                    { ({ values, setValues, errors, handleSubmit }: any) => (
                                        <div>
                                            <ConnectedFocusError/>
                                            <Row>
                                                <Col md="12">
                                                    <MapaLuminaria/>
                                                </Col>
                                                <Col md="12" style={{ textAlign: "right" }}>
                                                    <h6>Lat: { values?.ubicacion?.latitud ?? "-" }, Lng: { values?.ubicacion?.longitud ?? "-" }</h6>
                                                </Col>
                                                <Col md="12">
                                                    <FormikTypeahead
                                                        apiURL={ `/api/direcciones` }
                                                        name={ "direccion" }
                                                        title={ "Dirección" }
                                                        placeholder={ "Selecciona la dirección" }
                                                    />
                                                </Col>
                                                <div className="card-wrapper border rounded-3 main-custom-form input-group-wrapper ">
                                                    <div className={ "w-100 d-flex justify-content-between align-items-center" }>
                                                        <div className="d-flex justify-content-between align-items-center w-100">
                                                            <h6 className="sub-title fw-bold">Luminarias</h6>
                                                            <Button color="primary"
                                                                    onClick={ () => {
                                                                        setValues({
                                                                                      ...values,
                                                                                      luminarias: [
                                                                                          ...values.luminarias,
                                                                                          {
                                                                                              potencia: null,
                                                                                              foto: null
                                                                                          }
                                                                                      ]
                                                                                  })
                                                                    } }>Agregar Lampara</Button>
                                                        </div>
                                                    </div>
                                                    <div className="w-100">
                                                        {
                                                            values.luminarias.map((luminaria: any, index: number) => (
                                                                <Row key={ index } style={ { backgroundColor: "#f0f0f0", padding: "10px", margin: "10px" } }>
                                                                    <Col md="6">
                                                                        <Field
                                                                            name={ `luminarias[${ index }].potencia` }
                                                                            as="select"
                                                                            className={ `form-control ${ errors?.luminarias?.[index]?.potencia ? "is-invalid" : "" }` }>
                                                                            <option value={ "" }>Selecciona la potencia</option>
                                                                            { potenciaList.map((item, index) => (<option value={ item.value } key={ index }>{ item.label }</option>)) }
                                                                        </Field>
                                                                        <Button
                                                                            color="danger"
                                                                            style={ { marginTop: "10px", marginBottom: "10px" } }
                                                                            onClick={ () => {
                                                                                setValues(
                                                                                    {
                                                                                        ...values,
                                                                                        luminarias: values.luminarias.filter((luminaria: any, i: number) => i !== index)
                                                                                    })
                                                                            } }
                                                                        >Eliminar Luminaria</Button>
                                                                    </Col>
                                                                    <Col md="6">
                                                                        <ImageUploader
                                                                            name={ `luminarias.[${ index }].foto` }
                                                                            error={ !!errors?.luminarias?.[index]?.foto }
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                                <Col md="12" style={ { textAlign: "right", marginTop: "10px" } }>
                                                    <Button type="submit" color="primary" style={ { marginRight: "10px" } } onClick={ handleSubmit }>Guardar</Button>
                                                    <Button type={ "button" } color="secondary" onClick={ () => toggleModal("modalLuminaria") }>Cancelar</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    ) }
                                </Formik>
                            </CardBody>
                        </Card>
                    </Fragment>
                }
            </>
        </CommonModal>
    )
}

export default ModalLuminaria