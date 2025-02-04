import * as Yup from "yup"

import { esObligatorio } from "../Global/ErroresYup"

export default Yup.object().shape({
                                      direccion: Yup.array().of(
                                          Yup.object()
                                             .required(esObligatorio)
                                      )
                                                    .required(esObligatorio),
                                      luminaria: Yup.object()
                                                    .required(esObligatorio),
                                      lampara: Yup.string()
                                                  .required(esObligatorio),
                                      tipo_falla: Yup.string()
                                                     .required(esObligatorio),
                                      descripcion: Yup.string()
                                                      .required(esObligatorio)
                                  })