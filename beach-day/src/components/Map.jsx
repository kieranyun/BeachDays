import React, { useState } from 'react';
import {
  GoogleMap, LoadScript, Marker,
} from '@react-google-maps/api';

function Map(props) {
  const mapStyles = {
    height: '50vh',
    width: '66vh'
  };

  const defaultCenter = {
    lat: 37.774, lng: -122.419
  };

  const [currentPosition, setCurrentPosition] = useState(defaultCenter);


  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
    props.setBeach({ lat, lng });
    console.log(currentPosition);
  };

  const onLoad = marker => {
    console.log('marker: ', marker, currentPosition)
  }

  return (
    <div>
      <h3>Drag Marker to your beach</h3>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_MAPKEY}
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={9}
          center={defaultCenter}
        >
          {
            currentPosition.lat ?
            <Marker
            position={currentPosition}
            onDragEnd={(e) => onMarkerDragEnd(e)}
            draggable={true} /> :
            null
          }
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map;
