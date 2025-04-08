import {
    GoogleMap,
    InfoWindow,
    Marker,
    useJsApiLoader,
} from "@react-google-maps/api"
import { useEffect, useState, useRef, useCallback } from "react"
import apiService from "@services/apiServices"
import { useModalContext } from "@Context/ModalContext"
import axios from "axios"

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
    const cancelTokenRef = useRef<any>(null)
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

    const [positions, setPositions]: any = useState([])
    const [selectedPosition, setSelectedPosition]: any = useState(null)
    const [mapType, setMapType] = useState("hybrid") // Estado para controlar el tipo de mapa (hybrid o roadmap)
    const [currentZoom, setCurrentZoom] = useState(14)
    const [isAgrupado, setIsAgrupado] = useState(false)
    const [totalLuminarias, setTotalLuminarias] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    // Botón manual para actualizar la vista
    const [showUpdateButton, setShowUpdateButton] = useState(false)
    const [mapLoaded, setMapLoaded] = useState(false)

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
        mapTypeId: mapType,
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

    const cargarLuminarias = useCallback(() => {
        if (!mapRef.current || !mapLoaded) {
            return;
        }
        
        if (cancelTokenRef.current) {
            cancelTokenRef.current.cancel("Operación cancelada por nueva petición");
        }
        
        cancelTokenRef.current = axios.CancelToken.source();
        
        setIsLoading(true);
        setShowUpdateButton(false);
        
        const bounds = mapRef.current.getBounds();
        
        let params;
        if (!bounds) {
            const center = mapRef.current.getCenter();
            if (!center) {
                setIsLoading(false);
                return;
            }
            
            const lat = center.lat();
            const lng = center.lng();
            const offset = 0.02 * (1 / (currentZoom / 14));
            
            params = {
                zoom: currentZoom,
                bounds: {
                    ne: { lat: lat + offset, lng: lng + offset },
                    sw: { lat: lat - offset, lng: lng - offset }
                }
            };
        } else {
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            
            params = {
                zoom: currentZoom,
                bounds: {
                    ne: { lat: ne.lat(), lng: ne.lng() },
                    sw: { lat: sw.lat(), lng: sw.lng() }
                }
            };
        }
        
        apiService.post("/api/luminarias/mapa", params, {
            cancelToken: cancelTokenRef.current.token
        }).then((response) => {
            setPositions(response?.data?.Luminarias ?? []);
            setIsAgrupado(response?.data?.isAgrupado ?? false);
            setTotalLuminarias(response?.data?.totalLuminarias ?? 0);
            setIsLoading(false);
        }).catch(error => {
            if (!axios.isCancel(error)) {
                console.error("Error al cargar luminarias:", error);
                setIsLoading(false);
            } else {
                console.log("Petición cancelada");
            }
        });
    }, [currentZoom, mapLoaded]);

    useEffect(() => {
        if (mapRef.current && mapLoaded) {
            setTimeout(() => {
                cargarLuminarias();
            }, 500);
        }
    }, [mapRef.current, mapLoaded, cargarLuminarias]);

    useEffect(() => {
        if (mapRef.current && mapLoaded) {
            cargarLuminarias();
        }
    }, [refreshData, cargarLuminarias, mapLoaded]);

    const handleMapChange = useCallback(() => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        
        debounceTimerRef.current = setTimeout(() => {
            setShowUpdateButton(true);
        }, 500);
    }, []);

    const handleClusterClick = (cluster: any) => {
        if (mapRef.current) {
            mapRef.current.setZoom((currentZoom || 14) + 2);
            mapRef.current.panTo({
                lat: cluster.ubicacion.latitud,
                lng: cluster.ubicacion.longitud
            });
            handleMapChange();
        }
    }

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

    const updateButtonStyle = {
        position: 'absolute' as const,
        top: '10px',
        left: '10px',
        zIndex: 1,
        backgroundColor: '#4285F4',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 15px',
        fontWeight: 'bold' as const,
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        display: showUpdateButton ? 'block' : 'none'
    }

    const totalLuminariasStyle = {
        position: 'absolute' as const,
        bottom: '10px',
        left: '10px',
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '5px 10px',
        fontSize: '12px'
    }

    const loadingStyle = {
        position: 'absolute' as const,
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

    const renderInfoWindowContent = () => {
        if (!selectedPosition) return null;
        
        if (selectedPosition.isCluster) {
            return (
                <div>
                    <h4>Grupo de {selectedPosition.count} luminarias</h4>
                    <p>Haz clic para acercar y ver detalles</p>
                </div>
            );
        }
        
        return (
            <div>
                <h3>Luminaria: {selectedPosition.data.folio}</h3>
                <p style={{ margin: 0 }}># Cuenta: {selectedPosition.data.num_cuenta || "—"}</p>
                <p style={{ margin: 0 }}>RPU: {selectedPosition.data.rpu || "—"}</p>
                <p style={{ margin: 0 }}>Direccion: {selectedPosition.data.direccion || "—"}</p>
                <p style={{ margin: 0 }}>Colonia: {selectedPosition.data.colonia || "—"}</p>
                <p style={{ margin: 0 }}>Tarifa: {selectedPosition.data.tarifa || "—"}</p>
                <p style={{ margin: 0 }}>Lat: {selectedPosition.ubicacion.latitud}, Lng: {selectedPosition.ubicacion.longitud}</p>
                <div>
                    {selectedPosition.data.lamparas.map((lampara: any, index: number) => (
                        <div style={{ display: "flex", flexDirection: "column", marginTop: "10px", marginBottom: "10px", borderTop: "1px solid #ccc", paddingTop: "10px" }} key={index}>
                            {lampara.foto_secundaria ? (
                                <div style={{ marginBottom: "5px" }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={`${lampara.foto_secundaria}/thumb`}
                                        alt={`Foto secundaria - ${lampara.folio}`}
                                        style={{
                                            width: "150px",
                                            display: "block",
                                            margin: "0 auto 10px auto"
                                        }}
                                    />
                                </div>
                            ) : (
                                <div style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
                                    Foto secundaria no disponible
                                </div>
                            )}
                            <div>
                                <h5 style={{ margin: "0 0 5px 0" }}>{lampara.folio || "—"}</h5>
                                <p style={{ margin: "0 0 5px 0" }}><strong>Potencia:</strong> {lampara.potencia || "—"}</p>
                                <p style={{ margin: "0" }}><strong>Número de Serie:</strong> {lampara.numero_serie || "—"}</p>
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
                    
                    <button
                        onClick={cargarLuminarias}
                        style={updateButtonStyle}
                    >
                        Actualizar luminarias en esta área
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
                            setMapLoaded(true);
                        }}
                        onZoomChanged={() => {
                            if (mapRef.current) {
                                const zoom = mapRef.current.getZoom();
                                if (zoom && zoom !== currentZoom) {
                                    setCurrentZoom(zoom);
                                    handleMapChange();
                                }
                            }
                        }}
                        onDragEnd={() => {
                            handleMapChange();
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
