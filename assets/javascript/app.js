// Initialize Firebase
var config = {
	apiKey: "AIzaSyB8hJRJeScaWopXWCzPEgG7UA0VnG5Vo0E",
	authDomain: "trainspotter-45428.firebaseapp.com",
	databaseURL: "https://trainspotter-45428.firebaseio.com",
	storageBucket: "trainspotter-45428.appspot.com",
	messagingSenderId: "642093108830"
};
firebase.initializeApp(config);

//var to hold database info
var trainDataBase = firebase.database();

//var to hold information from form
var trainName = "";
var destination = "";
var firstTrainTime = "";
var trainFrequency = "";

$(document).ready(function() {
	//var to hold train-schedule div
	var currentTrainSchedule = $("#train-schedule");
	//var to hold form information
	var form = $("#train-adder-form");

	form.submit(function(e){
		e.preventDefault();
		//var to hold info entered by user
		trainName = $("#train-name").val().trim();
		destination = $("#train-destination").val().trim();
		firstTrainTime = $("#first-train-time").val().trim();
		trainFrequency = $("#train-frequency").val().trim();
		console.log(trainName, destination, firstTrainTime, trainFrequency);

		// Creates local "temporary" object for holding employee data
 		var newTrain = {
		   name: trainName,
		   dest: destination,
		   firstTime: firstTrainTime,
		   freq: trainFrequency
		 };

		// Uploads train data to the database
		trainDataBase.ref().push(newTrain);

		// Logs everything to console
		console.log(newTrain.name);
		console.log(newTrain.dest);
		console.log(newTrain.firstTime);
		console.log(newTrain.freq);

		// Alert
		alert("train successfully added");

		 // Clears all of the text-boxes
		$("#train-name").val("");
		$("#train-destination").val("");
		$("#first-train-time").val("");
		$("#train-frequency").val("");

		 // Prevents moving to new page
		return false;
		});

		//pull from database and prints to screen/html
		trainDataBase.ref().on("child_added", function(childSnapshot) {

		console.log(childSnapshot.val());

		// Store everything into a variable.
		var trainName = childSnapshot.val().name;
		var destination = childSnapshot.val().dest;
		var firstTrainTime = childSnapshot.val().firstTime;
		var trainFrequency = childSnapshot.val().freq;

		// Employee Info
		console.log(trainName);
		console.log(destination);
		console.log(firstTrainTime);
		console.log(trainFrequency);

		// First Time (pushed back 1 year to make sure it comes before current time)
	    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
	    console.log(firstTimeConverted);

	     // Current Time
	    var currentTime = moment();
	    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	    // Difference between the times
	    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	    console.log("DIFFERENCE IN TIME: " + diffTime);

	    // Time apart (remainder)
	    var tRemainder = diffTime % trainFrequency;
	    console.log(tRemainder);

	    // Minute Until Train
	    var tMinutesTillTrain = trainFrequency - tRemainder;
	    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	    // Next Train
	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

		//var to hold a row
		var row = $("<div class=row>");
		//var to hold a col for trainName
		var trainNameCol = $("<div class=col-md-3>").text(trainName);
		//var to hold a col for destincation
		var destinationCol = $("<div class=col-md-3>").text(destination);
		//var to hold a col for frequency
		var trainFrequencyCol = $("<div class=col-md-2>").text(trainFrequency);
		//var to hold a col for frequency
		var tMinutesTillTrainCol = $("<div class=col-md-2>").text(tMinutesTillTrain);
		//var to hold a col for frequency
		var nextTrainCol = $("<div class=col-md-2>").text(moment(nextTrain).format("hh:mm A"));

		completedRow = row.append(trainNameCol).append(destinationCol).append(
			trainFrequencyCol).append(nextTrainCol).append(tMinutesTillTrainCol);
		currentTrainSchedule.append(row);
	})
})