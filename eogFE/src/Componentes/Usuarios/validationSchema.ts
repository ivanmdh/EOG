import * as Yup from "yup"

import { emailInvalido, esObligatorio } from "../Global/ErroresYup"

export default Yup.object().shape({
                                      nombre: Yup.string()
                                                 .max(254, "Se requieren menos de 254 caracteres")
                                                 .required(esObligatorio),
                                      apellido: Yup.string()
                                                   .max(254, "Se requieren menos de 254 caracteres")
                                                   .required(esObligatorio),
                                      usuario: Yup.string()
                                                  .max(254, "Se requieren menos de 254 caracteres")
                                                  .required(esObligatorio),
                                      password: Yup.string()
                                                   .max(254, "Se requieren menos de 254 caracteres")
                                                   .when("IDUsuario", (IDUsuario: any) => {
                                                       return IDUsuario === null ? Yup.string().required(esObligatorio) : Yup.string().notRequired();
                                                   }),
                                      email: Yup.string()
                                                .email(emailInvalido)
                                                .required(esObligatorio),
                                      rol: Yup.number()
                                              .required(esObligatorio),
                                  })