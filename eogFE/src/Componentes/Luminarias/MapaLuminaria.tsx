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
    const [mapType, setMapType] = useState("hybrid") // Estado para controlar el tipo de mapa

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
        mapTypeId: mapType, // Usamos el estado mapType aquí
        scrollwheel: true,
    }

    // Función para alternar entre los tipos de mapa
    const toggleMapType = () => {
        setMapType(mapType === "hybrid" ? "roadmap" : "hybrid")
    }

    // Estilos para el botón de cambio de tipo de mapa
    const mapTypeButtonStyle = {
        position: 'absolute' as 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1,
        backgroundColor: 'white',
        border: '2px solid #ccc',
        borderRadius: '4px',
        padding: '8px 12px',
        fontWeight: 'bold' as 'bold',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
    }

    const { isLoaded } = useJsApiLoader({
                                            id: "google-map-script",
                                            googleMapsApiKey: "AIzaSyD4S7Ibpi7WTau7ROLJtrpGaZQgkbv8L6s",
                                        })

    const iconUrl = '/assets/luminaria.png'

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
                <div style={{ position: 'relative' }}>
                    <button 
                        onClick={toggleMapType} 
                        style={mapTypeButtonStyle}
                    >
                        {mapType === "hybrid" ? "Ver Calles" : "Ver Satélite"}
                    </button>
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
                </div>)
                 : ""}
        </>
    )
}

export default MapaConPunto