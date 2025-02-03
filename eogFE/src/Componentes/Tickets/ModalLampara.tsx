import { Card, Col, FormGroup, Input, Label } from "reactstrap"
import { Field } from "formik"
import RatioImage from "@CommonComponent/RatioImage"

interface Props {
    lampara: any,
    setFieldValue: any
}

const ModalLampara = ({ lampara, setFieldValue }: Props) => {
    return (
        <Col xs="12">
            <Card onClick={ () => setFieldValue("lampara", `${ lampara.IDLampara }`) }>
                <div className="d-flex p-20">
                    <FormGroup className="radio radio-primary" check>
                        <Field type="radio" name="lampara" value={ `${ lampara.IDLampara }` } as={ Input }/>
                        <Label className="my-0" check>
                            <div className="flex-grow-1">
                                  <span className="d-flex list-behavior-1">
                                    <span className="flex-shrink-0 ms-2">
                                      <RatioImage className="tab-img b-r-0 img-fluid" src={ `${ lampara.foto }` } alt=""/>
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