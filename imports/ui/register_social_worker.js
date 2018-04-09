Template.register_social_worker.events({
    'click #register-buttonsocialworker': function(e, t) {
        e.preventDefault();
        // Retrieve the input field values
        var email = $('#email').val(),
            firstName = $('#firstname').val(),
            lastName = $('#lastname').val(),
            institution = $('#institution').val(),
            password = $('#password').val(),
            passwordAgain = $('#password-again').val();

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
                    title: "Les mots de passes ne correspondent pas",
                    text: "Veuillez ressayer",
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
                institution: institution,
                password: password,
                sw : true
            }, function(error) {
                if (error) {
                    return swal({
                    title: error.reason,
                    text: "Ressayer",
                    showConfirmButton: true,
                    type: "error"
                });
                } else {
                    FlowRouter.go('/profile_utilisateur');
                }
            });
        }
        return false;
    }
});