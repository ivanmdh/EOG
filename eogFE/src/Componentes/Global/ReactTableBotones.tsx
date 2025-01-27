import React from "react"
import { Button } from "reactstrap"
import { PlusSquare } from "react-feather"

interface Props {
    modalStart: any
}

const ReactTableBotones = ({ modalStart }: Props) => {

    return (
        <div className="flex-grow-1 text-end">
            <Button color="primary" className="plus-square" onClick={() => modalStart()}>
                <PlusSquare/> { "Agregar" }
            </Button>
        </div>
    )
}

export default ReactTableBotones
