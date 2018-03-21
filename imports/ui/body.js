import { Template } from 'meteor/templating';

import './body.html';
import './template/accommodation.html';

import './accommodation.js';


Template.affich_us.helpers({
    'email': function(){
        data = Meteor.user();
        address = data && data.emails[0].verified;
        if (!address){
            return 'true'
        }
    }
})