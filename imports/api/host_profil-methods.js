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
  
  if (Meteor.isServer) {
    Meteor.publish('userData', function () {
      if (this.userId) {
        return Meteor.users.find({ _id: this.userId }, {
          fields: { 
            firstname : 1,
            lastname : 1,
            phone_number : 1,
            user_address : [{
              address : 1,
              city : 1,
              postcode : 1
            }],
            social_worker:1
          }
        });
      } else {
        this.ready();
      }
    });
  }