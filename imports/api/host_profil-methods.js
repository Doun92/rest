import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

Accounts.onCreateUser((options, user) => {
  
    const new_user_address = {
        address : '',
        postcode : '',
        city : ''
    } 
    user.firstname = '';
    user.lastname = '';
    user.phone_number = '';
    user.user_address = new_user_address;
  
    // We still want the default hook's 'profile' behavior.
    if (options.profile) {
      user.profile = options.profile;
    }
    
    // Don't forget to return the new user object at the end!
    return user;
  });