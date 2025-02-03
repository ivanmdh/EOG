import { useModalContext } from "@Context/ModalContext"
import Swal from "sweetalert2"
import { eliminarUsuario } from "@services/usuarios"

interface Props {
    usuario: any
}

const AccionesUsuario = ({ usuario }: Props) => {

    const { setModalStart, updateData } = useModalContext()

    const title = "Estás seguro de eliminar este usuario?"
    const text = "No podrás revertir esto!"
    const type = "warning"


    const showAlert = (usuario: any) => {
        Swal.fire({ title, text, icon: "warning", showCancelButton: true, cancelButtonColor: "red", confirmButtonText: "Sí, eliminarlo!", cancelButtonText: "Cancelar" }).then((result) => {
            if (result.isConfirmed && type === "warning") {
                eliminarUsuario(usuario)
                    .then(() => {
                        updateData()
                        Swal.fire({ title: "Eliminado!", text: "El usuario ha sido eliminado.", icon: "success", confirmButtonText: "Aceptar" })
                    })
                    .catch(() => {
                        Swal.fire({ title: "Error!", text: "No se pudo eliminar el usuario.", icon: "error", confirmButtonText: "Aceptar" })
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
                        setModalStart('modalUsuario', { IDUsuario: usuario.IDUsuario })
                    }}
                />
            </li>
            <li className="delete" style={ { cursor: "pointer" } }>
                <a onClick={ () => showAlert({ IDUsuario: usuario.IDUsuario }) }>
                    <i className="icon-trash" />
                </a>
            </li>
        </ul>

    )
}

export default AccionesUsuario