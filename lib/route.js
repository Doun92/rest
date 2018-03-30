if(Meteor.isClient){
    if(Meteor.user.sw){
        Accounts.onLogin(function(){
            FlowRouter.go('mainPage');
        })
    }else{
        Accounts.onLogin(function(){
            FlowRouter.go('hostProfilPage');
        })
    }   
    Accounts.onLogout(function(){
        FlowRouter.go('mainPage');
    })
}

/*
function redirectIfLoggedIn (ctx, redirect) {
    if (Meteor.userId()) {
      redirect('/profile_accueillant')
    }
  }
  
function checkLoggedIn (ctx, redirect) {
if (!Meteor.userId() && !Meteor.loggingIn()) {
    redirect('/')
    }
  }
*/

var privateRoute = FlowRouter.group({
    name: 'private'
}) 

privateRoute.route('/profile_accueillant',{
    name: 'hostProfilPage',
    action(){
        BlazeLayout.render('hostRoute', { main : 'hostRoute'});
    }
})

privateRoute.route('/logements',{
    name: 'accommodationsPage',
    
    // triggersEnter experiment : avec les triggersEnter on place une condition
    // à l'entrée d'une route. Si l'utilsateur rempli les conditions
    // il peut prendre la route en question sinon il est rejeté.
    // les triggers peuvent être défini une fois pour tout le groupe.
    // Permettra de régler l'aiguillage TS/Accueillant

    triggersEnter : [function(context,redirect){
        if(context.queryParams.sw == 'true'){
            console.log('nice job bob');
        }else if(context.queryParams.sw == 'false'){
            console.log('bad ass bitch');
        }
    }],
    action(){
        BlazeLayout.render('accommodationsRoute', { main : 'accommodationsRoute'});
    }
})

privateRoute.route('/ajouter-logement',{
    name: 'addAccommodationPage',
    action(){
        BlazeLayout.render('addAccommodationRoute', { main : 'addAccommodationRoute'});
    }
})

FlowRouter.route('/main',{
    name: 'mainPage',
    action(){
        BlazeLayout.render('mainRoute');
    }
})

FlowRouter.route('/',{
    name: 'mainPage',
    action(){
        BlazeLayout.render('mainRoute'), { main : 'mainRoute'};
    }
})
  
FlowRouter.route('/profile_travailleur_social',{
    name: 'socialWorkerPage',
    action(){
        BlazeLayout.render('workerRoute', { main : 'workerRoute'});
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

// routes experiments

FlowRouter.route('/register',{
    name: 'registerPage',
    action(){
        BlazeLayout.render('registerRoute'), { main : 'registerRoute'};
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
