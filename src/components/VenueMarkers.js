import React, { Fragment } from 'react'
import { Marker } from 'react-leaflet';
import { VenueLocationIcon1, VenueLocationIcon2, VenueLocationIcon3 } from './VenueLocationIcon';
import MarkerPopup from './MarkerPopup';

const VenueMarkers = (props) => {
  const { venues, search } = props;
  console.log(search, "VenueMarker ========>", venues);
  const markers = venues.map(function (venue, index) {
    // if (search === "all") {
    if (venue.value === 1) {
      return (
        <Marker key={index}
          position={[venue.lat, venue.lan]}
          icon={VenueLocationIcon3} >
          <MarkerPopup data={venue} />
        </Marker>
      )
    }
    if (venue.type === 1) {
      return (
        <Marker key={index}
          position={[venue.lat, venue.lan]}
          icon={VenueLocationIcon1} >
          <MarkerPopup data={venue} />
        </Marker>
      )
    } else if (venue.type === 2) {
      return (
        <Marker key={index}
          position={[venue.lat, venue.lan]}
          icon={VenueLocationIcon2} >
          <MarkerPopup data={venue} />
        </Marker>
      )
    }
    // }
    // else if (search === "searching") {
    //   return (
    //     <Marker key={index}
    //       position={[venue.lat, venue.lan]}
    //       icon={VenueLocationIcon2} >
    //       <MarkerPopup data={venue} />
    //     </Marker>
    //   )
    // }
  }.bind(this));

  return <Fragment>{markers}</Fragment>
};

export default VenueMarkers;
