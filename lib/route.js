FlowRouter.route('/',{
    name: 'mainPage',
    action(){
        BlazeLayout.render('mainRoute');
    }
})

FlowRouter.route('/logements',{
    name: 'accomodationsPage',
    action(){
        BlazeLayout.render('accomodationRoute', { main : 'accomodationRoute'});
    }
})

FlowRouter.route('/profile_accueillant',{
    name: 'hostProfilPage',
    action(){
        BlazeLayout.render('hostRoute', { main : 'hostRoute'});
    }
})