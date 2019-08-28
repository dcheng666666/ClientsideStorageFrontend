import React from 'react';
import './App.css';

class SessionStorageShowcase extends React.Component {
  constructor() {
    super();
    this.state = { name: '', age: 0 };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.localStorageUpdated = this.localStorageUpdated.bind(this);
  }

  componentDidMount() {
    this.setState({
      name: localStorage.getItem('name'),
      age: localStorage.getItem('age'),
    });
    window.addEventListener('storage', this.localStorageUpdated);
  }

  render() {
    return (
      <div>
        <div>
          Your Name: <input value={this.state.name} onChange={this.handleNameChange}/>
        </div>
        <div>
          Your Age: <input type='number' value={this.state.age} onChange={this.handleAgeChange} />
        </div>
        <div>
          <button onClick={this.handleSubmit}>Sumbit</button>
        </div>
      </div>);
  }

  handleNameChange(event) {
    localStorage.setItem('name', event.target.value);
    this.setState({ name: event.target.value });
  }

  handleAgeChange(event) {
    localStorage.setItem('age', event.target.value);
    this.setState({ age: event.target.value });
  }

  handleSubmit(event) {
    localStorage.removeItem('name');
    localStorage.removeItem('age');
    this.setState({
      name:'',
      age:0,
    });
  }

  localStorageUpdated(event) {
    let obj = Object.defineProperty({}, event.key, {value:event.newValue, configurable:true, enumerable:true, writable:true});
    this.setState(obj);
  }
}

export default SessionStorageShowcase;
