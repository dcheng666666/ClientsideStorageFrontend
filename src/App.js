import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import CookieShowcase from './cookieShowcase';
import SessionStorageShowcase from './sessionStorageShowcase';
import IndexedDBShowcase from './indexedDBShowcase';
import Home from './home';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Route path="/" component={Home}/>
        </Router>
        <Router>
          <Route path="/cookie/" component={CookieShowcase} />
        </Router>
        <Router>
          <Route path="/sessionStorage/" component={SessionStorageShowcase} />
        </Router>
        <Router>
          <Route path="/indexedDBShowcase/" component={IndexedDBShowcase} />
        </Router>
      </React.Fragment>
    )
  }
}

export default App;
