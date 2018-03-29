import { Meteor } from 'meteor/meteor';

import '../imports/api/accommodation-methods.js';
import '../imports/api/host_profil-methods.js';
import '../imports/api/colltest.js';

Meteor.startup(() => {
  // code to run on server at startup
});

//var postSignup = function(userId, info )

const userProf = Meteor.users;
userProf.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});