import React, { Component } from 'react';
import chatClient from './chatbot.js';
import './App.css';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,Legend} from 'recharts';
import twitchEmotes from './twitchEmotes.json';
import ReactInterval from 'react-interval';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      log: "",
      words: [],
      emote: [],
      status: "",
    };

  }

  onNewChannel(channel) {
    let client = new chatClient({
        channel: '#'+ channel,
        username: 'thesulima',
        password: 'oauth:xwuy0tnf9g8x1bpx439km43av15lig',
    });
    client.open();
    this.setState({
      log: "",
      words: [],
      emote: [],
      status: "Connecting",
      client,
      channelName: ""
    });
    client.onMessageReceived = (message) => {
      console.log(message);
      const newLog = this.state.log + " " + message;
      this.setState({
        log: newLog,
        status: "Connected"
      });
    }
  }



  wordcnt(words) {
    return words.replace(/( a |by|the| i |for|[0-9]|\b[a-e]{1,2}\b|\b[g-z]{1,2}\b)|[^\w\s]/g, "").split(/\s+/).reduce(function(map, word){
      if (map.words === undefined) {
        map.words = {};
        map.emote = {};
      }
      //console.log(map);
      if (twitchEmotes[word] !== undefined) {
        //console.log(1, word);
        map.emote[word] = (map.emote[word]||0)+1;
      } else if (word !== ""){
        const lowerWord = word.toLowerCase();
        map.words[lowerWord] = (map.words[lowerWord]||0)+1;

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
          <div style={{
            margin: '20px 77px'
          }}>
            <span>
              #
            </span>
            <input onChange={(event) => this.setState({channelName: event.target.value})} type="text"/>
            <button onClick={(event) => this.onNewChannel(this.state.channelName) }>
              Enter Channel
            </button>
            <span style={{
              marginLeft: '5px'
            }}>
              {this.state.status}
            </span>
          </div>

          <ReactInterval timeout={1000} enabled={true}
            callback={() => {
              const map = this.wordcnt(this.state.log);
              const words = this.map_to_objarray(map.words, 5);
              const emote = this.map_to_objarray(map.emote, 1);
              this.setState({
                words,
                emote
              })
            }}
          />
        	<BarChart width={600} height={300} data={this.state.emote}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <XAxis dataKey="word"/>
           <YAxis/>
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Legend />
           <Bar name = "Emote Count" dataKey="count" fill="#6441A4" />
          </BarChart>
        	<BarChart width={600} height={300} data={this.state.words}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <XAxis dataKey="word"/>
           <YAxis/>
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Legend />
           <Bar name = "Word Frequency" dataKey="count" fill="#6441A4" />
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
