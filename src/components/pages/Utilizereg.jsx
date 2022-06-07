import React, { Component } from 'react'
import $ from 'jquery'
import axios from 'axios';

export default class Utilizereg extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
            success: false,
            error: false,
            message1: ''
        }
    }
    register = () => {
        let data = {
            name: $('#sysname').val(),
            tagid: $('#tagid').val(),

        }
        if (!$("#tagid").val().match("([A-Za-z0-9]{2}[-]){5}([A-Za-z0-9]){2}")) {
            this.setState({ error: true, message: 'Invalid Tag ID' })
        } else if (data.name !== "" && data.tagid !== "") {
            axios({ method: 'POST', url: '/api/utilization/registration', data: data })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200 || response.status === 201) {
                        this.setState({ success: true, message: 'Tag registered successfullyy' })
                        $('#sysname').val('');
                        $('#tagid').val('');
                    } else if (response.status === 406) {
                        this.setState({ success: true, message1: response.data.message })
                    } else if (response.status === 208) {
                        this.setState({ success: true, message1: 'Already Exist!' })
                        $('#sysname').val('');
                        $('#tagid').val('');
                    }
                }).catch((error) => {
                    if (error.response.status === 403) {
                        $("#sessionModal").css("display", "block");
                        $("#content").text("User Session has timed out. Please Login again");
                    } else if (error.response.status === 400) {
                        this.setState({ error: true, message: 'Bad Request!' })
                    }

                })
        } else {
            this.setState({ error: true, message: 'Please Enter All Fields' })
        }
    }

    remove = () => {
        let data = {
            tagid: $('#id').val(),
        }
        console.log(data.tagid);

        if (!$("#id").val().match("([A-Za-z0-9]{2}[-]){5}([A-Za-z0-9]){2}")) {
            this.setState({ error: true, message: 'Invalid Tag ID' })
        }
        else if ($("#id").val() !== '') {

            axios({ method: 'DELETE', url: '/api/utilization/registration', data: data }).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    this.setState({ success: true, message: 'Tag Removed Successfullyy' })
                    $('#id').val('');
                    $('#deletetag').hide();

                }
            }).catch((error) => { // console.log(error);
                if (error.response.status === 403) {
                    $("#asset_displayModal").css("display", "block");
                    $("#content").text("User Session has timed out. Please Login again");
                }

            })
        }
        else {
            this.setState({ error: true, message: 'Enter Tag ID' })
        }
    }
    // }
    hide = () => {
        document.getElementById("deletetag").style.display = $("#deletetag").css("display") === 'block' ? 'none' : 'block'
    }
    sessionTimeout = () => {
        $("#sessionModal").css("display", "none");
        sessionStorage.removeItem('login')
        window.location.pathname = '/login'
    };
    componentDidUpdate() {
        setTimeout(() => this.setState({ message: '', message1: '' }), 3000);
    }
    render() {
        const { message, error, success, message1 } = this.state;
        return (
            <div >
                <div style={{
                    textAlign: 'center', paddingTop: '10px'
                }}>
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
                    {success && (
                        <div style={{ color: 'red', }}>
                            <strong>{message1}</strong>
                        </div>
                    )}
                </div>
                <div style={{ marginLeft: '30px', paddingTop: '15px' }}>
                    <h3 style={{ color: '#0000008f' }}>Utilization Registration</h3>
                    <div style={{
                        width: '50px', height: '5px', background: '#00629B',
                        marginTop: '-12px', borderRadius: '5px', marginBottom: '15px'
                    }}>

                    </div>
                    <div className="inputdiv">
                        <span className="label">System Name :</span>
                        <input type="text" name="sysname" id="sysname" required="required" />
                    </div>

                    <div className="inputdiv">
                        <span className="label">Tag ID :</span>
                        <input type="text" name="tagid" id="tagid" required="required" />
                    </div>
                    <form id="utilizereg">
                        <div style={
                            {
                                display: 'flex',
                                marginTop: '35px',
                                marginLeft: '35px',
                                paddingBottom: '20px'
                            }
                        }>


                            <div className='remove'>
                                <div style={
                                    {
                                        marginLeft: '30px',
                                        marginTop: '5px',
                                        color: '#00629B',
                                        cursor: 'pointer',
                                        fontFamily: 'Poppins-Regular'
                                    }
                                }
                                    onClick={
                                        this.hide
                                    }>
                                    Remove
                                </div>
                                <div>
                                    <i style={
                                        {
                                            fontSize: '20px',
                                            marginLeft: '10px',
                                            marginTop: '5px',
                                            color: '#00629B'
                                        }
                                    }
                                        className="fas fa-file-times"></i>
                                </div>
                            </div>
                            <div className='register'>
                                <div onClick={
                                    this.register
                                }
                                    style={
                                        {
                                            marginLeft: '30px',
                                            marginTop: '5px',
                                            color: 'white',
                                            cursor: 'pointer',
                                            fontFamily: 'Poppins-Regular'
                                        }
                                    }>
                                    Register
                                </div>
                                <div>
                                    <i style={
                                        {
                                            fontSize: '20px',
                                            marginLeft: '10px',
                                            marginTop: '5px',
                                            color: 'white'
                                        }
                                    }
                                        className="fas fa-file-plus"></i>

                                </div>
                            </div>
                        </div>
                    </form>
                    <form id="deletetag"
                        style={
                            {
                                paddingBottom: '30px',
                                display: 'none'
                            }
                        }>
                        <div className="inputdiv">
                            <span className="label">Tag ID :</span>
                            <input type="text" name="id" id="id" required="required" />
                        </div>
                        <div className='delete'>
                            <div onClick={
                                this.remove
                            }
                                style={
                                    {
                                        marginLeft: '30px',
                                        marginTop: '5px',
                                        color: '#00629B',
                                        fontFamily: 'Poppins-Regular'
                                    }
                                }>
                                Remove
                            </div>
                            <div>
                                <i style={
                                    {
                                        fontSize: '20px',
                                        marginLeft: '10px',
                                        marginTop: '5px',
                                        color: '#00629B'
                                    }
                                }
                                    className="fas fa-file-times"></i>
                            </div>
                        </div>
                    </form>
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



// <div className='utilCard' id='statuscolor' style={{ marginLeft: "30px", }}  >
//     <p className='utilCardText'>Status</p>
//     <p className='utilCardText' style={{ marginTop: '-6px' }}>
//         <span id='statustext' style={{ fontSize: '25px', fontWeight: 600 }}> </span></p>
// </div>