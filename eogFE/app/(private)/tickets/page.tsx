"use client"

import { FunctionComponent, useEffect, useState } from "react"
import Breadcrumbs from "@CommonComponent/Breadcrumbs"

const Tickets = () => {

    const nombreModulo = "Tickets"
    const nombreComponente = "Administracion de Tickets"

    const [Componente, setComponente] = useState<FunctionComponent>()
    useEffect(() => {
        (async () => {
            if (typeof window !== "undefined") {
                const newComponente = (await import("@Componentes/Tickets")).default
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

export default Tickets