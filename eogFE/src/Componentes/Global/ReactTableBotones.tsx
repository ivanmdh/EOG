import React from "react"
import { Button } from "reactstrap"
import { PlusSquare } from "react-feather"

const ReactTableBotones = () => {

    return (
        <div className="flex-grow-1 text-end">
            <Button color="primary" className="plus-square">
                <PlusSquare/> { "Agregar" }
            </Button>
        </div>
    )
}

export default ReactTableBotones
