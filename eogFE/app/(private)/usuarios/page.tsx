"use client"

import { FunctionComponent, useEffect, useState } from "react"
import Breadcrumbs from "@CommonComponent/Breadcrumbs"

const Usuarios = () => {

    const nombreModulo = "Usuarios"
    const nombreComponente = "Administracion de Usuarios"

    const [Componente, setComponente] = useState<FunctionComponent>()
    useEffect(() => {
        (async () => {
            if (typeof window !== "undefined") {
                const newComponente = (await import("@Componentes/Usuarios")).default
                setComponente(() => newComponente)
            }
        })()
    }, [])
    return Componente
           ? <>
               <Breadcrumbs mainTitle={ nombreComponente } parent={ nombreModulo }/>
               <Componente/>
           </>
           : ""
}

export default Usuarios