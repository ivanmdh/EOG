import { Card, CardBody, Col, Row } from "reactstrap"

import ModalDetallesMapa from "./ModalDetallesMapa"

interface Props {
    dataForm: any
}

const ModalDetalles = ({ dataForm }: Props) => {

    return (
        <Card className="mb-0">
            <CardBody>
                <Row>
                    <Col md="12" style={ { marginBottom: "10px" } }>
                        <Row>
                            <Col md="4">
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
                            <Col md="4">
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
                            <Col md="4">
                                <ul>
                                    <li>
                                        <h6 className="mb-0">Fecha Cierre</h6>
                                        <span className="f-light" style={ { fontSize: "0.75rem" } }>{ dataForm?.fecha_cierre }</span>
                                    </li>
                                    <li>
                                        <h6 className="mb-0">Tipo Reparacion</h6>
                                        <span className="f-light" style={ { fontSize: "0.75rem" } }>{ dataForm?.reparacion.toUpperCase() }</span>
                                    </li>
                                    <li>
                                        <h6 className="mb-0">Observaciones</h6>
                                        <span className="f-light" style={ { fontSize: "0.75rem" } }>{ dataForm?.observaciones }</span>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="4" style={ { marginBottom: "10px" } }>
                        <ModalDetallesMapa ubicacion={ dataForm?.luminaria?.ubicacion }/>
                    </Col>
                    <Col md="4" className="d-flex justify-content-center align-items-start" style={ { marginBottom: "10px" } }>
                        <div>

                            {/* eslint-disable-next-line @next/next/no-img-element */ }
                            <img
                                src={ `${ dataForm?.foto }/preview` }
                                style={ {
                                    width: "100%"
                                } }
                                alt="Vista Previa"
                            />
                        </div>
                    </Col>
                    <Col md="4" className="d-flex justify-content-center align-items-start" style={ { marginBottom: "10px" } }>
                        <div>
                            {/* eslint-disable-next-line @next/next/no-img-element */ }
                            <img
                                src={ `${ dataForm?.foto_previa }/preview` }
                                style={ {
                                    width: "100%"
                                } }
                                alt="Vista Previa"
                            />
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default ModalDetalles