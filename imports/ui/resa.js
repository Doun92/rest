import { Accommodation } from "../api/accommodation-methods.js";
import { Template } from 'meteor/templating';
import { HistoryLocation } from "../api/resa-methods.js"
import { Meteor } from "meteor/meteor";

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
                    'localhost',
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
    },

    // Retired features
    // 'click #confirmResa': function(event){
    //     const history = HistoryLocation.find({
    //         $and : [
    //         {resa_status:"pending"},
    //         {place_id:this._id}
    //     ]},{
    //         fields:
    //         {_id:1}
    //     }).fetch();

    //     HistoryLocation.update(history[0]._id, {
    //         $set : {resa_status: 'reserved'}
    //       });
    // },
    // 'click #cancelResa': function(event){
    //     const history = HistoryLocation.find({
    //         $and : [
    //         {resa_status:"pending"},
    //         {place_id:this._id}
    //     ]},{
    //         fields:
    //         {_id:1}
    //     }).fetch();

    //     HistoryLocation.remove(history[0]._id);
    // }
});

Template.resa.helpers({
    isPending : function(){
        let tmpDate = new Date().toDateString();
        let place = this._id;

        if(HistoryLocation.find({
            $and : [
            {resa_status:"pending"},
            {date_resa:tmpDate},
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
                {user_id: Meteor.userId()},
                {place_id : place}
            ]}
        ).count()==true){
            return true;
        }
    }
});

Template.resaNotifBox.helpers({
    'notif' : function(){
        Meteor.subscribe('history');

        let user_id = Meteor.userId()
        let tmpDate = new Date()
        console.log(`actual date : ${tmpDate.toDateString()}`)

        if(HistoryLocation.find({
            $and : [
                {host_id:user_id},
                {date_resa:tmpDate.toDateString()},
                {resa_status:"pending"}
            ]}
        ).count() === 0){
            return false
        } else{
            return true
        }
    }
});

Template.resaNotifBox.events({
    'click #acceptButton'(event){
        const history = HistoryLocation.find({
            $and : [
            {resa_status:"pending"},
            {host_id:Meteor.userId()}
        ]},{
            fields:
            {_id:1}
        }).fetch();

        console.log(history);

        HistoryLocation.update(history[0]._id, {
            $set : {resa_status: 'reserved'}
        });
        // const actDate = new Date();
        // let collection = HistoryLocation.find({}).fetch();
        // console.log(collection[0].resa_status);
        // HistoryLocation.update(collection[0]._id, {
        //     $set: {
        //         resa_status : 'reserved'
        //     }
        // });
    },
    'click #declineButton'(event){
        const actDate = new Date();
        let collection = HistoryLocation.find({}).fetch();
        console.log(collection[0].resa_status);
        HistoryLocation.update(collection[0]._id, {
            $set: {
                resa_status : 'declined'
            }
        });
    }
})