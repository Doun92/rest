import { Meteor } from 'meteor/meteor';

import '../imports/api/accommodation-methods.js';
import '../imports/api/email-methods.js';

//import '../imports/api/host_profil-methods.js';
import '../imports/api/placesList_methods.js';
import '../imports/api/resa-methods.js';

Meteor.startup(() => {
  process.env.MAIL_URL = "smtp://postmaster@sandbox960276fcfba4452d8eab0ae9a7b5b1c8.mailgun.org:1f6cf79792085724a44b1d2541f2f3df-97923b2d-739f4160@smtp.mailgun.org:587"
  // code to run on server at startup
});

//var postSignup = function(userId, info )

const userProf = Meteor.users;
userProf.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});