import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap"
import ReactTable from "@Componentes/Global/ReactTable"
import AccionesUsuario from "@Componentes/Usuarios/AccionesUsuario"
import ModalUsuario from "@Componentes/Usuarios/ModalUsuario"
import { SearchBar } from "@/src/Amero/Layout/Header/HeaderRight/ResponsiveSearch/SearchBar"
import ReactTableBusqueda from "../Global/ReactTableBusqueda"
import ReactTableBotones from "../Global/ReactTableBotones"

const Usuarios = () => {

    const columnas = [
        { titulo: "Folio", campo: "IDUsuario", classContent: "text-center" },
        { titulo: "Nombre", campo: "nombre" },
        { titulo: "Apellido", campo: "apellido" },
        { titulo: "Email", campo: "email" },
        { titulo: "Opciones", cell: (row: any) => <AccionesUsuario usuario={ row }/> }
    ]

    return (
        <>
            <Container fluid>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader className="d-md-block">
                                <div className="d-md-flex d-sm-block align-items-center">
                                    <ReactTableBusqueda />
                                    <ReactTableBotones />
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div className="table-responsive">
                                    <ReactTable
                                        apiUrl={ "/api/usuarios" }
                                        columnas={ columnas }
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