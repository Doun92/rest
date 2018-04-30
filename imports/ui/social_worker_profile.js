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
    
    'phoneNumber': function(){
        data = Meteor.user();
        if(data.phoneNumber){
            phoneNumber = data && data.phoneNumber;
            return phoneNumber;    
        }else{
            return "Champ obligatoire"
        }
    } 
});

// Fonction pour changer des données dans la base de données
Template.social_worker_profil.events({
    'submit .profilForm' : function(event) {

        event.preventDefault();

        const target = event.target;
        const phoneNumber = target.newPhoneNumber.value;
        const newMail = target.email.value;

        Meteor.users.update(
            Meteor.userId(), { $set: { 
                phoneNumber: phoneNumber,
                'emails.0.address': newMail,
            } }
          );
    }
});