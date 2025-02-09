import { Card, Col, FormGroup, Input, Label } from "reactstrap"
import { Field } from "formik"
import RatioImage from "@CommonComponent/RatioImage"

interface Props {
    values: any,
    lampara: any,
    setFieldValue: any
}

const ModalLampara = ({ values, lampara, setFieldValue }: Props) => {

    const isSelected = values.lampara === `${ lampara.IDLampara }`

    const selectedStyle = {
        backgroundColor: "#f0f8ff",
        border: "2px solid #007bff",
        marginBottom: "10px"
    }

    return (
        <Col xs="12">
            <Card
                onClick={ () => setFieldValue("lampara", `${ lampara.IDLampara }`) }
                style={ isSelected ? selectedStyle : { marginBottom: "10px" } }
            >
                <div className="d-flex p-20">
                    <FormGroup className="radio radio-primary" check>
                        <Field type="radio" name="lampara" value={ `${ lampara.IDLampara }` } as={ Input }/>
                        <Label className="my-0" check>
                            <div className="flex-grow-1">
                                  <span className="d-flex list-behavior-1">
                                    <span className="flex-shrink-0 ms-2">
                                      <RatioImage className="tab-img b-r-0 img-fluid" src={ `${ lampara.foto }/thumb` } alt=""/>
                                    </span>
                                    <span className="flex-grow-1">
                                      <span className="mb-0">{ lampara.folio } - { lampara.potencia }</span>
                                    </span>
                                  </span>
                            </div>
                        </Label>
                    </FormGroup>
                </div>
            </Card>
        </Col>
    )
}

export default ModalLampara