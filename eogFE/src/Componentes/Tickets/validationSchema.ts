import * as Yup from "yup"

import { esObligatorio } from "../Global/ErroresYup"

export default Yup.object().shape({
                                      direccion: Yup.array().of(
                                          Yup.object()
                                             .required(esObligatorio)
                                      )
                                                    .required(esObligatorio),
                                      nombre: Yup.string()
                                                 .max(254, "Se requieren menos de 254 caracteres")
                                                 .required(esObligatorio),
                                      lampara: Yup.string()
                                                  .required(esObligatorio),
    //tipo

                                  })