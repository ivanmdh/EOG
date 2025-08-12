import { Card, Col, Pagination, PaginationItem, PaginationLink } from "reactstrap"
import { useModalContext } from "@Context/ModalContext"
import CommonTable from "./CommonReactTable"
import { useEffect, useState } from "react"
import apiService from "@services/apiServices"

interface Props {
    apiUrl: string,
    columnas: any[],
    searchTerm?: string
}

const ReactTable = ({ apiUrl, columnas, searchTerm = "" }: Props) => {

    const { refreshData } = useModalContext()

    const [dataElementos, setDataElementos] = useState<any>([])
    const [totalRows, setTotalRows] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const perPage = 20

    const fetchData = async (page: number, pageSize: number, search: string = "") => {
        setLoading(true)
        try {
            const response = await apiService.post(apiUrl, {
                page: page,
                size: pageSize,
                search: search
            })

            const dataResponse = response?.data || null

            setDataElementos(dataResponse.data || [])
            setTotalRows(dataResponse.total || 0)

        } catch (err) {
            console.error("Error fetching data:", err)
            setDataElementos([])
            setTotalRows(0)
        } finally {
            setLoading(false)
        }
    }

    const totalPages = Math.ceil(totalRows / perPage)

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
            fetchData(page, perPage, searchTerm)
        }
    }

    const renderPaginationItems = () => {
        const items = []
        const maxVisiblePages = 5
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1)
        }

        // Botón Primera página
        if (startPage > 1) {
            items.push(
                <PaginationItem key="first">
                    <PaginationLink onClick={() => handlePageChange(1)}>
                        1
                    </PaginationLink>
                </PaginationItem>
            )
            if (startPage > 2) {
                items.push(
                    <PaginationItem key="dots1" disabled>
                        <PaginationLink>...</PaginationLink>
                    </PaginationItem>
                )
            }
        }

        // Páginas visibles
        for (let page = startPage; page <= endPage; page++) {
            items.push(
                <PaginationItem key={page} active={page === currentPage}>
                    <PaginationLink onClick={() => handlePageChange(page)}>
                        {page}
                    </PaginationLink>
                </PaginationItem>
            )
        }

        // Última página
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                items.push(
                    <PaginationItem key="dots2" disabled>
                        <PaginationLink>...</PaginationLink>
                    </PaginationItem>
                )
            }
            items.push(
                <PaginationItem key="last">
                    <PaginationLink onClick={() => handlePageChange(totalPages)}>
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            )
        }

        return items
    }

    useEffect(() => {
        setCurrentPage(1)
        fetchData(1, perPage, searchTerm)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshData, searchTerm])

    return (
        <Col sm="12">
            <Card className="hoverable-table">
                <CommonTable tableClass="signal-table" headData={ columnas } hover>
                    {loading ? (
                        <tr>
                            <td colSpan={columnas.length} className="text-center">
                                <div className="d-flex justify-content-center align-items-center py-4">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ) : dataElementos.length > 0 ? (
                        dataElementos.map((data: any, key: number) => (
                            <tr key={ key }>
                                { columnas.map((columna: any, index: number) => (
                                    <td key={ index } className={ columna.classContent ?? "" }>
                                        { columna.cell ? columna.cell(data) : data[columna.campo] }
                                    </td>
                                )) }
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columnas.length} className="text-center py-4">
                                <div className="text-muted">
                                    <i className="fa-solid fa-search me-2"></i>
                                    No se encontraron resultados
                                </div>
                            </td>
                        </tr>
                    )}
                </CommonTable>
                
                {/* Información de paginación y controles */}
                {totalRows > 0 && (
                    <div className="d-flex justify-content-between align-items-center p-3 border-top">
                        <div className="text-muted small">
                            Mostrando {((currentPage - 1) * perPage) + 1} - {Math.min(currentPage * perPage, totalRows)} de {totalRows} registros
                        </div>
                        
                        {totalPages > 1 && (
                            <div className="d-flex align-items-center">
                                <Pagination className="mb-0" size="sm">
                                    <PaginationItem disabled={currentPage === 1}>
                                        <PaginationLink 
                                            previous 
                                            onClick={() => handlePageChange(currentPage - 1)}
                                        />
                                    </PaginationItem>
                                    
                                    {renderPaginationItems()}
                                    
                                    <PaginationItem disabled={currentPage === totalPages}>
                                        <PaginationLink 
                                            next 
                                            onClick={() => handlePageChange(currentPage + 1)}
                                        />
                                    </PaginationItem>
                                </Pagination>
                            </div>
                        )}
                    </div>
                )}
            </Card>
        </Col>
    )
}

export default ReactTable
