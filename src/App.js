import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { Routes } from './routes';
import ReactGA from 'react-ga';
import './App.css';
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {}
    };

    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);

  }

  render() {
    return (
      <Router>
        <Routes />  
      </Router>
    );
  }
}

export default App;
