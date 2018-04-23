import { Accommodation } from "../api/accommodation-methods.js";
import './template/accommodation.html';
import { Template } from 'meteor/templating';
import { register } from './template/register.html';
import { Session } from 'meteor/session'

/* clear cache and local storage function
window.onbeforeunload = function(){
    localStorage.clear();
    return '';
}
*/

Meteor.subscribe('accommodations');
Meteor.subscribe('userData');

Template.accommodationsList.helpers({
     accommodation() {
         return Accommodation.find({});
     },
 });

Template.accommodationTemplate.onCreated(function(){
    this.subscribe('userData');
    this.subscribe('accomodations');
})

Template.accommodationTemplate.helpers({
    //check if there is a document in the accommodations collection
    'isAccommodation':function(){
        if(Accommodation.find().count() === 0){
            return false
        }else{
            return true
        }
        //console.log(tmp);
        //console.log(Accommodation.find({host_id:Meteor.userId()}).fetch())
    }
});

//ADD ACCOMMODATIONS template, helpers and events handlers

Template.addAccommodation.onCreated(function() {
        this.subscribe('userData');
})

Template.addAccommodation.helpers({

     // utilise la fonction actual location comme condition de 
     // l'apparition d'un formulaire d'ajout d'adresse
     // si la valeur n'est pas renseignée affiché le formulaire par défaut
     // ps: crée un template pour le formulaire

    'actual_location':function(){
        data = Meteor.user();
        route = data && data.user_address && data.user_address.address;
        city = data && data.user_address && data.user_address.city;
        postcode = data && data.user_address && data.user_address.postcode;
        if(route != 'Champ obligatoire' && city != 'Champ obligatoire' && postcode != 'Champ obligatoire'){
            return true
        }else{
            return false
        }
    },
    'verifyActualLocation':function(value){
        if(value == 'Champ obligatoire'){
            return false
        }else{
            return true
        }
    }
 });

Template.actualAddress.helpers({
    'sessionReady':function(){
        if(Session.get('link_value')){
            return true
        }
    },
    'linkValue':function(){
        linkValue = Session.get('link_value');
        if(linkValue=='true'){
            return true;
        }else{
            return false;
        }
    },
    'actualAddressValue':function(){
        data = Meteor.user();
        route = data && data.user_address && data.user_address.address;
        city = data && data.user_address && data.user_address.city;
        postcode = data && data.user_address && data.user_address.postcode;
        tmpArray = [];
        tmpArray.push(route, city, postcode);
        return tmpArray;
    }
}); 

Template.actualAddress.events({
    'click .actualAddresslink1' (event){
        Session.set({
            'link_value' : 'true'
            });
        },
    'click .actualAddresslink2' (event){
        Session.set({
            'link_value' : 'false'
            });
    }    
})

Template.addAccommodation.events({
    'submit .addAccommodation' (event, template) {
        event.preventDefault();

        const target = event.target;

        const address = template.find('#address').value;
        const location_number = template.find('#location_number').value;
        const zipCode = template.find('#zipCode').value;
        const location = template.find('#location').value;
        const availablePlaces = template.find('#availablePlaces').value;

        //à rajouter

        //const allTime 
        //const last_call_hour

        delete Session.keys['link_value'];
        availability = Session.keys;

        const creator = Meteor.userId();

        Accommodation.insert({
            address : address,
            loc_number : location_number,
            zipCode : zipCode,
            location : location,
            availablePlaces : availablePlaces,
            availability : availability,
            host_id : creator

            //à rajouter

            //allTime : allTime,
            //last_call_hour : last_call_hour
            
        });
    },
});

//update accomodations template helpers and event handlers

Template.updateAccommodation.onCreated(function() {
    this.subscribe('userData');
    this.subscribe('accommodations');
})

Template.updateAccommodation.helpers({
    'lastStorage' : function(){
        tmpData = Accommodation.find({host_id:Meteor.userId()}).fetch();
        tmp = Object.keys(tmpData[0].availability);
        tmp.forEach(x => {
            Session.set(x,tmp[x]);
        });
    }
})

Template.updateAccommodation.events({
    'submit .updateAccommodation' (event, template) {

        collection = Accommodation.find({host_id:Meteor.userId()}).fetch() 
        console.log(collection[0]._id)
        event.preventDefault();

        const target = event.target;

        const address = template.find('#address').value;
        const location_number = template.find('#location_number').value;
        const zipCode = template.find('#zipCode').value;
        const location = template.find('#location').value;
        const availablePlaces = template.find('#availablePlaces').value;

        //à rajouter

        //const allTime 
        //const last_call_hour

        delete Session.keys['link_value'];
        availability = Session.keys;
        console.log(availability);

        const creator = Meteor.userId();

        Accommodation.update(collection[0]._id, {
            $set: {
                address : address,
                loc_number : location_number,
                zipCode : zipCode,
                location : location,
                availablePlaces : availablePlaces,
                availability : availability,
                host_id : creator
            }

            //à rajouter

            //allTime : allTime,
            //last_call_hour : last_call_hour
            
        });
    },
})

Template.addressForm.onCreated(function() {
    this.subscribe('userData');
    this.subscribe('accommodations');
})

Template.addressForm.helpers({
    'isLocation':function(){
        tmp = Accommodation.find({host_id:Meteor.userId()}).fetch()
        if(Accommodation.find({host_id:Meteor.userId()}).count() === 0){
            return false
        }else{
            return true
        }
    },
    'availableLocation' : function(){
        tmp = Accommodation.find({host_id:Meteor.userId()}).fetch()
        tmpArr = [tmp[0].address, tmp[0].loc_number, tmp[0].location, tmp[0].zipCode ]
        return tmpArr
    }
})



// À continuer mais avant, importer la database users
Template.accommodationsList.events({
    'click .adresse': function(){   
        let prenom = db.users.firstname;
        //let nom = this.lastname;
        //let mail = this.mail;
        //let phone = this.phone;

        //Session.set('selectedLogement', logementID);
        Session.set('selectedLogement',prenom)
        //+' '+nom+' '+mail+' '+phone)
        let selectedPersonne = Session.get('selectedPersonne');
        console.log(selectedPersonne);
    },

});