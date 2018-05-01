
Accounts.onCreateUser((options, user) => {

  // user.profile = options.profile || {};
  // Assigns the first and last names to the newly created user object
  // user.profile.sw = options.sw;
  
  status = options.sw;

  if(!options.sw){
    user.sw = options.sw;
      const newUserAddress = {
          address : '',
          city : '',
          postcode : ''
      } 
      user.firstname = options.firstname;
      user.lastname = options.lastname;
      user.phoneNumber = options.phoneNumber;
      user.userAddress = newUserAddress;
    
      if (options.profile) {
        user.profile = options.profile;
      }
  
      return user; 
  }else{
    const newUserAddress = {
      address : '',
      city : '',
      postcode : ''
    } 
    user.sw = options.sw;
    user.firstname = options.firstname;
    user.lastname = options.lastname;
    user.institution = options.institution;
    user.phoneNumber = options.phoneNumber;
    user.userAddress = newUserAddress;
  }

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
            phoneNumber : 1,
            userAddress : 1,
            sw : 1,
            institution : 1
          }
        });
      } else {
        this.ready();
      }
    });
  }