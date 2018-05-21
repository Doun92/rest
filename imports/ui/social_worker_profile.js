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

Template.social_worker_profil.events({
    'submit .profilPic':function(event,tempalte){
        var file = document.getElementById('profilePic-input').files[0];
        var reader  = new FileReader();
        // it's onload event and you forgot (parameters)
        reader.onload = function(e)  {
            let image = document.getElementById("profilePic")
            // the result image data
            image.src = e.target.result;
         }
         console.log(file.name);

         //For now the input is just a simple string which is the file name. In the end, the goal would be to setup a image hosting service (Cloudinary)
         Meteor.users.update(
             Meteor.userId(),{$set:{
                 photo: file.name
             }}
         )
         // you have to declare the file loading
         reader.readAsDataURL(file);
        return false;
    }
})
