import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Players = new Mongo.Collection("Players");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("players", function playersPublication() {
    return Players.find();
  });
}

Meteor.methods({
  "players.insert"(x, y) {
    let user = Meteor.user();
    console.log("Inserting player user");
    Players.insert( {
      name: user.username,
      x: x,
      y: y
    });
  },
  "players.update"(x, y) {
    Players.update({
      name:Meteor.user().username},
      { $set:{
          x:x,
          y:y
        }
      });
  }

});