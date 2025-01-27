import { useState } from "react"
import { Form } from "reactstrap"
import { Dropzone, ExtFile, FileMosaic, FileMosaicProps, FullScreen, ImagePreview } from "@files-ui/react"
import apiService from "@services/apiServices"
import { useFormikContext } from "formik"

interface Props {
    name: string
    error: boolean
}

const ImageUploader = ({ name, error }: Props) => {

    const { setFieldValue } = useFormikContext()

    const body = true

    const [extFiles, setExtFiles] = useState<ExtFile[]>([])
    const [imageSrc, setImageSrc] = useState<File | string | undefined>(undefined)

    const updateFiles = (incomingFiles: ExtFile[]) => {
        setExtFiles(incomingFiles)
        const data = new FormData()
        data.append("file", incomingFiles[0].file as Blob)
        apiService.post('api/luminarias/cargafoto', data)
            .then(response => {
                setFieldValue(name, response.data.hash)
            })
    };
    const onDelete = (id: FileMosaicProps["id"]) => {
        setExtFiles(extFiles.filter((x) => x.id !== id))
        setFieldValue(name, "")
    }
    const handleSee = (imageSource: File | string | undefined) => setImageSrc(imageSource)
    const handleAbort = (id: FileMosaicProps["id"]) => {
        setExtFiles(
            extFiles.map((ef) => {
                if (ef.id === id) {
                    return { ...ef, uploadStatus: "aborted" }
                } else return { ...ef }
            })
        )
    }
    const handleCancel = (id: FileMosaicProps["id"]) => {
        setExtFiles(
            extFiles.map((ef) => {
                if (ef.id === id) {
                    return { ...ef, uploadStatus: undefined }
                } else return { ...ef }
            })
        )
    }
    return (
            <Form>
                <Dropzone onChange={updateFiles} value={extFiles} maxFiles={1} multiple={false} header={false} footer={false} minHeight={body ? "180px" : "80px"}>
                    {extFiles.map((file) => (
                        <FileMosaic {...file} key={file.id} onDelete={onDelete} onSee={handleSee} onAbort={handleAbort} onCancel={handleCancel} resultOnTooltip alwaysActive preview />
                    ))}
                    {extFiles.length === 0 && <div className="dz-message needsclick">
                        <i className="icon-cloud-up text-primary"></i>
                        <h6 className="fs-6">Presiona o arrastra un archivo aquí</h6>
                        {
                            error && <h5 className="text-danger">Este campo es obligatorio</h5>
                        }
                    </div>}
                </Dropzone>
                <FullScreen open={imageSrc !== undefined} onClose={() => setImageSrc(undefined)}>
                    <ImagePreview src={imageSrc} />
                </FullScreen>
            </Form>
    )
}

export default ImageUploader