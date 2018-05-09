import { Accommodation } from "../api/accommodation-methods.js";
import { Template } from 'meteor/templating';
import { HistoryLocation } from "../api/resa-methods.js"

Template.resa.events({
    'click .reservate': function(event){

        const reservationDate = new Date();
        const socialWorker = Meteor.userId();
        const host = this.host_id;
        const place = this._id;

        console.log("click on reservate");

        HistoryLocation.insert({
            user_id : socialWorker,
            host_id : host,
            place_id : place,
            date_resa : reservationDate.toDateString(),
            resa_status : 'pending'
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