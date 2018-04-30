import { Accommodation } from "../api/accommodation-methods";

Template.navbarHost.events({
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
        //Delete account based on user Id
        var username = Meteor.userId();
        //console.log(username);
        Meteor.users.remove(username);
        //Delete accommodation based on accommodations id !! Verifier que supprime tout les logements dans les cas de propositions multiples !!
        var data = Accommodation.findOne()._id;
        //console.log(data);
        Accommodation.remove(data);
        swal("Supprimer", "Votre compte a été supprimé.")
      }
      else{
        swal("Annulée","Votre compte est sauf :)")
      }
    })
  }
})