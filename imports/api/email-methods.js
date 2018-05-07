import { Meteor } from 'meteor/meteor';

//process.env.MAIL_URL = "smtps://postmaster@sandbox960276fcfba4452d8eab0ae9a7b5b1c8.mailgun.org:1f6cf79792085724a44b1d2541f2f3df-97923b2d-739f4160@smtp.mailgun.org:587"
/*
if (Meteor.isServer) {

    Meteor.startup( function() {
       //process.env.MAIL_URL = "smtp://YOUR_DEFAULT_SMTP_LOGIN:YOUR_DEFAULT_PASSWORD@smtp.mailgun.org:587";
        process.env.MAIL_URL = "smtp://postmaster@sandbox960276fcfba4452d8eab0ae9a7b5b1c8.mailgun.org:1f6cf79792085724a44b1d2541f2f3df-97923b2d-739f4160@smtp.mailgun.org:587"
        Email.send({
          to: "renato.diaz@unil.ch",
          from: "Renato Diaz",
          subject: "Meteor Email",
          text: "test"
       });
    });
 }
*/
 console.log('mail')
 
 if (Meteor.isServer) {
    //process.env.MAIL_URL = "smtps://postmaster%40sandbox960276fcfba4452d8eab0ae9a7b5b1c8.mailgun.org:1f6cf79792085724a44b1d2541f2f3df-97923b2d-739f4160@smtp.mailgun.org:587"

     // Server: Define a method that the client can call.
     Meteor.methods({
            sendEmail(to, from, subject, text) {
            // Make sure that all arguments are strings.
            //check([to, from, subject, text], [String]);
        
            // Let other method calls from the same client start running, without
            // waiting for the email sending to complete.
            this.unblock();
        
            Email.send({ to, from, subject, text });
            }
        })
}
