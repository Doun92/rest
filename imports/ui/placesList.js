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

Template.placesList.helpers({
     'places':function() {
        Meteor.subscribe('places');
         //tmp = Meteor.Accommodation.find({}).fetch();
         console.log(Accommodation.find({}));
         return Accommodation.find({});
         //return 'ok'
     },
 });

Template.placesList.helpers({
    'allUser':function(){
        Meteor.subscribe('allUser')
        console.log(AllUser.find({}));
        return AllUser.find({})
    },
});

/*Template.social_worker_profil.helpers({
    'test': function() {
        data = Meteor.user();
        if(data.firstname){
            test = data && data.firstname;
            return test;
        }else{
       return 'Champ obligatoire'
     }
   },
}); */
/*Template.placesList.helpers({
    'firstname': function(){
        Meteor.subscribe('allUser')
        data = Meteor.user();
        if(data.firstname){
            firstname = data && data.firstname;
            return firstname;    
        }else{
            return "Champ obligatoire"
        }
    },
    'lastname': function(){
        data = Meteor.user();
        if(data.lastname){
            lastname = data && data.lastname;
            return lastname;    
        }else{
            return "Champ obligatoire"
        }
    },
    'mail': function(){
        data = Meteor.user();
        if(data.emails[0].address){
            address = data && data.emails[0].address;
            return address;    
        }else{
            return "Champ obligatoire"
        }
    },
    
    'phone': function(){
        data = Meteor.user();
        if(data.phoneNumber){
            phone = data && data.phoneNumber;
            return phone;    
        }else{
            return "Champ obligatoire"
        }
    }   
})*/