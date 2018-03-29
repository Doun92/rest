Accounts.onCreateUser((options, user) => {

  //user.profile = options.profile || {};
  // Assigns the first and last names to the newly created user object
  //user.profile.sw = options.sw;

  user.sw = options.sw;

  // Basic Prof Picture Setup
  //user.profile.profPicture = Meteor.absoluteUrl() + "img/default/user.jpg";
  // Organization
  //user.profile.organization = ["Org"];
  //Basic Role Set Up
  //user.roles = ["User"];

  // Returns the user object
    
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
            user_address : 1,
            sw : 1
          }
        });
      } else {
        this.ready();
      }
    });
  }