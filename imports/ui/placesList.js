import { Accommodation } from "../api/accommodation-methods.js";
import { AllUser } from '../api/placesList_methods.js';

import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

Template.placesList.onCreated(function(){

    //places are displayed dependently on the date of the day
    //here is the filter

    this.subscribe('places');
    this.subscribe('allUser')
    var filterActualDate = new Date();
    var filterActualMonth = filterActualDate.getMonth()+1;
    var filterActualDay = filterActualDate.toDateString().substr(9,1);

    //global var
    filterQuery = {}
    var tmpKey = `availability.${filterActualMonth}.${filterActualDay}`
    filterQuery[tmpKey] = filterActualDate.toDateString()

})

// Appel chaque logement depuis la base de données
// et filtre selon la date du jour

Template.placesList.helpers({
     'places':function() {
        return Accommodation.find(
            filterQuery
        );
     },
 });

//  Template.placesList.helpers({
//     'jourJ': function(){
//         Meteor.subscribe('places')
//         let hostId = this.availability;
//         console.log(hostId)
//         let number = Meteor.users.findOne(
//             {_id:hostId},
//         );
//         let hostname = number.firstname;
//         return hostname;
//     },
// });

//Bien joué Daniel... 

// Permet d'afficher les noms des users de chaque adresse
Template.placesList.helpers({
    'firstname': function(){
        let hostId = this.host_id;
        console.log(hostId)
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
    // C'est normale que ça ne s'affiche pas car les mails et les phoneNumbers sont pas dans la base de données des accueillants
    // 'mail': function(){
    //     Meteor.subscribe('places')
    //     let hostId = this.host_id;
    //     let number = Meteor.users.findOne(
    //         {_id:hostId},
    //     );
    //     let mail = number.;
    //     return mail;
    // },
    
    'phone': function(){
         let hostId = this.host_id;
         let number = Meteor.users.findOne(
             {_id:hostId},
         );
         let phone = number.phoneNumber;
         return phone; 
     } 
})