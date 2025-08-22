import React, { useState } from 'react'
import { 
    Input, 
    InputGroup, 
    Button, 
    Dropdown, 
    DropdownToggle, 
    DropdownMenu,
    Badge 
} from 'reactstrap'

interface Props {
    onSearchChange: (searchTerm: string) => void
    placeholder?: string
    showHelp?: boolean
}

const SmartSearchInput: React.FC<Props> = ({ 
    onSearchChange, 
    placeholder = "Buscar...",
    showHelp = true 
}) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const searchExamples = [
        { label: "Por folio", examples: ["TC00015", "15", "00015"], description: "Busca por número de ticket/luminaria" },
        { label: "Por fecha", examples: ["25/07/2025", "07/2025", "25/07"], description: "Fecha completa, mes/año o día/mes" },
        { label: "Por estado", examples: ["nuevo", "proceso", "cerrado", "1", "2"], description: "Por texto o número de estado" },
        { label: "Búsqueda libre", examples: ["descripción", "usuario", "dirección"], description: "Busca en todos los campos de texto" }
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchTerm(value)
        onSearchChange(value)
    }

    const handleExampleClick = (example: string) => {
        setSearchTerm(example)
        onSearchChange(example)
        setDropdownOpen(false)
    }

    const clearSearch = () => {
        setSearchTerm("")
        onSearchChange("")
    }

    return (
        <div className="position-relative">
            <InputGroup>
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="form-control"
                />
                {searchTerm && (
                    <Button 
                        color="outline-secondary" 
                        onClick={clearSearch}
                        title="Limpiar búsqueda"
                    >
                        <i className="fa-solid fa-times"></i>
                    </Button>
                )}
                {showHelp && (
                    <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                        <DropdownToggle 
                            color="outline-info" 
                            caret
                            title="Ayuda de búsqueda"
                        >
                            <i className="fa-solid fa-question-circle"></i>
                        </DropdownToggle>
                        <DropdownMenu end style={{ minWidth: '300px', maxWidth: '400px' }}>
                            <div className="px-3 py-2">
                                <h6 className="dropdown-header d-flex align-items-center">
                                    <i className="fa-solid fa-lightbulb me-2 text-warning"></i>
                                    Tipos de búsqueda
                                </h6>
                                {searchExamples.map((item, index) => (
                                    <div key={index} className="mb-3">
                                        <div className="fw-bold text-primary mb-1">{item.label}</div>
                                        <div className="small text-muted mb-2">{item.description}</div>
                                        <div className="d-flex flex-wrap gap-1">
                                            {item.examples.map((example, exIndex) => (
                                                <Badge
                                                    key={exIndex}
                                                    color="light"
                                                    className="text-dark cursor-pointer"
                                                    onClick={() => handleExampleClick(example)}
                                                    style={{ 
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#e3f2fd'
                                                        e.currentTarget.style.transform = 'scale(1.05)'
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#f8f9fa'
                                                        e.currentTarget.style.transform = 'scale(1)'
                                                    }}
                                                >
                                                    {example}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <hr className="my-2" />
                                <div className="small text-muted">
                                    <i className="fa-solid fa-info-circle me-1"></i>
                                    Haz clic en cualquier ejemplo para probarlo
                                </div>
                            </div>
                        </DropdownMenu>
                    </Dropdown>
                )}
            </InputGroup>
            
            {/* Indicadores de búsqueda activa */}
            {searchTerm && (
                <div className="position-absolute" style={{ top: '100%', left: 0, zIndex: 1000 }}>
                    <div className="mt-1">
                        <Badge color="success" className="me-2">
                            <i className="fa-solid fa-search me-1"></i>
                            Buscando: &ldquo;{searchTerm}&rdquo;
                        </Badge>
                        {/* Detectar tipo de búsqueda y mostrar indicador */}
                        {/^(TC)?0*\d+$/i.test(searchTerm) && (
                            <Badge color="info" className="me-2">
                                <i className="fa-solid fa-hashtag me-1"></i>
                                Búsqueda por folio
                            </Badge>
                        )}
                        {/^\d{1,2}\/\d{1,2}(\/\d{2,4})?$/.test(searchTerm) && (
                            <Badge color="warning" className="me-2">
                                <i className="fa-solid fa-calendar me-1"></i>
                                Búsqueda por fecha
                            </Badge>
                        )}
                        {['nuevo', 'proceso', 'cerrado', 'finalizado'].some(estado => 
                            searchTerm.toLowerCase().includes(estado)) && (
                            <Badge color="primary" className="me-2">
                                <i className="fa-solid fa-flag me-1"></i>
                                Búsqueda por estado
                            </Badge>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SmartSearchInput
