import { Accommodation } from "../api/accommodation-methods";

Template.navbarHost.events({
  'click #delete-button': function(event){
    
    data = Accommodation.find({host_id:Meteor.userId()}).fetch()
    var username = Meteor.userId();
    //var accId = Accommodation[0]._id
    console.log(data[0]._id);
    Meteor.users.remove(username)
    Accommodation.remove(data[0]._id)
  }});


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