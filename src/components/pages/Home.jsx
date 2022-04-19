import axios from 'axios';
import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom';
import $ from 'jquery';
import ApexCharts from 'react-apexcharts';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series1: [],
            series2: [],
            series3: [],
            series: [],
            options: {
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
                    colors: ['#008FFB']
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
                            return value.toFixed(0);
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
                colors: ['#F44336'],
            },
        }
    }
    componentDidMount() {
        this.pieChartData();
        this.alertHistory();
        this.interval = setInterval(() => {
            this.pieChartData();
            this.alertHistory();
        }, 10 * 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    alertHistory = () => {
        this.setState({ message: "", error: false, success: false });
        this.setState({ series: [] });
        axios({ method: 'GET', url: "/api/alerts" })
            .then((response) => {
                console.log("Response====>", response);
                let data = response.data;
                if (response.status === 200 || response.status === 201) {
                    if (data.length !== 0) {
                        let value = []
                        for (let i = 0; i < data.length; i++) {
                            let alertHistory = [];
                            let time = data[i].timestamp.substring(0, 19).replace("T", " ");
                            var date = new Date(time);
                            var milliseconds = date.getTime();
                            alertHistory.push(milliseconds);
                            alertHistory.push(data[i].count)
                            value.push(alertHistory);
                        }
                        this.setState({ series: [{ name: 'Count', data: value }] })
                    }
                } else {
                    this.setState({ error: true, message: 'No Petrol data found.' })
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

    pieChartData = () => {
        this.setState({ series1: [], series2: [], series3: [] });
        axios({ method: 'GET', url: '/api/asset/count' })
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    let data = response.data;
                    if (data.length !== 0) {
                        this.setState({
                            series1: [data.emp.active, data.emp.total - data.emp.active],
                            series2: [data.asset.active, data.asset.total - data.asset.active],
                            series3: [data.utilization.active, data.utilization.total - data.utilization.active]
                        });
                    }
                }
            }).catch((error) => {
                if (error.response.status === 403) {
                    $("#sessionModal").css("display", "block");
                    $("#content").text("User Session has timed out. Please Login again");
                }
            })
    }

    sessionTimeout = () => {
        $("#sessionModal").css("display", "none");
        sessionStorage.removeItem('login');
        window.location.pathname = '/login';
    };
    render() {
        const {
            series1,
            series2,
            series3,
            series,
        } = this.state;
        return (
            <div className='maindiv'>
                <div style={{ marginLeft: '35px' }}>
                    <h1 style={{
                        marginTop: '15px',
                        color: '#0000008f'
                    }}>Overview</h1>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: "765px"
                    }}>
                        <div style={{
                            width: '240px',
                            height: '260px',
                            background: 'white',
                            borderRadius: '10px',
                            boxShadow: "rgb(128 128 128 / 20%) 8px 4px 30px 0px",
                            position: 'relative'
                        }}>
                            <p style={{
                                textAlign: 'center',
                                color: '#888F9F',
                                fontFamily: 'Poppins-Regular'
                            }}>Employee Tag</p>
                            {series1.length > 0 ? (
                                <Chart
                                    series={series1}
                                    options={{
                                        labels: [
                                            'Active', 'Inactive'
                                        ],
                                        legend: {
                                            position: 'bottom'
                                        },
                                        dataLabels: {
                                            enabled: false
                                        },
                                        sparkline: {
                                            enabled: true
                                        },

                                        colors: [
                                            '#3edada', '#a9efef'
                                        ],
                                        plotOptions: {
                                            pie: {
                                                donut: {
                                                    labels: {
                                                        show: true,
                                                        name: {
                                                            show: false,
                                                            // color:'#00629b',
                                                            offsetY: -16,
                                                        },
                                                        total: {
                                                            show: true,
                                                            label: '',
                                                            formatter: () => series1[0] + '/' +
                                                                (parseInt(series1[0]) + parseInt(series1[1])),
                                                        },
                                                    }
                                                }
                                            }
                                        }
                                    }}
                                    type="donut"
                                    width="250" />
                            ) : <p />}

                        </div>

                        <div style={{
                            width: '240px',
                            height: '260px',
                            background: 'white',
                            borderRadius: '10px',
                            boxShadow: "rgb(128 128 128 / 20%) 8px 4px 30px 0px",
                        }}>
                            <p style={{
                                textAlign: 'center',
                                color: '#888F9F',
                                fontFamily: 'Poppins-Regular'
                            }}>Asset Tag</p>
                            {series2.length > 0 ? (
                                <Chart
                                    series={series2}
                                    options={{
                                        labels: [
                                            'Active', 'Inactive'
                                        ],
                                        legend: {
                                            position: 'bottom'
                                        },
                                        dataLabels: {
                                            enabled: false
                                        },
                                        sparkline: {
                                            enabled: true
                                        },

                                        colors: [
                                            '#ff4d4d', '#ffb3b3'
                                        ],
                                        plotOptions: {
                                            pie: {
                                                donut: {
                                                    labels: {
                                                        show: true,
                                                        name: {
                                                            show: false,
                                                            // color:'#00629b',
                                                            offsetY: -16,
                                                        },
                                                        total: {
                                                            show: true,
                                                            label: '',
                                                            formatter: () => series2[0] + '/' +
                                                                (parseInt(series2[0]) + parseInt(series2[1])),
                                                        },
                                                    }
                                                }
                                            }
                                        }
                                    }}
                                    type="donut"
                                    width="250" />
                            ) : <p />}

                        </div>
                        <div style={{
                            width: '240px',
                            height: '260px',
                            background: 'white',
                            borderRadius: '10px',
                            boxShadow: "rgb(128 128 128 / 20%) 8px 4px 30px 0px",
                        }}>
                            <p style={{
                                textAlign: 'center',
                                color: '#888F9F',
                                fontFamily: 'Poppins-Regular'
                            }}>Utilization</p>
                            {series3.length > 0 ? (
                                <Chart
                                    series={series3}
                                    options={{
                                        labels: [
                                            'Active', 'Inactive'
                                        ],
                                        legend: {
                                            position: 'bottom'
                                        },
                                        dataLabels: {
                                            enabled: false
                                        },
                                        sparkline: {
                                            enabled: true
                                        },

                                        colors: [
                                            '#a64dff', '#d9b3ff'
                                        ],
                                        plotOptions: {
                                            pie: {
                                                donut: {
                                                    labels: {
                                                        show: true,
                                                        name: {
                                                            show: false,
                                                            // color:'#00629b',
                                                            offsetY: -16,
                                                        },
                                                        total: {
                                                            show: true,
                                                            label: '',
                                                            formatter: () => series3[0] + '/' +
                                                                (parseInt(series3[0]) + parseInt(series3[1])),
                                                        },
                                                    }
                                                }
                                            }
                                        }
                                    }}
                                    type="donut"
                                    width="250" />
                            ) : <p />}
                        </div>
                    </div>


                    <div className='actions'>
                        <h3 style={{
                            paddingTop: '15px',
                            color: '#888F9F',
                            marginLeft: '20px',
                        }}>Quick Actions</h3>
                        <div style={{
                            display: 'flex',
                            marginLeft: '30px'
                        }}>
                            <div>
                                <Link to='/register'>
                                    <img src="/images/reg.png" alt=""
                                        style={{
                                            width: '230px',
                                            cursor: 'pointer'
                                        }} /><br />
                                </Link>

                                <Link to='/realtime'>
                                    <img src="/images/realtime.png" alt=""
                                        style={{
                                            width: '230px',
                                            marginTop: '5px',
                                            cursor: 'pointer'
                                        }} />
                                </Link>
                            </div>

                            <div>
                                <Link to='/alerts'>
                                    <img src="/images/alerts.png" alt=""
                                        style={{
                                            width: '230px',
                                            cursor: 'pointer'
                                        }} /><br />
                                </Link>
                                <Link to='/health'>
                                    <img src="/images/systemhealth.png" alt=""
                                        style={{
                                            width: '230px',
                                            marginTop: '5px',
                                            cursor: 'pointer'
                                        }} />
                                </Link>
                            </div>
                            <div style={{ marginTop: '35px' }}>
                                <Link to='/utilization'>
                                    <img src="/images/utilization.png" alt=""
                                        style={{
                                            width: '230px',
                                            cursor: 'pointer'
                                        }} />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
                <div style={{
                    float: 'right',
                    width: '27%',
                    background: 'white',
                    marginTop: '-430px',
                    marginRight: '10px',
                    marginBottom: "10px",
                    height: '280px',
                    borderRadius: '10px',
                    boxShadow: "rgb(128 128 128 / 20%) 8px 4px 30px 0px",
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <i className="far fa-bell"
                            style={{
                                fontSize: '20px',
                                paddingTop: '14px',
                                color: '#888F9F',
                                marginRight: '6px'
                            }}></i>
                        <h3 style={{
                            paddingTop: '10px',
                            color: '#888F9F',
                            margin: '0px',
                            textAlign: 'center'
                        }}>
                            Alerts History
                        </h3>
                    </div>
                    {
                        series.length ? (
                            <div>
                                <div>
                                    <div id="chart">
                                        <div id="chart-timeline">
                                            <ApexCharts options={this.state.options}
                                                series={series} type="area" height={250} />
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
