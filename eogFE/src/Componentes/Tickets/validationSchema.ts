import * as Yup from "yup"

import { esObligatorio } from "../Global/ErroresYup"

export default Yup.object().shape({
                                      nombre: Yup.string()
                                                 .max(254, "Se requieren menos de 254 caracteres")
                                                 .required(esObligatorio),
                                  })