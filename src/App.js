import React, { Component } from 'react';
import logo from './logo.svg';
import chatClient from './chatbot.js';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      log: []
    };
    let client = new chatClient({
        channel: '#kamikat',
        username: 'jaltron',
        password: 'oauth:zcoxdqd7e9ntdubjgrbsv55ees2ars',
    });
    client.open();
    client.onMessageReceived = (message) => {
      console.log(message);
      let newLog = this.state.log.slice();
      newLog.push(message);
      console.log(newLog);
        this.setState({
          log: newLog

        })
      }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {
            this.state.log.map((element,index) =>
              <p key={index}>{element}</p>
            )
          }
        </p>
      </div>
    );
  }
}

export default App;
