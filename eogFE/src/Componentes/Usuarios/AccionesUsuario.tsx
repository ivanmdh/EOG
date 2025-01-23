import { useModalContext } from "@Context/ModalContext"

interface Props {
    usuario: any
}

const AccionesUsuario = ({ usuario }: Props) => {

    const { setModalStart } = useModalContext()

    return(
        <ul className="action d-flex justify-content-center">
            <li className="edit">
                <i
                    className="icon-pencil-alt"
                    onClick={ () => {
                        console.log("Usuario:", usuario)
                        setModalStart('modalUsuario', { IDUsuario: usuario.IDUsuario })
                    }}
                />
            </li>
            <li className="delete">
                <a href={ `usuarios/eliminar/${usuario.IDUsuario}` }>
                    <i className="icon-trash" />
                </a>
            </li>
        </ul>

    )
}

export default AccionesUsuario