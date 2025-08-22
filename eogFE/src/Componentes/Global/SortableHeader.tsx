import React from 'react'

interface SortableHeaderProps {
    titulo: string
    campo: string
    sortBy: string
    sortDirection: 'asc' | 'desc'
    onSort: (campo: string) => void
    className?: string
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
    titulo,
    campo,
    sortBy,
    sortDirection,
    onSort,
    className = ""
}) => {
    const isActive = sortBy === campo
    
    const handleClick = () => {
        onSort(campo)
    }

    const getSortIcon = () => {
        if (!isActive) {
            return <i className="fa-solid fa-sort text-muted ms-1"></i>
        }
        
        return sortDirection === 'asc' 
            ? <i className="fa-solid fa-sort-up text-primary ms-1"></i>
            : <i className="fa-solid fa-sort-down text-primary ms-1"></i>
    }

    return (
        <th 
            className={`sortable-header ${className} ${isActive ? 'active' : ''}`}
            onClick={handleClick}
            style={{
                cursor: 'pointer',
                userSelect: 'none',
                backgroundColor: isActive ? '#f8f9fa' : 'transparent',
                transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
                if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#f1f3f4'
                }
            }}
            onMouseLeave={(e) => {
                if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                }
            }}
        >
            <div className="d-flex align-items-center justify-content-between">
                <span>{titulo}</span>
                {getSortIcon()}
            </div>
        </th>
    )
}

export default SortableHeader
