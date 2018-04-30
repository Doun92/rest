Template.register.events({
    'submit .host_form': function(event) {
        event.preventDefault();
        // Retrieve the input field values
        const target = event.target;

        const email = target.email.value;
        const pass = target.pass.value;
        const re_pass = target.repeat_pass.value; // utilisé ?

        // Trim Helper
        
        /*var trimInput = function(val) {
            return val.replace(/^\s*|\s*$/g, "");
        }
        var email = trimInput(email);*/
        
        // Check password is at least 6 chars long
        var isValidPassword = function(pwd, pwd2) {
            if (pwd === pwd2) {
                return pwd.length >= 6 ? true : false;
            } else {
                return swal({
                    title: "Passwords don't match",
                    text: "Please try again",
                    showConfirmButton: true,
                    type: "error"
                });
            }
        }

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        //if (isValidPassword(pass, re_pass)) { 
            Accounts.createUser({
                email: email,
                password: pass,
                sw: false
            }, function(error) {
                if (error) {
                    return swal({
                    title: error.reason,
                    text: "Please try again",
                    showConfirmButton: true,
                    type: "error"
                });
                } else {
                    FlowRouter.go('/');
                }
            });
        //}
        return false;
    }
});
