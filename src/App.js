import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Routes from './routes';
import ReactGA from 'react-ga';
import './App.css';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      foo: 'bar',
    };

    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);

  }
  render() {
    return (
      <Router>
        <Link to="/projects"></Link>
        <Routes />
      </Router>
    );
  }
}

export default App;
