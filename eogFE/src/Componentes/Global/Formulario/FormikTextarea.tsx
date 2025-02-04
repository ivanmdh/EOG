import { FormFeedback, FormGroup, Input, Label } from "reactstrap"
import { Field, useField, useFormikContext } from "formik"
import { useState } from "react"

interface Props {
    title: string,
    name: string,
    autoFocus?: boolean
}

const FormikTextarea = ({ title, name, autoFocus }: Props) => {

    const [field] = useField(name)

    const [localValue, setLocalValue] = useState(field.value ?? "")

    const { setFieldValue, errors}: any = useFormikContext()

    return (
        <Field name={ field.name }>
            { ({ field }: any) => (
                <FormGroup>
                    <Label check>{ title }</Label>
                    <Input
                        { ...field }
                        autoFocus={ autoFocus }
                        type={ 'textarea' }
                        rows={5}
                        cols={5}
                        name={ name }
                        value={ localValue }
                        onChange={ (e) => {
                            setLocalValue(e.target.value)
                            setFieldValue(name, e.target.value)
                        } }
                        invalid={ !!errors?.[name] }
                        style={ { textTransform: "uppercase" } }
                    />
                    <FormFeedback>
                        { errors?.[name] ?? "" }
                    </FormFeedback>
                </FormGroup>
            ) }
        </Field>
    )
}

export default FormikTextarea