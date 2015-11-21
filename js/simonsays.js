var currently_playing;
var round;
var top_score;
var generated_sequence = [];
var sequence = [];
var colorMap = ["red", "blue", "yellow", "green"];
var lost;

// Document ready
$( document ).ready(function() {
	// Check for top score or create a new one with 0
	if (localStorage.getItem("top_score") === null) {
  		this.top_score = 0;
  		localStorage.setItem("top_score", top_score);
	} else {
		this.top_score = parseInt(localStorage.getItem("top_score"));
		$("#top_score").html(this.top_score);
	}

	// Allow user interaction
	unlockUser();
});

// Starts the game
function startGame() {
	// Lock user from interacting and init vars
	lockUser();
	this.round = 0;
	this.lost = 0;
	this.currently_playing = 1;
	this.generated_sequence = [];
	this.sequence = [];

	// Start the first round
	startRound();
}

// Player did not get the correct sequence
function gameOver() {
	// Set player to not playing
	currently_playing = 0;
	alert("Game Over!")
	
	// Get top score
	this.top_score = parseInt(localStorage.getItem("top_score"));

	// Update top score if needed
	if(this.top_score < this.round) {
		localStorage.setItem("top_score", this.round);
		this.top_score = this.round;
		$("#top_score").html(this.top_score);
	}

	// Allow user to interact
	unlockUser();
}

// Start the current round
function startRound() {
	lockUser();

	// Increment round
	round++;
	$("#round").html(this.round);

	// Get the next color for the sequence
	selectNextSeq();

	// Loop through the current game sequence with a 600 millisecond pause between
	var i = 0;
	loopArr(generated_sequence, turnOn, 800, false);

	// Set the color needed to the first of the generated sequence
	sequence = this.generated_sequence.slice(0);

	// Allow interaction
	unlockUser();
}

// Turns on the color
function turnOn(color) {
	$('.' + color).addClass(color + "_on");

	// Wait 400 milliseconds then turn off the color
	window.setTimeout(function(){
    	$('.' + color).removeClass(color + "_on");
	}, 400);
}

// Process user click
function click(color) {
	lockUser();
	var correct_answer = this.sequence.shift();
	
	if(color !== correct_answer) {
		// Color clicked is not the correct color
		this.lost = 1;
		gameOver();
	} else {
		// Correct color, check if end of sequence
		checkForCompletion();
	}
}

// Checks if the user completed the sequence
function checkForCompletion() {
	if(this.sequence.length === 0) {
		// User entered correct sequence
		setTimeout(startRound, 1000);
	} else {
		// Still more to enter
		unlockUser();
	}
}

// Select a random color and add it to the generated sequence array
function selectNextSeq() {
	var newSequence = Math.floor((Math.random() * 4));
	generated_sequence.push(colorMap[newSequence]);
}

// Prevent the user from click and interacting with the game board
function lockUser() {
	// Lock red button
	$('body').off('click', '#red_btn').off('mousedown', '#red_btn').off('mouseup', '#red_btn');
	$('.red').removeClass('hoverable');

	// Lock blue button
	$('body').off('click', '#blue_btn').off('mousedown', '#blue_btn').off('mouseup', '#blue_btn');
	$('.blue').removeClass('hoverable');

	// Lock yellow button
	$('body').off('click', '#yellow_btn').off('mousedown', '#yellow_btn').off('mouseup', '#yellow_btn');
	$('.yellow').removeClass('hoverable');

	// Lock green button
	$('body').off('click', '#green_btn').off('mousedown', '#green_btn').off('mouseup', '#green_btn');
	$('.green').removeClass('hoverable');
}

// Allow user to interact with the game board
function unlockUser() {
	// Turn the click, mounsedown, mouseup, and hoverable on for red
	$('body').on('click', '#red_btn', function(e) {
		turnOn("red");

		// Check if need to act on the click
		if(currently_playing == 1) {
			click("red");
		}
	}).on('mousedown', '#red_btn', function(e) {
		$(".red").addClass('active');
	}).on('mouseup', '#red_btn', function(e) {
		$(".red").removeClass('active');
	});
	$('.red').addClass('hoverable');

	// Turn the click, mounsedown, mouseup, and hoverable on for blue
	$('body').on('click', '#blue_btn', function(e) {
		turnOn("blue");

		// Check if need to act on the click
		if(currently_playing == 1) {
			click("blue");
		}
	}).on('mousedown', '#blue_btn', function(e) {
		$(".blue").addClass('active');
	}).on('mouseup', '#blue_btn', function(e) {
		$(".blue").removeClass('active');
	});
	$('.blue').addClass('hoverable');

	// Turn the click, mounsedown, mouseup, and hoverable on for yellow
	$('body').on('click', '#yellow_btn', function(e) {
		turnOn("yellow");

		// Check if need to act on the click
		if(currently_playing == 1) {
			click("yellow");
		}
	}).on('mousedown', '#yellow_btn', function(e) {
		$(".yellow").addClass('active');
	}).on('mouseup', '#yellow_btn', function(e) {
		$(".yellow").removeClass('active');
	});
	$('.yellow').addClass('hoverable');

	// Turn the click, mounsedown, mouseup, and hoverable on for green
	$('body').on('click', '#green_btn', function(e) {
		turnOn("green");

		// Check if need to act on the click
		if(currently_playing == 1) {
			click("green");
		}
	}).on('mousedown', '#green_btn', function(e) {
		$(".green").addClass('active');
	}).on('mouseup', '#green_btn', function(e) {
		$(".green").removeClass('active');
	});
	$('.green').addClass('hoverable');
}

// Loop through an array with a callback and a wait time
function loopArr(arr, callback, time){
    var i = 0;
    var total = arr.length - 1;

    var loop = function() {
            callback(arr[i]);

            // Increment index
            if (i < total ) {
                i++;
            } else {
            	// Finsihed all elements
            	return;
            }
            setTimeout(loop, time);
    }
    loop()
}
