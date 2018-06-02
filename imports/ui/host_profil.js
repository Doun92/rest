import { Template } from 'meteor/templating';
import './template/host_profil_template.html';
import { Accommodation } from '../api/accommodation-methods';

// récupère la publication du fichier server main.js
// permet notamment de récupérer les champs ajouté dans la collection
// ATTENTION : nécessite la suppression de la librarie "autopublish"

Meteor.subscribe('userData');

Template.host_profil_template.onCreated(function(){
    Meteor.subscribe('accommodations');
});

// Ces helpers récupèrent des données dans la collection Meteor.users
// attention ne pas confondre la collection Meteor.users et 
// l entrée qui correspond à un utilisateur meteor.user()

Template.host_profil_template.helpers({
    'firstname': function(){
        data = Meteor.user();
        if(data.firstname){
            firstname = data && data.firstname;
            return firstname;    
        }else{
            return ""
        }
    },
    'lastname': function(){
        data = Meteor.user();
        if(data.lastname){
            lastname = data && data.lastname;
            return lastname;    
        }else{
            return ""
        }
    },
    'userAddress': function(){
        data = Meteor.user();

        if (data.userAddress.address){
            if (data.userAddress.address==''){
                rue = '';
            }else{
                rue = data && data.userAddress.address;
                rue = rue+', '
            }
            if(data.userAddress.city==''){
                ville = '';
            }else{
                ville = data && data.userAddress.city;
            }
            if(data.userAddress.postcode==''){
                npa = '';
            }else{
                npa = data && data.userAddress.postcode;
            }
            if(rue == '' && ville == '' && npa == ''  ){
                return ''
            }else{
                return `${rue} ${npa} ${ville}`;         
            }
        }else{
            return ""; 
        }
    },
    'address': function(){
        data = Meteor.user();
        if (data.userAddress.address){
            rue = data && data.userAddress.address;
            return rue;    
        }else{
            return ""
        }
    },
    'number': function(){
        data = Meteor.user();
        if (data.userAddress.number){
            numRue = data && data.userAddress.number;
            return numRue;    
        }else{
            return ""
        }
    },
    'city': function(){
        data = Meteor.user();

        if (data.userAddress.city){
            ville = data && data.userAddress.city;
            return ville;    
        }else{
            return ""
        }
    },

    'postCode': function(){
        data = Meteor.user();

        if (data.userAddress.postcode){
            npa = data && data.userAddress.postcode;
            return npa;    
        }else{
            return ""
        }
    },

    'mail': function(){
        data = Meteor.user();
        if(data.emails[0].address){
            address = data && data.emails[0].address;
            return address;    
        }else{
            return ""
        }
    },
    
    'phone': function(){
        data = Meteor.user();
        if(data.phoneNumber){
            phone = data && data.phoneNumber;
            return phone;    
        }else{
            return ""
        }
    },
    'accommodationAddress': function(){
        const host = Meteor.userId();
        const accommodation = Accommodation.findOne({host_id: host});

        return `${accommodation.address} ${accommodation.locNumber}, ${accommodation.zipCode} ${accommodation.location}`
    }
})

// events attache un évènement et une fonction à un template 
// ici l event est le submit du formulaire (click sur le bouton submit)
// la fonction consiste à mettre à jour les champs de la collection

Template.host_profil_template.events({
    'submit .profilForm' : function(event) {

        event.preventDefault();

        const target = event.target;
        const name = target.firstname.value;
        const lastname = target.lastname.value;
        const phone = target.phone.value;
        

        Meteor.users.update(
            Meteor.userId(), { $set: { 
                firstname: name,
                lastname: lastname,
                phoneNumber: phone
            } }
          );
    },
    'submit .addressForm' : function(event) {

        event.preventDefault();

        const target = event.target;
        const address = target.address.value;
        const number = target.number.value;
        const postcode = target.postcode.value;
        const city = target.city.value;

        Meteor.users.update(
            Meteor.userId(), { $set: { 
                userAddress:{
                    address : address,
                    number : number,
                    city: city,
                    postcode: postcode
                }
            } }
          );
    }
});

// subscribing user datas for the user profil route

Template.profilRoute.onCreated(function() {
    this.subscribe('userData');
});

Template.profilRoute.helpers({
    'isSocialWorker': function() {
        data = Meteor.user();
        sw = data && data.sw;
        return sw;
    }
});

// subscribing user datas for the accomodations route

Template.accommodationsRoute.onCreated(function() {
    this.subscribe('userData');
});

Template.accommodationsRoute.helpers({
    'isSocialWorker': function() {
        data = Meteor.user();
        sw = data && data.sw;
        return sw;
    }
});

Template.host_profil_template.events({
    'submit #modify-password-form': function(event,template){
        event.preventDefault();
        const oldPassword = template.$('#oldPassword').val();
        const newPassword = template.$('#newPassword').val();
        const newPasswordRepeat = template.$('#newPasswordRepeat').val();
        console.log(newPasswordRepeat);
        if(newPassword===newPasswordRepeat){
            Accounts.changePassword(oldPassword, newPassword, function(err){
                if (err) {
                return swal("Mot de passe actuel incorrect!")
                }
                else{
                    return swal("Votre mot de passe a été changé.")
                }
            })   
        }
        else{
            return swal("Les mots de passe ne correspondent pas.")
        }
        return false; //stops page from refreshing
        }
    }
)

// Allows user to change profile pictre - !!Acts more as a placeholder for now. To be fulle implemented by using Cloudinary. 
Template.host_profil_template.events({
    'submit .profilPic':function(event,tempalte){
        var file = document.getElementById('profilePic-input').files[0];
        var reader  = new FileReader();
        // it's onload event and you forgot (parameters)
        reader.onload = function(e)  {
            let image = document.getElementById("profilePic")
            // the result image data
            image.src = e.target.result;
         }
         //For now the input is just a simple string which is the file name. In the end, the goal would be to setup a image hosting service (Cloudinary)
         Meteor.users.update(
             Meteor.userId(),{$set:{
                 photo: file.name
             }}
         )
         // you have to declare the file loading
         reader.readAsDataURL(file);
        return false;
    }
})