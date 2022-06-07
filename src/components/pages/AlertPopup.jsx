import React,{useEffect} from "react";
import { ReactNotifications } from 'react-notifications-component';
import { Store } from 'react-notifications-component';
// import './App.css';
import 'animate.css/animate.compat.css';
import 'react-notifications-component/dist/theme.css'

function AlertPopup() {
    useEffect(() => {
        customNotification();
        setInterval(() => {
            customNotification();
        },2000)
    },[])
    const customNotification = () => {
        Store.addNotification({
            content: MyContent,
            type: "info",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "zoomIn"],
            animationOut: ["animated", "zoomOut"],
            dismiss: {
                duration: 3000,
                showIcon: true,
            }
        });
    }
    return (
        <div className="App">
            <ReactNotifications />
        </div>
    );
}

function MyContent() {
    const alertClicked = () => {
        alert("Notification Clicked!")
    }
    return (
        <div
            style={{
                // marginTop: "-50px",
                background: "#17a2b8",
                height: "80px",
                width: "100%",
                color: "#FFF",
                textAlign:"center",
                borderRadius: "3px",
                boxShadow: "inset 8px 0px 0px rgb(0 0 0 / 20%)",
            }}
            onClick={() => alertClicked()}
        >
            <p style={{ margin: "0px", marginTop: "10px" }}>Panic Alert</p>
            <p style={{ margin: "0px", marginTop: "10px" }}>5a-c2-15-00-01</p>
        </div>
    )
}

export default AlertPopup;
