import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accommodation } from './accommodation-methods';
//import { Accommodation } from './accommodation-methods';

if (Meteor.isServer) {
    Meteor.publish('places', function () {
  
        return Accommodation.find({}, {
          fields: { 
            _id : 1,
            address : 1,
            loc_number : 1,
            zipCode : 1,
            location : 1, 
            availablePlaces : 1,
            availability : 1,
            host_id : 1
          }
        });
    });
  }

//export const Places = new Mongo.Collection('accommodations');
