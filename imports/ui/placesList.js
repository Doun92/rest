import { Accommodation } from "../api/accommodation-methods.js";
import { AllUser } from '../api/placesList_methods.js';

import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// Template.placesList.events({
//     'click .adresse':function(event){
//         let place_id=this._id;
//         let place_num=this.availability;
//         console.log(place_num);
//         let hostId = this.host_id;
//         console.log(hostId);
//         // var number = Meteor.users.hostname;        
//         let number = Meteor.users.findOne(
//             {_id:hostId},
//         );
//         let hostName = number.firstname
//         console.log(hostName);
//     }
// })

Template.placesList.onCreated(function(){
    this.subscribe('places');
    this.subscribe('allUser')
})

Template.placesList.helpers({
     'places':function() {
        Meteor.subscribe('places');
         //tmp = Meteor.Accommodation.find({}).fetch();
         console.log(Accommodation.find({}));
         return Accommodation.find({});
         //return 'ok'
     },
 });

// Template.placesList.helpers({
//     'allUser':function(){
//         Meteor.subscribe('allUser')
//         console.log(AllUser.find({}));
//         return AllUser.find({})
//     },
// });

Template.placesList.helpers({
    'firstname': function(){
        Meteor.subscribe('places')
        let hostId = this.host_id;
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