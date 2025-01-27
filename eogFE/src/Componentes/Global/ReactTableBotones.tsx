import React from "react"
import { Button } from "reactstrap"
import { PlusSquare } from "react-feather"
import { useModalContext } from "@Context/ModalContext"

interface Props {
    modal: string
}

const ReactTableBotones = ({ modal }: Props) => {

    const { toggleModal } = useModalContext()

    return (
        <div className="flex-grow-1 text-end">
            <Button color="primary" className="plus-square" onClick={() => toggleModal(modal)}>
                <PlusSquare/> { "Agregar" }
            </Button>
        </div>
    )
}

export default ReactTableBotones
