import { Accommodation } from "../api/accommodation-methods.js";
import { Template } from 'meteor/templating';
import { HistoryLocation } from "../api/resa-methods.js"
import { Meteor } from "meteor/meteor";

// let now = new Date();
// let actualMonth = now.getMonth()+1;
// let actualDay = now.getDate();
// let actualYear = now.getFullYear();
// const today = `${actualYear}-${actualMonth}-${actualDay}`;
// console.log(today);
let startToday = new Date();
startToday.setHours(0,0,0,0);

let endToday = new Date();
endToday.setHours(23,59,59,999);

// change the value to send email
const emailAddress = "localhost"

Template.resa.events({
    'click #reservate': function(event){

        const host = this.host_id;
        const place = this._id;

        new Confirmation({
            message: "L'accueillant sera informé de votre demande.",
            title: "Confirmez-vous la réservation?",
            cancelText: "Annuler",
            okText: "Oui",
            success: true, // whether the button should be green or red
            focus: "Non" // which button to autofocus, "cancel" (default) or "ok", or "none"
            }, function (ok) {
            // ok is true if the user clicked on "ok", false otherwise
            if(ok){

                HistoryLocation.insert({
                    socialWorker_id : Meteor.userId(),
                    host_id : host,
                    place_id : place,
                    date_resa : new Date(),
                    resa_status : 'pending'
                });
            }        
        });        
    }
});

Template.resa.helpers({
    isPending : function(){
        let place = this._id;

        if(HistoryLocation.find({
            $and : [
            {resa_status : "pending"},
            {date_resa : {$gte: startToday, $lt: endToday}},
            {place_id : place}
        ]}
        ).count()) {
            return true;
        }else{
            return false;
        }
    },
    isTheReserver(){
        let place = this._id;
        if(HistoryLocation.find({
            $and : [
                {socialWorker_id : Meteor.userId()},
                {place_id : place}
            ]}
        ).count()==true){
            return true;
        }
    }
});

Template.resa_notif_host_box.onCreated(function(){
    Meteor.subscribe('history');
});

Template.resa_notif_host_box.helpers({
    'notif' : function(){

        if(HistoryLocation.find({
            $and : [
                {host_id : Meteor.userId()},
                {date_resa : {$gte: startToday, $lt: endToday}},
                {resa_status : "pending"}
            ]}
        ).count() === 0){
            return false
        } else{
            return true
        }
    }
});

Template.resa_notif_socialWorker_box.onCreated(function(){
    Meteor.subscribe('history');
    Meteor.subscribe('usersPublication');
});

Template.resa_notif_socialWorker_box.helpers({
    'notif' : function(){
        return HistoryLocation.find({
            $and : [
                {socialWorker_id : Meteor.userId()},
                {date_resa : {$gte: startToday, $lt: endToday}},
                {alert_sw_status : "pending"}
            ]}
        ).fetch();
        
    },
    'declinedAlertSw': function(){
        const test = this;
        const history = HistoryLocation.find({
            $and : [
                {socialWorker_id : Meteor.userId()},
                {alert_sw_status : "pending"},
                {resa_status : "declined"},
                {_id : this._id}
            ]}
        );

        if(history.count() === 0){
            return false;
        } else{
            return true;
        }
    },
    'hostName': function(){
        const host = Meteor.users.findOne({_id : this.host_id});
        return `${host.firstname} ${host.lastname}`;
    }
});

Template.resa_notif_host_box.events({
    'click #acceptButton'(event){
        const history = HistoryLocation.find({
            $and : [
            {resa_status : "pending"},
            {host_id : Meteor.userId()}
        ]},{
            fields:
            {_id:1}
        }).fetch();
        
        Meteor.call(
            'sendEmail',
            'emailAddress',
            'noreply@rest.com',
            "Réservation REST acceptée",
            "Nous vous remercions d'avoir accepté de mettre un toit à disposition ce soir !",
        );

        HistoryLocation.update(history[0]._id, {
            $set : {
                resa_status : "reserved",
                alert_sw_status : "pending"
            }
        });
    },
    'click #declineButton'(event){
        const history = HistoryLocation.find({
            $and : [
            {resa_status : "pending"},
            {host_id : Meteor.userId()}
        ]},{
            fields:
            {_id:1}
        }).fetch();

        Meteor.call(
            'sendEmail',
            'emailAddress',
            'noreply@rest.com',
            "Réservation REST refusée",
            "Vous avez décliné une demande de réservation. Si votre logement n'est pas disponible, nous vous recommandons de mettre à jour votre calendrier."
        );

        HistoryLocation.update(history[0]._id, {
            $set : {
                resa_status : "declined",
                alert_sw_status : "pending"
            } 
        });
    }
})

Template.resa_notif_socialWorker_box.events({
    'click #notifSwClose'(event){
        HistoryLocation.update(this._id, {
            $set : {alert_sw_status: "checked"}
        });
        
        Meteor.call(
            'sendEmail',
            'emailAddress',
            'noreply@rest.com',
            "Réservation REST acceptée par l'accueillant",
            "Vous avez effectué une demande de réservation et elle a été acceptée !"
        );
    }
})