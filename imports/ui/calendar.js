/* SimpleCalendar module created and added by RD*/

import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'
import { stringify } from 'querystring';
import { Accommodation } from '../api/accommodation-methods';

Meteor.subscribe('accommodations');
Meteor.subscribe('userData');

Template.calendar_template.onCreated(function(){
    this.subscribe('userData');
    this.subscribe('accomodations');
})

Template.calendar_template.helpers({

    'calendArray' : function(){

        monthArr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        //console.log(`date without change : ${actual_date}`)

        function range(x=number, pace=null, start=0){
            arr = [];
            for(start==0?i=0:i=start;i<x+1;pace==null?i++:i+=pace){
                arr.push(i);
            }
            return arr;
        }

        sessionDayValue = Session.get('day_selected');
        sessionYearValue = Session.get('year_selected');
        //console.log(Session.get());

        if(sessionDayValue || sessionYearValue){

            const actual_date = new Date();

            //console.log('values in local storage');

            monthIndex = monthArr.indexOf(sessionDayValue);

            //console.log(monthIndex);

            actual_date.setFullYear(sessionYearValue);
            actual_date.setMonth(monthIndex);

            //console.log(`date with change : ${actual_date}`)

            var month = actual_date.getMonth();
            var year = actual_date.getFullYear();

            //get the first day date og the current month

            var first_day_date = new Date();
            first_day_date.setFullYear(sessionYearValue);
            first_day_date.setMonth(monthIndex);
            first_day_date.setDate(1);
            var first_day = first_day_date.toDateString().substring(0, 3);

            var number_of_days = new Date(year, month+1, 0).getDate();
            var number_of_days_last_week = new Date(year, month, 0).getDate();
            var day_week = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
            var day_index = day_week.indexOf(first_day);

            //var last_days_index = day_index;

            var last_days_index = new Date(year, month+1, 0);
            var last_days_index = last_days_index.getDay();
            //console.log(tmp2);

            //testing new date if a date is selected

            var test_date = new Date();
            test_date.setDate(23);
            
            //console.log(`${actual_date}, index : ${day_index}, other : ${first_day}, ${year}, ${month}, ${number_of_days} , last day of the month : ${tmp}`);
            //console.log(`new date : ${test_date}`);

            calandArray = range(number_of_days, null, 1);
            //console.log(calandArray);

            for(i=0;i<day_index;i++){
                calandArray.unshift(number_of_days_last_week)
                number_of_days_last_week-=1
            }
            for(i=0;i<(7-last_days_index);i++){
                calandArray.push(i+1);
            }
            //console.log(calandArray);
            return calandArray;

        }else{
            //console.log('storage got value');
            var actual_date = new Date();
            var month = actual_date.getMonth();
            var year = actual_date.getFullYear();
            //get the first day date og the current month
            var first_day_date = new Date();
            first_day_date.setDate(1);
            var first_day = first_day_date.toDateString().substring(0, 3);

            var number_of_days = new Date(year, month+1, 0).getDate();
            var number_of_days_last_week = new Date(year, month, 0).getDate();
            var day_week = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
            var day_index = day_week.indexOf(first_day);
            var last_days_index = day_index;
            var tmp = new Date(year, month + 1, 0);
            
            //testing new date if a date is selected

            var test_date = new Date();
            test_date.setDate(23);
            
            //console.log(`${actual_date}, index : ${day_index}, other : ${first_day}, ${year}, ${month}, ${number_of_days}, last day of the month : ${tmp}`);
            //console.log(`new date : ${test_date}`);

            calandArray = range(number_of_days, null, 1);
            //console.log(calandArray);

            for(i=0;i<day_index;i++){
                calandArray.unshift(number_of_days_last_week)
                number_of_days_last_week-=1
            }
            for(i=0;i<last_days_index;i++){
                calandArray.push(i+1);
            }
            //console.log(calandArray);
            return calandArray;
        }
    },
    'month' : function(){
        monthArr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
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
        monthArr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        indexMonth = monthArr.indexOf(value);
        //console.log(`month index : ${indexMonth}`)
        tempDate = new Date();
        actMonth = tempDate.getMonth();
        //console.log(`actual month : ${actMonth}`);
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
        monthArr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
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
    'tmp' : function(){
        /* test blaze do not delete until the end of the project 

        arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
        //tmpData = Accommodation.find({}).fetch();
        //tmp = Object.keys(tmpData[0].availability);
        //sess = Session.get();
        for(i=0;i<arr.length;i++){
            for(y=0;y<tmp.length;y++){
                if(arr[i] == tmp[y]){
                    //console.log(tmp[y]);
                }
            }
        }
        //console.log(tmp.map((x, y) => x))
        //arr = tmp.map(x=> x == value);
        //console.log(Session.get())
        */ 
    },
    'setClass' : function(index, value){
        
        /****  change class and the color value of the current day of the month 
        * + check for existing availabilities and return class color */
       if(Accommodation.find({host_id:Meteor.userId()}).count() === 0){
            
            if(index-value <= -10){
                return 'grey';
            }else if(index-value >= 10){
                return 'grey';
            }else{
                return 'calDay';
            }
       }else{

            tmpData = Accommodation.find({host_id:Meteor.userId()}).fetch();
            tmp = Object.keys(tmpData[0].availability);
            tmp.unshift('0');

            //that one was F... HARD!!!

            //console.log(`value 1 : ${tmp[value]}`)
            //sess = Session.get();
            //console.log(tmp.forEach(x=>{if(x==value){console.log(x)}}))
            //arr = tmp.map(x=> x == value);
            //console.log(`cal value : ${value}`)
            //console.log(`availability : ${tmp[value-1]}`)
            function test (ind){
                return ind == value;
            }
            if(index-value <= -10){
                return 'grey';
            }else if(index-value >= 10){
                return 'grey';             
            }else if(tmp.find(test)){
                    return 'selected';
            }else{
                    return 'calDay';
                }
            }
    },
    'getActualAddress' : function(){
        data = Meteor.user()
        console.log(data.user_address);
    }
});

Template.calendar_template.events({
    'change #monthForm': function(event){
        event.preventDefault();
        tmp = document.getElementById('yearForm');
        changeMonth = event.target.value

        Session.set({
            'year_selected' : tmp[0].options[tmp[0].selectedIndex].value,
            'day_selected': changeMonth,
            });
        //console.log(tmp[0].options[tmp[0].selectedIndex].value);
    },
    'change #yearForm': function(event){
        event.preventDefault();
        tmp = document.getElementById('monthForm');
        changeYear = event.target.value;

        Session.set({
            'year_selected' : changeYear,
            'day_selected': tmp[0].options[tmp[0].selectedIndex].value,
            });
        //console.log(Session.get('year_selected'));
    },
    'click .calDay': function(event){
        event.preventDefault();
        const target = event.target;
        tmpValue = target.innerText;
        console.log(tmpValue)

        date = new Date();
        date.setDate(tmpValue);
        date = date.toDateString();
        //console.log(tmpValue);
        Session.set(Number(tmpValue), date)
        console.log(Session.keys);
        //console.log(Session.get(tmpValue));
        target.className = 'selected'
    },
    'click .actualDay': function(event){
        event.preventDefault();
        const target = event.target;
        tmpValue = target.innerText;

        date = new Date();
        date.setDate(tmpValue);
        date = date.toDateString();
        //console.log(tmpValue);
        Session.set(Number(tmpValue), date)
        //console.log(Session.keys);
        //console.log(Session.get(tmpValue));
        target.className = 'selected'
    },
    'click .selected':function(event){
        event.preventDefault();
        const target = event.target;
        tmpValue = target.innerText;
        if(Session.get(Number(tmpValue))){
            delete Session.keys[Number(tmpValue)];
            target.className = 'calDay'
            //console.log(Session.keys);
        }
    }
})
