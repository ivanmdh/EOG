import { useModalContext } from "@Context/ModalContext"
import Swal from "sweetalert2"
import { eliminarTicket } from "@services/tickets"

interface Props {
    ticket: any
}

const AccionesTicket = ({ ticket }: Props) => {

    const { setModalStart, updateData } = useModalContext()

    const title = "Estás seguro de eliminar este ticket?"
    const text = "No podrás revertir esto!"
    const type = "warning"


    const showAlert = (ticket: any) => {
        Swal.fire({ title, text, icon: "warning", showCancelButton: true, cancelButtonColor: "red", confirmButtonText: "Sí, eliminarlo!", cancelButtonText: "Cancelar" }).then((result) => {
            if (result.isConfirmed && type === "warning") {
                eliminarTicket(ticket)
                    .then(() => {
                        updateData()
                        Swal.fire({ title: "Eliminado!", text: "El ticket ha sido eliminado.", icon: "success", confirmButtonText: "Aceptar" })
                    })
                    .catch(() => {
                        Swal.fire({ title: "Error!", text: "No se pudo eliminar el ticket.", icon: "error", confirmButtonText: "Aceptar" })
                    })
            }
        })
    }

    return(
        <ul className="action d-flex justify-content-center">
            <li className="edit" style={ { cursor: "pointer" } }>
                <i
                    className="icon-pencil-alt"
                    onClick={ () => {
                        setModalStart('modalTicket', { IDTicket: ticket.IDTicket })
                    }}
                />
            </li>
            <li className="delete" style={ { cursor: "pointer" } }>
                <a onClick={ () => showAlert({ IDTicket: ticket.IDTicket }) }>
                    <i className="icon-trash" />
                </a>
            </li>
        </ul>

    )
}

export default AccionesTicket