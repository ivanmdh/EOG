import * as Yup from "yup"

import { esObligatorio } from "../Global/ErroresYup"

export default Yup.object().shape(
    {
        direccion: Yup.array().of(
            Yup.object()
               .required(esObligatorio)
        )
            .required(esObligatorio),
        luminarias: Yup.array().of(
            Yup.object().shape(
                {
                    potencia: Yup.number()
                                 .required(esObligatorio),
                    foto: Yup.string()
                             .required(esObligatorio),
                    foto_secundaria: Yup.string()
                             .required(esObligatorio),
                    numero_serie: Yup.string()
                             .required(esObligatorio),
                })
        )
                       .nullable()
    })