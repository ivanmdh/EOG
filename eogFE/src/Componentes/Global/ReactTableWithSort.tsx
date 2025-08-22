import { Card, Col, Pagination, PaginationItem, PaginationLink } from "reactstrap"
import { useModalContext } from "@Context/ModalContext"
import { useEffect, useState, useCallback } from "react"
import apiService from "@services/apiServices"
import SortableHeader from "./SortableHeader"

interface Columna {
    titulo: string
    campo: string
    classContent?: string
    sortable?: boolean
    cell?: (row: any) => React.ReactNode
}

interface Props {
    apiUrl: string
    columnas: Columna[]
    searchTerm?: string
}

type SortDirection = 'asc' | 'desc'

const ReactTableWithSort = ({ apiUrl, columnas, searchTerm = "" }: Props) => {
    const { refreshData } = useModalContext()
    
    const [dataElementos, setDataElementos] = useState<any>([])
    const [totalRows, setTotalRows] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [sortBy, setSortBy] = useState("")
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
    
    const perPage = 20

    const fetchData = useCallback(async (
        page: number, 
        pageSize: number, 
        search: string = "", 
        sort_by: string = "",
        sort_direction: SortDirection = 'desc'
    ) => {
        setLoading(true)
        try {
            const response = await apiService.post(apiUrl, {
                page: page,
                size: pageSize,
                search: search,
                sort_by: sort_by,
                sort_direction: sort_direction
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
    }, [apiUrl])

    const handleSort = (campo: string) => {
        let newDirection: SortDirection = 'desc'
        
        if (sortBy === campo) {
            // Si ya estamos ordenando por esta columna, cambiar dirección
            newDirection = sortDirection === 'asc' ? 'desc' : 'asc'
        } else {
            // Nueva columna, empezar con descendente
            newDirection = 'desc'
        }
        
        setSortBy(campo)
        setSortDirection(newDirection)
        setCurrentPage(1)
        fetchData(1, perPage, searchTerm, campo, newDirection)
    }

    const totalPages = Math.ceil(totalRows / perPage)

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
            fetchData(page, perPage, searchTerm, sortBy, sortDirection)
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
                    <PaginationLink 
                        onClick={() => handlePageChange(1)}
                        style={{
                            backgroundColor: '#fff',
                            borderColor: '#dee2e6',
                            color: '#007bff',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#e9ecef'
                            e.currentTarget.style.borderColor = '#adb5bd'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#fff'
                            e.currentTarget.style.borderColor = '#dee2e6'
                        }}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            )
            if (startPage > 2) {
                items.push(
                    <PaginationItem key="dots1" disabled>
                        <PaginationLink style={{
                            backgroundColor: '#f8f9fa',
                            borderColor: '#dee2e6',
                            color: '#6c757d',
                            cursor: 'default'
                        }}>...</PaginationLink>
                    </PaginationItem>
                )
            }
        }

        // Páginas visibles
        for (let page = startPage; page <= endPage; page++) {
            const isActive = page === currentPage
            items.push(
                <PaginationItem key={page} active={isActive}>
                    <PaginationLink 
                        onClick={() => handlePageChange(page)}
                        style={{
                            backgroundColor: isActive ? '#007bff' : '#fff',
                            borderColor: isActive ? '#007bff' : '#dee2e6',
                            color: isActive ? '#fff' : '#007bff',
                            cursor: 'pointer',
                            fontWeight: isActive ? 'bold' : 'normal'
                        }}
                        onMouseEnter={(e) => {
                            if (!isActive) {
                                e.currentTarget.style.backgroundColor = '#e9ecef'
                                e.currentTarget.style.borderColor = '#adb5bd'
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive) {
                                e.currentTarget.style.backgroundColor = '#fff'
                                e.currentTarget.style.borderColor = '#dee2e6'
                            }
                        }}
                    >
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
                        <PaginationLink style={{
                            backgroundColor: '#f8f9fa',
                            borderColor: '#dee2e6',
                            color: '#6c757d',
                            cursor: 'default'
                        }}>...</PaginationLink>
                    </PaginationItem>
                )
            }
            items.push(
                <PaginationItem key="last">
                    <PaginationLink 
                        onClick={() => handlePageChange(totalPages)}
                        style={{
                            backgroundColor: '#fff',
                            borderColor: '#dee2e6',
                            color: '#007bff',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#e9ecef'
                            e.currentTarget.style.borderColor = '#adb5bd'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#fff'
                            e.currentTarget.style.borderColor = '#dee2e6'
                        }}
                    >
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            )
        }

        return items
    }

    // Carga inicial - solo una vez
    useEffect(() => {
        fetchData(1, perPage, "", "", 'desc')
    }, [fetchData]) // fetchData es estable gracias a useCallback

    useEffect(() => {
        setCurrentPage(1)
        // Mantener el sorting actual cuando cambia searchTerm o refreshData
        fetchData(1, perPage, searchTerm, sortBy, sortDirection)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshData, searchTerm])

    return (
        <Col sm="12">
            <Card className="hoverable-table">
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead className="table-light">
                            <tr>
                                {columnas.map((columna, index) => (
                                    columna.sortable !== false ? (
                                        <SortableHeader
                                            key={index}
                                            titulo={columna.titulo}
                                            campo={columna.campo}
                                            sortBy={sortBy}
                                            sortDirection={sortDirection}
                                            onSort={handleSort}
                                            className={columna.classContent}
                                        />
                                    ) : (
                                        <th key={index} className={columna.classContent}>
                                            {columna.titulo}
                                        </th>
                                    )
                                ))}
                            </tr>
                        </thead>
                        <tbody>
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
                                    <tr key={key}>
                                        {columnas.map((columna: any, index: number) => (
                                            <td key={index} className={columna.classContent ?? ""}>
                                                {columna.cell ? columna.cell(data) : data[columna.campo]}
                                            </td>
                                        ))}
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
                        </tbody>
                    </table>
                </div>
                
                {/* Información de paginación y controles */}
                {totalRows > 0 && (
                    <div className="d-flex justify-content-between align-items-center p-3 border-top bg-light">
                        <div className="text-muted small">
                            <i className="fa-solid fa-info-circle me-1"></i>
                            Mostrando <strong>{((currentPage - 1) * perPage) + 1}</strong> - <strong>{Math.min(currentPage * perPage, totalRows)}</strong> de <strong>{totalRows}</strong> registros
                            {sortBy && (
                                <span className="ms-2">
                                    | Ordenado por <strong>{columnas.find(c => c.campo === sortBy)?.titulo || sortBy}</strong> 
                                    <i className={`fa-solid fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                </span>
                            )}
                        </div>
                        
                        {totalPages > 1 && (
                            <div className="d-flex align-items-center">
                                <span className="text-muted small me-3">
                                    Página {currentPage} de {totalPages}
                                </span>
                                <Pagination className="mb-0" size="sm">
                                    <PaginationItem disabled={currentPage === 1}>
                                        <PaginationLink 
                                            previous 
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            style={{
                                                backgroundColor: currentPage === 1 ? '#e9ecef' : '#fff',
                                                borderColor: '#dee2e6',
                                                color: currentPage === 1 ? '#6c757d' : '#007bff',
                                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                                            }}
                                        />
                                    </PaginationItem>
                                    
                                    {renderPaginationItems()}
                                    
                                    <PaginationItem disabled={currentPage === totalPages}>
                                        <PaginationLink 
                                            next 
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            style={{
                                                backgroundColor: currentPage === totalPages ? '#e9ecef' : '#fff',
                                                borderColor: '#dee2e6',
                                                color: currentPage === totalPages ? '#6c757d' : '#007bff',
                                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                                            }}
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

export default ReactTableWithSort
