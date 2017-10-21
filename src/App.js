import React, { Component } from 'react';
import chatClient from './chatbot.js';
import './App.css';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      log: "",
      map: {},
      words: []
    };
    let client = new chatClient({
        channel: '#riotgames',
        username: 'requinn',
        password: 'oauth:67hqi7y1taocu6knvw8sk33enwgaxe',
    });
    client.open();
    client.onMessageReceived = (message) => {
      let newLog = this.state.log + " " + message.toLowerCase();
      let map = this.wordcnt(newLog);
      let words = this.map_to_objarray(map);
      words.sort(function(a, b){return a.count - b.count});
      this.setState({
        log: newLog,
        map,
        words
      });
    }
  }



  wordcnt(words) {
    return words.replace(/( a |by|the| i )|[^\w\s]/g, "").split(/\s+/).reduce(function(map, word){
      map[word] = (map[word]||0)+1;
      return map;
    }, Object.create(null));

  }

  map_to_objarray(map){
    var a = [];
    var size = map.length;
    for(var m in map){
      if(map[m] > 13){
        a.push({word:m.substring(0), count:map[m]});
      }
    }
    return a;
  }
  	render () {
      console.log(this.state.words)
    	return (
      	<BarChart width={600} height={300} data={this.state.words}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="word"/>
         <YAxis/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      );
    }
  }


/**  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">

        </p>
      </div>
    );
  }
}**/

export default App;
