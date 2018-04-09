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
        if (data.institute){
            institute = data && data.institute;
            return institute;         
        }else{
            return `Champ obligatoire `; 
        }
    },
    'pro_mail': function(){
        data = Meteor.user();
        if(data.pro_mail){
            address = data && data.pro_mail;
            return pro_mail;    
        }else{
            return `Champ obligatoire`
        }
    },
    
    'phone': function(){
        data = Meteor.user();
        if(data.phone){
            phone = data && data.phone_number;
            return phone;    
        }else{
            return `Champ obligatoire`
        }
    } 
});