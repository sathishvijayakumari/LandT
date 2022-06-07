import React, { Component } from 'react';
import {
  Map, TileLayer,
  Polyline,
} from 'react-leaflet';

import "leaflet/dist/leaflet.css";
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

const graphBtn = {
  width: '90px',
  height: '35px',
  border: "none",
  marginLeft: "15px",
  borderRadius: "4px",
  fontSize: "16px",
  cursor: "pointer",
  color: "Black",
  fontWeight: "bold",
  boxShadow: "3px 3px 5px 3px rgba(0, 0, 0, 0.25)",
};


class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 12.9311, lng: 77.6232 },
      zoom: 19,
      trackType: "gps",
      res_data: [],
      count: [0, 0, 0, 0],
    }
  }

  componentDidMount() {
    this.trackingInterval("");
  }

  componentWillUnmount() {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
  }

  optionChange = (btnId) => {
    $("#gps").css({ background: "none", color: "#000" });
    $("#ips").css({ background: "none", color: "#000" });
    $("#" + btnId).css({ background: "rgb(0, 98, 135)", color: "#FFF" });
  };


  trackingInterval = (tagHide) => {
    if (tagHide === "clear") {
      $("#tagid").val("");
      clearInterval(this.interval1);
    }
    this.getGpsIpsData("gps");
    this.interval1 = setInterval(() => {
      this.getGpsIpsData(this.state.trackType);
    }, 5 * 1000)
  }

  // trackingAllData = () => {
  //   this.setState({ res_data: [], count: [0, 0, 0, 0] });
  //   clearInterval(this.interval2);
  //   axios({ method: "GET", url: "/api/tracking" })
  //     .then((res) => {
  //       if (res.status === 200 || res.status === 201) {
  //         console.log("===----==>", res);
  //         let data = res.data;
  //         let emp = 0, ass = 0, pan = 0, free = 0;
  //         for (let i = 0; i < data.length; i++) {
  //           if (data[i].value === 1) {
  //             pan += 1;
  //           } else if (data[i].value === 3) {
  //             free += 1;
  //           } else if (data[i].type === 1 && data[i].value.length === 0) {
  //             emp += 1;
  //           } else if (data[i].type === 2 && data[i].value.length === 0) {
  //             ass += 1;
  //           } 
  //         }
  //         console.log("------->", [emp, ass, pan, free]);
  //         if (data.length > 0) {
  //           this.setState({ res_data: data, count: [emp, ass, pan, free] });
  //         } else {
  //           this.props.search("No data Found.");
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("=====>", error);
  //       let errorStaus = "";
  //       if (error.response.status === 403) {
  //         errorStaus = "User Session has timed out. Please Login again"
  //       } else if (error.response.status === 400) {
  //         errorStaus = "Bad Request!";
  //       } else if (error.response.status === 404) {
  //         errorStaus = "No data Found.";
  //       }
  //       this.props.search(errorStaus);
  //     })
  // }

  getGpsIpsData = (type) => {
    this.optionChange(type);
    this.setState({ trackType: type, res_data: [], count: [0, 0, 0, 0] });
    clearInterval(this.interval2);
    axios({ method: "POST", url: "/api/tracking/gps/ips", data: { key: type } })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          console.log("===----==>", res);
          let data = res.data;
          let emp = 0, ass = 0, pan = 0, free = 0;
          for (let i = 0; i < data.length; i++) {
            if (data[i].value === 1) {
              pan += 1;
            } else if (data[i].value === 3) {
              free += 1;
            } else if (data[i].type === 1 && data[i].value.length === 0) {
              emp += 1;
            } else if (data[i].type === 2 && data[i].value.length === 0) {
              ass += 1;
            }
          }
          if (data.length > 0) {
            this.setState({ res_data: data, count: [emp, ass, pan, free] });
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

  locationSearchInt = () => {
    this.locationSearch();
    this.interval2 = setInterval(() => {
      this.locationSearch();
    }, 5 * 1000)
  }

  locationSearch = () => {
    clearInterval(this.interval1);
    let tagid = $("#tagid").val();
    if (tagid.length !== 0) {
      if (!tagid.match("([A-Za-z0-9]{2}[-]){5}([A-Za-z0-9]){2}")) {
        this.props.search("Invalid Asset ID");
      } else {
        this.setState({ res_data: [] });
        axios({ method: "POST", url: "/api/tracking", data: { tagid: tagid } })
          .then((res) => {
            if (res.status === 200 || res.status === 201) {
              console.log("locationSearch===----==>", res);
              let data = res.data;
              if (data.length !== 0) {
                this.setState({ res_data: data })
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

  sessionTimeout = () => {
    $("#sessionModal").css("display", "none");
    sessionStorage.removeItem('login')
    window.location.pathname = '/login'
  };

  render() {
    const { currentLocation, zoom, res_data, count } = this.state;
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
            onClick={this.locationSearchInt}
            style={{
              cursor: "pointer",
              fontSize: '26px',
              marginLeft: '10px',
              marginTop: "5px",
              color: '#00629B'
            }}>
          </i>

          <div
            onClick={() => this.trackingInterval("clear")}
            style={{
              marginLeft: "30px",
              width: "90px",
              height: "35px",
              position: "relative",
              background: "#d1000099",
              borderRadius: "5px"
            }} >
            <p
              style={{
                cursor: "pointer",
                color: "#FFF",
                fontSize: "18px",
                position: "absolute",
                top: "-14px",
                marginLeft: "24px"
              }}>Clear</p>
          </div>

          <div style={{
            marginTop: "-10px",
            marginLeft: "20px",
            position: "absolute",
            right: "45px"
          }}>
            <button
              id="gps"
              className="heading"
              style={graphBtn}
              onClick={() => this.getGpsIpsData("gps")}
            >
              GPS
            </button>
            <button
              id="ips"
              className="heading"
              style={graphBtn}
              onClick={() => this.getGpsIpsData("ips")}
            >
              IPS
            </button>
          </div>
        </div>

        <div style={{ marginTop: "15px", display: "flex", marginBottom: "15px" }}>
          <div style={{ display: "flex" }}>
            <div>
              <i className="fas fa-map-marker-alt"
                style={{
                  fontSize: '20px',
                  marginRight: '5px',
                  marginTop: "2px",
                  color: '#007acc'
                }}></i>
              <span style={{ fontSize: "17px" }}>Employee Tag({count[0]})</span>
            </div>

            <div style={{ marginLeft: "15px" }}>
              <i className="fas fa-map-marker-alt"
                style={{
                  fontSize: '20px',
                  marginRight: '5px',
                  marginTop: "2px",
                  color: '#9933ff'
                }}></i>
              <span style={{ fontSize: "17px" }}>Asset Tag({count[1]})</span>
            </div>

            <div style={{ marginLeft: "15px" }}>
              <i className="fas fa-map-marker-alt"
                style={{
                  fontSize: '20px',
                  marginRight: '5px',
                  marginTop: "2px",
                  color: '#F00'
                }}></i>
              <span style={{ fontSize: "17px" }}>Panic ({count[2]})</span>
            </div>

            <div style={{ marginLeft: "15px" }}>
              <i className="fas fa-map-marker-alt"
                style={{
                  fontSize: '20px',
                  marginRight: '5px',
                  marginTop: "2px",
                  color: '#ff9900'
                }}></i>
              <span style={{ fontSize: "17px" }}>Falldown({count[3]})</span>
            </div>

            <div style={{ marginLeft: "15px" }}>
              <i className="fas fa-map-marker-alt"
                style={{
                  fontSize: '20px',
                  marginRight: '5px',
                  marginTop: "2px",
                  color: '#800080'
                }}></i>
              <span style={{ fontSize: "17px" }}>Inactive</span>
            </div>
          </div>
        </div>


        <Map
          scrollWheelZoom={true}
          center={currentLocation}
          zoom={zoom}
          // minZoom={14}
          maxZoom={21}
          style={{ width: "98%", height: "480px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <TileLayer url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" />
          {
            res_data.length > 0 && (
              <Markers venues={res_data} />
            )
          }
          <Polyline color='lime' positions={multiPolyline} />
        </Map>

        <div id="sessionModal" className="modal">
          <div className="modal-content">
            <p id="content"
              style={{ textAlign: "center" }}></p>
            <button
              id="okBtn"
              className="btn-center btn success-btn"
              onClick={this.sessionTimeout}>
              OK
            </button>
          </div>
        </div>
      </div >
    );
  }
}

export default MapView;
