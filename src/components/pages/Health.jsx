import React, { Component } from 'react'
import { sidelinkClicked } from '../leftsidebar/Leftsidebar';
import axios from 'axios';
import $ from 'jquery'

export default class Health extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      success: false,
      error: false,
    }
  }
  componentDidMount() {
    sidelinkClicked('option4')
    this.systemHealth();
    this.interval = setInterval(this.systemHealth, 15 * 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  systemHealth = () => {
    let type = $('#healthtype').val();
    let sno = 0;
    if ($('#healthtype').val() === 'employee') {
      axios({ method: 'GET', url: '/api/employee/registration?key=all' })
        .then((response) => {
          $('#health').empty(); let data = response.data;
          console.log("response==>", data[0].lat);
          for (let i = 0; i < data.length; i++) {

            let timestamp = data[i].lastseen.substr(0, 10) +
              " " +
              data[i].lastseen.substr(11, 8),
              status = 'red';
            if (new Date() - new Date(data[i].lastseen) <= 2 * 60 * 1000) {
              status = "green";
            }
            $('#health').append(
              "<tr><td>" +
              (sno + 1) +
              "</td><td>" +
              data[i].tagid +
              "</td><td>" +
              timestamp +
              "</td><td>" +
              "<div class='circle' style='margin:auto;background-color:" +
              status +
              ";'></div></td></tr>"

            ); sno += 1;
          }
        })
        .catch((error) => {
          if (error.response.status === 403) {
            $("#config_displayModal").css("display", "block");
            $("#content").text("User Session has timed out. Please Login again");
          } else if (error.response.status === 400) {
            this.setState({ error: true, message: 'Bad Request!' })
          } else if (error.response.status === 404) {
            this.setState({ error: true, message: 'No data Found!' })
          }
        })
    }
    else if ($('#healthtype').val() === 'asset') {
      axios({ method: 'GET', url: '/api/asset/registration?key=all' })
        .then((response) => {
          $('#health').empty();
          let data = response.data;
          for (let i = 0; i < data.length; i++) {

            let timestamp = data[i].lastseen.substr(0, 10) +
              " " +
              data[i].lastseen.substr(11, 8),
              status = 'red';
            if (new Date() - new Date(data[i].lastseen) <= 2 * 60 * 1000) {
              status = "green";
            }
            $('#health').append(
              "<tr><td>" +
              (sno + 1) +
              "</td><td>" +
              data[i].tagid +
              "</td><td>" +
              timestamp +
              "</td><td>" +
              "<div class='circle' style='margin:auto;background-color:" +
              status +
              ";'></div></td></tr>"

            ); sno += 1;
          }
        })
        .catch((error) => {
          if (error.response.status === 403) {
            $("#config_displayModal").css("display", "block");
            $("#content").text("User Session has timed out. Please Login again");
          } else if (error.response.status === 400) {
            this.setState({ error: true, message: 'Bad Request!' })
          } else if (error.response.status === 404) {
            this.setState({ error: true, message: 'No data Found!' })
          }
        })
    }
    else if ($('#healthtype').val() === 'utilize') {
      axios({ method: 'GET', url: '/api/utilization/registration?key=all' })
        .then((response) => {
          $('#health').empty();
          let data = response.data;
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {

              let timestamp = data[i].lastseen.substr(0, 10) +
                " " +
                data[i].lastseen.substr(11, 8),
                status = 'red';
              if (new Date() - new Date(data[i].lastseen) <= 2 * 60 * 1000) {
                status = "green";
              }
              $('#health').append(
                "<tr><td>" +
                (sno + 1) +
                "</td><td>" +
                data[i].tagid +
                "</td><td>" +
                timestamp +
                "</td><td>" +
                "<div class='circle' style='margin:auto;background-color:" +
                status +
                ";'></div></td></tr>"

              ); sno += 1;
            }
          } else {
            this.setState({ error: true, message: 'No data Found!' })
          }
        })
        .catch((error) => {
          if (error.response.status === 403) {
            $("#config_displayModal").css("display", "block");
            $("#content").text("User Session has timed out. Please Login again");
          } else if (error.response.status === 400) {
            this.setState({ error: true, message: 'Bad Request!' })
          } else if (error.response.status === 404) {
            this.setState({ error: true, message: 'No data Found!' })
          }
        })
    }


  }
  componentDidUpdate() {
    setTimeout(() => this.setState({ message: '' }), 3000);
  }
  sessionTimeout = () => {
    $("#config_displayModal").css("display", "none");
    sessionStorage.removeItem('login')
    window.location.pathname = '/login'
  };
  render() {
    const { message, error, success } = this.state;
    return (
      <>

        <div className='maindiv'>
          <div style={{ marginLeft: '35px' }}>
            <h1 style={{ color: '#0000008f' }}>System Health</h1>
            <div style={{
              width: '73px', height: '5px', background: '#00629B',
              marginTop: '-22px', borderRadius: '5px', marginBottom: '30px'
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
            <div className="inputdiv" onChange={this.systemHealth}>
              <span className="label">Health:</span>
              <select name="healthtype" id="healthtype" required="required">
                <option value='employee'>Employee</option>
                <option value='asset'>Asset</option>
                <option value='utilize'>Utilization</option>

              </select>
            </div>

            <table style={{ marginTop: "30px" }}>
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>TAGID</th>
                  <th>LAST SEEN</th>
                  <th>STATUS</th>

                </tr>
              </thead>
              <tbody id="health"></tbody>
            </table>
          </div>
          <div id="config_displayModal" className="modal">
            <div className="modal-content">
              <p id="content" style={{ textAlign: "center" }}></p>
              <button style={{ textAlign: "center" }}
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
