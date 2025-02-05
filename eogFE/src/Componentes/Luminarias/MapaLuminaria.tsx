import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useEffect, useState } from "react"
import { useFormikContext } from "formik"

const MarkerCenter = {
    lat: 20.481017956093783,
    lng: -100.96094126223818,
}

const MarkerContainerStyle = {
    height: "300px",
}

const MapaConPunto = () => {
    const [center, setCenter] = useState(MarkerCenter)
    const [position, setPosition] = useState(MarkerCenter)
    const [zoom, setZoom] = useState(14)

    const {setFieldValue} = useFormikContext()

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

    const iconUrl = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"

    const handleCenterMap = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                setCenter({ lat: latitude, lng: longitude })
                setPosition({ lat: latitude, lng: longitude })
                setZoom(19)
            })
        }
    }
    useEffect(() => {
        if (navigator.geolocation) {
            handleCenterMap()
        }
    }, [])

    useEffect(() => {
        setFieldValue('ubicacion', { latitud: position.lat, longitud: position.lng })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position])

    return (
        <>
            {isLoaded ? (
                <>
                    <GoogleMap
                        mapContainerStyle={MarkerContainerStyle}
                        center={center}
                        zoom={zoom}
                        options={mapOptions}
                        onClick={(e: any) => setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
                    >
                        <Marker
                            position={position}
                            icon={iconUrl}
                            draggable={true}
                            onDragEnd={(e: any) => setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
                        />
                    </GoogleMap>
                </>)
                 : ""}
        </>
    )
}

export default MapaConPunto