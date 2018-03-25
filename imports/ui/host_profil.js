import { Template } from 'meteor/templating';
import './template/host_profil_template.html';

// host page collection helpers

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

// login logout redirect callback
/*
Accounts.onLogin(function () {
    FlowRouter.go('hostProfilPage')
  })
Tracker.autorun(function () {
    if (!Meteor.userId()) {
      FlowRouter.go('mainPage')
    }
  })
*/
  