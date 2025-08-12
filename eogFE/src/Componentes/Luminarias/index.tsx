import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap"
import ReactTable from "@Componentes/Global/ReactTable"
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
        { titulo: "Folio", campo: "folio", classContent: "text-center" },
        { titulo: "Fecha de Alta", campo: "fecha_alta" },
        { titulo: "Usuario", campo: "usuario" },
        { titulo: "Opciones", cell: (row: any) => <AccionesLuminaria luminaria={ row }/> }
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
                                <div className="d-md-flex d-sm-block align-items-center mt-3">
                                    <ReactTableBusqueda 
                                        onSearchChange={handleSearchChange}
                                        placeholder="Buscar luminarias..."
                                    />
                                    <ReactTableBotones modalStart={() => setModalStart('modalLuminaria', { IDLuminaria: null })}/>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="table-responsive">
                                    <ReactTable
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