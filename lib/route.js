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