import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap"
import ReactTable from "@Componentes/Global/ReactTable"
import AccionesTicket from "@Componentes/Tickets/AccionesTicket"
import ReactTableBusqueda from "@Componentes/Global/ReactTableBusqueda"
import ReactTableBotones from "@Componentes/Global/ReactTableBotones"
import { useModalContext } from "@Context/ModalContext"
import ModalTicket from "./ModalTicket"
import { useState } from "react"

const Tickets = () => {

    const { setModalStart } = useModalContext()
    const [searchTerm, setSearchTerm] = useState("")

    const columnas = [
        { titulo: "Folio", campo: "folio", classContent: "text-center" },
        { titulo: "Fecha", campo: "fecha", classContent: "text-center" },
        { titulo: "Descripcion", campo: "descripcion" },
        { titulo: "Estado", campo: "estado", classContent: "text-center" },
        { titulo: "Usuario", campo: "usuario" },
        { titulo: "Opciones", cell: (row: any) => <AccionesTicket ticket={ row }/> }
    ]

    const handleSearchChange = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm)
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader className="d-md-block">
                                <div className="d-md-flex d-sm-block align-items-center">
                                    <ReactTableBusqueda 
                                        onSearchChange={handleSearchChange}
                                        placeholder="Buscar tickets..."
                                    />
                                    <ReactTableBotones modalStart={ () => setModalStart("modalTicket", { IDTicket: null }) }/>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="table-responsive">
                                    <ReactTable
                                        apiUrl={ "/api/tickets" }
                                        columnas={ columnas }
                                        searchTerm={ searchTerm }
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