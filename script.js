/* GET THE DATE */
var date = new Date(); //create an instance of a Date object
console.log(date); //print the date to the console

/* EXTRACT THE CURRENT DATE INFO */
var currentMonth = date.getMonth();
var currentDay = date.getDay();
var currentDate = date.getDate();
var currentYear = date.getFullYear();

console.log(currentMonth); // current month - 1
console.log(currentDay); // day of the week
console.log(currentDate); // current date/number
console.log(currentYear); // current year

/* IMPORTANT DATE INFO */
var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

/* SET THE CORRECT MONTH */ 
var title = document.getElementById("title");
title.innerHTML = months[currentMonth];

/* UPDATE THE CALENDAR INFO */
var habitTitle = document.getElementById("habitTitle");

var storedHabit = localStorage.getItem("habitName");
if(storedHabit) {
    habitTitle.innerHTML = storedHabit;
} else {
    habitTitle.innerHTML = "Click to set your habit";
    localStorage.setItem("habitName", "Click to set your habit");
}

habitTitle.onclick = function () {

    let habits = prompt("What's your habit", habitTitle.innerHTML);

    if (habits === null || habits.trim().length === 0) {
        if (habits === null) {
            return;
        }
        habitTitle.innerHTML = "Click to set your habit";
        localStorage.setItem("habitName", "Click to set your habit");
    } else {
        habitTitle.innerHTML = habits;
        localStorage.setItem("habitName", habits);
    }
}

/* SET THE TOTAL DAYS */ 
var daysInTheMonthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,];
var daysInThisMonth = daysInTheMonthList[currentMonth];

var daysCompleted = 0;
var totalDays = document.getElementById("totalDays"); //reference to the days fraction
totalDays.innerHTML = "0/" + daysInThisMonth; //update the fraction

/* SETUP THE CALENDAR DAYS */
var dayCount = 0;
var rowCount = 0;
var days = document.getElementsByClassName("days"); //store a list of all the rows

for( var i=0; i < days.length; i++ ){ //search each row one by one
    var day = days[rowCount].getElementsByClassName("day"); //temporarily pick a row
    for ( var j=0; j < day.length; j++){ //grab a column one by one

        //add a border to the current date
        if(dayCount == currentDate -1){
            day[j].setAttribute("style", "color:rgb(234, 1, 144);");
            day[j].setAttribute("style", "border: 2px solid black"); 
        }

        //update the correct date number and id and hide any excess numbers
        if(dayCount < daysInThisMonth) {
            day[j].innerHTML = dayCount + 1;
            day[j].setAttribute("id", "day" +(dayCount + 1));
            dayCount++; //repeat for every day
        } else {
            day[j].innerHTML = "";
            day[j].setAttribute("style", "background-color:white");
        }
    }
    rowCount++; //repeat for every row
}

/* INITIALIZE COMPLETED ARRAY */
var completed = new Array(31);
for (var i = 0; i < dayCount; i++) {
    var tempString = 
        "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
    console.log("storing date: " + tempString);
    var tempDay = localStorage.getItem(tempString);
    console.log(tempDay);
    if(tempDay == null || tempDay == "false"){
        localStorage.setItem(tempString, "false");
    } else if (tempDay == "true") {
        daysCompleted++;
    }
    totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;
}

console.log("completed array: " + completed);
console.log("total days completed: " + daysCompleted);

/* CHECK STORAGE AND UPDATE COMPLETED ARRAY */

for (var i = 0; i < currentDate; i++) {
    var tempString = 
        "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
    console.log(tempString);

    var chosenDay = localStorage.getItem(tempString);
    console.log(i + 1 + ": " + chosenDay);
    var chosenDayDiv = document.getElementById("day" + (i + 1));
    if (chosenDay === "true") {
        chosenDayDiv.style.backgroundColor = "pink";
    } else if (chosenDay === "false") {
        chosenDayDiv.style.backgroundColor = "white";
    }
}

/* UPDATE COMPLETED ON CALENDAR */
var dayDivs = document.querySelectorAll(".day");
for (var i = 0; i < currentDate; i++) {
    dayDivs[i].onclick = function (e) {
        var num = e.target.innerText;
        var selectedDate = document.getElementById(e.target.id);
        var storageString = 
            "" + (currentMonth + 1) + "-" + num + "-" + currentYear;
        if (localStorage.getItem(storageString) === "false") {
            selectedDate.style.backgroundColor = "pink";
            localStorage.setItem(storageString, true);
            daysCompleted++;
        } else if(localStorage.getItem(storageString) === "true") {
            selectedDate.style.backgroundColor = "white";
            localStorage.setitem(storageString, false);
            daysCompleted--; 
        }

        totalDays.innerHTML = daysCompleted + "/" + dayCount;
        console.log(daysCompleted, currentDate);
        if(daysCompleted === currentDate) {
            alert("Fuck yeah man!");
        }
    }
}

/* RESET BUTTON */
var resetButton = document.getElementById("resetButton");
resetButton.onclick = function () {
    for (var i = 0; i < dayCount; i++) {
        var tempStrings = 
            "" + (currentMonth + 1) + "-" + (i + 1) + "-" + currentYear;
        console.log(tempStrings);
        localStorage.setItem(tempStrings, "false");
        var curDay = document.getElementById("day" + (i + 1));
        curDay.style.backgroundColor = "white";    
    }
    daysCompleted = 0;
    totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;   
};