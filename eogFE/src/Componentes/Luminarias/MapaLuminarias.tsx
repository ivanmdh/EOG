import {
    GoogleMap,
    InfoWindow,
    Marker,
    useJsApiLoader,
} from "@react-google-maps/api"
import { useEffect, useState } from "react"
import apiService from "@services/apiServices"
import { useModalContext } from "@Context/ModalContext"

const MarkerCenter = {
    lat: 20.481017956093783,
    lng: -100.96094126223818,
}

const MarkerContainerStyle = {
    height: "400px",
}

const MapaLuminarias = () => {
    const { refreshData } = useModalContext()

    const [positions, setPositions]: any = useState([])
    const [selectedPosition, setSelectedPosition]: any = useState(null)
    const [mapType, setMapType] = useState("hybrid") // Estado para controlar el tipo de mapa (hybrid o roadmap)

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

    const { isLoaded } = useJsApiLoader({
                                            id: "google-map-script",
                                            googleMapsApiKey: "AIzaSyD4S7Ibpi7WTau7ROLJtrpGaZQgkbv8L6s",
                                        })

    const iconUrl = '/assets/luminaria.png'

    useEffect(() => {
        apiService.get("/api/luminarias/mapa").then((response) => {
            setPositions(response?.data?.Luminarias ?? [])
        })
    }, [refreshData])

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
                        center={ MarkerCenter }
                        zoom={ 14 }
                        options={ mapOptions }
                    >
                        { positions.map((position: any, index: number) => (
                            <Marker
                                key={ index }
                                position={ { lat: position.ubicacion.latitud, lng: position.ubicacion.longitud } }
                                icon={ iconUrl }
                                onClick={ () => setSelectedPosition(position) }
                            />
                        )) }
                        { selectedPosition && (
                            <InfoWindow
                                position={ {
                                    lat: selectedPosition.ubicacion.latitud,
                                    lng: selectedPosition.ubicacion.longitud,
                                } }
                                onCloseClick={ () => setSelectedPosition(null) }
                            >
                                <div>
                                    <h3>Poste: { selectedPosition.data.folio }</h3>
                                    <p style={{ margin: 0 }}># Cuenta: { selectedPosition.data.num_cuenta }</p>
                                    <p style={{ margin: 0 }}>RPU: { selectedPosition.data.rpu }</p>
                                    <p style={{ margin: 0 }}>Direccion: { selectedPosition.data.direccion }</p>
                                    <p style={{ margin: 0 }}>Colonia: { selectedPosition.data.colonia }</p>
                                    <p style={{ margin: 0 }}>Tarifa: { selectedPosition.data.tarifa }</p>
                                    <p style={{ margin: 0 }}>Lat: { selectedPosition.ubicacion.latitud }, Lng: { selectedPosition.ubicacion.longitud }</p>
                                    <div>
                                        { selectedPosition.data.lamparas.map((lampara: any, index: number) => (
                                            <div style={ { display: "flex", alignItems: "center", marginTop: "3px", marginBottom: "3px" } } key={ index }>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={ `${lampara.foto}/thumb` }
                                                    alt={ lampara.folio }
                                                    style={ {
                                                        width: "100px",
                                                        marginRight: "10px",
                                                    } }
                                                />
                                                <div>
                                                    <h5>{ lampara.folio }</h5>
                                                    <h6>{ lampara.potencia }</h6>
                                                </div>
                                            </div>
                                        )) }
                                    </div>
                                </div>
                            </InfoWindow>
                        ) }
                    </GoogleMap>
                </div>
            ) : (
                  ""
              ) }
        </>
    )
}

export default MapaLuminarias
