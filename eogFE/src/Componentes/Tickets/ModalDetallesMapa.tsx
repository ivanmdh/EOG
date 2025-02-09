import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"

interface Props {
    ubicacion: any
}

const MarkerContainerStyle = {
    height: "300px",
}

const ModalDetallesMapa = ({ ubicacion }: Props) => {

    const center = { lat: ubicacion?.latitud, lng: ubicacion?.longitud }
    const position = { lat: ubicacion?.latitud, lng: ubicacion?.longitud }
    const zoom = 16

    const iconUrl = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"

    const mapOptions = {
        styles: [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [
                    {
                        visibility: "off",
                    },
                ],
            },
        ],
        disableDefaultUI: true,
        mapTypeId: "roadmap",
        scrollwheel: true,
    }

    const { isLoaded } = useJsApiLoader({
                                            id: "google-map-script",
                                            googleMapsApiKey: "AIzaSyCJEX-ttp9P-JRPB8di_WblQtd0t0O509g",
                                        })

    return (

                        <>
                            { isLoaded ? (
                                <GoogleMap
                                    mapContainerStyle={ MarkerContainerStyle }
                                    center={ center }
                                    zoom={ zoom }
                                    options={ mapOptions }
                                >
                                    <Marker
                                        position={ position }
                                        icon={ iconUrl }
                                    />
                                </GoogleMap>
                            ) : null }
                        </>

    )
}

export default ModalDetallesMapa