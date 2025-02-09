import * as Yup from "yup"

import { esObligatorio } from "../Global/ErroresYup"

export default Yup.object().shape({
                                      tipo_reparacion: Yup.string()
                                                          .required(esObligatorio),
                                      foto: Yup.string()
                                               .required(esObligatorio)
                                  })