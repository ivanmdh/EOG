import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap"
import ReactTable from "@Componentes/Global/ReactTable"
import AccionesLuminaria from "@Componentes/Luminarias/AccionesLuminaria"
import ReactTableBotones from "@Componentes/Global/ReactTableBotones"
import MapaLuminarias from "@Componentes/Luminarias/MapaLuminarias"
import ModalLuminaria from "./ModalLuminaria"

const Luminarias = () => {

    const columnas = [
        { titulo: "Folio", campo: "IDLuminaria", classContent: "text-center" },
        { titulo: "Fecha de Alta", campo: "fecha_alta" },
        { titulo: "Opciones", cell: (row: any) => <AccionesLuminaria luminaria={ row }/> }
    ]

    return (
        <>
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader className="d-md-block">
                                <MapaLuminarias/>
                                <div className="d-md-flex d-sm-block align-items-center mt-3">
                                    <ReactTableBotones modal='modalLuminaria' />
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="table-responsive">
                                    <ReactTable
                                        apiUrl={ "/api/luminarias" }
                                        columnas={ columnas }
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ModalLuminaria/>
        </>
    )
}

export default Luminarias