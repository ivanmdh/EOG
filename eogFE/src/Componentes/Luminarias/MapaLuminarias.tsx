import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import apiService from "@services/apiServices";
import { useModalContext } from "@Context/ModalContext";

const MarkerCenter = {
  lat: 20.481017956093783,
  lng: -100.96094126223818,
};

const MarkerContainerStyle = {
  height: "400px",
};

const MapaLuminarias = () => {
  const { refreshData } = useModalContext();

  const [positions, setPositions]: any = useState([]);
  const [selectedPosition, setSelectedPosition]: any = useState(null);

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
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCJEX-ttp9P-JRPB8di_WblQtd0t0O509g",
  });

  const iconUrl =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  useEffect(() => {
    apiService.get("/api/luminarias/mapa").then((response) => {
      setPositions(response?.data?.Luminarias ?? []);
    });
  }, [refreshData]);

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={MarkerContainerStyle}
          center={MarkerCenter}
          zoom={14}
          options={mapOptions}
        >
          {positions.map((position: any, index: number) => (
            <Marker
              key={index}
              position={{ lat: position.lat, lng: position.lng }}
              icon={iconUrl}
              onClick={() => setSelectedPosition(position)}
            />
          ))}
          {selectedPosition && (
            <InfoWindow
              position={{
                lat: selectedPosition.lat,
                lng: selectedPosition.lng,
              }}
              onCloseClick={() => setSelectedPosition(null)}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={selectedPosition.data.image}
                  alt={selectedPosition.data.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <h3>{selectedPosition.data.title}</h3>
                  <p>Poste: {selectedPosition.data.poste}</p>
                  <p>Potencia: {selectedPosition.data.potencia}</p>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        ""
      )}
    </>
  );
};

export default MapaLuminarias;
