import { Form, Input } from "reactstrap"

const ReactTableBusqueda = () => {

    return (
        <Form className="form-inline basic-form">
            <div className="form-group mb-0 d-flex align-items-center">
                <i className="fa-solid fa-magnifying-glass"/>
                <Input type="text" placeholder="Buscar..." plaintext/>
            </div>
        </Form>
    )

}
export default ReactTableBusqueda
