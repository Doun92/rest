import { Accommodation } from "../api/accommodation-methods.js";

Template.accommodationsList.helpers({
    accommodation() {
        return Accommodation.find({});
    },
});

Template.addAccommodation.events({
    'submit .addAccommodation' (event) {
        event.preventDefault();

        const target = event.target;

        const address = target.address.value;
        const additionalAddress = target.additionalAddress.value;
        const zipCode = target.zipCode.value;
        const location = target.location.value;

        const availablePlaces = target.availablePlaces.value;
        const family = target.family.checked;
        const single = target.single.checked;
        const man = target.man.checked;
        const woman = target.woman.checked;

        const allTime = target.allTime.checked;
        const startDate = target.startDate.value;
        const endDate = target.endDate.value;
        const callHour = target.callHour.value;
        const comment = target.comment.value;

        Accommodation.insert({
            address : address,
            additionalAddress : additionalAddress,
            zipCode : zipCode,
            location : location,

            availablePlaces : availablePlaces,
            family : family,
            single : single,
            man : man,
            woman : woman,

            allTime : allTime,
            startDate : startDate,
            endDate : endDate,
            callHour : callHour,
            comment : comment,
            
        });
        FlowRouter.go('/logements');
    }
});

