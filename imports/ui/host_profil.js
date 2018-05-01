import { Template } from 'meteor/templating';
import './template/host_profil_template.html';

// récupère la publication du fichier server main.js
// permet notamment de récupérer les champs ajouté dans la collection
// ATTENTION : nécessite la suppression de la librarie "autopublish"

Meteor.subscribe('userData');

// Ces helpers récupèrent des données dans la collection Meteor.users
// attention ne pas confondre la collection Meteor.users et 
// l entrée qui correspond à un utilisateur meteor.user()

Template.host_profil_template.helpers({
    'firstname': function(){
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
    'userAddress': function(){
        data = Meteor.user();

        if (data.userAddress.address){
            if (data.userAddress.address=='Champ obligatoire'){
                rue = '';
            }else{
                rue = data && data.userAddress.address;
                rue = rue+', '
            }
            if(data.userAddress.city=='Champ obligatoire'){
                ville = '';
            }else{
                ville = data && data.userAddress.city;
                ville = ville+', '
            }
            if(data.userAddress.postcode=='Champ obligatoire'){
                npa = '';
            }else{
                npa = data && data.userAddress.postcode;
            }
            if(rue == '' && ville == '' && npa == ''  ){
                return 'Champ obligatoire'
            }else{
                return `${rue}${ville}${npa}`;         
            }
        }else{
            return "Champ obligatoire"; 
        }
    },
    'address': function(){
        data = Meteor.user();
        if (data.userAddress.address){
            rue = data && data.userAddress.address;
            return rue;    
        }else{
            return "Champ obligatoire"
        }
    },

    'city': function(){
        data = Meteor.user();

        if (data.userAddress.city){
            ville = data && data.userAddress.city;
            return ville;    
        }else{
            return "Champ obligatoire"
        }
    },

    'postCode': function(){
        data = Meteor.user();

        if (data.userAddress.postcode){
            npa = data && data.userAddress.postcode;
            return npa;    
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
})

// events attache un évènement et une fonction à un template 
// ici l event est le submit du formulaire (click sur le bouton submit)
// la fonction consiste à mettre à jour les champs de la collection

Template.host_profil_template.events({
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
                phoneNumber: phone,
                userAddress:{
                    address : address,
                    city: city,
                    postcode: postcode
                }
            } }
          );
    }
});

// subscribing user datas for the user profil route

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