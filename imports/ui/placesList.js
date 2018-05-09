import { Accommodation } from "../api/accommodation-methods.js";
import { AllUser } from '../api/placesList_methods.js';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

Template.placesList.onCreated(function(){

    //places are displayed dependently on the date of the day
    //here is the filter
    this.subscribe('places');
    this.subscribe('allUser')
    var filterActualDate = new Date();
    var filterActualMonth = filterActualDate.getMonth()+1;
    var filterActualDay = filterActualDate.toDateString().substr(9,1);

    //global var
    filterQuery = {}
    var tmpKey = `availability.${filterActualMonth}.${filterActualDay}`
    filterQuery[tmpKey] = filterActualDate.toDateString()

})

// Appel chaque logement depuis la base de données
// et filtre selon la date du jour

Template.placesList.helpers({
     'places':function() {
        return Accommodation.find(
            filterQuery
        );
     },
 });

//  Template.placesList.helpers({
//     'jourJ': function(){
//         Meteor.subscribe('places')
//         let hostId = this.availability;
//         console.log(hostId)
//         let number = Meteor.users.findOne(
//             {_id:hostId},
//         );
//         let hostname = number.firstname;
//         return hostname;
//     },
// });

//Bien joué Daniel... 

// Permet d'afficher les noms des users de chaque adresse
Template.placesList.helpers({
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
Template.placesList.events({
    'click .hostEvent' : function(){

        event.preventDefault();

        const target = event.target;
        console.log(target)

        let test2 = document.getElementById('card')
        let contenu = document.createElement('div')
        contenu.setAttribute('class', 'card')
        //La carte ajoute toute la base de données -> osef de la redite
        contenu.textContent = this._id
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