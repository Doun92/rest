import { Accommodation } from "../api/accommodation-methods.js";
import { AllUser } from '../api/placesList_methods.js';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { HistoryLocation } from "../api/resa-methods";

Template.places_list.onCreated(function(){

    //places are displayed dependently on the date of the day
    //here is the filter
    this.subscribe('places');
    this.subscribe('allUser');
    this.subscribe('history');

    var filterActualDate = new Date();
    var filterActualMonth = filterActualDate.getMonth()+1;
    var filterActualDay = filterActualDate.toDateString().substr(8,2);
    console.log(`actual date : ${filterActualDay}`)

    //global var
    filterQuery = {}
    var tmpKey = `availability.${filterActualMonth}.${filterActualDay}`
    filterQuery[tmpKey] = filterActualDate.toDateString()

})

Template.places_list.helpers({
    'places':function() {

        let today = new Date().toDateString();
 
        let reservedAccommodationsForToday = HistoryLocation.find(
            {$and : [
                {resa_status:"reserved"},
                {date_resa:today}
            ]},
            {fields : {
                place_id:1
            }}
        ).fetch();
        
        // Every accommodation filtered by the date of today
        let placesForToday = Accommodation.find(
            {$and :[
                filterQuery,
            ]}).fetch();

        // Filter places with reservations data and associate accommodation with reservation
        let placesReservedToday = placesForToday.filter(item => {
            return reservedAccommodationsForToday.some( element => {
              return element.place_id === item._id;
            })
          });

        // Remove reserved accommodations
        let placesAvailableToday = placesForToday.filter(item => {
            return placesReservedToday.every(element => {
                return element._id !== item._id;
            })
        });

        //if no reservation exists
        if(placesAvailableToday==0){
            return placesForToday;
        }
        else{      
            return placesAvailableToday;
        }
    },
 });

// Permet d'afficher les noms des users de chaque adresse
Template.places_list_item.helpers({
    'firstname': function(){
        let hostId = this.host_id;
        let number = Meteor.users.findOne(
            {_id:hostId},
        );
        let hostname = number.firstname;
        return hostname;
    },
    'lastname': function(){
        let hostId = this.host_id;
        let number = Meteor.users.findOne(
            {_id:hostId},
        );
        let lastname = number.lastname;
        return lastname;
        },
    // C'est normale que ça ne s'affiche pas car les mails et les phoneNumbers sont pas dans la base de données des accueillants
    // 'mail': function(){
    //     Meteor.subscribe('places')
    //     let hostId = this.host_id;
    //     let number = Meteor.users.findOne(
    //         {_id:hostId},
    //     );
    //     let mail = number.;
    //     return mail;
    // },
    
    'phone': function(){
         let hostId = this.host_id;
         let number = Meteor.users.findOne(
             {_id:hostId},
         );
         let phone = number.phoneNumber;
         return phone; 
     } 
})
// Ajouter un event qui montrerait une carte après un clic
Template.places_list.events({
    'click .hostEvent' : function(event){

        event.preventDefault();

        const target = event.target;
        console.log(target)

        let test2 = document.getElementById('card')
        let contenu = document.createElement('div')
        contenu.setAttribute('class', 'card')

        //La carte ajoute toute la base de données -> osef de la redite
        // contenu.textContent = this._id
        contenu.innerHTML = Template.placesList.helpers({
            'firstname': function(){
                let hostId = this.host_id;
                let number = Meteor.users.findOne(
                    {_id:hostId},
                );
                let hostname = number.firstname;
                return hostname;
            },
            'lastname': function(){
                let hostId = this.host_id;
                let number = Meteor.users.findOne(
                    {_id:hostId},
                );
                let lastname = number.lastname;
                return lastname;
                },
            // C'est normale que ça ne s'affiche pas car les mails et les phoneNumbers sont pas dans la base de données des accueillants
            // 'mail': function(){
            //     Meteor.subscribe('places')
            //     let hostId = this.host_id;
            //     let number = Meteor.users.findOne(
            //         {_id:hostId},
            //     );
            //     let mail = number.;
            //     return mail;
            // },
            
            'phone': function(){
                 let hostId = this.host_id;
                 let number = Meteor.users.findOne(
                     {_id:hostId},
                 );
                 let phone = number.phoneNumber;
                 return phone; 
             } 
            });
        console.log(contenu)
    //     <div class="card" style="width: 18rem;">
    //     <img class="card-img-top" src="..." alt="Card image cap">
    //     <div class="card-body">
    //       <h5 class="card-title">Card title</h5>
    //       <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //       <a href="#" class="btn btn-primary">Go somewhere</a>
    //     </div>
    //   </div>
        test2.appendChild(contenu)
    }
});