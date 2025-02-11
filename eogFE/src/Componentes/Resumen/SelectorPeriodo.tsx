import { useState } from "react"
import { ButtonGroup, Card, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from "reactstrap"

interface Props {
    periodo: number,
    setPeriodo: any
}

const SelectorPeriodo = ({ periodo, setPeriodo }: Props) => {

    const [open, setOpen] = useState(false)
    const toggle = () => setOpen(!open)

    const periodos = [
        { id: 1, nombre: "Hoy" },
        { id: 2, nombre: "Ayer" },
        { id: 3, nombre: "Esta Semana" },
        { id: 4, nombre: "Semana Anterior" },
        { id: 5, nombre: "Este Mes" },
        { id: 6, nombre: "Mes Anterior" },
    ]

    return (
        <Card>
            <Row>
                <Col md="12" className="d-flex justify-content-end">
                    <ButtonGroup>
                        <Dropdown isOpen={ open } toggle={ toggle } direction="down">
                            <DropdownToggle color="primary" caret style={{ minWidth: '200px' }}>
                                { periodos.find((item) => item.id === periodo)?.nombre }
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-block">
                                { periodos.map((item, index) => (
                                    <DropdownItem
                                        key={ index }
                                        onClick={ () => setPeriodo(item.id) }
                                    >
                                        { item.nombre }
                                    </DropdownItem>
                                )) }
                            </DropdownMenu>
                        </Dropdown>
                    </ButtonGroup>
                </Col>
            </Row>
        </Card>
    )
}

export default SelectorPeriodo