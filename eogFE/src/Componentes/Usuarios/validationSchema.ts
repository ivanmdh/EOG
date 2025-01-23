import * as Yup from 'yup'

import { emailInvalido, esObligatorio } from '../Global/ErroresYup'

export default Yup.object().shape({
                                      nombre: Yup.string()
                                                 .max(254, 'Se requieren menos de 254 caracteres')
                                                 .required(esObligatorio),
                                        apellido: Yup.string()
                                                     .max(254, 'Se requieren menos de 254 caracteres')
                                                     .required(esObligatorio),
                                        email: Yup.string()
                                                    .email(emailInvalido)
                                                    .required(esObligatorio),
                                  })