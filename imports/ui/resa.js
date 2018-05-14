import { Accommodation } from "../api/accommodation-methods.js";
import { Template } from 'meteor/templating';
import { HistoryLocation } from "../api/resa-methods.js"

Template.resa.events({
    'click #reservate': function(event){

        const reservationDate = new Date();
        const socialWorker = Meteor.userId();
        const host = this.host_id;
        const place = this._id;

        new Confirmation({
            message: "Confirmez-vous ?",
            title: "Confirmation",
            cancelText: "Annuler",
            okText: "Confirmer",
            success: true, // whether the button should be green or red
            focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
            }, function (ok) {
            // ok is true if the user clicked on "ok", false otherwise
            if(ok){

                Meteor.call(
                    'sendEmail',
                    'renatojour@gmail.com',
                    'noreply@rest.com',
                    'Vous avez reçu une demande d accueil sur votre compte !',
                    'clickez sur le liens pour voir la réservation'
                  );

                HistoryLocation.insert({
                    user_id : socialWorker,
                    host_id : host,
                    place_id : place,
                    date_resa : reservationDate.toDateString(),
                    resa_status : 'pending'
                });
            }        
        });        
    }
});

Template.resa.helpers({
    isReserved(){
        
    }
    
});

Template.resaNotifBox.helpers({
    'notif' : function(){
        Meteor.subscribe('history');

        let user_id = Meteor.userId()
        let tmpDate = new Date()
        console.log(`actual date : ${tmpDate.toDateString()}`)

        if(HistoryLocation.find({$and:[{host_id:user_id},{date_resa:tmpDate.toDateString()}]}).count() === 0){
            return false
        } else{
            return true
        }
    }
});

Template.resaNotifBox.events({
    'click #acceptButton' (event){
        
    }
})