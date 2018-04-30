Template.register.events({
    'click #register-button': function(e, t) {
        e.preventDefault();
        // Retrieve the input field values
        var email = $('#email').val(),
            firstName = $('#firstname').val(),
            lastName = $('#lastname').val(),
            password = $('#password').val(),
            passwordAgain = $('#passwordAgain').val();

        // Trim Helper
        var trimInput = function(val) {
            return val.replace(/^\s*|\s*$/g, "");
        }
        var email = trimInput(email);

        // Check password is at least 6 chars long
        var isValidPassword = function(pwd, pwd2) {
            if (pwd === pwd2) {
                return pwd.length >= 6 ? true : false;
            } else {
                return swal({
                    title: "Les mots de passe ne correspondent pas",
                    text: "Veuillez réessayer",
                    showConfirmButton: true,
                    type: "error"
                });
            }
        }

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        
        if (isValidPassword(password, passwordAgain)) { 
            Accounts.createUser({
                email: email,
                firstname: firstName,
                lastname: lastName,
                password: password,
                sw : false
            }, function(error) {
                if (error) {
                    return swal({
                    title: error.reason,
                    text: "Ressayer",
                    showConfirmButton: true,
                    type: "error"
                });
                } else {
                    FlowRouter.go('/profil_utilisateur');
                }
            });
        }

        return false;
    }
});