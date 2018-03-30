import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


Accounts.onCreateUser((options, socialWorker) => {

  if(Meteor.user.profile.social_worker == True){
    console.log('sw')
  }else{
    console.log('not sw')
  }
  
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