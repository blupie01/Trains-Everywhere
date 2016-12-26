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
		//var to hold info entered by user
		trainName = $("#train-name").val();
		destination = $("#train-destination").val();
		firstTrainTime = $("#first-train-time").val();
		trainFrequency = $("#train-frequency").val();
		console.log(trainName, destination, firstTrainTime, trainFrequency);

		//var to hold a row
		var row = $("<div class=row>");
		//var to hold a col for trainName
		var trainNameCol = $("<div class=col-md-4>").text(trainName);
		//var to hold a col for destincation
		var destinationCol = $("<div class=col-md-4>").text(destination);
		//var to hold a col for frequency
		var trainFrequencyCol = $("<div class=col-md-4>").text(trainFrequency);

		completedRow = row.append(trainNameCol).append(destinationCol).append(trainFrequencyCol);
		currentTrainSchedule.append(row);
		e.preventDefault();
	})
})