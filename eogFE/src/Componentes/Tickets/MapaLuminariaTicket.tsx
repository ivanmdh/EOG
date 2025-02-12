import {
    GoogleMap, InfoWindow,
    Marker,
    useJsApiLoader,
} from "@react-google-maps/api"
import { useRef, useEffect, useState } from "react"
import apiService from "@services/apiServices"

const MarkerCenter = {
    lat: 20.481017956093783,
    lng: -100.96094126223818,
}

const MarkerContainerStyle = {
    height: "250px",
}

interface Props {
    IDDireccion: number,
    setFieldValue: any
}

const MapaLuminariasTicket = ({ IDDireccion, setFieldValue }: Props) => {
    const mapRef = useRef<google.maps.Map | null>(null)

    const [positions, setPositions]: any = useState([])
    const [selectedPosition, setSelectedPosition]: any = useState(null)

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

    const iconUrl = '/assets/luminaria.png'

    useEffect(() => {
        apiService.get(`/api/luminarias/mapa/${ IDDireccion }`).then((response) => {
            const luminarias = response?.data?.Luminarias ?? []
            setPositions(luminarias)
            if (mapRef.current && luminarias.length > 0) {
                const bounds = new google.maps.LatLngBounds()
                luminarias.forEach((position: any) => {
                    bounds.extend(new google.maps.LatLng(position.ubicacion.latitud, position.ubicacion.longitud))
                })
                setSelectedPosition(null)
                mapRef.current.fitBounds(bounds)
            }
        })
    }, [IDDireccion])

    useEffect(() => {
        setFieldValue("luminaria", selectedPosition)
        setFieldValue("lampara", null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPosition])

    return (
        <>
            { isLoaded ? (
                <GoogleMap
                    mapContainerStyle={ MarkerContainerStyle }
                    center={ MarkerCenter }
                    zoom={ 14 }
                    options={ mapOptions }
                    onLoad={ map => {
                        mapRef.current = map
                    } }
                >
                    { positions.map((position: any, index: number) => (
                        <Marker
                            key={ index }
                            position={ { lat: position.ubicacion.latitud, lng: position.ubicacion.longitud } }
                            icon={ iconUrl }
                            onClick={ () => setSelectedPosition(position) }
                        />
                    )) }
                    {selectedPosition && (
                        <InfoWindow
                            position={{
                                lat: selectedPosition.ubicacion.latitud,
                                lng: selectedPosition.ubicacion.longitud,
                            }}
                            onCloseClick={() => setSelectedPosition(null)}
                        >
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div>
                                    <h3>Poste: { selectedPosition.folio }</h3>
                                </div>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            ) : (
                  ""
              ) }
        </>
    )
}

export default MapaLuminariasTicket
