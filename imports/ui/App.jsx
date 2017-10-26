import React, {Component} from "react";
import PropTypes from "prop-types";
import {createContainer} from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

import InputPlayer from "./InputPlayer.jsx";
import Board from "./Board.jsx";
import Controls from "./Controls.jsx";
import AccountUIWrapper from "./AccountUIWrapper.jsx";



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
    console.log("Finding player="+name);
    Meteor.subscribe("players");
    let player = Players.findOne({name:name});

    if(player===undefined) {
      // player = {
      //   name: name,
      //   x: Math.random()*this.width,
      //   y: Math.random()*this.height
      // };
      // player._id = Players.insert(player);
      Meteor.call("players.insert", Math.random()*this.width, Math.random()*this.height);
      player = Players.findOne({name:name});
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
    Meteor.call("players.update", x, y);

    // Players.update(this.state.currentPlayer._id,
    //   {
    //     name:player.name,
    //     x: x,
    //     y: y
    //   }
    // );
  }

  componentWillUpdate() {
    console.log("update currentPlayer");
    console.log(this.state.currentPlayer);
    if (Meteor.user()) {
      if (this.state.currentPlayer &&
        Meteor.user().username=== this.state.currentPlayer.name)
        return;
      this.onEnterPlayer(Meteor.user().username);
    }
  }

  render() {
    return (
    <div className="App">

      <div>
        <AccountUIWrapper/>
      </div>

      {Meteor.user() !== null ?
        <Controls onClick={this.movePlayer}></Controls> :
        <div> Please sig in</div>
        // <InputPlayer onClick = {this.onEnterPlayer}></InputPlayer>
      }
      <Board
        width={this.width}
        height={this.height}
        players={this.props.players}></Board>

    </div>);
  }
}

App.propTypes = {
  players: PropTypes.array.isRequired,
  user: PropTypes.object
};



export default AppContainer = createContainer((props) => {
  Meteor.subscribe("players");
  // let currentPlayer = Players.findOne({name:Meteor.user().username});
  return {
    players: Players.find({}).fetch(),
    user: Meteor.user(),
    // currentPlayer: currentPlayer,
  };
}, App);








