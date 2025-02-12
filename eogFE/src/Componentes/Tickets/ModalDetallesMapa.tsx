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
    const zoom = 17

    const iconUrl = '/assets/luminaria.png'

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
        draggable: false,
        zoomControl: true,
        disableDoubleClickZoom: true,
    }

    const { isLoaded } = useJsApiLoader({
                                            id: "google-map-script",
                                            googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
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