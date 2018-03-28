import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


Accounts.onCreateUser((options, socialWorker) => {
  
  user.firstname = '';
  user.lastname = '';
  user.institute = '';
  user.phone_number = '';
  user.pro_mail = '';

  if (options.profile) {
    user.profile = options.profile;
  }
  
  return user;
});

if (Meteor.isServer) {
  Meteor.publish('socialWorkerData', function tasksPublication() {
    if (this.userId) {
      return Meteor.users.find({ _id: this.userId }, {
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