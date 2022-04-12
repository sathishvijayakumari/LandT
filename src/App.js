import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
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
          <Route path="/">
            <Redirect to="/login"></Redirect>
          </Route>
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login
                title="Login"
                {...props}
                parentCallback={this.login}
              ></Login>
            )}
          />
        </Router>
      )
    } else {
      return (
        <Router>
          <Leftsidebar />
          <Switch>
            <Route exact path="/">
              <Redirect to="/home"></Redirect>
            </Route>
            <Route exact path="/login">
              <Redirect to="/home"></Redirect>
            </Route>
            <Route exact path="/home" component={Realtime} />
            <Route exact path="/register" component={Registration} />
            <Route exact path="/realtime" component={Realtime} />
            <Route exact path="/health" component={Health} />
            <Route exact path="/alerts" component={Alerts} />
            <Route exact path="/utilization" component={Utilize} />
          </Switch>
        </Router>
      )
    }
  }
}