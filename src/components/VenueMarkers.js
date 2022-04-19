import React, { Fragment } from 'react'
import { Marker } from 'react-leaflet';
import MarkerPopup from './MarkerPopup';

import employee from "../assets/emp_location_icon.svg";
import asset from '../assets/asset_location_icon.svg';
import pulse from '../assets/pulse_location_icon.svg';
import { Icon } from 'leaflet'
const empIcon = new Icon({
  iconUrl: employee,
  iconSize: [32, 32]
})
const assetIcon = new Icon({
  iconUrl: asset,
  iconSize: [32, 32]
})
const pulseIcon = new Icon({
  iconUrl: pulse,
  iconSize: [32, 32]
})

const VenueMarkers = (props) => {
  const { venues} = props;
  console.log("VenueMarker ========>", venues);
  const markers = venues.map(function (venue, index) {
    if (venue.value.length !== 0) {
      return (
        <Marker key={index}
          position={[venue.lat, venue.lan]}
          icon={pulseIcon} >
          <MarkerPopup data={venue} />
        </Marker>
      )
    }
    else if (venue.type === 1 && venue.value.length === 0) {
      return (
        <Marker key={index}
          position={[venue.lat, venue.lan]}
          icon={empIcon} >
          <MarkerPopup data={venue} />
        </Marker>
      )
    } else if (venue.type === 2 && venue.value.length === 0) {
      return (
        <Marker key={index}
          position={[venue.lat, venue.lan]}
          icon={assetIcon} >
          <MarkerPopup data={venue} />
        </Marker>
      )
    }

  }.bind(this));

  return <Fragment>{markers}</Fragment>
};

export default VenueMarkers;
