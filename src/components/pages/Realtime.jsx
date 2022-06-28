import React, { Component } from 'react'
import { sidelinkClicked } from '../leftsidebar/Leftsidebar';
import MapView from "../MapView";
import $ from "jquery";
import MapChecking from './MapChecking';

export default class Realtime extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      success: false,
      error: false,
    }
  }
  componentDidMount() {
    sidelinkClicked('option2')
  }

  search = (status) => {
    if (status === "User Session has timed out. Please Login again") {
      $("#sessionModal").css("display", "block");
      $("#mapview").css("display", "none")
      $("#content").text("User Session has timed out. Please Login again");
    } else {
      this.setState({ error: true, message: status });
      this.timeout = setTimeout(() => this.setState({ message: '' }), 3000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  sessionTimeout = () => {
    $("#sessionModal").css("display", "none");
    sessionStorage.removeItem('login')
    window.location.pathname = '/login'
  };

  render() {
    const { message, error, success } = this.state;
    return (
      <>
        <div className='maindiv' style={{ overflowY: "scroll" }}>
          <div style={{ marginLeft: '35px' }}>
            <h1 style={{ color: '#0000008f' }}>Real-Time Tracking</h1>
            <div style={{
              width: '50px', height: '5px', background: '#00629B',
              marginTop: '-18px', borderRadius: '5px', marginBottom: '30px'
            }}>
            </div>
          </div>

          <div style={{ marginBottom: "20px", marginLeft: "35px" }}>
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

          <div id="mapview">
            <MapView search={(status) => this.search(status)} />
          </div>
        </div>
      </>
    )
  }
}



