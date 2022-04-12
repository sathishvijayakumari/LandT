import React from 'react';
import { Popup } from 'react-leaflet';

const MarkerPopup = (props) => {
  const { name, tagid } = props.data;

  return (
    <Popup>
      <div className='poup-text'>
        <p>{name}</p>
        <p>{tagid}</p>
      </div>
    </Popup>);
};

export default MarkerPopup;
