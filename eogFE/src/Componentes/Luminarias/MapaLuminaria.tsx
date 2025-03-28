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
    const [isLoading, setIsLoading] = useState(false) // Estado para controlar el indicador de carga
    const [error, setError] = useState("") // Estado para manejar errores

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

    // Estilos para el botón de centrar mapa
    const centerMapButtonStyle = {
        position: 'absolute' as const,
        top: '55px', // Posicionado debajo del botón de tipo de mapa
        right: '10px',
        zIndex: 1,
        backgroundColor: 'white',
        border: '2px solid #ccc',
        borderRadius: '4px',
        padding: '8px 12px',
        fontWeight: 'bold' as const,
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    // Estilo para el mensaje de error
    const errorMessageStyle = {
        position: 'absolute' as const,
        bottom: '10px',
        left: '10px',
        zIndex: 1,
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '14px'
    }

    const { isLoaded } = useJsApiLoader({
                                            id: "google-map-script",
                                            googleMapsApiKey: "AIzaSyD4S7Ibpi7WTau7ROLJtrpGaZQgkbv8L6s",
                                        })

    const iconUrl = '/assets/luminaria.png'

    const handleCenterMap = () => {
        // Limpiar cualquier error anterior
        setError("")

        if (navigator.geolocation) {
            setIsLoading(true)

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    setCenter({ lat: latitude, lng: longitude })
                    setPosition({ lat: latitude, lng: longitude })
                    setZoom(19)
                    setIsLoading(false)
                    console.log("Ubicación obtenida:", latitude, longitude)
                },
                (err) => {
                    console.error("Error al obtener la ubicación:", err)
                    setError("No se pudo acceder a la ubicación. Por favor, asegúrate de dar permiso al navegador.")
                    setIsLoading(false)
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            )
        } else {
            setError("Tu navegador no soporta geolocalización")
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
                    <button
                        onClick={handleCenterMap}
                        style={centerMapButtonStyle}
                        disabled={isLoading}
                    >
                        {isLoading ? "Localizando..." : "Mi Ubicación"}
                        {isLoading && <span style={{ marginLeft: '5px', display: 'inline-block', animation: 'spin 1s infinite linear' }}>⟳</span>}
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
                    {error && <div style={errorMessageStyle}>{error}</div>}
                </div>)
                 : ""}
        </>
    )
}

export default MapaConPunto