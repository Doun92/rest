import { Accommodation } from "../api/accommodation-methods.js";

import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


Template.placesList.onCreated(function(){
    this.subscribe('places');
})

Template.placesList.helpers({
     'places':function() {
        Meteor.subscribe('places')
         //tmp = Meteor.Accommodation.find({}).fetch();
         console.log(Accommodation.find({}));
         return Accommodation.find({});
         //return 'ok'
     },
 });
