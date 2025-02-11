import { Col, Container, Row } from "reactstrap"
import SelectorPeriodo from "./SelectorPeriodo"
import ListaRoles from "./ListaRoles"
import { useEffect, useState } from "react"
import { cargarResumen } from "@services/resumen"
import Loader from "@Componentes/Global/Loader"

const Resumen = () => {

    const [periodo, setPeriodo] = useState(1)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        await cargarResumen({ periodo: periodo })
            .then((response: any) => {
                setData(response.data)
            })
            .catch((error: any) => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [periodo])

    return (
        <Container fluid>
            <Row className="project-cards">
                <Col md="12" className="project-list">
                    <SelectorPeriodo periodo={ periodo } setPeriodo={ setPeriodo }/>
                </Col>
                <Col sm="12">
                    {
                        loading
                        ? <Loader/>
                        : <ListaRoles data={ data }/>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Resumen