import React, { Component } from 'react'
import { sidelinkClicked } from '../leftsidebar/Leftsidebar';
import MapView from "../MapView";

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
    console.log("$$$$$$", status);
    this.setState({ error: true, message: status });
    this.timeout = setTimeout(() => {
      this.setState({ error: false, message: "" });
    }, 2*1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    const { message, error, success } = this.state;
    return (
      <div className='maindiv'>
        <div style={{ marginLeft: '35px' }}>
          <h1 style={{ color: '#0000008f' }}>Real-Time Tracking</h1>
          <div style={{
            width: '50px', height: '5px', background: '#00629B',
            marginTop: '-18px', borderRadius: '5px', marginBottom: '30px'
          }}>
          </div>
        </div>

        <div style={{marginBottom: "20px", marginLeft: "35px" }}>
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
        </div>
        <MapView search={(status) => this.search(status)}/>
      </div>
    )
  }
}
