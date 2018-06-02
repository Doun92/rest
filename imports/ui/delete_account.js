import { Accommodation } from "../api/accommodation-methods";

Template.host_profil_template.events({
  'click #delete-button':function(){
    swal({
      title:"Attention!",
      text: "Vous êtes sur le point de supprimer votre compte. Votre compte et les disponbilités que vous proposiez seront supprimés à jamais!",
      type: "warning",
      showCancelButton:true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Oui! Faites le',
      cancelButtonText: "Non! Aidez-moi!",
      closeOnConfirm: false,
      closeOnCancel: false
    },
    function(isConfirm){
      if (isConfirm){
        swal("Supprimer", "Votre compte a été supprimé.");
        //Delete account based on user Id
        var username = Meteor.userId();
        Meteor.users.remove(username);
        //Delete accommodation based on accommodations id
        var data = Accommodation.findOne()._id;
        Accommodation.remove(data);
      }
      else{
        swal("Annulée","Votre compte est sauf :)")
      }
    })
  }
})
