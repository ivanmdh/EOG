import { FormFeedback, FormGroup, Label } from "reactstrap"
import { Field, useField, useFormikContext } from "formik"
import { useState } from "react"
import { AsyncTypeahead } from "react-bootstrap-typeahead"
import apiService from "@services/apiServices"

interface Props {
    apiURL: string,
    title: string,
    name: string,
    placeholder: string,
    autoFocus?: boolean
}

const FormikTypeahead = ({ apiURL, title, name, placeholder, autoFocus }: Props) => {

    const [field] = useField(name)

    const [localValue, setLocalValue] = useState(field.value ?? "")
    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState([])

    const { setFieldValue, errors }: any = useFormikContext()

    const handleSearch = (query: string) => {
        setIsLoading(true)

        apiService.post(apiURL, { search: query })
                  .then(response => {
                      setOptions(response.data.data)
                      setIsLoading(false)
                  })
    }

    const filterBy = () => true

    return (
        <Field name={ field.name }>
            { ({ field }: any) => (
                <FormGroup>
                    <Label check>{ title }</Label>
                    <AsyncTypeahead
                        { ...field }
                        defaultInputValue={ localValue }
                        filterBy={ filterBy }
                        isLoading={ isLoading }
                        minLength={ 3 }
                        onSearch={ handleSearch }
                        options={ options }
                        placeholder={ placeholder }
                        searchText={ "Buscando..." }
                        promptText={ "Buscando..." }
                        emptyLabel={ "No se encontraron resultados" }
                        isInvalid={ !!errors?.[name] }
                        onChange={ (option) => {
                            setLocalValue(option)
                            setFieldValue(name, option)
                        } }
                    />
                    <FormFeedback>
                        { errors?.[name] ?? "" }
                    </FormFeedback>
                </FormGroup>
            ) }
        </Field>
    )
}

export default FormikTypeahead