import React, { Component } from 'react'
import $ from 'jquery'
import Employeereg from './Employeereg';
import Assetreg from './Assetreg';
import Utilizereg from './Utilizereg';
import { sidelinkClicked } from '../leftsidebar/Leftsidebar';

export default class Registration extends Component {
  List = [false, false, false];
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
    }
  }
  componentDidMount() {
    sidelinkClicked('option1')
    this.setState({ flag: true })
    this.List[0] = true;
    $("#opt0").css({ "background": "#00629bed", "color": "white" });
  }

  optionChange = (e) => {
    $("#opt0").css({ "background": "none", "color": "#000" });
    $("#opt1").css({ "background": "none", "color": "#000" });
    $("#opt2").css({ "background": "none", "color": "#000" });
    this.setState({ flag: true })
    this.List = [false, false, false]
    let id = parseInt(e.target.id.substring(3))
    $("#" + e.target.id).css({ "background": "#00629bed", "color": "white" });
    this.List[id] = true;
  }
  sessionTimeout = () => {
    $("#sessionModal").css("display", "none");
    sessionStorage.removeItem('login')
    window.location.pathname = '/login'
  };
  render() {
    return (
      <div className='maindiv'>
        <div style={{ marginLeft: '35px' }}>
          <h1 style={{ color: '#0000008f' }}>Registration</h1>
          <div style={{
            width: '50px', height: '5px', background: '#00629B',
            marginTop: '-18px', borderRadius: '5px', marginBottom: '30px'
          }}>
          </div>
          <div className="container fading"
            style={{
              marginTop: "30px"

            }}>
            <div className="row"
              onClick={this.optionChange}>
              <button
                id="opt0"
                className='navbtn'
              >
                Employee Registration
              </button>
              <button
                id="opt1"
                className='navbtn'
              >
                Asset Registration
              </button>
              <button
                id="opt2"
                className='navbtn'
              >
                Utilization Registration
              </button>
            </div>
            <div
              className="container"
              id="childComponent"
            >
              {this.List[0] && (<Employeereg />)}
              {this.List[1] && (<Assetreg />)}
              {this.List[2] && (<Utilizereg />)}

            </div>
          </div>
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
