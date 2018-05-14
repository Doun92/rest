import { Template } from 'meteor/templating';
import './template/history.html';
import { HistoryLocation } from '../api/resa-methods';

Template.history_page.onCreated(function(){

    //places are displayed dependently on the date of the day
    //here is the filter
    this.subscribe('places');
    this.subscribe('history');
});

Template.history_list.helpers({
    reservations: function(reservation){
        return HistoryLocation.find({
            $and : [
            {resa_status:"reserved"},
            {user_id: Meteor.userId()}
            ]
        });
    }
});

// Template.history_list_item.helpers({
//     date_resa: function(){

//         return date_resa;
//     }
// });