import { ErrorMessage, Field, useFormikContext } from "formik"
import { FormFeedback, FormGroup, Label } from "reactstrap"
import { useEffect, useState } from "react"
import apiServices from "@services/apiServices"

interface Props {
    apiURL: string
    name: string
    label: string
}

const FormikSelect = ({ apiURL, name, label }: Props) => {

    const [opciones, setOpciones] = useState([])

    const { errors }: any = useFormikContext()

    const onError = errors?.[name] ? "is-invalid" : ""

    useEffect(() => {
        apiServices.post(`api/opciones/${ apiURL }`, {})
                   .then((response: any) => {
                       setOpciones(response.data)
                   })
                   .catch((error: any) => {
                       console.log("Error:", error)
                   })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(errors)

    return (
        <FormGroup>
            <Label for={ name }>{ label }</Label>
            <Field
                name={ name }
                as="select"
                className={ `form-control ${ onError }` }>
                <option value={ "" }>Selecciona una opcion</option>
                { opciones.map((item: any, index) => (<option value={ item.value } key={ index }>{ item.label }</option>)) }
            </Field>
            <ErrorMessage name={ name } component={ FormFeedback }/>
        </FormGroup>
    )
}

export default FormikSelect

