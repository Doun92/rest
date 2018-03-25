import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

Accounts.onCreateUser((options, user) => {
  
    const new_user_address = {
        address : '',
        city : '',
        postcode : ''
    } 
    user.firstname = '';
    user.lastname = '';
    user.phone_number = '';
    user.user_address = new_user_address;
  
    if (options.profile) {
      user.profile = options.profile;
    }
    
    return user;
  });