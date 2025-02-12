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
                                            googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
                                        })

    const iconUrl = '/assets/luminaria.png'

    useEffect(() => {
        apiService.get("/api/luminarias/mapa").then((response) => {
            setPositions(response?.data?.Luminarias ?? [])
        })
    }, [refreshData])

    return (
        <>
            { isLoaded ? (
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
                                <p style={{ margin: 0 }}>RPU: { selectedPosition.data.rpu }</p>
                                <p style={{ margin: 0 }}>Direccion: { selectedPosition.data.direccion }</p>
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
            ) : (
                  ""
              ) }
        </>
    )
}

export default MapaLuminarias
