/* SimpleCalendar module created and added by RD*/

import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { stringify } from 'querystring';
import { Accommodation } from '../api/accommodation-methods';

Template.calendar_template.onCreated(function(){

    this.subscribe('userData');
    this.subscribe('accommodations');
    
    //init global var   
    dateObj = {1:{},2:{},3:{},4:{},5:{},6:{},7:{},8:{},9:{},10:{},11:{},12:{}};
    monthArr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    slctStatus = false;
    actlDate = new Date();
    actlMonth = actlDate.getMonth();
})

Template.calendar_template.helpers({

    'calendArray' : function(){

        // the calendar is a grid filled with numerical values (month days number)
        // the "calendArray" helper fill an array with 
        // the values nessary for the grid of the calendar

        function range(x=number, pace=null, start=0){
            arr = [];
            for(start==0?i=0:i=start;i<x+1;pace==null?i++:i+=pace){
                arr.push(i);
            }
            return arr;
        }

        sessionDayValue = Session.get('day_selected');
        sessionYearValue = Session.get('year_selected');

        if(sessionDayValue || sessionYearValue){

            const actual_date = new Date();


            var monthIndex = monthArr.indexOf(sessionDayValue);


            actual_date.setFullYear(sessionYearValue);
            actual_date.setMonth(monthIndex);


            var month = actual_date.getMonth();
            var year = actual_date.getFullYear();

            //get the first day date of the current month

            var first_day_date = new Date();
            first_day_date.setFullYear(sessionYearValue);
            first_day_date.setMonth(monthIndex);
            first_day_date.setDate(1);
            var first_day = first_day_date.toDateString().substring(0, 3);

            var number_of_days = new Date(year, month+1, 0).getDate();
            var number_of_days_last_week = new Date(year, month, 0).getDate();
            var day_week = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
            var day_index = day_week.indexOf(first_day);


            var last_days_index = new Date(year, month+1, 0);
            var last_days_index = last_days_index.getDay();

            calandArray = range(number_of_days, null, 1);

            for(i=0;i<day_index;i++){
                calandArray.unshift(number_of_days_last_week)
                number_of_days_last_week-=1
            }
            for(i=0;i<(7-last_days_index);i++){
                calandArray.push(i+1);
            }
            return calandArray;

        }else{

            var actual_date = new Date();
            var month = actual_date.getMonth();
            var year = actual_date.getFullYear();
            //get the first day date of the current month
            var first_day_date = new Date();
            first_day_date.setDate(1);
            var first_day = first_day_date.getDay();

            var number_of_days = new Date(year, month+1, 0).getDate();
            var number_of_days_last_week = new Date(year, month, 0).getDate();

            var day_week = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
            var day_index = first_day-1;
            var tmp = new Date(year, month + 1, 0);
            
            calandArray = range(number_of_days, null, 1);

            var last_days_index = new Date(year, month+1, 0);
            var last_days_index = last_days_index.getDay();


            for(i=0;i<day_index;i++){
                calandArray.unshift(number_of_days_last_week)
                number_of_days_last_week-=1
            }
            for(i=0;i<(7-last_days_index);i++){
                calandArray.push(i+1);
            }
            return calandArray;
        }
    },
    'month' : function(){
        tmp = new Date;
        month = tmp.getMonth();
        return monthArr[month];

    },
    'year' :function(){
        tmp = new Date;
        year = tmp.getFullYear()
        return year
        },

    //functions

    'isActualMonth' : function(value){
        indexMonth = monthArr.indexOf(value);
        tempDate = new Date();
        actMonth = tempDate.getMonth();
        if(actMonth == indexMonth){
            return true;
        }
    },
    'toSix' : function(index){
        return (index+1) % 7 == 0;
    },
    'getActualDate' : function(value){
        actualDate = new Date();
        if(value == actualDate.getDate()){
            return value
        }
    },
    'monthOptions' : function(){
        return monthArr;
    },
    'yearOptions' : function(){
        tmpDate = new Date();
        yearArr = [tmpDate.getFullYear(), tmpDate.getFullYear()+1];
        return yearArr;
    },
    'daysAcr' : function(){
        return ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']
    },
    'setClass' : function(index, value){
        
        /****  change class and the color value of the current day of the month
        * + check for existing availabilities and return class color *********/
       
       if(Accommodation.find({host_id:Meteor.userId()}).count() === 0){
            
            if(index-value <= -10){
                return 'grey';
            }else if(index-value >= 10){
                return 'grey';
            }else{
                return 'calDay';
            }
       }else{
            //display stored date of the availability document over the calendar cells (selected class)
            //1) get every keys of the actual month
            //2) compare value of the calendar cell with the value of key of the actual month array

            //get collection data (places)
            let tmpData = Accommodation.find({host_id:Meteor.userId()}).fetch();

            //get every keys of the availability object document
            let tmp = Object.keys(tmpData[0].availability[actlMonth+1]);

            dateObj = tmpData[0].availability

            tmp.unshift('0');

            function dispDateValues(ind){

                    return ind == value;
            }
            // grey is the class's value's day of the past or of 
            // the futur month displayed on the calendar (lol)

            if(index-value <= -10){
                return 'grey';
            }else if(index-value >= 10){
                return 'grey';
            
            // change the cell's class to the "selected" class 
            // or the "actualDay" class or the normal class "calDay"
            
            // the if statement uses the find() method with the "dispDate()"" 
            // function wich is a very simple function who compares the 
            // two numbers. The find() iterate through an array and return 
            // the truth value of the function.
            // the statement is used to find a date value who has been 
            // choosed by a user and who needs to be displayed 
            // again with the selected class

            }else if(tmp.find(dispDateValues)){
                    let date = new Date();
                    date.setDate(value);
                    let dateSet = date.toDateString();
                    dateObj[actlMonth+1][Number(value)] = dateSet;
                    return 'selected';
            }else{
                let dt = new Date();
                dt = dt.toDateString();
                dt = dt.slice(8,10);
                if(value == dt){
                    return 'actualDay'
                }else{
                    return 'calDay';
                }
                }
            }
    },
    'getActualAddress' : function(){
        data = Meteor.user()
    }
});

//calendar events

Template.calendar_template.events({
    'change #monthForm': function(event){
        event.preventDefault();
        tmp = document.getElementById('yearForm');
        changeMonth = event.target.value;

        //reset actual month global var
        actlMonth = monthArr.indexOf(changeMonth);
        Session.set({
            'year_selected' : tmp[0].options[tmp[0].selectedIndex].value,
            'day_selected': changeMonth,
            });
    },
    'change #yearForm': function(event){
        event.preventDefault();
        tmp = document.getElementById('monthForm');
        changeYear = event.target.value;

        Session.set({
            'year_selected' : changeYear,
            'day_selected': tmp[0].options[tmp[0].selectedIndex].value,
            });
    },
    'click .calDay': function(event){
        event.preventDefault();
        const target = event.target;
        tmpValue = target.innerText;

        let date = new Date();

        let actlDay = date.toDateString().substring(8,10);
        date.setDate(tmpValue);
        date.setMonth(actlMonth);
        let dateSet = date.toDateString();
        if(Number(tmpValue)>=actlDay){
            dateObj[date.getMonth()+1][Number(tmpValue)] = dateSet;
            target.className = 'selected'
            slctStatus = true;
        }else{
            alert('Date non valide veuillez')
        }
    },
    'click .actualDay': function(event){
        event.preventDefault();
        const target = event.target;
        tmpValue = target.innerText;

        let date = new Date();
        date.setDate(tmpValue);
        date.setMonth(actlMonth);
        let dateSet = date.toDateString();
        dateObj[date.getMonth()+1][Number(tmpValue)] = dateSet;
        target.className = 'selected'
        slctStatus = true;
    },
    'click .selected':function(event){
        event.preventDefault();
        const target = event.target;
        let tmpColl = Accommodation.find({});
        let tmpValue = target.innerText;
        slctStatus = true;

        delete dateObj[actlMonth+1][Number(tmpValue)];
        target.className = 'calDay'
    }
})

// validate form

Template.validateCal.events({
    'click #validateCal' (event) {

        event.preventDefault();
        const creator = Meteor.userId();
        const tmpData = Accommodation.find({},{availability:1});
        const collection = Accommodation.find({host_id:Meteor.userId()}).fetch();
        const dateObjLength = Object.keys(dateObj).length;

        if(tmpData.count() === 0 && dateObjLength === 0){

        }else if(tmpData.count() > 0 && dateObjLength === 0){
            if(slctStatus){
                Accommodation.update(collection[0]._id, {
                    $set: {
                        availability : dateObj
                    }
                });swal("Merci!", "la date a bien été mis à jours.", "success");
                FlowRouter.go('/profil_utilisateur');
            }else{
                dateObj = collection[0].availability;
                Accommodation.update(collection[0]._id, {
                    $set: {
                        availability : dateObj
                    }
                });swal("Merci!", "la date a bien été mis à jours.", "success");
                FlowRouter.go('/profil_utilisateur');
            }
        }else if(tmpData.count() > 0 && dateObjLength > 0){
            Accommodation.update(collection[0]._id, {
                $set: {
                    availability : dateObj
                }
            });swal("Merci!", "la date a bien été mis à jours.", "success");
            FlowRouter.go('/profil_utilisateur');

        }else if(tmpData.count() === 0 && dateObjLength > 0){
            Accommodation.insert({
                availability : dateObj,
                host_id : creator            
            });swal("Merci!", "la date a bien été mis à jours.", "success");
            FlowRouter.go('/profil_utilisateur');
        }
    },
});
