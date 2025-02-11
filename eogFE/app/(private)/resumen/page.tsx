"use client"

import { FunctionComponent, useEffect, useState } from "react"
import Breadcrumbs from "@CommonComponent/Breadcrumbs"

const Resumen = () => {

    const nombreModulo = "Resumen"
    const nombreComponente = "Resumen"

    const [Componente, setComponente] = useState<FunctionComponent>()
    useEffect(() => {
        (async () => {
            if (typeof window !== "undefined") {
                const newComponente = (await import("@Componentes/Resumen")).default
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

export default Resumen