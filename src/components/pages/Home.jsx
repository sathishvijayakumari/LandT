import axios from 'axios';
import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { sidelinkClicked } from "../leftsidebar/Leftsidebar";

export default class Home extends Component {

  constructor(props) {
    super(props);
    let emp = this.empact;
    this.state = {

      options: {
        series: [3, 7],
        labels: ['Active', 'Inactive'],
        legend: {
          position: 'bottom',
        },
        dataLabels: {
          enabled: false
        },
        sparkline: {
          enabled: true
        },

        colors: ['#5FE1E0', '#eafbfb'],

        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: '',
                  formatter: () => this.empact + '/' + this.emptot
                }
              }
            }
          }
        }

      },
      options2: {
        series: [0, 5],
        labels: ['Active', 'Inactive'],
        legend: {
          position: 'bottom',
        },
        dataLabels: {
          enabled: false
        },
        sparkline: {
          enabled: true
        },

        colors: ['#FF5E5B', '#ffcdcc'],
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: '',
                  formatter: () => this.assetact + '/' + this.assettot
                }
              }
            }
          }
        }
      },

      options3: {
        series: [0, 2],
        labels: ['Active', 'Inactive'],
        legend: {
          position: 'bottom',
        },
        dataLabels: {
          enabled: false
        },
        sparkline: {
          enabled: true
        },

        colors: ['#2BC999', '#c0f2e3'],
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: '',
                  formatter: () => this.utiact + '/' + this.utitot
                }

              }
            }
          }
        }
      },

    }
  }

  componentDidMount() {
    sidelinkClicked("option0");
    sessionStorage.setItem("sidelink", "option0");
    axios({ method: 'GET', url: '/api/asset/count' })
      .then((response) => {
        console.log(response)
        this.assetact = response.data.asset.active;
        this.assettot = response.data.asset.total;
        this.empact = response.data.emp.active;
        console.log(typeof (this.empact));
        this.emptot = response.data.emp.total;
        this.utiact = response.data.utilization.active;
        this.utitot = response.data.utilization.total;

        this.newemp = this.empact.toString()
        console.log(typeof (newemp));
      })
      .catch((error) => {
        console.log(error);
      })
  }

  sessionTimeout = () => {
    $("#config_displayModal").css("display", "none");
    sessionStorage.removeItem('login')
    window.location.pathname = '/login'
  };
  render() {
    return (
      <>
        <div className='maindiv'>
          <div style={{ marginLeft: '35px' }}>
            <h1 style={{ marginTop: '15px', color: '#0000008f' }}>Overview</h1>

            <div style={{ display: 'flex', justifyContent: 'space-between', width: "765px" }}>
              <div style={{
                width: '240px', height: '260px', background: 'white',
                borderRadius: '10px', boxShadow: '8px 4px 20px 0px rgb(128 128 128 / 96%)', position: 'relative'
              }}
              >
                <p style={{ textAlign: 'center', color: '#888F9F', fontFamily: 'Poppins-Regular' }}>Employee Tag</p>
                <Chart options={this.state.options} series={this.state.options.series} type="donut" width="250" />
                {/* <p style={{position:'absolute'}}>50</p> */}
              </div>
              <div style={{ width: '240px', height: '260px', background: 'white', borderRadius: '10px', boxShadow: '8px 4px 20px 0px rgb(128 128 128 / 96%)' }}>
                <p style={{ textAlign: 'center', color: '#888F9F', fontFamily: 'Poppins-Regular' }}>Asset Tag</p>
                <Chart options={this.state.options2} series={this.state.options2.series} type="donut" width="250" />
              </div>
              <div style={{ width: '240px', height: '260px', background: 'white', borderRadius: '10px', boxShadow: '8px 4px 20px 0px rgb(128 128 128 / 96%)' }}>
                <p style={{ textAlign: 'center', color: '#888F9F', fontFamily: 'Poppins-Regular' }}>Utilization</p>
                <Chart options={this.state.options3} series={this.state.options3.series} type="donut" width="250" />
              </div>

            </div>

            <div className='actions' >
              <h3 style={{ paddingTop: '15px', color: '#888F9F', marginLeft: '20px' }}>Quick Actions</h3>
              <div style={{ display: 'flex', marginLeft: '30px' }}>
                <div>
                  <Link to='/register'>
                    <img src="/images/reg.png" alt="" style={{ width: '230px', cursor: 'pointer' }} /><br />
                  </Link>

                  <Link to='/realtime'>
                    <img src="/images/realtime.png" alt="" style={{ width: '230px', marginTop: '5px', cursor: 'pointer' }} />
                  </Link>
                </div>

                <div>
                  <Link to='/alerts'>
                    <img src="/images/alerts.png" alt="" style={{ width: '230px', cursor: 'pointer' }} /><br />
                  </Link>
                  <Link to='/health'>
                    <img src="/images/systemhealth.png" alt="" style={{ width: '230px', marginTop: '5px', cursor: 'pointer' }} />
                  </Link>
                </div>
                <div style={{ marginTop: '35px' }}>
                  <Link to='/utilization'>
                    <img src="/images/utilization.png" alt="" style={{ width: '230px', cursor: 'pointer' }} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
          <div style={{ float: 'right', width: '27%', background: 'white', marginTop: '-430px', marginRight: '10px', height: '280px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <i className="far fa-bell" style={{ fontSize: '20px', paddingTop: '14px', color: '#888F9F', marginRight: '6px' }}></i>
              <h3 style={{ paddingTop: '10px', color: '#888F9F', margin: '0px', textAlign: 'center' }}>
                Alerts History
              </h3>
            </div>
          </div>
          <div id="config_displayModal" className="modal">
            <div className="modal-content">
              <p id="content" style={{ textAlign: "center" }}></p>
              <button
                id="ok"
                className="btn-center btn success-btn"
                onClick={this.sessionTimeout}
              >
                OK
              </button>
            </div>
          </div>

        </div>
      </>
    )
  }
}
