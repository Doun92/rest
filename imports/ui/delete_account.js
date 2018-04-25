if (Meteor.isClient){
    Template.navbarHost.events({
      'click #delete-button': function(event){
        
        var username = Meteor.userId();
        console.log(username);
        Meteor.users.remove(username)
      }
    })}


/* document.querySelector('#from1').onsubmit = function(){

 swal({
    title: "Are you sure?",
    text: "You will not be able to recover this imaginary file!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: '#DD6B55',
    confirmButtonText: 'Yes, I am sure!',
    cancelButtonText: "No, cancel it!",
    closeOnConfirm: false,
    closeOnCancel: false
 },
 function(isConfirm){

   if (isConfirm){
     swal("Shortlisted!", "Candidates are successfully shortlisted!", "success");

    } else {
      swal("Cancelled", "Your imaginary file is safe :)", "error");
    }
 });
};   */