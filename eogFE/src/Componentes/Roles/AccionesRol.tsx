import { useModalContext } from "@Context/ModalContext"
import Swal from "sweetalert2"
import { eliminarRol } from "@services/roles"

interface Props {
    rol: any
}

const AccionesRol = ({ rol }: Props) => {

    const { setModalStart, updateData } = useModalContext()

    const title = "Estás seguro de eliminar este rol?"
    const text = "No podrás revertir esto!"
    const type = "warning"

    const showAlert = (rol: any) => {
        Swal.fire({ title, text, icon: "warning", showCancelButton: true, cancelButtonColor: "red", confirmButtonText: "Sí, eliminarlo!", cancelButtonText: "Cancelar" }).then((result) => {
            if (result.isConfirmed && type === "warning") {
                eliminarRol(rol)
                    .then(() => {
                        updateData()
                        Swal.fire({ title: "Eliminado!", text: "El rol ha sido eliminado.", icon: "success", confirmButtonText: "Aceptar" })
                    })
                    .catch(() => {
                        Swal.fire({ title: "Error!", text: "No se pudo eliminar el rol.", icon: "error", confirmButtonText: "Aceptar" })
                    })
            }
        })
    }

    return (
        <ul className="action d-flex justify-content-center">
            <li className="edit" style={ { cursor: "pointer" } }>
                <i
                    className="icon-pencil-alt"
                    onClick={ () => {
                        setModalStart("modalRol", { IDRol: rol.IDRol })
                    } }
                />
            </li>
            <li className="delete" style={ { cursor: "pointer" } }>
                <a onClick={ () => showAlert({ IDRol: rol.IDRol }) }>
                    <i className="icon-trash"/>
                </a>
            </li>
        </ul>

    )
}

export default AccionesRol