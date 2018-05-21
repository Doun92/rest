Template.login.events({
    'click #login-button': function(e, t) {
        e.preventDefault();
        var email = $('#login-email').val(),
            password = $('#login-password').val();

        Meteor.loginWithPassword(email, password, function(error) {
            if (error) {
                return swal({
                    title: "Mauvaise adresse email ou mot de passe",
                    text: "Veuillez essayer de nouveau ou créer un compte",
                    showConfirmButton: true,
                    type: "error"
                });
            } else {
                FlowRouter.go('/');
            }
        });
        return false;
    }
});

Template.super_navbar.events({
    "click #logout-button": function(event, template) {
      event.preventDefault();
      Meteor.logout(function(error) {
        if (error) {
          return swal("Oops! Une erreur s'est produite.")
        }
        else{
            return swal("Succès !")
        }
      });
    }
  });

  Template.super_navbar.events({
    "click #forgot-password-link": function(event, template) {
      event.preventDefault();
      var email = $('#login-email').val(); //gets the email input
      var options = {};
      options.email = email; //insert email in the option argument needed for Accounts.forgotPassword function
      Accounts.forgotPassword({email}, function(error){ 
            if (error){
                // console.log(error.reason);
                return swal("Veuillez indiquer une addresse e-mail valide.");
            } 
            else{
                return swal("Un e-mail a été envoyé à l'adresse.");
            }
        })
        return false //Prevent page from refreshing
    }
  });