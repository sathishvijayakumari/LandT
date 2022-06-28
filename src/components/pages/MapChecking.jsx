import React, { useRef, Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import "../../App.css";
import "leaflet/dist/leaflet.css";

const defaultCenter = [38.9072, -77.0369];
const defaultZoom = 8;
const disneyWorldLatLng = [28.3852, -81.5639];
const disneyLandLatLng = [33.8121, -117.919];
export default class MapChecking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 12.9311, lng: 77.6232 },
    };
    this.mapRef = React.createRef();
  }
  handleOnSetView = () => {
    const { current = {} } = this.mapRef;
    const { leafletElement: map } = current;

    map.flyTo(disneyWorldLatLng, 14, {
      duration: 5
    });
  }

  handleOnFlyTo = (lat, lon) => {
    const { current = {} } = this.mapRef;
    const { leafletElement: map } = current;

    map.flyTo([lat, lon], 14, {
      duration: 5
    });
  }
  render() {
    const { currentLocation } = this.state;
    return (
      <div style={{ marginLeft: "40px", display: "flex" }}>

        <Map ref={this.mapRef}
          center={currentLocation}
          zoom={defaultZoom}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </Map>
        <div className="sidebar">
          <h2>Map Checking</h2>
          <p>
            <button style={{ margin: '3px' }} onClick={() => this.handleOnFlyTo(12.9311, 77.6232)}>Vacus</button>
            <button style={{ margin: '3px' }} onClick={() => this.handleOnFlyTo(13.0827, 80.2707)}>Chennai</button>
            <button style={{ margin: '3px' }} onClick={() => this.handleOnFlyTo(19.0760, 72.8777)}>Mumbai</button>
            <button style={{ margin: '3px' }} onClick={() => this.handleOnFlyTo(22.5726, 88.3639)}>Kolkata</button>
            <button style={{ margin: '3px' }} onClick={() => this.handleOnFlyTo(9.9252, 78.1198)}>Madurai</button>
            <button style={{ margin: '3px' }} onClick={() => this.handleOnFlyTo(12.2253, 79.0747)}>Thiruvannamalai</button>
          </p>
        </div>
      </div>
    )
  }
}
