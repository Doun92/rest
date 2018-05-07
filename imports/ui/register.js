// Template.register.events({
//     'submit .registerForm': function(e, t) {
//         e.preventDefault();
//         // Retrieve the input field values
//         var email = $('#email').val(),
//             firstName = $('#firstname').val(),
//             lastName = $('#lastname').val(),
//             password = $('#password').val(),
//             passwordAgain = $('#passwordAgain').val();

//         // Trim Helper
//         var trimInput = function(val) {
//             return val.replace(/^\s*|\s*$/g, "");
//         }
//         var email = trimInput(email);

//         // Check password is at least 6 chars long
//         var isValidPassword = function(pwd, pwd2) {
//             if (pwd === pwd2) {
//                 return pwd.length >= 6 ? true : false;
//             } else {
//                 return swal({
//                     title: "Les mots de passe ne correspondent pas",
//                     text: "Veuillez réessayer",
//                     showConfirmButton: true,
//                     type: "error"
//                 });
//             }
//         }


//         // If validation passes, supply the appropriate fields to the
//         // Meteor.loginWithPassword() function.
        
//         if (isValidPassword(password, passwordAgain)) { 
//             Accounts.createUser({
//                 email: email,
//                 firstname: firstName,
//                 lastname: lastName,
//                 password: password,
//                 sw : false
//             }, function(error) {
//                 if (error) {
//                     return swal({
//                     title: error.reason,
//                     text: "Ressayer",
//                     showConfirmButton: true,
//                     type: "error"
//                 });
//                 } else {
//                     FlowRouter.go('/profil_utilisateur');
//                 }
//             });
//         }

//         return false;
//     }
// });

// Création d'un compte général. Si le champ "institute" est vide, il n'est pas ajouté. Aussi si l'institute existe, update du champ "sw" en true
// Ainsi une création unifiée des comptes ce qui simplifiera l'ajout ultérieur de compte Association

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