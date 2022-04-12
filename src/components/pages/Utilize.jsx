import React, { Component } from 'react'
import { sidelinkClicked } from '../leftsidebar/Leftsidebar';
import $ from 'jquery'

export default class Utilize extends Component {
  constructor(){
    super();
    this.state={
      message:'',
      success:false,
      error:false,
    }
  }
  componentDidMount(){
    sidelinkClicked('option5')
  }
  sessionTimeout = () => {
    $("#config_displayModal").css("display", "none");
    sessionStorage.removeItem('login')
    window.location.pathname='/login'
  };
  componentDidUpdate() {
    setTimeout(() => this.setState({message: '', message1: ''}), 3000);
}
  render() {
    const{message,error,success}=this.state;
    return (
        <>
          <>
      <div className='maindiv'>
        
      <div  style={{marginLeft:'35px'}}>
                <h1 style={{color:'rgb(136, 143, 159)'}}>Utilization</h1>
                <div style={{width:'50px',height:'5px',background:'#00629B',
                marginTop:'-18px',borderRadius:'5px',marginBottom:'30px'}}>

                </div>
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
      </>
    )
  }
}
