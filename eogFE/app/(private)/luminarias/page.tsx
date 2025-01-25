"use client"

import { FunctionComponent, useEffect, useState } from "react"
import Breadcrumbs from "@CommonComponent/Breadcrumbs"

const Luminarias = () => {

    const nombreModulo = "Luminarias"
    const nombreComponente = "Administracion de Luminarias"

    const [Componente, setComponente] = useState<FunctionComponent>()
    useEffect(() => {
        (async () => {
            if (typeof window !== "undefined") {
                const newComponente = (await import("@Componentes/Luminarias")).default
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

export default Luminarias