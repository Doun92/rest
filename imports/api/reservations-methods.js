import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

if (Meteor.isServer) {
  Meteor.publish('history', function () {
      return HistoryLocation.find({
        $or : [
          {host_id : Meteor.userId()},
          {socialWorker_id : Meteor.userId()}
      ]}, {
        fields: { 
          _id : 1,
          socialWorker_id : 1,
          host_id : 1,
          place_id : 1,
          reservationDate : 1,
          reservationStatus : 1,
          alert_sw_status:1 
        }
      });
  });
}

export const HistoryLocation = new Mongo.Collection('historyLocation');
