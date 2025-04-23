import { Card, CardBody, Col, Container, Row, Button } from "reactstrap"
import SelectorPeriodo from "./SelectorPeriodo"
import ListaRoles from "./ListaRoles"
import { useEffect, useState } from "react"
import { cargarResumen, cargarResumenTickets } from "@services/resumen"
import { exportLuminarias, exportDirecciones, downloadBlob } from "@/src/services/descarga"
import Loader from "@Componentes/Global/Loader"
import CommonCardHeader from "@/src/Amero/CommonComponent/CommonCardHeader"
import { Chart } from "react-google-charts"

const Resumen = () => {

    const [periodo, setPeriodo] = useState(1)
    const [data, setData] = useState([])
    const [dataTickets, setDataTickets]: any = useState([])
    const [loading, setLoading] = useState(false)
    const [exportLoading, setExportLoading] = useState<{[key: string]: boolean}>({
        luminarias: false,
        direcciones: false
    })
    // Fechas para filtrado de reportes
    const [fechaInicio] = useState<string | null>(null)
    const [fechaFin] = useState<string | null>(null)

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [periodo])

    useEffect(() => {
        fetchDataTickets()
    }, [])

    const downloadLuminariasReport = async () => {
        try {
            setExportLoading({...exportLoading, luminarias: true});
            const blobData = await exportLuminarias(fechaInicio || undefined, fechaFin || undefined);
            downloadBlob(blobData, 'censo_luminarias.xlsx');
        } catch (error) {
            console.error('Error al descargar el reporte de luminarias:', error);
            // Mostrar mensaje de error al usuario
        } finally {
            setExportLoading({...exportLoading, luminarias: false});
        }
    };

    const downloadDireccionesReport = async () => {
        try {
            setExportLoading({...exportLoading, direcciones: true});
            const blobData = await exportDirecciones(fechaInicio || undefined, fechaFin || undefined);
            downloadBlob(blobData, 'direcciones.xlsx');
        } catch (error) {
            console.error('Error al descargar el reporte de direcciones:', error);
            // Mostrar mensaje de error al usuario
        } finally {
            setExportLoading({...exportLoading, direcciones: false});
        }
    };

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
                {/* Botones de exportación */}
                <Col sm="12" className="mt-4 mb-3">
                    <Row>
                        <Col className="d-flex justify-content-end">
                            <Button 
                                color="success" 
                                className="me-2" 
                                onClick={downloadLuminariasReport}
                                disabled={exportLoading.luminarias}
                            >
                                {exportLoading.luminarias ? (
                                    <><i className="fa fa-spinner fa-spin me-1"></i> Descargando...</>
                                ) : (
                                    <><i className="fas fa-file-excel me-1"></i> Descargar Censo de Luminarias</>
                                )}
                            </Button>
                            <Button 
                                color="info" 
                                onClick={downloadDireccionesReport}
                                disabled={exportLoading.direcciones}
                            >
                                {exportLoading.direcciones ? (
                                    <><i className="fa fa-spinner fa-spin me-1"></i> Descargando...</>
                                ) : (
                                    <><i className="fas fa-file-excel me-1"></i> Descargar Tabla de Direcciones</>
                                )}
                            </Button>
                        </Col>
                    </Row>
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
