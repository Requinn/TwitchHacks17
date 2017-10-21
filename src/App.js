import React, { Component } from 'react';
import chatClient from './chatbot.js';
import './App.css';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import twitchEmotes from './twitchEmotes.json';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      log: "",
      map: {},
      words: []
    };
    let client = new chatClient({
        channel: '#nightblue3',
        username: 'requinn',
        password: 'oauth:67hqi7y1taocu6knvw8sk33enwgaxe',
    });
    client.open();
    client.onMessageReceived = (message) => {
      let newLog = this.state.log + " " + message;
      let map = this.wordcnt(newLog);
      let words = this.map_to_objarray(map.words, 5);
      let emote = this.map_to_objarray(map.emote, 1);
      console.log(emote);

      this.setState({
        log: newLog,
        map,
        words,
        emote
      });
    }
  }



  wordcnt(words) {
    return words.replace(/( a |by|the| i |for|[0-9]|\b[a-z]{1,2}\b)|[^\w\s]/g, "").split(/\s+/).reduce(function(map, word){
      if (map.words === undefined) {
        map.words = {};
        map.emote = {};
      }
      //console.log(map);
      if (twitchEmotes[word] !== undefined) {
        //console.log(1, word);
        map.emote[word] = (map.emote[word]||0)+1;
      } else if (word !== ""){
        // console.log(2, word);
        map.words[word] = (map.words[word]||0)+1;

      }
      return map;
    }, Object.create(null));

  }

  map_to_objarray(map, minCount){
    var a = [];
    var size = map.length;
    for(var m in map){
      if(map[m] > minCount){
        a.push({word:m.substring(0), count:map[m]});
      }
    }
    return a;
  }
  	render () {
    	return (
        <div>
        	<BarChart width={600} height={300} data={this.state.emote}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <XAxis dataKey="word"/>
           <YAxis/>
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        	<BarChart width={600} height={300} data={this.state.words}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <XAxis dataKey="word"/>
           <YAxis/>
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Bar dataKey="count" fill="#8884d8" />
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
