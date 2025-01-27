interface Props {
    luminaria: any
}

const AccionesLuminaria = ({ luminaria }: Props) => {

    return(
        <ul className="action d-flex justify-content-center">
            <li className="delete">
                <a href={ `luminarias/eliminar/${luminaria.IDUsuario}` }>
                    <i className="icon-trash" />
                </a>
            </li>
        </ul>
    )
}

export default AccionesLuminaria