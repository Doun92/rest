import { Template } from 'meteor/templating';
import './template/social_worker_profile.html';


// récupère la publication du fichier server main.js
// permet notamment de récupérer les champs ajouté dans la collection
Meteor.subscribe('userData');

Template.profile_travailleur_social.helpers({
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
        if(data.phone){
            phone = data && data.phone;
            return phone;    
        }else{
            return "Champ obligatoire"
        }
    } 
});

// events attache un évènement et une fonction à un template 
// ici l event est le submit du formulaire (click sur le bouton submit)
// la fonction consiste à mettre à jour les champs de la collection

//*********************************************** *//
//a déplacer dans server/account_creation.js
/*
Template.profile_travailleur_social.events({
    'submit .profilForm' : function(event) {

        event.preventDefault();

        const target = event.target;
        const firstname = target.firstname.value;
        const lastname = target.lastname.value;
        const institute = target.institute.value;
        const pro_mail = target.pro_mail.value;
        const phone = target.phone.value;

        Meteor.socialWorker.update(
            Meteor.socialWorkerID(), { $set: { 
                firstname: name,
                lastname: lastname,
                institute: institute,
                pro_mail: pro_mail,
                phone_number: phone,
            }}
          );
    }
});
*/
//**************************************************** */

Accounts.onLogin(function () {
    if(FlowRouter.current().route.group.name === 'SocialWorker'){
        FlowRouter.go('socialWorkerPage')
    }
  })
  
  Tracker.autorun(function () {
    if (!Meteor.userId()) {
      FlowRouter.go('mainPage')
    }
  })