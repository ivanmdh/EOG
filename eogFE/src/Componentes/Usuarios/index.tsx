import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap"
import ReactTable from "@Componentes/Global/ReactTable"
import AccionesUsuario from "@Componentes/Usuarios/AccionesUsuario"
import ModalUsuario from "@Componentes/Usuarios/ModalUsuario"
import ReactTableBusqueda from "../Global/ReactTableBusqueda"
import ReactTableBotones from "../Global/ReactTableBotones"
import { useModalContext } from "@Context/ModalContext"
import { useState } from "react"

const Usuarios = () => {

    const { setModalStart } = useModalContext()
    const [searchTerm, setSearchTerm] = useState("")

    const columnas = [
        { titulo: "Folio", campo: "IDUsuario", classContent: "text-center" },
        { titulo: "Nombre", campo: "nombre" },
        { titulo: "Apellido", campo: "apellido" },
        { titulo: "Rol", campo: "rol_nombre" },
        { titulo: "Email", campo: "email" },
        { titulo: "Opciones", cell: (row: any) => <AccionesUsuario usuario={ row }/> }
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
                                        placeholder="Buscar usuarios..."
                                    />
                                    <ReactTableBotones modalStart={ () => setModalStart("modalUsuario", { IDUsuario: null }) }/>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="table-responsive">
                                    <ReactTable
                                        apiUrl={ "/api/usuarios" }
                                        columnas={ columnas }
                                        searchTerm={ searchTerm }
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ModalUsuario/>
        </>
    )
}

export default Usuarios