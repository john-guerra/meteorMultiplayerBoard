import React, {Component} from "react";
import PropTypes from "prop-types";
import {createContainer} from "meteor/react-meteor-data";


import InputPlayer from "./InputPlayer.jsx";
import Board from "./Board.jsx";
import Controls from "./Controls.jsx";

import { Players } from "../api/players.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.onEnterPlayer = this.onEnterPlayer.bind(this);
    this.movePlayer = this.movePlayer.bind(this);

    this.width = 600;
    this.height = 600;
    this.state = {
      currentPlayer : null,
      players : [{
        name:"John",
        x: 300,
        y: 300

      }]
    };
  }

  onEnterPlayer(name) {
    console.log(name);
    let player = Players.findOne({name:name});

    if(player===undefined) {
      let player = {
        name: name,
        x: Math.random()*this.width,
        y: Math.random()*this.height
      };
      player._id = Players.insert(player);

    }

    this.setState({
      currentPlayer :player
    });
  }

  movePlayer(direction) {
    console.log("Move " + direction);
    let player = Players.findOne(this.state.currentPlayer._id),
      x = player.x,
      y = player.y;
    switch(direction) {

    case "up":
      y-=5;
      break;
    case "down":
      y+=5;
      break;
    case "left":
      x-=5;
      break;
    case "right":
      x+=5;
      break;
    }

    Players.update(this.state.currentPlayer._id,
      {
        name:player.name,
        x: x,
        y: y
      }
    );
  }

  render() {
    return (
    <div className="App">
      {this.state.currentPlayer !== null ?
        <Controls onClick={this.movePlayer}></Controls> :
        <InputPlayer onClick = {this.onEnterPlayer}></InputPlayer>
      }
      <Board
        width={this.width}
        height={this.height}
        players={this.props.players}></Board>

    </div>);
  }
}

App.propTypes = {
  players: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    players: Players.find({}).fetch()
  };
}, App);








