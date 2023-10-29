// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
// *********************************$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
// ****************************});
// handle displaying the time
// *****************function displayTime() {
//  ***************** var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
//   timeDisplayEl.text(rightNow);
// ***************}


// Use Day.js to format the following variables:
// 1. What is today's date in the following format: Jan 1st, 1999?
// var today = dayjs();
// $('#1a').text(today.format('MMM D, YYYY'));

// // 2. What is the day of the week today?
// var dayWeek = today.format('[Today is] dddd');
// $('#2a').text(dayWeek);

// // 3. Parse the following date, 11/3/2020, and convert it into the following format: Sunday, February 14 2010, 3:25:50 pm.
// var reformatDate = dayjs('2020-11-03').format('dddd, MMMM D YYYY, h:mm:ss a');
// $('#3a').text(reformatDate);

// // 4. I need to place my recycling bin on the curb on every odd week of the year for collection. Do I need to put out my recycling bin out this week?
// // Dayjs' .diff() method does NOT include partial weeks in its calculation.
// var beginningOfYear = dayjs('2023-01-01');
// var weekNum = today.diff(beginningOfYear, 'week');

// // Check for odd week, then assign boolean to variable
// var takeOut = weekNum % 2 === 1;
// $('#4a').text(takeOut + ", because it's currently week " + weekNum);



var today = moment().format("dddd, MMMM Do YYYY ");

var now = moment().format("H A");

// current day

$("#currentDay").text(today);


/* planWorkday entries for each hour of the workday */
var planWorkday = [
    { time: "9 AM", 
        event: "" },
    { time: "10 AM", 
        event: "" },
    { time: "11 AM", 
        event: "" },
    { time: "12 PM", 
        event: "" },
    { time: "1 PM", 
        event: "" },
    { time: "2 PM", 
        event: "" },
    { time: "3 PM", 
        event: "" },
    { time: "4 PM", 
        event: "" },
    { time: "5 PM", 
        event: "" },
  ];

/* Local Storage check */
var workEvents = JSON.parse(localStorage.getItem("workDay"));
if (workEvents) {
  planWorkday = workEvents;
}

/* Current Day */
$("#currentDay").text(today);

/* Create rows */
planWorkday.forEach(function(timeBlock, index) {
	var timeLabel = timeBlock.time;
	var blockColor = colorRow(timeLabel);
	var row =
		'<div class="time-block" id="' +
		index +
		'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		timeLabel +
		'</div><textarea class="form-control ' +
		blockColor +
		'">' +
		timeBlock.event +
		'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

	/* Adding rows to container div */
	$(".container").append(row);
});

/* Color rows based on current time */
function colorRow(time) {
	var planNow = moment(now, "H A");
	var planEntry = moment(time, "H A");
	if (planNow.isBefore(planEntry) === true) {
		return "future";
	} else if (planNow.isAfter(planEntry) === true) {
		return "past";
	} else {
		return "present";
	}
}

/* Save Events */
$(".saveBtn").on("click", function() {
	var blockID = parseInt(
		$(this)
			.closest(".time-block")
			.attr("id")
	);
	var userEntry = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);
	planWorkday[blockID].event = userEntry;

	/* Set local storage */
	localStorage.setItem("workDay", JSON.stringify(planWorkday));
});