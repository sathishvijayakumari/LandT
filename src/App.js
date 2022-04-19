import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Leftsidebar from "./components/leftsidebar/Leftsidebar";
import Home from './components/pages/Home';
import Realtime from './components/pages/Realtime';
import Health from './components/pages/Health';
import Alerts from './components/pages/Alerts';
import Registration from './components/pages/Registration';
import Utilize from './components/pages/Utilize';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedin: false,
      status: 'failed'
    }

  }
  login = () => {
    let data = sessionStorage.getItem('login')
    this.setState({ status: data });
  }
  componentDidMount() {
    let data = sessionStorage.getItem('login')
    this.setState({ status: data });
  }
  render() {
    const { status } = this.state;
    if (status === "failed" || status === null) {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route exact path="/login" element={<Login parentCallback={this.login} />} />
          </Routes>
        </Router>
      )
    }
    else {
      return (
        <Router>
          <Leftsidebar />
          <Routes>
            <Route path="/login" element={<Navigate to="/home" />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/realtime" element={<Realtime />} />
            <Route exact path="/health" element={<Health />} />
            <Route exact path="/alerts" element={<Alerts />} />
            <Route exact path="/register" element={<Registration />} />
            <Route exact path="/utilization" element={<Utilize />} />
          </Routes>
        </Router>
      );
    }
  }
}
