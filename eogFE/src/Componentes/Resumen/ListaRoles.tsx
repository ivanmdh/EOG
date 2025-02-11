import { Col, Row } from "reactstrap"

interface Props {
    data: any
}

const ListaRoles = ({ data }: Props) => {
    return (
        <Row>
            {
                data.map((item: any, index: number) => (
                    <Col xxl="4" md="6" key={ index }>
                        <div className={ `project-box font-dark bg-light-success` }>
                            <h5 className={ `f-w-500 mb-2 text-success` }>{ item.rol }</h5>
                            <Row className="details">
                                <Col xs="6"><span>Luminarias Nuevas </span></Col>
                                <Col xs="6" className={ `text-${ item.luminarias > 0 ? "success" : "danger" }` }>{ item.luminarias }</Col>
                                <Col xs="6"><span>Tickets Creados</span></Col>
                                <Col xs="6" className={ `text-${ item.tickets_creados > 0 ? "success" : "danger" }` }>{ item.tickets_creados }</Col>
                                <Col xs="6"><span>Tickets Atendidos</span></Col>
                                <Col xs="6" className={ `text-${ item.tickets_cerrados > 0 ? "success" : "danger" }` }>{ item.tickets_cerrados }</Col>
                            </Row>
                        </div>
                    </Col>
                ))
            }
        </Row>
    )
}

export default ListaRoles