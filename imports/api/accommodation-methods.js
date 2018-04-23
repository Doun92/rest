import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

/*
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('accommodations', function tasksPublication() {
      return Accommodation.find();
    });
  }
*/

if (Meteor.isServer) {
    Meteor.publish('accommodations', function () {
      if (this.userId) {
        return Accommodation.find({ host_id: this.userId }, {
          fields: { 
            _id : 1,
            address : 1,
            loc_number : 1,
            zip_code : 1,
            availablePlaces : 1,
            availability : 1,
            host_id : 1
          }
        });
      } else {
        this.ready();
      }
    });
  }
//Collection pour les logements
export const Accommodation = new Mongo.Collection('accommodations');
