FlowRouter.route('/',{
    name: 'mainPage',
    action(){
        BlazeLayout.render('mainRoute');
    }
})

FlowRouter.route('/logements',{
    name: 'accommodationsPage',
    action(){
        BlazeLayout.render('accommodationsRoute', { main : 'accommodationsRoute'});
    }
})

FlowRouter.route('/ajouter-logement',{
    name: 'addAccommodationPage',
    action(){
        BlazeLayout.render('addAccommodationRoute', { main : 'addAccommodationRoute'});
    }
})

FlowRouter.route('/profile_accueillant',{
    name: 'hostProfilPage',
    action(){
        BlazeLayout.render('hostRoute', { main : 'hostRoute'});
    }
})

FlowRouter.route('/profile_travailleur_social',{
    name: 'profile_travailleur_social',
    action(){
        BlazeLayout.render('workerRoute', { main : 'workerRoute'});
    }
})