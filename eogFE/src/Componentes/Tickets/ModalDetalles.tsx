import validationSchemaDetalles from "@Componentes/Tickets/validationSchemaDetalles"
import { cerrarTicket } from "@services/tickets"
import { ConnectedFocusError } from "focus-formik-error"
import { Button, Card, CardBody, Col, Row } from "reactstrap"

import ModalDetallesMapa from "./ModalDetallesMapa"

interface Props {
    dataForm: any
}

const ModalDetalles = ({ dataForm }: Props) => {


    return (
        <Card className="mb-0">
            <CardBody>

                            <Row>
                                <Col md="4" style={ { marginBottom: "10px" } }>

                                </Col>
                                <Col md="4" style={ { marginBottom: "10px" } }>
                                    <ModalDetallesMapa ubicacion={ dataForm?.luminaria?.ubicacion }/>
                                </Col>
                                <Col md="4" className="d-flex justify-content-center align-items-start" style={ { marginBottom: "10px" } }>
                                    <div>
                                        {/* eslint-disable-next-line @next/next/no-img-element */ }
                                        <img
                                            src={ `${ dataForm?.lampara.foto }/preview` }
                                            style={ {
                                                height: "300px"
                                            } }
                                        />
                                    </div>
                                </Col>
                            </Row>
            </CardBody>
        </Card>
    )
}

export default ModalDetalles