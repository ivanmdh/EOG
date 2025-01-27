import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap"
import ReactTable from "@Componentes/Global/ReactTable"
import AccionesTicket from "@Componentes/Tickets/AccionesTicket"
import ReactTableBusqueda from "@Componentes/Global/ReactTableBusqueda"
import ReactTableBotones from "@Componentes/Global/ReactTableBotones"
import { useModalContext } from "@Context/ModalContext"
import ModalTicket from "./ModalTicket"

const Tickets = () => {

    const { setModalStart } = useModalContext()

    const columnas = [
        { titulo: "Folio", campo: "folio", classContent: "text-center" },
        { titulo: "Asunto", campo: "asunto" },
        { titulo: "Estado", campo: "estado" },
        { titulo: "Opciones", cell: (row: any) => <AccionesTicket ticket={ row }/> }
    ]

    return (
        <>
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader className="d-md-block">
                                <div className="d-md-flex d-sm-block align-items-center">
                                    <ReactTableBusqueda/>
                                    <ReactTableBotones modalStart={ () => setModalStart("modalTicket", { IDTicket: null }) }/>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="table-responsive">
                                    <ReactTable
                                        apiUrl={ "/api/tickets" }
                                        columnas={ columnas }
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ModalTicket/>
        </>
    )
}

export default Tickets