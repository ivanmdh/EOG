import {
    GoogleMap,
    InfoWindow,
    Marker,
    useJsApiLoader,
} from "@react-google-maps/api"
import { useEffect, useState, useRef } from "react"
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
    const mapRef = useRef<google.maps.Map | null>(null)

    const [positions, setPositions]: any = useState([])
    const [selectedPosition, setSelectedPosition]: any = useState(null)
    const [mapType, setMapType] = useState("hybrid") // Estado para controlar el tipo de mapa (hybrid o roadmap)
    const [currentZoom, setCurrentZoom] = useState(14)
    const [isAgrupado, setIsAgrupado] = useState(false)
    const [totalLuminarias, setTotalLuminarias] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

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
    const clusterIconUrl = '/assets/cluster.png'

    // Función para cargar las luminarias según los límites del mapa
    const cargarLuminarias = () => {
        if (!mapRef.current) return;
        
        setIsLoading(true);
        
        const bounds = mapRef.current.getBounds();
        if (!bounds) return;
        
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        
        const params = {
            zoom: currentZoom,
            bounds: {
                ne: { lat: ne.lat(), lng: ne.lng() },
                sw: { lat: sw.lat(), lng: sw.lng() }
            }
        };
        
        apiService.post("/api/luminarias/mapa", params).then((response) => {
            setPositions(response?.data?.Luminarias ?? []);
            setIsAgrupado(response?.data?.isAgrupado ?? false);
            setTotalLuminarias(response?.data?.totalLuminarias ?? 0);
            setIsLoading(false);
        }).catch(error => {
            console.error("Error al cargar luminarias:", error);
            setIsLoading(false);
        });
    };

    // Cargar luminarias iniciales y cuando cambia refreshData
    useEffect(() => {
        if (mapRef.current) {
            cargarLuminarias();
        }
    }, [refreshData]);

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

    // Estilo para el indicador de total
    const totalLuminariasStyle = {
        position: 'absolute' as 'absolute',
        bottom: '10px',
        left: '10px',
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '5px 10px',
        fontSize: '12px'
    }

    // Estilo para el indicador de carga
    const loadingStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '10px 20px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
    }

    // Manejar clic en un grupo/cluster
    const handleClusterClick = (cluster: any) => {
        if (mapRef.current) {
            mapRef.current.setZoom((currentZoom || 14) + 2);
            mapRef.current.panTo({
                lat: cluster.ubicacion.latitud,
                lng: cluster.ubicacion.longitud
            });
        }
    }

    // Renderizar el contenido de la ventana de información según el tipo de marcador
    const renderInfoWindowContent = () => {
        if (!selectedPosition) return null;
        
        // Si es un cluster
        if (selectedPosition.isCluster) {
            return (
                <div>
                    <h4>Grupo de {selectedPosition.count} luminarias</h4>
                    <p>Haz clic para acercar y ver detalles</p>
                </div>
            );
        }
        
        // Si es un marcador normal
        return (
            <div>
                <h3>Poste: {selectedPosition.data.folio}</h3>
                <p style={{ margin: 0 }}># Cuenta: {selectedPosition.data.num_cuenta}</p>
                <p style={{ margin: 0 }}>RPU: {selectedPosition.data.rpu}</p>
                <p style={{ margin: 0 }}>Direccion: {selectedPosition.data.direccion}</p>
                <p style={{ margin: 0 }}>Colonia: {selectedPosition.data.colonia}</p>
                <p style={{ margin: 0 }}>Tarifa: {selectedPosition.data.tarifa}</p>
                <p style={{ margin: 0 }}>Lat: {selectedPosition.ubicacion.latitud}, Lng: {selectedPosition.ubicacion.longitud}</p>
                <div>
                    {selectedPosition.data.lamparas.map((lampara: any, index: number) => (
                        <div style={{ display: "flex", alignItems: "center", marginTop: "3px", marginBottom: "3px" }} key={index}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`${lampara.foto}/thumb`}
                                alt={lampara.folio}
                                style={{
                                    width: "100px",
                                    marginRight: "10px",
                                }}
                            />
                            <div>
                                <h5>{lampara.folio}</h5>
                                <h6>{lampara.potencia}</h6>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

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
                    
                    {isLoading && (
                        <div style={loadingStyle}>
                            Cargando luminarias...
                        </div>
                    )}
                    
                    <div style={totalLuminariasStyle}>
                        {isAgrupado 
                            ? `Mostrando ${positions.length} grupos de un total de ${totalLuminarias} luminarias` 
                            : `Mostrando ${positions.length} de ${totalLuminarias} luminarias`}
                    </div>
                    
                    <GoogleMap
                        mapContainerStyle={MarkerContainerStyle}
                        center={MarkerCenter}
                        zoom={14}
                        options={mapOptions}
                        onLoad={map => {
                            mapRef.current = map;
                            cargarLuminarias();
                        }}
                        onZoomChanged={() => {
                            if (mapRef.current) {
                                const zoom = mapRef.current.getZoom();
                                if (zoom && zoom !== currentZoom) {
                                    setCurrentZoom(zoom);
                                    cargarLuminarias();
                                }
                            }
                        }}
                        onBoundsChanged={() => {
                            // Debounce para no hacer demasiadas solicitudes
                            if (!isLoading) {
                                const timer = setTimeout(() => {
                                    cargarLuminarias();
                                }, 500);
                                return () => clearTimeout(timer);
                            }
                        }}
                    >
                        {positions.map((position: any, index: number) => (
                            <Marker
                                key={index}
                                position={{ lat: position.ubicacion.latitud, lng: position.ubicacion.longitud }}
                                icon={position.isCluster ? {
                                    url: clusterIconUrl,
                                    scaledSize: new google.maps.Size(40, 40),
                                    labelOrigin: new google.maps.Point(20, 20)
                                } : iconUrl}
                                label={position.isCluster ? {
                                    text: position.count.toString(),
                                    color: 'white',
                                    fontSize: '12px',
                                    fontWeight: 'bold'
                                } : undefined}
                                onClick={() => {
                                    if (position.isCluster) {
                                        handleClusterClick(position);
                                    }
                                    setSelectedPosition(position);
                                }}
                            />
                        ))}
                        {selectedPosition && (
                            <InfoWindow
                                position={{
                                    lat: selectedPosition.ubicacion.latitud,
                                    lng: selectedPosition.ubicacion.longitud,
                                }}
                                onCloseClick={() => setSelectedPosition(null)}
                            >
                                {renderInfoWindowContent()}
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </div>
            ) : (
                ""
            )}
        </>
    )
}

export default MapaLuminarias
