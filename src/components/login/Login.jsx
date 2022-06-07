import React, { Component } from 'react';
import '../styles.css';
import '../login/login.css';
import axios from 'axios'

axios.defaults.xsrfHeaderName = "x-csrftoken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            message: "",
            error: false,
        }
    }

    submit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        let data = { username: username, password: password }
        if (username.length === 0 || password.length === 0) {
            this.setState({ error: true, message: 'Required All Fields.' });
        } else {
            axios({ method: 'POST', url: '/api/login', data: data })
                .then((res) => {
                    if (res.status === 200) {
                        sessionStorage.setItem("login", "success");
                        this.props.parentCallback("success");
                    }
                })
                .catch((err) => {
                    sessionStorage.setItem("login", "failed");
                    this.props.parentCallback("failed");
                    this.setState({ error: true, message: 'Incorrect Username/Password' })
                    if (err.response.status === 401) {
                        this.setState({ error: true, message: 'Incorrect Credentials' })
                    }
                })
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    // componentDidUpdate() {
    //     setTimeout(() => this.setState({ message: '' }), 3000);
    // }

    render() {
        const { username, password, message, error } = this.state;
        return (
            <div style={{
                margin: '0px',
                background: 'linear-gradient(to right, #b3d1ff, #e6f0ff)',
                position: 'absolute', width: '100%', height: '100%'
            }} >
                <div className='main_body' >

                    <img
                        src="/images/vacuslogo.png" alt="logo"
                        style={{
                            width: '34%',
                            marginTop: '20px',
                            marginLeft: '25px'
                        }}
                    />
                    <img
                        src="/images/landt.png" alt="logo"
                        style={{
                            width: '45%',
                            marginTop: '20px',
                            marginLeft: '20px'
                        }}
                    />
                    <br />
                    <p
                        style={{
                            marginLeft: '94px',
                            fontSize: '19px',
                            color: 'white',
                            margin: '23px 0px 0px 76px',
                            fontWeight: 500, fontFamily: 'Poppins-Regular'

                        }}>
                        Login to Dashboard</p><br />

                    <p
                        style={{
                            marginLeft: '50px',
                            fontSize: '14px',
                            color: 'white',
                            margin: '0px 0px 10px 45px',
                            fontFamily: 'Poppins-Regular'
                        }}
                    >
                        Enter Username and Password Below
                    </p>
                    {error && (
                        <div style={{ color: 'red', marginLeft: '85px' }}>
                            <strong>{message}</strong>
                        </div>
                    )}

                    <form
                        onSubmit={this.submit}
                    >
                        <label htmlFor=""
                            style={{
                                marginLeft: '35px',
                                color: '#00629B',
                                marginBottom: '10px',

                            }}

                        >USERNAME</label><br />
                        <input
                            type="text"
                            name='username'
                            className='type_text'
                            placeholder='Username'
                            value={username}
                            onChange={this.handleChange}
                            style={{ padding: '0px', marginTop: '10px', marginBottom: '10px', width: '285px', height: '35px' }}
                        /> <br />

                        <label htmlFor=""
                            style={{
                                marginLeft: '35px',
                                color: '#00629B',
                                marginBottom: '10px',
                                fontFamily: ' Poppins-Regular'
                            }}

                        >PASSWORD</label><br />

                        <input
                            type='password'
                            name='password'
                            className='type_password'
                            placeholder='Password'
                            onChange={this.handleChange}
                            style={{ padding: '0px', marginTop: '10px', width: '285px', height: '35px' }}
                            value={password}
                        /><br />

                        <button
                            style={{
                                width: '285px',
                                background: '#00629B',
                                height: '35px',
                                marginLeft: '35px',
                                marginTop: '18px',
                                borderRadius: '6px',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                        >LOGIN</button>
                    </form>
                </div>
            </div>
        );
    }
}
