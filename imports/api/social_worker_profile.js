import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


<<<<<<< HEAD
Accounts.onCreateUser((options, user) => {
=======
Accounts.onCreateUser((options, socialWorker) => {

  if(Meteor.user.profile.social_worker == True){
    console.log('sw')
  }else{
    console.log('not sw')
  }
>>>>>>> 2c4b803cbf01cf4018dfdc291a5bf40ba2646bab
  
  socialWorker.firstname = '';
  socialWorker.lastname = '';
  socialWorker.institute = '';
  socialWorker.phone_number = '';
  socialWorker.pro_mail = '';

  if (options.profile) {
    socialWorker.profile = options.profile;
  }
  
  return socialWorker;
});

if (Meteor.isServer) {
  Meteor.publish('socialWorkerData', function() {
    if (this.socialWorkerId) {
      return Meteor.socialWorker.find({ _id: this.socialWorkerId }, {
        fields: { 
          firstname : 1,
          lastname : 1,
          institute : 1,
          phone_number : 1,
          pro_mail : 1,
        }
      });
    } else {
      this.ready();
    }
  });
}