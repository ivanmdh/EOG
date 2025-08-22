import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap"
import ReactTableWithSort from "@Componentes/Global/ReactTableWithSort"
import AccionesLuminaria from "@Componentes/Luminarias/AccionesLuminaria"
import ReactTableBotones from "@Componentes/Global/ReactTableBotones"
import ReactTableBusqueda from "@Componentes/Global/ReactTableBusqueda"
import MapaLuminarias from "@Componentes/Luminarias/MapaLuminarias"
import ModalLuminaria from "./ModalLuminaria"
import { useModalContext } from "@Context/ModalContext"
import { useState } from "react"

const Luminarias = () => {

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
            titulo: "Fecha de Alta", 
            campo: "fecha_alta",
            sortable: true 
        },
        { 
            titulo: "Usuario", 
            campo: "usuario",
            sortable: true 
        },
        { 
            titulo: "Dirección", 
            campo: "direccion",
            sortable: true 
        },
        { 
            titulo: "Opciones", 
            campo: "opciones",
            sortable: false,
            cell: (row: any) => <AccionesLuminaria luminaria={ row }/> 
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
                                <MapaLuminarias/>
                                <div className="d-md-flex d-sm-block align-items-center justify-content-between mt-3">
                                    <div className="flex-grow-1 me-3">
                                        <ReactTableBusqueda 
                                            onSearchChange={handleSearchChange}
                                            placeholder="Buscar luminarias por folio, fecha, usuario, dirección..."
                                        />
                                    </div>
                                    <ReactTableBotones modalStart={() => setModalStart('modalLuminaria', { IDLuminaria: null })}/>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="table-responsive">
                                    <ReactTableWithSort
                                        apiUrl={ "/api/luminarias" }
                                        columnas={ columnas }
                                        searchTerm={ searchTerm }
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