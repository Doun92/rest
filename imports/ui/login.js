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