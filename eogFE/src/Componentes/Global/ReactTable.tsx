import { Card, Col } from "reactstrap"
import { useModalContext } from "@Context/ModalContext"
import CommonTable from "./CommonReactTable"
import { useEffect, useState } from "react"
import apiService from "@services/apiServices"

interface Props {
    apiUrl: string,
    columnas: any[]
}

const ReactTable = ({ apiUrl, columnas }: Props) => {

    const { refreshData } = useModalContext()

    const [dataElementos, setDataElementos] = useState<any>([])
    const [totalRows, setTotalRows] = useState(0)
    const perPage = 20

    const fetchData = async (page: any, pageSize: any) => {
        try {
            const response = await apiService.post(apiUrl, {
                page: page,
                size: pageSize
            })

            const dataResponse = response?.data || null

            setDataElementos(dataResponse.data)
            setTotalRows(response.data.total)
            console.log(totalRows)

        } catch (err) {
            console.error("Error fetching data:", err)
        } finally {
            console.log("Data fetched")
        }
    }

    useEffect(() => {
        fetchData(1, perPage)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshData])

    return (
        <Col sm="12">
            <Card className="hoverable-table">
                <CommonTable tableClass="signal-table" headData={ columnas } hover>
                    { dataElementos.map((data: any, key: number) => (
                        <tr key={ key }>
                            { columnas.map((columna: any, index: number) => (
                                <td key={ index } className={ columna.classContent ?? "" }>{ columna.cell ? columna.cell(data) : data[columna.campo] }</td>
                            )) }
                        </tr>
                    )) }
                </CommonTable>
            </Card>
        </Col>
    )
}

export default ReactTable
