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
//Meteor.subscribe('accommodationsAll')

//Template.accommodationsList.onCreated(function(){
  //  this.subscribe('accommodationsAll');
//})
/*
Template.accommodationsList.helpers({
     accommodation() {
         tmp = Accommodation.find({}).fetch();
         //console.log(tmp);
         return Accommodation.find({});
     },
 });
*/

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
        this.subscribe('accomodations');
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
        if(route || city || postcode){
            if(route != 'Champ obligatoire' && city != 'Champ obligatoire' && postcode != 'Champ obligatoire'){
                return true
            }else{
                return false
            }
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
            availability : {
                1:Session.get(1),
                2:Session.get(2),
                3:Session.get(3),
                4:Session.get(4),
                5:Session.get(5),
                6:Session.get(6),
                7:Session.get(7),
                8:Session.get(8),
                9:Session.get(9),
                10:Session.get(10),
                11:Session.get(11),
                12:Session.get(12),
                13:Session.get(13),
                14:Session.get(14),
                15:Session.get(15),
                16:Session.get(16),
                17:Session.get(17),
                18:Session.get(18),
                19:Session.get(19),
                20:Session.get(20),
                21:Session.get(21),
                22:Session.get(22),
                23:Session.get(23),
                24:Session.get(24),
                25:Session.get(25),
                26:Session.get(26),
                27:Session.get(27),
                28:Session.get(28),
                29:Session.get(29),
                30:Session.get(30),
                31:Session.get(31),
            },
            host_id : creator

            //à rajouter

            //allTime : allTime,
            //last_call_hour : last_call_hour
            
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
})

Template.updateAccommodation.helpers({
    'lastStorage' : function(){
        /*
        tmpData = Accommodation.find({host_id:Meteor.userId()}).fetch();
        //console.log(`tmpData : ${tmpData[0].availability[1]}`)
        //Session.set(tmpData[0].availability);
        console.log(`Session storage : ${JSON.stringify(Session.keys)}`)

        tmp = Object.keys(tmpData[0].availability);
        tmp.forEach(x => {
            Session.set(x,tmpData[0].availability[x]);
        });
        console.log(`Session storage : ${Session.keys}`)
    },
    'clearSession':function(){
       Session.keys = {}
    */
    }
})

Template.updateAccommodation.events({
    'submit .updateAccommodation' (event, template) {

        collection = Accommodation.find({host_id:Meteor.userId()}).fetch()

        console.log(collection[0].availability)

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

        
        Accommodation.update(collection[0]._id, {
            $set: {
                address : address,
                loc_number : location_number,
                zipCode : zipCode,
                location : location,
                availablePlaces : availablePlaces,
                //availability : Session.keys,

                'availability.1' : Session.get(1),
                'availability.2' : Session.get(2),
                'availability.3' : Session.get(3),
                'availability.4' : Session.get(4),
                'availability.5' : Session.get(5),
                'availability.6' : Session.get(6),
                'availability.7' : Session.get(7),
                'availability.8' : Session.get(8),
                'availability.9' : Session.get(9),
                'availability.10' : Session.get(10),
                'availability.11' : Session.get(11),
                'availability.12' : Session.get(12),
                'availability.13' : Session.get(13),
                'availability.14' : Session.get(14),
                'availability.15' : Session.get(15),
                'availability.16' : Session.get(16),
                'availability.17' : Session.get(17),
                'availability.18' : Session.get(18),
                'availability.19' : Session.get(19),
                'availability.20' : Session.get(20),
                'availability.21' : Session.get(21),
                'availability.22' : Session.get(22),
                'availability.23' : Session.get(23),
                'availability.24' : Session.get(24),
                'availability.25' : Session.get(25),
                'availability.26' : Session.get(26),
                'availability.27' : Session.get(27),
                'availability.28' : Session.get(28),
                'availability.29' : Session.get(29),
                'availability.30' : Session.get(30),
                'availability.31' : Session.get(31),

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
        //tmp = Accommodation.find({host_id:Meteor.userId()}).fetch()
        if(Accommodation.find({host_id:Meteor.userId()}).count() === 0){
            return false
        }else{
            return true
        }
    },
    'availableLocation' : function(){
        tmp = Accommodation.find({host_id:Meteor.userId()}).fetch()
        //console.log(tmp[0].zipCode)
        tmpArr = [tmp[0].address, tmp[0].loc_number, tmp[0].location, tmp[0].zipCode, tmp[0].availablePlaces]
        return tmpArr
    }
})