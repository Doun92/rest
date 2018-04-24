if(Meteor.isClient){
    Accounts.onLogin(function(){
        FlowRouter.go('hostProfilPage');
    }) 
    Accounts.onLogout(function(){
        FlowRouter.go('mainPage');
    })
}

FlowRouter.route('/profile_utilisateur',{
    name: 'hostProfilPage',
    action(){
        BlazeLayout.render('profilRoute', { main : 'profilRoute'});
    }
})

FlowRouter.route('/logements',{
    name: 'placesPage',
    action(){
        BlazeLayout.render('placesListRoute', { main : 'placesListRoute'});
    }
})

FlowRouter.route('/ajouter-logement',{
    name: 'addAccommodationPage',
    action(){
        BlazeLayout.render('addAccommodationRoute', { main : 'addAccommodationRoute'});
    }
})

// Alors, j'ai régler le problème du double en supprimant cette route, à quoi sert-elle ?
// Non navré, c'est pire. mais merci quand même :)) c.f. body.html pour la solution

FlowRouter.route('/',{
    name: 'mainPage',
    action(){
        BlazeLayout.render('mainRoute'), { main : 'mainRoute'};
    }
})
  
FlowRouter.route('/login', {
    name: 'login',
    action: function() {
        BlazeLayout.render("mainLayout", {
            content: "login"
        });
    }
});

FlowRouter.route('/inscription', {
    name: 'register',
    action: function() {
        BlazeLayout.render("mainLayout", {
            content: "register"
        });
    }
});




FlowRouter.route('/inscription_ts', {
    name: 'register_social_worker',
    action: function() {
        BlazeLayout.render("mainLayout", {
            content: "register_social_worker"
        });
    }
});

FlowRouter.route('/calendar',{
    name: 'calendar_page',
    action(){
        BlazeLayout.render('calendarRoute', { main : 'calendarRoute'});
    }
})

// routes experiments

FlowRouter.route('/register',{
    name: 'registerPage',
    action(){
        BlazeLayout.render('registerRoute'), { main : 'registerRoute'};
    }
})

FlowRouter.route('/*',{
    name: 'Lost',
    action(){
        BlazeLayout.render('Lost'), { main : 'Lost'};
    }
})

FlowRouter.route('/blog/:postId', {
    // do some action for this route
    action: function(params, queryParams) {
        console.log("Params:", params);
        console.log("Query Params:", queryParams);
    },

    name: "<name for the route>" // optional
});

var adminRoutes = FlowRouter.group({
    prefix: '/admin',
    name: 'admin',
    triggersEnter: [function(context, redirect) {
      console.log('running group triggers');
    }]
  });
  
  adminRoutes.route('/', {
    action: function() {
      BlazeLayout.render('componentLayout', {content: 'admin'});
    },
    triggersEnter: [function(context, redirect) {
      console.log('running /admin trigger');
    }]
  });
