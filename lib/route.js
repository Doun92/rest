if(Meteor.isClient){
    Accounts.onLogin(function(){
        FlowRouter.go('hostProfilPage');
    }) 
    Accounts.onLogout(function(){
        FlowRouter.go('mainPage');
    })
}

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

FlowRouter.route('/',{
    name: 'mainPage',
    action(){
        BlazeLayout.render('mainRoute');
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
            main: "register"
        });
    }
});

FlowRouter.route('/inscription_ts', {
    name: 'register_social_worker',
    action: function() {
        BlazeLayout.render("mainRoute", {
            main: "register_social_worker"
        });
    }
});

// Cette route ne semble pas utile, si on ne souhaite pas un affichage du calendrier uniquement.
FlowRouter.route('/calendar',{
    name: 'calendar_page',
    action(){
        BlazeLayout.render('calendarRoute', {
            main : 'calendarRoute'});
    }
});

// routes experiments

// FlowRouter.route('/register',{
//     name: 'registerPage',
//     action(){
//         BlazeLayout.render('registerRoute'), { main : 'registerRoute'};
//     }
// })

// FlowRouter.route('/*',{
//     name: 'Lost',
//     action(){
//         BlazeLayout.render('Lost'), { main : 'Lost'};
//     }
// })

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
