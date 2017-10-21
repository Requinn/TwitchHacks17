import React, { Component } from 'react';
import chatClient from './chatbot.js';
import './App.css';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie} from 'recharts';
import emoji from './Emojis.json';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      log: "",
      map: {},
      words: [],
      emojis: {},
      emojiarray: []
    };
    let client = new chatClient({
        channel: '#handiofiblood',
        username: 'requinn',
        password: 'oauth:67hqi7y1taocu6knvw8sk33enwgaxe',
    });
    client.open();
    client.onMessageReceived = (message) => {
      let newLog = this.state.log + " " + message.toLowerCase();
      let map = this.wordcnt(newLog, 0);
      let emojis = this.wordcnt(newLog, 1);
      let emojiarray = this.map_to_objarray(emojis);
      let words = this.map_to_objarray(map);
      words.sort(function(a, b){return a.count - b.count});
      this.setState({
        log: newLog,
        map,
        words,
        emojis,
        emojiarray
      });
    }
  }

  wordcnt(words, opt) {
    return words.replace(/the|and|\b[a-z]{1,2}\b|\b[^\w\s]\b/g, "").split(/\s+/).reduce(function(map, word){
      if(emoji.hasOwnProperty(word)){
        emoji[word] = (map[word]||0)+1;
      }else{
        map[word] = (map[word]||0)+1;
      }
      if(opt == 0){
        return map;
      }else{
        return emoji;
      }
    }, Object.create(null));

  }

  map_to_objarray(input){
    var a = [];
    var size = input.length;
    for(var m in input){
      if(input[m] > 1){
        a.push({name:m.substring(0), value:input[m]});
      }
    }
    return a;
  }
  	render () {

    	return (
        <div>
      	<BarChart width={600} height={300} data={this.state.words}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="name"/>
         <YAxis/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Bar dataKey="value" fill="#8884d8" />
        </BarChart>

        </div>
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
