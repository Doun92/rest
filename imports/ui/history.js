import { Accommodation } from "../api/accommodation-methods.js";
import { Template } from 'meteor/templating';
import { HistoryLocation } from "../api/history-methods.js"

Template.history.events({
    'click #reservate': function(event,template){
        const reservationDate = Date.now();
        const socialWorker = Meteor.userId();
        const host = this.host_id;
        const place = this.place_id;

        console.log("click on reservate");

        HistoryLocation.insert({
            user_id : socialWorker,
            host_id : host,
            place_id : place,
            date_resa : reservationDate
        });
        
    }
})