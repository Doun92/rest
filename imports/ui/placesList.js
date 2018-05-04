import { Accommodation } from "../api/accommodation-methods.js";
import { AllUser } from '../api/placesList_methods.js';

import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

Template.placesList.onCreated(function(){
    this.subscribe('places');
    this.subscribe('allUser')
})

// Appel chaque logement depuis la base de données
Template.placesList.helpers({
     'places':function() {
        Meteor.subscribe('places');
         //tmp = Meteor.Accommodation.find({}).fetch();
         console.log(Accommodation.find({}));
         return Accommodation.find({});
         //return 'ok'
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

// Permet d'afficher les noms des users de chaque adresse
Template.placesList.helpers({
    'firstname': function(){
        Meteor.subscribe('places')
        let hostId = this.host_id;
        console.log(hostId)
        let number = Meteor.users.findOne(
            {_id:hostId},
        );
        let hostname = number.firstname;
        return hostname;
    },
    'lastname': function(){
        Meteor.subscribe('places')
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
    
    // 'phone': function(){
    //     Meteor.subscribe('places')
    //     let hostId = this.host_id;
    //     let number = Meteor.users.findOne(
    //         {_id:hostId},
    //     );
    //     let phone = number.phoneNumber;
    //     return phone; 
    // } 
})