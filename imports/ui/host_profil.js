import { Template } from 'meteor/templating';
import './template/host_profil_template.html';

// récupère la publication du fichier server main.js
// permet notamment de récupérer les champs ajouté dans la collection
// ATTENTION : nécessite la suppression du la librarie "autopublish"

Meteor.subscribe('userData');

// Ces helpers récupèrent des données dans la collection Metero.users
// attention ne pas confondre la collection Meteor.users et 
// l entrée qui correspond à un utilisateur meteor.user()

Template.affich_us.helpers({
    'firstname': function(){
        data = Meteor.user();
        if(data.firstname){
            firstname = data && data.firstname;
            return firstname;    
        }else{
            return `Champ obligatoire`
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
    'userAddress': function(){
        data = Meteor.user();

        if (data.user_address[0]){
            if(data.user_address[0].address || data.user_address[0].city || data.user_address[0].postcode != ''){
                rue = data && data.user_address[0].address;
                ville = data && data.user_address[0].city;
                npa = data && data.user_address[0].postcode;
                return `${rue}, ${ville}, ${npa}`;
            }else{
                return `Non renseigné `;     
            }       
        }else{
            return `Adresse de l'accueillant : `;     
        }
    },
    'address': function(){
        data = Meteor.user();

        if (data.user_address[0].address){
            rue = data && data.user_address[0].address;
            return rue;    
        }else{
            return `Champ obligatoire`
        }
    },
    'city': function(){
        data = Meteor.user();

        if (data.user_address[0].city){
            ville = data && data.user_address[0].city;
            return ville;    
        }else{
            return `Champ obligatoire`
        }
    },
    'postCode': function(){
        data = Meteor.user();

        if (data.user_address[0].postcode){
            npa = data && data.user_address[0].postcode;
            return npa;    
        }else{
            return `Champ obligatoire`
        }
    },
    'mail': function(){
        data = Meteor.user();
        if(data.emails[0].address){
            address = data && data.emails[0].address;
            return address;    
        }else{
            return `Champ obligatoire`
        }
    },
    'phone': function(){
        data = Meteor.user();
        if(data.phone_number){
            phone = data && data.phone_number;
            return phone;    
        }else{
            return `Champ obligatoire`
        }
    }   
})

// events attache un évènement et une fonction à un template 
// ici l event est le submit du formulaire (click sur le bouton submit)
// la fonction consiste à mettre à jour les champs de la collection

Template.affich_us.events({
    'submit .profilForm' : function(event) {

        event.preventDefault();

        const target = event.target;
        const name = target.firstname.value;
        const lastname = target.lastname.value;
        const address = target.address.value;
        const postcode = target.postcode.value;
        const city = target.city.value;
        const phone = target.phone.value;

        Meteor.users.update(
            Meteor.userId(), { $set: { 
                firstname: name,
                lastname: lastname,
                phone_number: phone,
                user_address:[{
                    address : address,
                    city:city,
                    postcode: postcode
                }
                ] 
            } }
          );
    }
});

// login logout redirect callback
/*
Accounts.onLogin(function () {
    FlowRouter.go('hostProfilPage')
  })
Tracker.autorun(function () {
    if (!Meteor.userId()) {
      FlowRouter.go('mainPage')
    }
  })
*/
  