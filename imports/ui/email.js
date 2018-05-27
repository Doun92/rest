import { Template } from 'meteor/templating';
import "../api/email-methods.js";
import './template/emailTemplate.html';


Template.emailTemplate.events({
    'click #mail': function(event){
        Meteor.call(
            'sendEmail',
            'renatojour@gmail.com',
            'noreply@rest.com',
            'Vous avez reçu une demande d accueil sur votre compte !',
            'clickez sur le liens pour voir la réservation'
          );
    }
});