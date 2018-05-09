import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

if (Meteor.isServer) {
    Meteor.publish('history', function () {
  
        return HistoryLocation.find({}, {
          fields: { 
            _id : 1,
            user_id : 1,
            host_id : 1,
            place_id : 1,
            date_resa : 1,
            resa_status : 1 
          }
        });
    });
  }

export const HistoryLocation = new Mongo.Collection('historyLocation');