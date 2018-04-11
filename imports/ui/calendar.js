import { Template } from 'meteor/templating';

Template.calendar_template.helpers({
    'calendArray' : function(){

        function range(x=number, pace=null, start=0){
            arr = [];
            for(start==0?i=0:i=start;i<x+1;pace==null?i++:i+=pace){
                arr.push(i);
            }
            return arr;
        }

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

        //testing new date if a date is selected
        var test_date = new Date();
        test_date.setDate(23);
        
        console.log(`${actual_date}, index : ${day_index}, other : ${first_day}, ${year}, ${month}, ${number_of_days}`);
        console.log(`new date : ${test_date}`);

        calandArray = range(number_of_days, null, 1);
        for(i=0;i<day_index;i++){
            calandArray.unshift(number_of_days_last_week)
            number_of_days_last_week-=1
        }
        for(i=0;i<last_days_index;i++){
            calandArray.push(i+1);
        }
        console.log(calandArray);
        return calandArray;
    },
    //functions
    'toSix' : function(index){
        return (index) % 7 == 0;
    },
    'getActualDate' : function(value){
        actualDate = new Date();
        if(value == actualDate.getDate()){
            return value
        }
    }
});