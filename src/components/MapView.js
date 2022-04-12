import React, { Component } from 'react';
import {
  Map, TileLayer,
  Polyline,
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import Markers from './VenueMarkers';
import axios from "axios";
import $ from "jquery";

const multiPolyline = [
  [
    21.150054708432634,
    72.6614499092102
  ],
  [
    21.147393054605054,
    72.66080617904663
  ],
  [
    21.14599216495789,
    72.64576435089111
  ],
  [
    21.152696302529215,
    72.64756679534912
  ],
  [
    21.15335669369065,
    72.64769554138184
  ],
  [
    21.156918752801513,
    72.64780282974243
  ],
  [
    21.171566319584592,
    72.64672994613647
  ],
  [
    21.174207529779384,
    72.6478886604309
  ],
  [
    21.172666829563532,
    72.6547122001648
  ],
  [
    21.16704413810164,
    72.65529155731201
  ],
  [
    21.168364789460362,
    72.66117095947266
  ],
  [
    21.170765943548595,
    72.66217947006226
  ],
  [
    21.169425303987527,
    72.66602039337158
  ],
  [
    21.150174781913794,
    72.6614499092102
  ],
  [
    21.149974659391116,
    72.66142845153809
  ]
]

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 12.9311, lng: 77.6232 },
      zoom: 19,
      res_data: [],
      search: "",
    }
  }

  componentDidMount() {
    this.trackingAllData();
  }

  trackingAllData = () => {
    this.setState({ res_data: [], search: "" });
    $("#tagid").val("");
    axios({ method: "GET", url: "/api/tracking" })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          console.log("===----==>", res);
          let data = res.data;
          if (data.length > 0) {
            this.setState({ res_data: data, search: "all"})
          } else {
            this.props.search("No data Found.");
          }
        }
      })
      .catch((error) => {
        console.log("=====>", error);
        let errorStaus = "";
        if (error.response.status === 403) {
          errorStaus = "User Session has timed out. Please Login again"
        } else if (error.response.status === 400) {
          errorStaus = "Bad Request!";
        } else if (error.response.status === 404) {
          errorStaus = "No data Found.";
        }
        this.props.search(errorStaus);
      })
  }

  locationSearch = () => {
    this.setState({ res_data: [], search: ""})
    let tagid = $("#tagid").val();
    if (tagid.length !== 0) {
      if (!tagid.match("([A-Za-z0-9]{2}[-]){5}([A-Za-z0-9]){2}")) {
        this.props.search("Invalid Asset ID");
      } else {
        axios({ method: "POST", url: "/api/tracking", data: { tagid: tagid } })
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              console.log("locationSearch===----==>", res);
              let data = res.data;
              if (data.length !== 0) {
                this.setState({ res_data: data, search:"searching" })
              } else {
                this.props.search("No data Found.");
              }
             
            }
          })
          .catch((error) => {
            console.log("=====>", error);
            let errorStaus = "";
            if (error.response.status === 403) {
              errorStaus = "User Session has timed out. Please Login again"
            } else if (error.response.status === 400) {
              errorStaus = "Bad Request!";
            } else if (error.response.status === 404) {
              errorStaus = "No data Found.";
            }
            this.props.search(errorStaus);
          })
      }
    } else {
      this.props.search("Required TagID.");
    }
  }

  render() {
    const { currentLocation, zoom, res_data, search } = this.state;
    return (
      <div style={{ marginLeft: '35px' }}>
        <div className="inputdiv" style={{ margin: "-20px 0px 20px 0px", display: "flex" }}>
          <span className="label" style={{ width: "100px" }}>Tag ID :</span>
          <input type="text"
            name="tagid"
            placeholder='5a-c2-15-00-00-00'
            id="tagid"
            required="required" />

          <i className="far fa-search"
            onClick={this.locationSearch}
            style={{
              cursor: "pointer",
              fontSize: '26px',
              marginLeft: '10px',
              marginTop: "5px",
              color: '#00629B'
            }}>
          </i>

          <div
            onClick={this.trackingAllData}
            style={{
              marginLeft: "30px",
              width: "90px",
              height: "35px",
              position: "relative",
              background: "#00629B",
              borderRadius: "5px"
            }} >
            <p
              style={{
                color: "#FFF",
                fontSize: "18px",
                position: "absolute",
                top: "-10px",
                marginLeft: "24px"
              }}>Clear</p>
          </div>
        </div>
        <Map
          scrollWheelZoom={false}
          center={currentLocation}
          zoom={zoom}
          // minZoom={14}
          maxZoom={21}
          style={{ width: "98%", height: "480px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <TileLayer url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" />
          {
            res_data.length > 0 && (
              <Markers search = {search} venues={res_data} />
            )
          }
          <Polyline color='lime' positions={multiPolyline} />
        </Map>
      </div>
    );
  }
}

export default MapView;