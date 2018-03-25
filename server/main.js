import { Meteor } from 'meteor/meteor';

import '../imports/api/accommodation-methods.js';
import '../imports/api/host_profil-methods.js';

Meteor.startup(() => {
  // code to run on server at startup
});

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
        }]
      }
    });
  } else {
    this.ready();
  }
});

const userProf = Meteor.users
userProf.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});