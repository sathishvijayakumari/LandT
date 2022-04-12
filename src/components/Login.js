import React from 'react';
import axios from "axios";
axios.defaults.xsrfHeaderName = "x-csrftoken";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = true;


function Login() {
    const loginmet = () => {
        let data = { username: "admin", password: "admin" };
        axios({ method: "POST", url: "/api/login", data: data })
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    sessionStorage.setItem("login", true)
                    console.log("===SUCCESS==>");
                }
            })
            .catch((err) => {
                console.log("=====>", err);
            })
    }
    return (
        <div>
            <button
                style={{
                    width: "100px", height: "50px",
                    background: "lightblue"
                }}
                onClick={() => loginmet()}
            >
                Login
            </button>
        </div>
    )
}

export default Login