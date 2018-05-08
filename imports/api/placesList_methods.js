import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accommodation } from './accommodation-methods';

if (Meteor.isServer) {
    Meteor.publish('places', function () {
  
        return Accommodation.find({}, {
          fields: { 
            _id : 1,
            address : 1,
            locNumber : 1,
            zipCode : 1,
            location : 1, 
            availablePlaces : 1,
            availability : 1,
            host_id : 1
          }
        });
    });
  }

if (Meteor.isServer) {
  Meteor.publish('allUser', function () {
      return Meteor.users.find({}, {
        fields: { 
          firstname : 1,
          lastname : 1,
          phoneNumber : 1,
          userAddress : 1,
          sw : 1,
          institute : 1
        }
      });
  });
}

export const AllUser = new Mongo.Collection('allUser');
