import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('accommodations', function tasksPublication() {
      return Accommodation.find();
    });
  }

//Collection pour les logements
export const Accommodation = new Mongo.Collection('accommodations');
