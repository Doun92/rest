import { Mongo } from 'meteor/mongo';

if (Meteor.isServer) {
    // This code only runs on the server
    //Meteor.publish('colltest', function tasksPublication() {
      //return Colltest.find();
    //});
  }

//export const Colltest = new Mongo.Collection('colltest');