import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap"
import ReactTableWithSort from "@Componentes/Global/ReactTableWithSort"
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
        { 
            titulo: "Folio", 
            campo: "folio", 
            classContent: "text-center",
            sortable: true 
        },
        { 
            titulo: "Fecha", 
            campo: "fecha", 
            classContent: "text-center",
            sortable: true 
        },
        { 
            titulo: "Descripción", 
            campo: "descripcion",
            sortable: true 
        },
        { 
            titulo: "Estado", 
            campo: "estado", 
            classContent: "text-center",
            sortable: true 
        },
        { 
            titulo: "Usuario", 
            campo: "usuario",
            sortable: true 
        },
        { 
            titulo: "Opciones", 
            campo: "opciones",
            sortable: false,
            cell: (row: any) => <AccionesTicket ticket={ row }/> 
        }
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
                                <div className="d-md-flex d-sm-block align-items-center justify-content-between">
                                    <div className="flex-grow-1 me-3">
                                        <ReactTableBusqueda 
                                            onSearchChange={handleSearchChange}
                                            placeholder="Buscar tickets por folio, fecha, estado, descripción..."
                                        />
                                    </div>
                                    <ReactTableBotones modalStart={ () => setModalStart("modalTicket", { IDTicket: null }) }/>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="table-responsive">
                                    <ReactTableWithSort
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