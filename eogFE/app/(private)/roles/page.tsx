"use client"

import { FunctionComponent, useEffect, useState } from "react"
import Breadcrumbs from "@CommonComponent/Breadcrumbs"

const Roles = () => {

    const nombreModulo = "Roles"
    const nombreComponente = "Administracion de Roles"

    const [Componente, setComponente] = useState<FunctionComponent>()
    useEffect(() => {
        (async () => {
            if (typeof window !== "undefined") {
                const newComponente = (await import("@Componentes/Roles")).default
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

export default Roles