import { Accommodation } from "../api/accommodation-methods.js";

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HistoryLocation } from "../api/reservations-methods";

Template.places_list.onCreated(function(){

    //places are displayed dependently on the date of the day
    //here is the filter
    this.subscribe('places');
    this.subscribe('history');
    this.subscribe('usersPublication');

    var filterActualDate = new Date();
    var filterActualMonth = filterActualDate.getMonth()+1;
    var filterActualDay = filterActualDate.getDate();

    //global var
    filterQuery = {};
    var tmpKey = `availability.${filterActualMonth}.${filterActualDay}`;
    filterQuery[tmpKey] = filterActualDate.toDateString();

})

Template.places_list.helpers({
    'places':function() {

        let startToday = new Date();
        startToday.setHours(0,0,0,0);

        let endToday = new Date();
        endToday.setHours(23,59,59,999);
 
        let reservedAccommodationsForToday = HistoryLocation.find(
            {$and : [
                {reservationStatus:"reserved"},
                {reservationDate : {$gte: startToday, $lt: endToday}}
            ]},
            {fields : {
                place_id:1
            }}
        ).fetch();
        
        // Every accommodation filtered by the date of today
        let placesForToday = Accommodation.find(
            {$and :[
                filterQuery,
            ]}).fetch();

        // Filter places with reservations data and associate accommodation with reservation
        let placesReservedToday = placesForToday.filter(item => {
            return reservedAccommodationsForToday.some( element => {
              return element.place_id === item._id;
            })
          });

        // Remove reserved accommodations
        let placesAvailableToday = placesForToday.filter(item => {
            return placesReservedToday.every(element => {
                return element._id !== item._id;
            })
        });

        //if no reservation exists
        if(placesAvailableToday==0){
            return placesForToday;
        }
        else{
            return placesAvailableToday;
            
        }
    }
 });

// Permet d'afficher les noms des users de chaque adresse
Template.places_list_item.helpers({
    'firstname': function(){
        let hostId = this.host_id;
        let number = Meteor.users.findOne(
            {_id:hostId},
        );
        let hostname = number.firstname;
        return hostname;
    },
    'lastname': function(){
        let hostId = this.host_id;
        let number = Meteor.users.findOne(
            {_id:hostId},
        );
        let lastname = number.lastname;
        return lastname;
        },
    
    'phone': function(){
         let hostId = this.host_id;
         let number = Meteor.users.findOne(
             {_id:hostId},
         );
         let phone = number.phoneNumber;
         return phone; 
     } 
})