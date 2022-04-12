import React, { Component } from 'react'
import { sidelinkClicked } from '../leftsidebar/Leftsidebar';
import axios from 'axios';
import $ from 'jquery'

export default class Alerts extends Component {
  constructor(){
    super();
    this.state={
      message:'',
      success:false,
      error:false,
    }
  }
  componentDidMount(){
    sidelinkClicked('option3')
    this.dropdownChange();
    this.interval = setInterval(this.dropdownChange, 15 * 1000);
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }
  dropdownChange=()=>{
    let data={
      value: $('#alert').val(),
      type: $('#alerttype').val(),
    }
    console.log(data.value);
    axios({method:'POST',url:'/api/alerts',data: data})
    .then((response)=>{
      let sno=0;
      let data=response.data;
      
      console.log("response=====>",response);
      $('#alerts').empty();
      for(let i=0;i<data.length;i++){
        let values= data[i].value;  
        let lastseen=data[i].timestamp .substr(0, 10) +
        " " +
        data[i].timestamp.substr(11, 8);
       
      if(values=== 3){  
        console.log('freefallalert-----');
        if(data.length>0){
        $('#alerts').append(
          "<tr><td>" +
              (sno + 1) +
              "</td><td>" +
              data[i].asset.tagid +
              "</td><td>" +
              'Free Fall'+
              "</td><td>" +
              lastseen +
              "</td></tr>" 
        
      );
      sno+=1;
        } else{
          $('#alerttable').hide();
          this.setState({error: true, message: 'No data Found for Free Fall!'})
        }
      }
      else if((values===4)){
        if(data.length>0){
        console.log('noactivityalert-----');
        $('#alerts').append(
          "<tr><td>" +
              (sno + 1) +
              "</td><td>" +
              data[i].asset.tagid +
              "</td><td>" +
              'No Activity'+
              "</td><td>" +
              lastseen +
              "</td></tr>" 
        
      );sno+=1;
        }
        else{
          $('#alerts').empty();
          $('#alerttable').hide();
          this.setState({error: true, message: 'No data Found for Free Fall!'})
        }
      }
      else if(values=== 5){
        if(data.length>0){
        console.log('lowbatteryyalert-----'); 
        $('#alerts').append(
          "<tr><td>" +
              (sno + 1) +
              "</td><td>" +
              data[i].asset.tagid +
              "</td><td>" +
              'Low Battery'+
              "</td><td>" +
              lastseen +
              "</td></tr>" 
        
      );sno+=1;
    }else{
      $('#alerts').empty();
      $('#alerttable').hide();
      this.setState({error: true, message: 'No data Found for Free Fall!'})
    }
      }
      else if(values===1){
        if(data.length>0){
        console.log('panicyalert-----');  
        $('#alerts').append(
          "<tr><td>" +
              (sno + 1) +
              "</td><td>" +
              data[i].asset.tagid +
              "</td><td>" +
              'Panic Alert'+
              "</td><td>" +
              lastseen +
             "</td></tr>" 
        
      );sno+=1;
        }      
      }
      else{
        $('#alerts').empty();
        $('#alerttable').hide();
        this.setState({error: true, message: 'No data Found for Free Fall!'})
      }
      }
    })
    .catch((error)=>{
      if (error.response.status === 403) {
        $("#config_displayModal").css("display", "block");
        $("#content").text("User Session has timed out. Please Login again");
      }else if (error.response.status === 400) {
        this.setState({error: true, message: 'Bad Request!'})
    }else if (error.response.status === 404) {
      this.setState({error: true, message: 'No data Found!'})
  }
    })
  }
  sessionTimeout = () => {
    $("#config_displayModal").css("display", "none");
    sessionStorage.removeItem('login')
    window.location.pathname='/login'
  };
  componentDidUpdate() {
    setTimeout(() => this.setState({message: ''}), 3000);
}
  render() {
    const{message,error,success}=this.state;
    return (
        <>
      <div className='maindiv'>
            <div  style={{marginLeft:'35px'}}>
                <h1 style={{color:'#0000008f'}}>Alerts</h1>
                <div style={{width:'50px',height:'5px',background:'#00629B',
                marginTop:'-22px',borderRadius:'5px',marginBottom:'30px'}}>

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
                 <div className="inputdiv"  onChange={this.dropdownChange}>
                            <span className="label">Alert:</span>
                            <select name="alerttype" id="alerttype" required="required">
                                <option value='employee'>Employee</option>
                                <option value='asset'>Asset</option>

                            </select>
                        </div>
                <div className="inputdiv"  onChange={this.dropdownChange}>
                            <span className="label">Alert Type:</span>
                            <select name="alert" id="alert" required="required">
                            <option  value='1'>Panic</option>
                                <option value='3'>Free Fall</option>
                                <option value='4'>No Activity</option>
                                <option value='5'> Low Battery</option>
                                

                            </select>
                        </div>
                <table id='alerttable'style={{ marginTop: "30px" }}>
                <thead>
                  <tr>
                    <th>Sl.No</th>
                    <th>MACID</th>
                    <th>ALERT TYPE</th>
                    <th>LAST SEEN</th>     
                    
                  </tr>
                </thead>
                <tbody id="alerts"></tbody>
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
