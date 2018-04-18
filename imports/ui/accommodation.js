import { ReactiveDict } from 'meteor/reactive-dict';
import { Accommodation } from "../api/accommodation-methods.js";
import {register_host} from 'register'
import './template/accommodation.html';

// WIP
//Template.body.onCreated(function bodyOnCreated() {
//     this.state = new ReactiveDict();
//   });

Meteor.subscribe('accommodations');
Meteor.subscribe('userData');

Template.accommodationsList.helpers({
     accommodation() {
         return Accommodation.find({});
     },
 });

 Template.addAccommodation.helpers({

     // utilise la fonction actual location comme condition de 
     // l'apparition d'un formulaire d'ajout d'adresse
     // si la valeur n'est pas renseignée affiché le formulaire par défaut
     // ps: crée un template pour le formulaire

    'actual_location':function(){
        userId = Meteor.userId();
        data = Meteor.user();
        console.log(data.user_address);
    }
 });

Template.addAccommodation.events({
    'submit .addAccommodation' (event) {
        event.preventDefault();

        const target = event.target;

        const address = target.address.value;
        const additionalAddress = target.additionalAddress.value;
        const zipCode = target.zipCode.value;
        const location = target.location.value;

        const availablePlaces = target.availablePlaces.value;
        const family = target.family.checked;
        const single = target.single.checked;
        const man = target.man.checked;
        const woman = target.woman.checked;

        const allTime = target.allTime.checked;
        const startDate = target.startDate.value;
        const endDate = target.endDate.value;
        const callHour = target.callHour.value;
        const comment = target.comment.value;

        const creator = Meteor.userId();

        Accommodation.insert({
            address : address,
            additionalAddress : additionalAddress,
            zipCode : zipCode,
            location : location,

            availablePlaces : availablePlaces,
            family : family,
            single : single,
            man : man,
            woman : woman,

            allTime : allTime,
            startDate : startDate,
            endDate : endDate,
            callHour : callHour,
            comment : comment,

            creator : creator,
            
        });
        FlowRouter.go('/logements');
    },
    // Pour activer/désactiver les champs date
    // 'change #allTime input'(event,instance) {
    //     instance.state.set('allTimeUnchecked', event.target.unchecked);
    // },
});

// À continuer -> Question à Loris
Template.accommodationsList.events({
    'click .adresse': function(){   
        let prenom = users.firstname;
        let nom = users.lastname;
        let mail = users.mail;
        let phone = users.phone;

        //Session.set('selectedLogement', logementID);
        Session.set('selectedLogement',prenom+' '+nom+' '+mail+' '+phone)
        let selectedPersonne = Session.get('selectedPersonne');
        console.log(selectedPersonne);
    },

});