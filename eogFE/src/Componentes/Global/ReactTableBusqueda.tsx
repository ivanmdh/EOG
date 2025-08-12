import { Form, Input } from "reactstrap"
import { useState, useEffect } from "react"

interface Props {
    onSearchChange: (searchTerm: string) => void
    placeholder?: string
}

const ReactTableBusqueda = ({ onSearchChange, placeholder = "Buscar..." }: Props) => {
    const [searchTerm, setSearchTerm] = useState("")
    
    // Debounce search to avoid too many API calls
    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            onSearchChange(searchTerm)
        }, 500)

        return () => clearTimeout(delayedSearch)
    }, [searchTerm, onSearchChange])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const clearSearch = () => {
        setSearchTerm("")
    }

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Si se hace clic en el contenedor, pero no en el botón de limpiar, enfocar el input
        const target = e.target as HTMLElement
        if (!target.closest('button')) {
            const input = e.currentTarget.querySelector('input')
            if (input) {
                input.focus()
            }
        }
    }

    return (
        <Form className="form-inline basic-form">
            <div 
                className="form-group mb-0 d-flex align-items-center position-relative"
                onClick={handleContainerClick}
                style={{ cursor: 'text' }}
            >
                <i 
                    className="fa-solid fa-magnifying-glass position-absolute" 
                    style={{ 
                        left: '12px', 
                        zIndex: 5, 
                        color: '#6c757d',
                        pointerEvents: 'none',
                        fontSize: '14px'
                    }}
                />
                <Input 
                    type="text" 
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ 
                        paddingLeft: '35px', 
                        paddingRight: searchTerm ? '35px' : '12px',
                        position: 'relative',
                        zIndex: 1,
                        backgroundColor: 'transparent'
                    }}
                    className="form-control"
                    autoComplete="off"
                />
                {searchTerm && (
                    <button
                        type="button"
                        className="btn btn-link position-absolute p-0"
                        style={{ 
                            right: '8px', 
                            zIndex: 6, 
                            color: '#6c757d',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onClick={clearSearch}
                        title="Limpiar búsqueda"
                    >
                        <i className="fa-solid fa-times"></i>
                    </button>
                )}
            </div>
        </Form>
    )

}
export default ReactTableBusqueda
