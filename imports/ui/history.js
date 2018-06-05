import { Template } from 'meteor/templating';
import './template/history.html';
import { HistoryLocation } from '../api/reservations-methods';

Template.history_list.onCreated(function(){

    //places are displayed dependently on the date of the day
    //here is the filter
    this.subscribe('places');
    this.subscribe('history');
    this.subscribe('usersPublication');
});

Template.history_list.helpers({
    reservations(){
        const reservations = HistoryLocation.find({
            $or : [
                    {socialWorker_id: Meteor.userId()},
                    {host_id: Meteor.userId()}
            ]
            }, {sort:{reservationDate:-1}
        });
        
        if(reservations.fetch().length>1){
        return reservations;
        }
    }
});

Template.history_list_item.helpers({
    dateReservation(){
        let options = {year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", hour12: false};
        return new Intl.DateTimeFormat("fr-CH", options).format(this.reservation.reservationDate);
    },
    hostName(){
        const host = Meteor.users.findOne({_id : this.reservation.host_id});
        return `${host.firstname} ${host.lastname}`;
    },
    swName(){
        const sw = Meteor.users.findOne({_id : this.reservation.socialWorker_id});
        return `${sw.firstname} ${sw.lastname}`;
    },
    reservationStatus(){
        const reservationStatus = this.reservation.reservationStatus;
       switch (reservationStatus) {
            case "reserved":
                return "réservé";
                break;
            case "pending":
                return "en attente";
                break;
            case "declined":
                return "décliné";
                break;
            default:
                return "inconnu";
       }

    }
});