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

var privateRoutes = FlowRouter.group({
    name: 'private',
    triggersEnter: [
      checkLoggedIn
    ]
})  

privateRoutes.route('/profile_accueillant',{
    name: 'hostProfilPage',
    action(){
        BlazeLayout.render('hostRoute', { main : 'hostRoute'});
    }
})

privateRoutes.route('/logements',{
    name: 'accommodationsPage',
    action(){
        BlazeLayout.render('accommodationsRoute', { main : 'accommodationsRoute'});
    }
})

privateRoutes.route('/ajouter-logement',{
    name: 'addAccommodationPage',
    action(){
        BlazeLayout.render('addAccommodationRoute', { main : 'addAccommodationRoute'});
    }
})


privateRoutes.route('/main',{
    name: 'mainPage',
    action(){
        BlazeLayout.render('mainRoute');
    }
})

var publicRoutes = FlowRouter.group({
    name: 'public',
    triggersEnter: [
        redirectIfLoggedIn
    ]
}) 

publicRoutes.route('/',{
    name: 'mainPage',
    action(){
        BlazeLayout.render('mainRoute');
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

// Ici tout ce qui concerne les routes pour ce qui est en rapport avec les travailleurs sociaux
// Quelque chose cloche ici
/*function redirectIfLoggedIn (ctx, redirect){
    if(Meteor.socialWorkerID()) {
        redirect('/profile_travailleur_social')
    }
}

function checkLoggedIn (ctx, redirect) {
    if (!Meteor.socialWorkerID() && !Meteor.loggingIn()) {
        redirect('/')
        }
      }
*/
FlowRouter.route('/inscription_ts', {
    name: 'register_social_worker',
    action: function() {
        BlazeLayout.render("mainLayout", {
            content: "register_social_worker"
        });
    }
});

privateRoutes.route('/profile_travailleur_social',{
    name: 'socialWorkerPage',
    action(){
        BlazeLayout.render('profile_travailleur_social');
    }
})

// Fin de tout ce qui concerne les travailleurs sociaux.
