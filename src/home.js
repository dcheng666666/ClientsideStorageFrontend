import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import './App.css';

class Home extends React.Component {
  render() {
    return (
        <div>
          <button onClick={()=>window.location.href='/'}>Home</button>
          <button onClick={()=>window.location.href='/cookie'}>CookieShowcase</button>
          <button onClick={()=>window.location.href='/sessionStorage'}>SessionStorageShowcase</button>
          <button onClick={()=>window.location.href='/indexedDBShowcase'}>IndexedDBShowcase</button>
      </div>);
  }
}

export default Home;
