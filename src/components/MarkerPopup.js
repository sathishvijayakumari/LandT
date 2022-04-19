import React from 'react';
import { Popup } from 'react-leaflet';

const MarkerPopup = (props) => {
  const { type, name, tagid, lastseen,lat,lan } = props.data;
  return (
    <Popup>
      <div className="map_popup">
        <table>
          <tbody>
            <tr>
              <th colSpan="2">{type === 1 ? "Employee" : "Asset"}</th>
            </tr>
            <tr>
              <td>Name</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>TagID</td>
              <td>{tagid}</td>
            </tr>
            <tr>
              <td> Timestamp </td>
              <td>{lastseen.substring(0, 19).replace("T", " ")}</td>
            </tr>
            <tr>
              <td>Lat</td>
              <td>{lat}</td>
            </tr>
            <tr>
              <td>Long</td>
              <td>{lan}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Popup>
  );
};

export default MarkerPopup;
