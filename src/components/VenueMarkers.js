/* eslint-disable no-unreachable */
import React, { Fragment } from 'react'
import { Marker } from 'react-leaflet';
import MarkerPopup from './MarkerPopup';

import employee from "../assets/emp_location_icon.svg";
import asset from '../assets/asset_location_icon.svg';
import pulse from '../assets/pulse_location_icon.svg';
import freefall from '../assets/freefall_location_icon.svg';
import inactive from '../assets/inactive_location_icon.svg';

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
const freefallIcon = new Icon({
  iconUrl: freefall,
  iconSize: [32, 32]
})

const inactiveIcon = new Icon({
  iconUrl: inactive,
  iconSize: [32, 32]
})

const VenueMarkers = (props) => {
  const { venues } = props;
  console.log("VenueMarker ========>", venues);
  const markers = venues.map(function (venue, index) {

    if ((new Date() - new Date(venue.lastseen)) >= (2 * 60 * 1000)) {
      return null;
      // eslint-disable-next-line no-lone-blocks
      {/*(
        <Marker key={index}
        position={[venue.lat, venue.lan]}
        icon={inactiveIcon} >
        <MarkerPopup data={venue} />
      </Marker>) */}

    } else if (venue.value === 1 && (venue.lat !== 0 && venue.lan !== 0)) {
      return (
        <Marker key={index}
          position={[venue.lat, venue.lan]}
          icon={pulseIcon} >
          <MarkerPopup data={venue} />
        </Marker>
      )
    } else if (venue.value === 3 && (venue.lat !== 0 && venue.lan !== 0)) {
      return (
        <Marker key={index}
          position={[venue.lat, venue.lan]}
          icon={freefallIcon} >
          <MarkerPopup data={venue} />
        </Marker>
      )
    }
    else if (venue.type === 1 && venue.value.length === 0 && (venue.lat !== 0 && venue.lan !== 0)) {
      return (
        <Marker key={index}
          position={[venue.lat, venue.lan]}
          icon={empIcon} >
          <MarkerPopup data={venue} />
        </Marker>
      )
    } else if (venue.type === 2 && venue.value.length === 0 && (venue.lat !== 0 && venue.lan !== 0)) {
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
