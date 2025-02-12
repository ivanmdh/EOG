import { Card, CardBody, Col, Container, Row } from "reactstrap"
import SelectorPeriodo from "./SelectorPeriodo"
import ListaRoles from "./ListaRoles"
import { useEffect, useState } from "react"
import { cargarResumen, cargarResumenTickets } from "@services/resumen"
import Loader from "@Componentes/Global/Loader"
import CommonCardHeader from "@/src/Amero/CommonComponent/CommonCardHeader"
import { Chart } from "react-google-charts"

const Resumen = () => {

    const [periodo, setPeriodo] = useState(1)
    const [data, setData] = useState([])
    const [dataTickets, setDataTickets]: any = useState([])
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

    const fetchDataTickets = async () => {
        setLoading(true)
        await cargarResumenTickets()
            .then((response: any) => {
                setDataTickets(response.data)
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

    useEffect(() => {
        fetchDataTickets()
    }, [])

    const dataGraficoEstado = [
        ["Estado", "Cantidad"],
        ["Abiertos", dataTickets?.tickets_abiertos ?? 0],
        ["Cerrados", dataTickets?.tickets_cerrados ?? 0],

    ]
    const optionGraficoEstado = {
        title: "Tickets por estado",
        colors: ["#3eb95f", "#ea9200"],
    }

    const dataGraficoTipoReparacion = [
        ["Tipo", "Cantidad"],
        ["Reconexion", dataTickets?.tickets_reconexion ?? 0],
        ["Cambio", dataTickets?.tickets_cambio ?? 0],
    ]
    const optionGraficoTipoReparacion = {
        title: "Tickets por tipo de reparacion",
        colors: ["#3eb95f", "#ea9200"],
    }

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
                <Col sm="12">
                    <Card>
                        <CommonCardHeader title="Estado global de tickets"/>
                        <CardBody className={ `chart-block` }>
                            <Row>
                                <Col sm="6" className={ `chart-overflow` }>
                                    <div className={ `chart-overflow` }>
                                        <Chart width="100%" height="300" chartType="PieChart" loader={ <div>{ "Cargando grafico" }</div> } data={ dataGraficoEstado } options={ optionGraficoEstado }/>
                                    </div>
                                </Col>
                                <Col sm="6" className={ `chart-overflow` }>
                                    <div className={ `chart-overflow` }>
                                        <Chart width="100%" height="300" chartType="PieChart" loader={ <div>{ "Cargando grafico" }</div> } data={ dataGraficoTipoReparacion }
                                               options={ optionGraficoTipoReparacion }/>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Resumen