import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from "react-leaflet"
//import ChangeView from "./ChangeView"
import { mapData } from '../util';

const Map = ({countries, center, zoom }) => {

    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
      }

    
    console.log("center", center, "zoom", zoom)
    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom} >
            <ChangeView center={center} zoom={zoom} /> 
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                {console.log(countries)}
                {mapData(countries)}
            </MapContainer>

        </div>
    );
};

export default Map;
