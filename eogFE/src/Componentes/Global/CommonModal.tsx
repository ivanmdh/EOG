import { CommonModalProps } from "@Types/UiKitsType"
import React from "react"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"

const CommonModal: React.FC<CommonModalProps> = ({ modalData, children }) => {
    return (
        <Modal className={ modalData.class } isOpen={ modalData.isOpen } toggle={ modalData.toggler } centered={ modalData.center } size={ modalData.size }>
            { modalData.header && <ModalHeader toggle={ modalData.toggler }>{ modalData.title }</ModalHeader> }
            <ModalBody className={ modalData.bodyClass }>{ children }</ModalBody>
            { modalData.footer && (
                <ModalFooter>
                    <Button color="secondary" onClick={ modalData.toggler }>
                        { "Close" }
                    </Button>
                    <Button color="primary" onClick={ modalData.toggler }>
                        { modalData.button ? modalData.button : "Save changes" }
                    </Button>
                </ModalFooter>
            ) }
        </Modal>
    )
}
export default CommonModal
