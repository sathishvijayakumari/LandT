import React, { Component } from 'react'
import $ from 'jquery'
import axios from 'axios';

export default class Assetreg extends Component {

    constructor() {
        super();
        this.state = {
            message: '',
            success: false,
            error: false,
        }
    }
    register = () => {
        let data = {
            name: $('#assetname').val(),
            tagid: $('#assetid').val(),
        }
        if (!$("#assetid").val().match("([A-Za-z0-9]{2}[-]){5}([A-Za-z0-9]){2}")) {
            this.setState({ error: true, message: 'Invalid Asset ID' })
        } else if (data.name !== "" && data.tagid !== "") {
            axios({ method: 'POST', url: '/api/asset/registration', data: data })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200 || response.status === 201) {
                        this.setState({ success: true, message: 'Asset registered successfullyy' })
                        $('#assetid').val('');
                        $('#assetname').val('');
                    } else if (response.status === 406) {
                        this.setState({ success: true, message1: response.data.message })
                    }
                }).catch((error) => {
                    console.log(error);
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
            tagid: $('#id').val()
        }
        if (!$("#id").val().match("([A-Za-z0-9]{2}[-]){5}([A-Za-z0-9]){2}")) {
            this.setState({ error: true, message: 'Invalid Tag ID' })
        }
        else if ($('#id').val() !== '') {
            axios({ method: 'DELETE', url: '/api/asset/registration', data: data }).then((response) => {
                if (response.status === 200 || response.status === 201) {
                    this.setState({ success: true, message: 'Asset Tag Removed Successfullyy' })
                    $('#id').val('');
                    $('#deletetag').hide();
                }
            }).catch((error) => {
                if (error.response.status === 403) {
                    $("#sessionModal").css("display", "block");
                    $("#content").text("User Session has timed out. Please Login again");
                }
            })
        }
        else {
            this.setState({ error: true, message: 'Enter Asset ID' })
        }
    }
    hide = () => {
        document.getElementById("deletetag").style.display =
            $("#deletetag").css("display") === 'block' ? 'none' : 'block'
    }
    componentDidUpdate() {
        setTimeout(() => this.setState({ message: '', message1: '' }), 3000);
    }
    sessionTimeout = () => {
        $("#sessionModal").css("display", "none");
        sessionStorage.removeItem('login')
        window.location.pathname = '/login'
    };
    render() {
        const { message, error, success } = this.state;
        return (
            <div >
                <div style={{ textAlign: 'center', paddingTop: '10px' }}>
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
                <div style={{ marginLeft: '30px', paddingTop: '15px' }}>
                    <h3 style={{ color: '#0000008f' }}>Asset Registration</h3>
                    <div style={{
                        width: '50px', height: '5px', background: '#00629B',
                        marginTop: '-12px', borderRadius: '5px', marginBottom: '15px'
                    }}>

                    </div>
                    <div className="inputdiv">
                        <span className="label">Asset Name :</span>
                        <input type="text" name="assetname" id="assetname" required="required" />
                    </div>

                    <div className="inputdiv">
                        <span className="label">Mac ID :</span>
                        <input type="text" name="assetid" id="assetid" required="required" placeholder='5a-c2-15-01-00-00' />
                    </div>
                    <form id="empreg">
                        <div style={
                            {
                                display: 'flex',
                                marginTop: '35px',
                                marginLeft: '12px',
                                paddingBottom: '20px'
                            }
                        }>


                            <div className='remove'>
                                <div style={
                                    {
                                        marginLeft: '35px',
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
                            <span className="label">Mac ID :</span>
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
