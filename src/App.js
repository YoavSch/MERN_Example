import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class  App extends React.Component{
  // componentDidMount() {
  //   axios.get(`http://localhost:4000/api/members`)
  //     .then(res => {
  //       const persons = res.data;
  //       console.log(persons)
  //       this.setState({ persons });
  //     })
  // }
  render() {
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )}
}

export default App;
