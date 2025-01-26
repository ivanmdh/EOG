import { GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api"

const MarkerCenter = {
    lat: 20.481017956093783,
    lng: -100.96094126223818,
}

const MarkerContainerStyle = {
    height: "500px",
}

const MapaLuminarias = () => {

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

    return (
        <div className="map-js-height overflow-hidden">
            <div id="gmap-simple" className="map-block">
                { isLoaded ? (
                    <GoogleMap mapContainerStyle={ MarkerContainerStyle } center={ MarkerCenter } zoom={ 14 } options={ mapOptions }>
                        <></>
                    </GoogleMap>
                ) : "" }
            </div>
        </div>
    )
}

export default MapaLuminarias