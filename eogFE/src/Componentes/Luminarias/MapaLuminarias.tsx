import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useState } from "react"

const MarkerCenter = {
    lat: 20.481017956093783,
    lng: -100.96094126223818,
}

const MarkerContainerStyle = {
    height: "400px",
}

const MapaLuminarias = () => {

    const [positions, setPositions]: any = useState([
                                                        {
                                                            lat: 20.481017956093783,
                                                            lng: -100.96094126223818,
                                                            data: {
                                                                title: "Luminaria 1",
                                                                image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                                                                poste: "Poste 1",
                                                                potencia: "100W"
                                                            }
                                                        },
                                                        {
                                                            lat: 20.482017956093783,
                                                            lng: -100.96194126223818,
                                                            data: {
                                                                title: "Luminaria 2",
                                                                image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
                                                                poste: "Poste 2",
                                                                potencia: "150W"
                                                            }
                                                        },
                                                    ])
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

    const { isLoaded } = useJsApiLoader(
        {
            id: "google-map-script",
            googleMapsApiKey: "AIzaSyCJEX-ttp9P-JRPB8di_WblQtd0t0O509g",
        })

    const iconUrl = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"

    return (
<>
                { isLoaded ? (
                    <GoogleMap mapContainerStyle={ MarkerContainerStyle } center={ MarkerCenter } zoom={ 14 } options={ mapOptions }>
                        { positions.map((position: any, index: number) => (
                            <Marker
                                key={ index }
                                position={ { lat: position.lat, lng: position.lng } }
                                icon={ iconUrl }
                                onClick={ () => setSelectedPosition(position) }
                            />
                        )) }
                        {selectedPosition && (
                            <InfoWindow
                                position={{ lat: selectedPosition.lat, lng: selectedPosition.lng }}
                                onCloseClick={() => setSelectedPosition(null)}
                            >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <img src={selectedPosition.data.image} alt={selectedPosition.data.title} style={{ width: "100px", height: "100px", marginRight: "10px" }} />
                                    <div>
                                        <h3>{selectedPosition.data.title}</h3>
                                        <p>Poste: {selectedPosition.data.poste}</p>
                                        <p>Potencia: {selectedPosition.data.potencia}</p>
                                    </div>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                ) : "" }
</>
    )
}

export default MapaLuminarias