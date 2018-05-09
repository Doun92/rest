// Creating a general account. If the field "institute" are empty, nothings is added. On contrary, if "institute" exists, the field "sw" is updated to true.

// With this process, we can add later an Account for organization easier.

Template.super_register_form.events({
    'submit .registerForm': function(e, t) {
        e.preventDefault();
        // Retrieve the input field values
        var email = $('#email').val(),
            firstName = $('#firstname').val(),
            lastName = $('#lastname').val(),
            institute = $('#institute').val(),
            password = $('#password').val(),
            passwordAgain = $('#passwordAgain').val(),
            phoneNumber = $('#phoneNumber').val();

        
        // Trim Helper
        const trimInput = function(val) {
            return val.replace(/^\s*|\s*$/g, "");
        }
        var email = trimInput(email);
        
        // Check password is at least 6 chars long
        const isValidPassword = function(pwd, pwd2) {
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
                phoneNumber: phoneNumber,
                institute: institute,
                sw : false
            }, function(error) {
                if (error) {
                    return swal({
                    title: error.reason,
                    text: "Réessayer",
                    showConfirmButton: true,
                    type: "error"
                });
                } else {
                    //if institute contains something, change sw field to true 
                    if(institute){
                        Meteor.users.update(Meteor.userId(), {$set: {sw: true}});
                    }
                    FlowRouter.go('/profil_utilisateur');
                }
            });

        }
        return false;
    }
});