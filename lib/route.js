if(Meteor.isClient){
    Accounts.onLogin(function(){
        FlowRouter.go('hostProfilPage');
    })
    Accounts.onLogout(function(){
        FlowRouter.go('mainPage');
    })
}

// Using the two plugins : FlowRouter and Blaze-Layout for dynamic templates
// mainRoute is our layout.

FlowRouter.route('/',{
    name: 'mainPage',
    action(){
        BlazeLayout.render('mainRoute', {
            home : 'homepage',
            main : 'homepage_content'
        });
    }
});

FlowRouter.route('/profil_utilisateur',{
    name: 'hostProfilPage',
    action(){
        BlazeLayout.render('mainRoute', {
            main : 'profilRoute'});
    }
});

FlowRouter.route('/logements',{
    name: 'placesPage',
    action(){
        BlazeLayout.render('mainRoute', {
            main : 'placesListRoute'});
    }
});

FlowRouter.route('/ajouter-logement',{
    name: 'addAccommodationPage',
    action(){
        BlazeLayout.render('mainRoute', {
            main : 'addAccommodationRoute'});
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action: function() {
        BlazeLayout.render("mainRoute", {
            main: "login"
        });
    }
});

FlowRouter.route('/inscription', {
    name: 'register',
    action: function() {
        BlazeLayout.render("mainRoute", {
            main: "super_register_form"
        });
    }
});

FlowRouter.route('/inscription_ts', {
    name: 'register_social_worker',
    action: function() {
        BlazeLayout.render("mainRoute", {
            main: "super_register_form"
        });
    }
});


// Cette route ne semble pas utile, si on ne souhaite pas un affichage du calendrier uniquement.
FlowRouter.route('/calendar',{
    name: 'calendar_page',
    action(){
        BlazeLayout.render('mainRoute', {
            main : 'calendarRoute'});
    }
});
FlowRouter.route('/email',{
    name: 'email_page',
    action(){
        BlazeLayout.render('emailRoute', {
            main : 'emailRoute'});
    }
});

FlowRouter.route('/*',{
    name: 'lost',
    action(){
        BlazeLayout.render('mainRoute', {
            main : 'lost'});
    }
});

// // // //
// // Pattern to add a route

// FlowRouter.route('/ma-super-url',{
//     name: 'maSuperRoute',
//     action(){
//         BlazeLayout.render('mainRoute', {
//             main : 'mon_super_template'});
//     }
// });
// // // //


// // // //
// //routes experiments

// FlowRouter.route('/blog/:postId', {
//     // do some action for this route
//     action: function(params, queryParams) {
//         console.log("Params:", params);
//         console.log("Query Params:", queryParams);
//     },

//     name: "<name for the route>" // optional
// });

// var adminRoutes = FlowRouter.group({
//     prefix: '/admin',
//     name: 'admin',
//     triggersEnter: [function(context, redirect) {
//       console.log('running group triggers');
//     }]
//   });

//   adminRoutes.route('/', {
//     action: function() {
//       BlazeLayout.render('componentLayout', {content: 'admin'});
//     },
//     triggersEnter: [function(context, redirect) {
//       console.log('running /admin trigger');
//     }]
//   });
