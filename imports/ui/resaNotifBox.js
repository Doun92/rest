import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { HistoryLocation } from "../api/history-methods.js";

Template.resaNotifBox.onCreated(function(){
    this.subscribe('historyLocation');
});

Template.resaNotifBox.helpers({
    'notif' : function(){

        let user_id = Meteor.userId()
        let tmpDate = new Date()
        console.log(`actual date : ${tmpDate.toDateString()}`)

        if(HistoryLocation.find({$and:[{host_id:user_id},{date_resa:tmpDate.toDateString()}]}).count() === 0){
            return "Vous n avez acune nouvelle demande"
        } else{
            return "Vous avez une demande d'accueil"
        }
    }
});
