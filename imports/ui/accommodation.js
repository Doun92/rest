import { Accommodation } from "../api/accommodation-methods.js";
import './template/accommodation.html';
import { Template } from 'meteor/templating';
import { register } from './template/registers.html';
import { Session } from 'meteor/session'

Meteor.subscribe('accommodations');
Meteor.subscribe('userData');

Template.accommodationTemplate.onCreated(function(){
    this.subscribe('userData');
})

Template.accommodationTemplate.helpers({
    //check if there is a document in the accommodations collection
    'isAccommodation':function(){
        if(Accommodation.find().count() === 0){
            return false
        }else{
            return true
        }
    }
});

//ADD ACCOMMODATIONS template, helpers and events handlers

Template.addAccommodation.onCreated(function() {
        this.subscribe('userData');
        // this.subscribe('accomodations');
        Session.keys = {};
})

Template.addAccommodation.helpers({

     // utilise la fonction actual location comme condition de 
     // l'apparition d'un formulaire d'ajout d'adresse
     // si la valeur n'est pas renseignée affiche le formulaire par défaut

    'actualLocation':function(){
        data = Meteor.user();
        route = data && data.userAddress && data.userAddress.address;
        city = data && data.userAddress && data.userAddress.city;
        postcode = data && data.userAddress && data.userAddress.postcode;
        if(route || city || postcode){
            if(route != '' && city != '' && postcode != ''){
                return true
            }else{
                return false
            }
        }
    },
    'verifyActualLocation':function(value){
        if(value == ''){
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
        route = data && data.userAddress && data.userAddress.address;
        number = data && data.userAddress && data.userAddress.number;
        city = data && data.userAddress && data.userAddress.city;
        postcode = data && data.userAddress && data.userAddress.postcode;
        tmpArray = [];
        tmpArray.push(route, number, city, postcode);
        return tmpArray;
    },
    'clearSession':function(){
        Session.keys = {}
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
        const locationNumber = template.find('#locationNumber').value;
        const zipCode = template.find('#zipCode').value;
        const location = template.find('#location').value;
        const availablePlaces = template.find('#availablePlaces').value;

        // add place on the Accommodation collection

        const creator = Meteor.userId();

        Accommodation.insert({
            address : address,
            locNumber : locationNumber,
            zipCode : zipCode,
            location : location,
            availablePlaces : availablePlaces,
            availability : dateObj,
            host_id : creator,
            
        });
    },
});

Template.addAccommodationRoute.helpers({
    'isSocialWorker': function() {
        data = Meteor.user();
        sw = data && data.sw;
        return sw;
    }
})

Template.accommodationsRoute.helpers({
    'isSocialWorker': function() {
        data = Meteor.user();
        sw = data && data.sw;
        return sw;
    }
})

Template.placesListRoute.helpers({
    'isSocialWorker': function() {
        data = Meteor.user();
        sw = data && data.sw;
        return sw;
    }
})
//update accomodations template helpers and event handlers

Template.updateAccommodation.onCreated(function() {
    this.subscribe('userData');
    this.subscribe('accommodations');
    Session.keys = {};
})

Template.updateAccommodation.events({
    'submit .updateAccommodation' (event, template) {

        collection = Accommodation.find({host_id:Meteor.userId()}).fetch()

        console.log(collection[0].availability)

        event.preventDefault();

        const target = event.target;

        const address = template.find('#address').value;
        const locationNumber = template.find('#locationNumber').value;
        const zipCode = template.find('#zipCode').value;
        const location = template.find('#location').value;
        const availablePlaces = template.find('#availablePlaces').value;
        const creator = Meteor.userId();

        
        Accommodation.update(collection[0]._id, {
            $set: {
                address : address,
                locNumber : locationNumber,
                zipCode : zipCode,
                location : location,
                availablePlaces : availablePlaces,
                host_id : creator
            }            
        });
    },
})

Template.addressForm.onCreated(function() {
    this.subscribe('userData');
    this.subscribe('accommodations');
})

Template.addressForm.helpers({
    'isLocation':function(){
        if(Accommodation.find({host_id:Meteor.userId()}).count() === 0){
            return false
        }else{
            return true
        }
    },
    'availableLocation' : function(){
        tmp = Accommodation.find({host_id:Meteor.userId()}).fetch()
        //console.log(tmp[0].zipCode)
        tmpArr = [tmp[0].address, tmp[0].locNumber, tmp[0].location, tmp[0].zipCode, tmp[0].availablePlaces]
        return tmpArr
    }
})
