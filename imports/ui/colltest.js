import { Template } from 'meteor/templating';

import { Colltest } from '../api/colltest.js';
 
import './body.html';
 
//Meteor.subscribe('colltest');

Template.body.helpers({
  //colltest() {
    //return Colltest.find({});
  //},
});

Template.coltemp.events({
    'submit .testform'(event) {
      // Prevent default browser form submit
      event.preventDefault();
   
      // Get value from form element
      const text = 'salut le monde';
   
      // Insert a task into the collection
      Colltest.insert({
        text,
        createdAt: new Date() // current time
      });
    },
  });