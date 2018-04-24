import { Template } from 'meteor/templating';
import './template/social_worker_profile.html';


// récupère la publication du fichier server main.js
// permet notamment de récupérer les champs ajouté dans la collection

Meteor.subscribe('userData');

Template.social_worker_profil.helpers({
 'test': function() {
     data = Meteor.user();
     if(data.firstname){
         test = data && data.firstname;
         return test;
     }else{
    return 'Champ obligatoire'
  }
},
    'lastname': function(){
        data = Meteor.user();
        if(data.lastname){
            lastname = data && data.lastname;
            return lastname;    
        }else{
            return `Champ obligatoire`
        }
    },
    'institute': function(){
        data = Meteor.user();
        if (data.institution){
            institute = data && data.institution;
            return institute;         
        }else{
            return `Champ obligatoire `; 
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
    
    'phone_number': function(){
        data = Meteor.user();
        if(data.phone_number){
            phone_number = data && data.phone_number;
            return phone_number;    
        }else{
            return "Champ obligatoire"
        }
    } 
});

Template.social_worker_profil.events({
    'submit .profilForm' : function(event) {

        event.preventDefault();

        const target = event.target;
        const phone_number = target.new_phone_number.value;
        const newMail = target.email.value;

        Meteor.users.update(
            Meteor.userId(), { $set: { 
                phone_number: phone_number,
                'emails.0.address': newMail,
            } }
          );
    }
});
Template.profilRoute.onCreated(function() {
    this.subscribe('userData');
});

Template.profilRoute.helpers({
    'isSocialWorker': function() {
        data = Meteor.user();
        sw = data && data.sw;
        return sw;
    }
});

// subscribing user datas for the accomodations route

Template.accommodationsRoute.onCreated(function() {
    this.subscribe('userData');
});

Template.accommodationsRoute.helpers({
    'isSocialWorker': function() {
        data = Meteor.user();
        sw = data && data.sw;
        return sw;
    }
});

// subscribing for the layout template, like a global helper

Template.mainRoute.onCreated(function() {
    this.subscribe('userData');
});

Template.mainRoute.helpers({
    'isSocialWorker': function() {
        data = Meteor.user();
        sw = data && data.sw;
        return sw;
    }
});