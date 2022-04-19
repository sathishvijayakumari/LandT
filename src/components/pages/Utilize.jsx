import React, { Component } from 'react'
import $ from 'jquery';
import axios from 'axios';
import ApexCharts from 'react-apexcharts'
import { sidelinkClicked } from '../leftsidebar/Leftsidebar';

const graphBtn = {
  width: "100px",
  height: "35px",
  border: "none",
  marginLeft: "15px",
  borderRadius: "4px",
  fontSize: "16px",
  cursor: "pointer",
  color: "Black",
  fontWeight: "bold",
  boxShadow: "3px 3px 5px 3px rgba(0, 0, 0, 0.25)",
};

export default class Utilize extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      success: false,
      error: false,
      series: [],
      petrolData: [],
      dieselData: [],
      oilData: [],
      barLabel: [],
      cardDet: [],
      kpiName: "",
      optionsPetrol: {
        chart: {
          id: 'area-datetime',
          type: 'area',
          height: 450,
          foreColor: "#004d99", // labels colors
          curve: 'smooth',
          zoom: {
            autoScaleYaxis: true
          },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 1500,
            animateGradually: {
              enabled: true,
              delay: 1500
            },
            dynamicAnimation: {
              enabled: true,
              speed: 1500
            }
          }
        },
        stroke: {
          width: 2,
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          colors: ['#f00892']
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 1,
          labels: {
            datetimeUTC: false,
          }
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return value.toFixed(2);
            }
          },
        },
        tooltip: {
          x: {
            format: 'yyyy-MM-dd HH:mm:ss'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.2,
            opacityTo: 0.9,
          },
        },
        colors: ['#008ffb'],
      },
      optionsDiesel: {
        chart: {
          id: 'area-datetime',
          type: 'area',
          height: 450,
          foreColor: "#004d99", // labels colors
          curve: 'smooth',
          zoom: {
            autoScaleYaxis: true
          },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 1500,
            animateGradually: {
              enabled: true,
              delay: 1500
            },
            dynamicAnimation: {
              enabled: true,
              speed: 1500
            }
          }
        },
        stroke: {
          width: 2,
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          colors: ['#f00892']
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 1,
          labels: {
            datetimeUTC: false,
          }
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return value.toFixed(2);
            }
          },
        },
        tooltip: {
          x: {
            format: 'yyyy-MM-dd HH:mm:ss'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.2,
            opacityTo: 0.9,
          },
        },
        colors: ['#00e396'],
      },
      optionsOil: {
        chart: {
          id: 'area-datetime',
          type: 'area',
          height: 450,
          foreColor: "#004d99", // labels colors
          curve: 'smooth',
          zoom: {
            autoScaleYaxis: true
          },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 1500,
            animateGradually: {
              enabled: true,
              delay: 1500
            },
            dynamicAnimation: {
              enabled: true,
              speed: 1500
            }
          }
        },
        stroke: {
          width: 2,
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          colors: ['#f00892']
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 1,
          labels: {
            datetimeUTC: false,
          }
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return value.toFixed(2);
            }
          },
        },
        tooltip: {
          x: {
            format: 'yyyy-MM-dd HH:mm:ss'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.2,
            opacityTo: 0.9,
          },
        },
        colors: ['#feb019'],
      },
    }
  }
  componentDidMount() {
    sidelinkClicked('option5');
    this.getAssetsID();
  }

  getAssetsID = () => {
    axios({ method: "GET", url: "/api/utilization/registration?key=all" })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          let data = response.data;
          if (data.length !== 0) {
            for (let i = 0; i < data.length; i++) {
              $("#assetId").append(
                "<option id=" + data[i].id + ">" + data[i].tagid + "</option>"
              );
            }
            this.getAssetsAllDetails(data[0].tagid);
          }
        }
      })
      .catch((error) => {
        console.log("Error===>", error);
        if (error.response.status === 403) {
          $("#sessionModal").css("display", "block");
          $("#content").text("User Session has timed out. Please Login again");
        } else if (error.response.status === 400) {
          this.setState({ error: true, message: 'Bad request!' })
        } else if (error.response.status === 404) {
          this.setState({ error: true, message: 'No Petrol data found.' })
        }
      })
  }

  getAssetsAllDetails = (tagid) => {
    this.setState({
      message: "", success: false, error: false, cardDet: [],
    })
    axios({ method: "GET", url: "/api/utilization/registration?key=" + tagid })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          let data = response.data.asset;
          if (data.length !== 0) {
            let det = data[data.length - 1];
            this.setState({ cardDet: [det.petrol, det.diesel, det.oil] })
          } else {
            this.setState({ error: true, message: 'No data found.' })
          }
        }
      })
      .catch((error) => {
        console.log("Error===>", error);
        if (error.response.status === 403) {
          $("#sessionModal").css("display", "block");
          $("#content").text("User Session has timed out. Please Login again");
        } else if (error.response.status === 400) {
          this.setState({ error: true, message: 'Bad request!' })
        } else if (error.response.status === 404) {
          this.setState({ error: true, message: 'No data found.' })
        }
      })
  }

  optionChange = (btnId) => {
    $("#daily").css({ background: "none", color: "#000" });
    $("#weekly").css({ background: "none", color: "#000" });
    $("#monthly").css({ background: "none", color: "#000" });
    console.log("----->", btnId);
    $("#" + btnId).css({ background: "rgb(0, 98, 135)", color: "#FFF" });
  };

  getLineGraphData = (btn, kpiname) => {
    let mac = $("#assetId").val();
    console.log(kpiname, "=====>", mac);
    this.optionChange(btn);
    $("#graph_opt").css("display", "block");
    this.setState({
      message: "", error: false,
      success: false, kpiName: ""
    });
    this.setState({ series: [] });
    let ddd = { key: btn, kpi: kpiname, tagid: mac }
    console.log("------->", ddd);
    axios({
      method: 'POST', url: "/api/utilization/report",
      data: { key: btn, kpi: kpiname, tagid: mac }
    })
      .then((response) => {
        console.log("Response====>", response);
        let data = response.data;
        if (response.status === 200 || response.status === 201) {
          if (data.length !== 0) {
            let value = []
            for (let i = 0; i < 100; i++) {
              let graphdata = [];
              let time = data[i].lastseen.substring(0, 19).replace("T", " ");
              var date = new Date(time);
              var milliseconds = date.getTime();
              graphdata.push(milliseconds);
              if (kpiname === "petrol") {
                graphdata.push(data[i].petrol)
              } else if (kpiname === "diesel") {
                graphdata.push(data[i].diesel)
              } else {
                graphdata.push(data[i].oil)
              }
              value.push(graphdata);
            }
            this.setState({ series: [{ name: kpiname, data: value }], kpiName: kpiname })
          } else {
            this.setState({ error: true, message: 'No ' + kpiname + ' data found.' })
          }
        }
      })
      .catch((error) => {
        console.log("Error===>", error);
        if (error.response.status === 403) {
          this.setState({ error: true, message: 'Please Login Again' })
        } else if (error.response.status === 400) {
          this.setState({ error: true, message: 'Bad request!' })
        } else if (error.response.status === 404) {
          this.setState({ error: true, message: 'No Petrol data found.' })
        }
      })
  }


  sessionTimeout = () => {
    $("#sessionModal").css("display", "none");
    sessionStorage.removeItem('login')
    window.location.pathname = '/login'
  };

  render() {
    const { message, error,
      success, series, kpiName, cardDet } = this.state;
    console.log(kpiName,"$$$$$", series);
    return (
      <div className='maindiv' style={{ overflowY: "scroll" }}>
        <div style={{ marginLeft: '35px' }}>
          <h1 style={{ color: 'rgb(136, 143, 159)' }}>Utilization</h1>
          <div style={{
            width: '50px', height: '5px', background: '#00629B',
            marginTop: '-18px', borderRadius: '5px', marginBottom: '30px'
          }}>
          </div>

          {error && (
            <div style={{ color: 'red' }}>
              <strong>{message}</strong>
            </div>
          )}

          {success && (
            <div style={{ color: 'green', }}>
              <strong>{message}</strong>
            </div>
          )}

          <div className="inputdiv"
            onChange={() => this.getAssetsAllDetails($("#assetId").val())}>
            <span className="label">AssetID : </span>
            <select name="assetId" id="assetId"></select>
          </div>

          {/*<div style={{ marginTop: "10px" }}>
            {barLabel.length > 0 ? (
              <ApexCharts
                options={{
                  chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    toolbar: {
                      show: true
                    },
                    zoom: {
                      enabled: true
                    }
                  },
                  plotOptions: {
                    bar: {
                      horizontal: false,
                      borderRadius: 10
                    },
                  },
                  xaxis: {
                    labels: {
                      show: true
                    },
                    type: 'datetime',
                    categories: barLabel,
                  },
                  legend: {
                    position: 'top',
                    offsetY: 0
                  },
                }}

                series={[
                  {
                    name: 'Petrol',
                    data: petrolData,
                  },
                  {
                    name: 'Diesel',
                    data: dieselData
                  },
                  {
                    name: 'Oil',
                    data: oilData,
                  }]}
                type="bar" height={350} />) : (<p />)
            }
          </div> */}

          <div>
            <h3 style={{ color: '#0000008f' }}>Assets KPI's</h3>
            <div style={{
              width: '50px', height: '5px', background: '#00629B',
              marginTop: '-12px', borderRadius: '5px', marginBottom: '15px'
            }}>
            </div>
          </div>

          <div id="kpi_cards"
            style={{ display: "flex", marginTop: "30px" }}>
            <div style={{
              width: '240px',
              height: '100px',
              background: 'white',
              borderRadius: '10px',
              cursor: "pointer",
              boxShadow: "rgb(128 128 128 / 20%) 8px 4px 30px 0px",
            }} onClick={() => this.getLineGraphData("daily", "petrol")}>
              <p style={{
                textAlign: 'center',
                color: '#888F9F',
                fontFamily: 'Poppins-Regular'
              }}>Petrol</p>
              <p style={{
                textAlign: 'center',
                fontFamily: 'Poppins-Regular'
              }}>{cardDet[0]}</p>
            </div>

            <div style={{
              width: '240px',
              height: '100px',
              background: 'white',
              borderRadius: '10px',
              marginLeft: "25px",
              cursor: "pointer",
              boxShadow: "rgb(128 128 128 / 20%) 8px 4px 30px 0px",
            }} onClick={() => this.getLineGraphData("daily", "diesel")}>
              <p style={{
                textAlign: 'center',
                color: '#888F9F',
                fontFamily: 'Poppins-Regular'
              }}>Diesel</p>
              <p style={{
                textAlign: 'center',
                fontFamily: 'Poppins-Regular'
              }}>{cardDet[1]}</p>
            </div>

            <div style={{
              width: '240px',
              height: '100px',
              background: 'white',
              borderRadius: '10px',
              marginLeft: "25px",
              cursor: "pointer",
              boxShadow: "rgb(128 128 128 / 20%) 8px 4px 30px 0px",
            }} onClick={() => this.getLineGraphData("daily", "oil")}>
              <p style={{
                textAlign: 'center',
                color: '#888F9F',
                fontFamily: 'Poppins-Regular'
              }}>Oil</p>
              <p style={{
                textAlign: 'center',
                fontFamily: 'Poppins-Regular'
              }}>{cardDet[2]}</p>
            </div>
          </div>


          <div id="graph_opt" style={{ display: "none" }}>
            <div 
              style={{ display: "flex", marginTop: "30px" }}>
              <button
                id="daily"
                className="heading"
                style={graphBtn}
                onClick={() => this.getLineGraphData("daily", kpiName)}
              >
                Daily
              </button>
              <button
                id="weekly"
                className="heading"
                style={graphBtn}
                onClick={() => this.getLineGraphData("weekly", kpiName)}
              >
                Weekly
              </button>
              <button
                id="monthly"
                className="heading"
                style={graphBtn}
                onClick={() => this.getLineGraphData("monthly", kpiName)}
              >
                Monthly
              </button>
            </div>
          </div>


          {series.length !== 0 ? (
            <div style={{ marginTop: "30px" }}>
              <div>
                <div id="chart">
                  <div id="chart-timeline">
                    {kpiName === "petrol" && (
                      <ApexCharts options={this.state.optionsPetrol}
                        series={series} type="area" height={450} />
                    )}
                    {kpiName === "diesel" && (
                      <ApexCharts options={this.state.optionsDiesel}
                        series={series} type="area" height={450} />
                    )}
                    {kpiName === "oil" && (
                      <ApexCharts options={this.state.optionsOil}
                        series={series} type="area" height={450} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (<p />)
          }

        </div>

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
      </div>
    )
  }
}
