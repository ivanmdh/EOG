import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useState } from "react"

interface Props {
    ubicacion: any
}

const MarkerContainerStyle = {
    height: "300px",
}

const ModalDetallesMapa = ({ ubicacion }: Props) => {
    const [mapType, setMapType] = useState("hybrid") // Estado para controlar el tipo de mapa

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
        mapTypeId: mapType, // Usamos el estado mapType aquí
        scrollwheel: true,
        draggable: false,
        zoomControl: true,
        disableDoubleClickZoom: true,
    }

    // Función para alternar entre los tipos de mapa
    const toggleMapType = () => {
        setMapType(mapType === "hybrid" ? "roadmap" : "hybrid")
    }

    // Estilos para el botón de cambio de tipo de mapa
    const mapTypeButtonStyle = {
        position: 'absolute' as const,
        top: '10px',
        right: '10px',
        zIndex: 1,
        backgroundColor: 'white',
        border: '2px solid #ccc',
        borderRadius: '4px',
        padding: '8px 12px',
        fontWeight: 'bold' as const,
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
    }

    const { isLoaded } = useJsApiLoader({
                                            id: "google-map-script",
                                            googleMapsApiKey: "AIzaSyD4S7Ibpi7WTau7ROLJtrpGaZQgkbv8L6s",
                                        })

    return (
        <>
            { isLoaded ? (
                <div style={{ position: 'relative' }}>
                    <button 
                        onClick={toggleMapType} 
                        style={mapTypeButtonStyle}
                    >
                        {mapType === "hybrid" ? "Ver Calles" : "Ver Satélite"}
                    </button>
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
                </div>
            ) : null }
        </>
    )
}

export default ModalDetallesMapa