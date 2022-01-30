import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as placeDate from "./data/skateboard-parks.json";

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 31.7959242,
    longitude: 35.2119808,
    width: "100vw",
    height: "100vh",
    zoom: 7
  });
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPlace(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      > 
        {placeDate.features.map(place => (
          <Marker
            key={place.PLACE_ID}
            latitude={place.coordinates[0]}
            longitude={place.coordinates[1]}
          >
            <button
              className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedPlace(place);
              }}
            >
              <img src="/pin.png" alt="Skate Park Icon" />
            </button>
          </Marker>
        ))}

        {selectedPlace ? (
          <Popup
            latitude={selectedPlace.coordinates[0]}
            longitude={selectedPlace.coordinates[1]}
            onClose={() => {
              setSelectedPlace(null);
            }}
          >
            <div>
              <center>
                <img src={selectedPlace.images[0]} alt="place" width="200px"/>
                <h2>{selectedPlace.name}</h2>
                <p style={{fontSize:'10px'}}><b>Holy place in {selectedPlace.religions[0]} {selectedPlace.religions[1]?`& ${selectedPlace.religions[1]}` :null}  {selectedPlace.religions[2]?`& ${selectedPlace.religions[2]}` :null}</b></p>
              </center>
            </div>
          </Popup>
        ) : null} 
      </ReactMapGL>
    </div>
  );
}
