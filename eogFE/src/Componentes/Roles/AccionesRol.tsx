import { useModalContext } from "@Context/ModalContext"

interface Props {
    rol: any
}

const AccionesRol = ({ rol }: Props) => {

    const { setModalStart } = useModalContext()

    return(
        <ul className="action d-flex justify-content-center">
            <li className="edit">
                <i
                    className="icon-pencil-alt"
                    onClick={ () => {
                        console.log("Rol:", rol)
                        setModalStart('modalRol', { IDRol: rol.IDRol })
                    }}
                />
            </li>
            <li className="delete">
                <a href={ `rols/eliminar/${rol.IDRol}` }>
                    <i className="icon-trash" />
                </a>
            </li>
        </ul>

    )
}

export default AccionesRol