import { Template } from 'meteor/templating';

import './body.html';
import './template/accommodation.html';

import './accommodation.js';


Template.affich_us.helpers({
    'email': function(){
        data = Meteor.user();
        address = data && data.emails[0].verified;
        if (!address){
            return `account verified is : true`
        }else{
            return `account verified is : false`
        }
    },
    'address': function(){
        data = Meteor.user();
        address = data && data.emails[0].address;
        return `adresse mail de l'accueillant : ${address}`;
    }    
})