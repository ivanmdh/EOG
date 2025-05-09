import { useModalContext } from "@Context/ModalContext"
import Swal from "sweetalert2"
import { eliminarLuminaria } from "@services/luminarias"

interface Props {
    luminaria: any
}

const AccionesLuminaria = ({ luminaria }: Props) => {

    const { updateData } = useModalContext()

    const title = "Estás seguro de eliminar esta luminaria?"
    const text = "No podrás revertir esto!"
    const type = "warning"

    const showAlert = (rol: any) => {
        Swal.fire({ title, text, icon: "warning", showCancelButton: true, cancelButtonColor: "red", confirmButtonText: "Sí, eliminarla!", cancelButtonText: "Cancelar" }).then((result) => {
            if (result.isConfirmed && type === "warning") {
                eliminarLuminaria(rol)
                    .then(() => {
                        updateData()
                        Swal.fire({ title: "Eliminada!", text: "La luminaria ha sido eliminado.", icon: "success", confirmButtonText: "Aceptar" })
                    })
                    .catch(() => {
                        Swal.fire({ title: "Error!", text: "No se pudo eliminar la luminaria.", icon: "error", confirmButtonText: "Aceptar" })
                    })
            }
        })
    }

    return(
        <ul className="action d-flex justify-content-center">
            <li className="delete" style={ { cursor: "pointer" } }>
                <a onClick={ () => showAlert({ IDLuminaria: luminaria.IDLuminaria }) }>
                    <i className="icon-trash" />
                </a>
            </li>
        </ul>
    )
}

export default AccionesLuminaria