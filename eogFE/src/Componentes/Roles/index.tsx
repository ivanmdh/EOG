import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap"
import ReactTable from "@Componentes/Global/ReactTable"
import ModalRol from "@Componentes/Roles/ModalRol"
import AccionesRol from "./AccionesRol"
import ReactTableBusqueda from "@Componentes/Global/ReactTableBusqueda"
import ReactTableBotones from "@Componentes/Global/ReactTableBotones"
import { useModalContext } from "@/src/contexts/ModalContext"
import { useState } from "react"

const Roles = () => {

    const { setModalStart } = useModalContext()
    const [searchTerm, setSearchTerm] = useState("")

    const columnas = [
        { titulo: "Folio", campo: "IDRol", classContent: "text-center" },
        { titulo: "Rol", campo: "nombre" },
        { titulo: "Opciones", cell: (row: any) => <AccionesRol rol={ row }/> }
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
                            <CardHeader className="d-md-block d-none">
                                <div className="d-md-flex d-sm-block align-items-center">
                                    <ReactTableBusqueda 
                                        onSearchChange={handleSearchChange}
                                        placeholder="Buscar roles..."
                                    />
                                    <ReactTableBotones modalStart={() => setModalStart('modalRol', { IDRol: null })}
                                    />
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="table-responsive">
                                    <ReactTable
                                        apiUrl={ "/api/usuarios/roles" }
                                        columnas={ columnas }
                                        searchTerm={ searchTerm }
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ModalRol/>
        </>
    )
}

export default Roles