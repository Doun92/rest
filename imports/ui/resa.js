import { Accommodation } from "../api/accommodation-methods.js";
import { Template } from 'meteor/templating';
import { HistoryLocation } from "../api/resa-methods.js"
import { Meteor } from "meteor/meteor";

const today = new Date().toDateString();

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

                Meteor.call(
                    'sendEmail',
                    'localhost',
                    'noreply@rest.com',
                    'Vous avez reçu une demande d\'accueil sur votre compte !',
                    'Pensez à accepter la demande après l\'appel.'
                  );

                HistoryLocation.insert({
                    socialWorker_id : Meteor.userId(),
                    host_id : host,
                    place_id : place,
                    date_resa : today,
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
            {date_resa : today},
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
                {date_resa : today},
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
                {date_resa : today},
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
    'accName': function(){
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
        const history = HistoryLocation.find({
            $and : [
            {alert_sw_status : "pending"},
            {socialWorker_id : Meteor.userId()}
        ]},{
            fields:
            {_id:1}
        }).fetch();

        HistoryLocation.update(history[0]._id, {
            $set : {alert_sw_status: "checked"}
        });
    }
})