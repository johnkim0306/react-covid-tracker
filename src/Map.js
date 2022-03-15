import React from "react";
import { Map as LeafletMap, TileLayer, ZoomControl } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom} zoomControl={false} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
        <ZoomControl position="bottomright"></ZoomControl>
      </LeafletMap>
    </div>
  );
}

export default Map;
